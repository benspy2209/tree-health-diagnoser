
import { toast } from "@/hooks/use-toast";

// Assurez-vous de remplacer cette valeur par votre clé API dans un environnement
let OPENAI_API_KEY = "";

export const setOpenAIApiKey = (apiKey: string) => {
  OPENAI_API_KEY = apiKey;
};

export const isApiKeySet = () => {
  return OPENAI_API_KEY.length > 0;
};

interface DiagnosticData {
  answers: Record<number, string>;
  questions: Array<{ question: string; options: string[] }>;
  image?: File | null;
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
      throw new Error("Clé API OpenAI non définie");
    }

    const { answers, questions, image } = data;
    
    // Préparer le contexte pour le prompt
    const userContext = questions.map((q, index) => {
      const questionNumber = index + 1;
      const answer = answers[questionNumber] || "Non renseigné";
      return `Question: ${q.question}\nRéponse: ${answer}`;
    }).join("\n\n");
    
    // Préparer les données à envoyer
    const messages: Message[] = [
      {
        role: "system",
        content: `Vous êtes un assistant spécialisé dans la santé des arbres, conçu pour analyser rapidement les informations recueillies et formuler des recommandations. Après avoir reçu les réponses d'un utilisateur au sujet de son arbre (emplacement, hauteur, problèmes observés, etc.) et examiné les photos fournies, vous devez :

1. Analyser les réponses et les images pour dresser un résumé clair des symptômes ou risques potentiels.
2. Fournir un diagnostic général ou des pistes de réflexion basées sur les problèmes déclarés (ex. branches mortes, champignons, fissures, etc.) et visibles sur les photos.
3. Si aucune photo n'est fournie, signalez cette absence et proposez de réaliser à nouveau le diagnostic avec l'ajout de photos pour une meilleure précision.
4. Proposer un contact direct avec un expert à l'adresse e-mail info@plumridge.be pour un suivi professionnel.

Structure de votre réponse :
\`\`\`
Rapport provisoire
Analyse de l'arbre :
[Description détaillée basée sur les informations textuelles et visuelles fournies, incluant les symptômes observés et leur localisation]

Diagnostic probable :
* [Premier problème identifié avec explication concise]
* [Deuxième problème identifié avec explication concise]
* [Autres problèmes potentiels]

Recommandations :
1. [Première recommandation d'action concrète]
2. [Deuxième recommandation d'action concrète]
3. [Autres recommandations pertinentes]
4. [Conseil sur l'environnement ou la prévention]

Prochaine étape :
Je vous recommande vivement de contacter un expert pour une évaluation professionnelle. Vous pouvez envoyer plus de détails ou demander une intervention à info@plumridge.be.

N'hésitez pas à revenir vers nous avec d'autres photos ou des précisions sur l'environnement de l'arbre pour affiner le diagnostic.
\`\`\`

Règles et style de réponse :
- Restez professionnel, clair et concis.
- Utilisez un langage bienveillant et structuré.
- Fournissez des suggestions concrètes (p. ex. : taille, amélioration du drainage, test de sol).
- Ne déviez pas du sujet (diagnostic et conseils pour la santé des arbres).
- Terminez toujours votre réponse par un appel à l'action pour contacter l'expert.
- Analysez minutieusement les photos pour identifier les signes visuels de maladie ou de stress.
- Mettez en relation les symptômes décrits textuellement avec ce que vous observez dans les images.

Objectif :
À la fin de votre réponse, l'utilisateur doit :
- Comprendre l'état général de son arbre sur la base des informations fournies.
- Savoir quelles mesures simples il peut prendre immédiatement.
- Être invité à recontacter le service avec des photos ou contacter l'expert à info@plumridge.be pour un diagnostic approfondi ou une intervention.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Voici les informations sur l'arbre que je souhaite diagnostiquer:\n\n${userContext}\n\n${image ? "Une image a été fournie." : "Aucune image n'a été fournie."}`
          }
        ]
      }
    ];

    // Ajouter l'image si elle existe
    if (image) {
      const base64Image = await fileToBase64(image);
      // L'image est ajoutée au tableau content du message de l'utilisateur
      if (Array.isArray(messages[1].content)) {
        messages[1].content.push({
          type: "image_url",
          image_url: {
            url: base64Image
          }
        });
      }
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: messages,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erreur API OpenAI: ${errorData.error?.message || response.statusText}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
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
