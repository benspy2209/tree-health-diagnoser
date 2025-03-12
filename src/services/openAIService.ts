
import { toast } from "@/hooks/use-toast";

// Clé API définie par défaut pour l'application - à remplacer par une chaîne vide
const DEFAULT_API_KEY = "";

// Récupérer la clé API du localStorage ou utiliser la clé par défaut
let OPENAI_API_KEY = localStorage.getItem('openai_api_key') || DEFAULT_API_KEY;

export const setOpenAIApiKey = (apiKey: string) => {
  OPENAI_API_KEY = apiKey;
  // Sauvegarder la clé dans le localStorage pour la persistance
  localStorage.setItem('openai_api_key', apiKey);
};

export const isApiKeySet = () => {
  return OPENAI_API_KEY.length > 0;
};

interface DiagnosticData {
  answers: Record<number, string | string[]>;
  questions: Array<{ 
    question: string; 
    options: string[];
    multiSelect?: boolean;
    subtitle?: string;
  }>;
  images?: File[] | null;
}

// Définition des types pour les messages OpenAI avec support d'images
type ContentItem = 
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

type Message = {
  role: "system" | "user" | "assistant";
  content: string | ContentItem[];
};

export const generateDiagnostic = async (data: DiagnosticData): Promise<string> => {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("Clé API OpenAI non définie. Veuillez configurer une clé API valide dans les paramètres.");
    }

    const { answers, questions, images } = data;
    
    // Préparer le contexte pour le prompt
    const userContext = questions.map((q, index) => {
      const questionNumber = index + 1;
      const answer = answers[questionNumber];
      
      // Formater la réponse en fonction de son type (string ou string[])
      let formattedAnswer: string;
      if (Array.isArray(answer)) {
        formattedAnswer = answer.join(", ");
      } else {
        formattedAnswer = answer || "Non renseigné";
      }
      
      return `Question: ${q.question}\nRéponse: ${formattedAnswer}`;
    }).join("\n\n");
    
    // Préparer les messages à envoyer
    const systemMessage: Message = {
      role: "system",
      content: `Vous êtes un assistant spécialisé dans la santé des arbres, conçu pour analyser rapidement les informations recueillies et formuler des recommandations. Après avoir reçu les réponses d'un utilisateur au sujet de son arbre (emplacement, hauteur, problèmes observés, etc.) et examiné les photos fournies, vous devez :

1. Analyser les réponses et les images pour dresser un résumé clair des symptômes ou risques potentiels.
2. Fournir un diagnostic général ou des pistes de réflexion basées sur les problèmes déclarés (ex. branches mortes, champignons, fissures, etc.) et visibles sur les photos.
3. Si aucune photo n'est fournie, signalez cette absence et proposez de réaliser à nouveau le diagnostic avec l'ajout de photos pour une meilleure précision.
4. Proposer un contact direct avec un expert à l'adresse e-mail info@plumridge.be pour un suivi professionnel.

Structure de votre réponse :
Rapport provisoire
Analyse de l'arbre :
[Description détaillée basée sur les informations textuelles et visuelles fournies, incluant les symptômes observés et leur localisation]

Diagnostic probable :
• [Premier problème identifié avec explication concise]
• [Deuxième problème identifié avec explication concise]
• [Autres problèmes potentiels]

Recommandations :
1. [Première recommandation d'action concrète]
2. [Deuxième recommandation d'action concrète]
3. [Autres recommandations pertinentes]
4. [Conseil sur l'environnement ou la prévention]

Prochaine étape :
Je vous recommande vivement de contacter un expert pour une évaluation professionnelle. Vous pouvez envoyer plus de détails ou demander une intervention à info@plumridge.be.

N'hésitez pas à revenir vers nous avec d'autres photos ou des précisions sur l'environnement de l'arbre pour affiner le diagnostic.

Règles et style de réponse :
- Restez professionnel, clair et concis.
- Utilisez un langage bienveillant et structuré.
- Fournissez des suggestions concrètes (p. ex. : taille, amélioration du drainage, test de sol).
- Ne déviez pas du sujet (diagnostic et conseils pour la santé des arbres).
- Terminez toujours votre réponse par un appel à l'action pour contacter l'expert.
- Analysez minutieusement les photos pour identifier les signes visuels de maladie ou de stress.
- Mettez en relation les symptômes décrits textuellement avec ce que vous observez dans les images.
- N'UTILISEZ JAMAIS DE SYNTAXE MARKDOWN. Utilisez du texte brut uniquement. N'ajoutez pas de délimiteurs tels que \`\`\`markdown ou \`\`\` à votre réponse.

Objectif :
À la fin de votre réponse, l'utilisateur doit :
- Comprendre l'état général de son arbre sur la base des informations fournies.
- Savoir quelles mesures simples il peut prendre immédiatement.
- Être invité à recontacter le service avec des photos ou contacter l'expert à info@plumridge.be pour un diagnostic approfondi ou une intervention.`
    };

    // Création du message utilisateur avec contenu sous forme de tableau
    let userContent: ContentItem[] = [
      {
        type: "text",
        text: `Voici les informations sur l'arbre que je souhaite diagnostiquer:\n\n${userContext}\n\n${images && images.length > 0 ? `${images.length} image(s) ont été fournies.` : "Aucune image n'a été fournie."}`
      }
    ];

    // Ajouter les images si elles existent
    if (images && images.length > 0) {
      // Convertir toutes les images en base64
      const base64Images = await Promise.all(images.map(image => fileToBase64(image)));
      
      // Ajouter chaque image au contenu du message utilisateur
      base64Images.forEach(base64Image => {
        userContent.push({
          type: "image_url",
          image_url: {
            url: base64Image
          }
        });
      });
    }

    // Création du message utilisateur complet
    const userMessage: Message = {
      role: "user",
      content: userContent
    };

    // Tableau final des messages
    const messages: Message[] = [systemMessage, userMessage];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: messages,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || response.statusText;
      console.error("Erreur API OpenAI:", errorMessage);
      throw new Error(`Erreur API OpenAI: ${errorMessage}`);
    }

    const result = await response.json();
    let content = result.choices[0].message.content;
    
    // Supprimer toute syntaxe markdown éventuelle
    content = content.replace(/```markdown\s*/g, '').replace(/```\s*$/g, '');
    
    return content;
  } catch (error) {
    console.error("Erreur lors de la génération du diagnostic:", error);
    toast({
      title: "Erreur lors de l'analyse",
      description: error instanceof Error ? error.message : "Une erreur est survenue",
      variant: "destructive"
    });
    return "Impossible de générer le diagnostic. Veuillez réessayer ou contacter directement un expert à info@plumridge.be.";
  }
};

// Fonction utilitaire pour convertir un fichier en base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Erreur lors de la conversion du fichier en base64"));
      }
    };
    reader.onerror = error => reject(error);
  });
};
