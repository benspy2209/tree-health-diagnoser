import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DiagnosticHeader from "./DiagnosticHeader";
import DiagnosticStepper from "./DiagnosticStepper";
import DiagnosticQuestion from "./DiagnosticQuestion";
import ImageUploader from "./ImageUploader";
import DiagnosticResult from "./DiagnosticResult";
import AnalyzingState from "./AnalyzingState";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Questions de diagnostic par défaut
const defaultQuestions = [
  {
    question: "Où se situe votre arbre ?",
    subtitle: "Localisation et Potentiel de Risque",
    options: [
      "Proche d'une maison ou d'un bâtiment", 
      "Proche d'une route ou zone fréquentée", 
      "Dans un espace dégagé ou isolé", 
      "Je ne sais pas"
    ]
  },
  {
    question: "L'arbre montre-t-il des signes inquiétants ?",
    subtitle: "Localisation et Potentiel de Risque",
    options: [
      "Oui, signes préoccupants", 
      "Non, mais je veux vérifier", 
      "Je ne sais pas"
    ]
  },
  {
    question: "Quels problèmes avez-vous observés ?",
    subtitle: "Symptômes Observés",
    options: [
      "Feuilles décolorées",
      "Branches mortes ou cassées",
      "Champignons ou moisissures",
      "Fissures ou blessures",
      "Présence de cavités",
      "L'arbre penche",
      "Autre"
    ]
  },
  {
    question: "Depuis combien de temps ?",
    subtitle: "Symptômes Observés",
    options: [
      "Moins d'une semaine",
      "1 à 4 semaines",
      "1 à 6 mois",
      "Plus de 6 mois",
      "Je ne sais pas"
    ]
  }
];

interface DiagnosticContainerProps {
  className?: string;
}

const DiagnosticContainer = ({ className }: DiagnosticContainerProps) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const questions = defaultQuestions;
  const totalSteps = questions.length + 2; // Questions + Image upload + Results
  
  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    
    // Attendre un peu pour l'animation puis avancer à l'étape suivante
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 500);
  };
  
  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };
  
  const handleNext = () => {
    if (step === questions.length + 1) { // Si on est à l'étape d'upload d'image
      setIsAnalyzing(true);
      
      // Simuler une analyse (à remplacer par l'intégration avec ChatGPT API)
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(step + 1);
      }, 3500);
    } else {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleRestart = () => {
    setStep(1);
    setAnswers({});
    setUploadedImage(null);
  };
  
  const renderContent = () => {
    // Montrer l'état d'analyse
    if (isAnalyzing) {
      return <AnalyzingState />;
    }
    
    // Étape de résultat
    if (step === questions.length + 2) {
      const determineStatus = () => {
        // Logique simplifiée pour déterminer le statut (à améliorer avec l'IA)
        const hasProblems = Object.values(answers).some(answer => 
          answer.includes("jaun") || 
          answer.includes("tach") || 
          answer.includes("fissur") || 
          answer.includes("champ") || 
          answer.includes("infest") ||
          answer.includes("préoccupants") ||
          answer.includes("décolorées") ||
          answer.includes("mortes") ||
          answer.includes("cassées") ||
          answer.includes("moisissures") ||
          answer.includes("blessures") ||
          answer.includes("cavités") ||
          answer.includes("penche")
        );
        
        const hasSevereProblems = Object.values(answers).some(answer => 
          answer.includes("suint") || 
          answer.includes("import") ||
          answer.includes("Plus de 6 mois")
        );
        
        if (hasSevereProblems) return "danger";
        if (hasProblems) return "warning";
        return "healthy";
      };
      
      const status = determineStatus();
      const titles = {
        healthy: "Votre arbre semble en bonne santé",
        warning: "Votre arbre nécessite de l'attention",
        danger: "Votre arbre présente des signes de maladie",
        unknown: "Diagnostic incomplet"
      };
      
      const descriptions = {
        healthy: "D'après les informations fournies, votre arbre ne présente pas de signes de problèmes majeurs.",
        warning: "Certains signes indiquent que votre arbre pourrait être stressé ou en début de maladie.",
        danger: "Votre arbre présente des symptômes qui nécessitent une intervention rapide.",
        unknown: "Nous n'avons pas assez d'informations pour établir un diagnostic complet."
      };
      
      const recommendationsByStatus = {
        healthy: [
          "Continuez d'arroser régulièrement l'arbre",
          "Maintenez un paillage au pied de l'arbre",
          "Surveillez tout changement dans son apparence"
        ],
        warning: [
          "Augmentez l'arrosage si le sol est sec",
          "Vérifiez la présence de parasites plus régulièrement",
          "Envisagez une taille légère des branches affectées",
          "Consultez un arboriste si les symptômes persistent"
        ],
        danger: [
          "Consultez rapidement un arboriste professionnel",
          "Isolez l'arbre si possible pour éviter la propagation",
          "Évitez de tailler ou de stresser davantage l'arbre",
          "Prenez des photos détaillées des symptômes pour l'expert"
        ],
        unknown: [
          "Fournissez plus d'informations ou de photos",
          "Observez l'arbre sur plusieurs jours",
          "Consultez un professionnel pour un diagnostic sur place"
        ]
      };
      
      return (
        <DiagnosticResult
          status={status as "healthy" | "warning" | "danger" | "unknown"}
          title={titles[status as keyof typeof titles]}
          description={descriptions[status as keyof typeof descriptions]}
          recommendations={recommendationsByStatus[status as keyof typeof recommendationsByStatus]}
          onRestart={handleRestart}
        />
      );
    }
    
    // Étape d'upload d'image
    if (step === questions.length + 1) {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-2">Pour un diagnostic plus précis, ajoutez :</h3>
            <ul className="text-muted-foreground list-disc list-inside space-y-1">
              <li>Une vue complète de l'arbre</li>
              <li>Une photo des zones concernées</li>
              <li>Si applicable : champignons, moisissures, cavités</li>
            </ul>
          </div>
          <ImageUploader onImageUpload={handleImageUpload} />
        </div>
      );
    }
    
    // Étapes de questions
    if (step <= questions.length) {
      const questionData = questions[step - 1];
      return (
        <DiagnosticQuestion
          question={questionData.question}
          options={questionData.options}
          subtitle={questionData.subtitle}
          onAnswer={handleAnswer}
        />
      );
    }
    
    return null;
  };
  
  return (
    <div className={cn("w-full max-w-4xl mx-auto py-8 px-4", className)}>
      <DiagnosticHeader />
      
      <div className="py-6">
        <DiagnosticStepper
          currentStep={step}
          totalSteps={totalSteps}
          setCurrentStep={(newStep) => {
            // Ne permet de revenir qu'aux étapes déjà visitées
            if (typeof newStep === 'number' && newStep < step) {
              setStep(newStep);
            }
          }}
        />
      </div>
      
      <motion.div
        className="min-h-[300px] flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}-${isAnalyzing}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Boutons de navigation (sauf pour les états spéciaux) */}
        {!isAnalyzing && step !== questions.length + 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-between mt-8"
          >
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
              className={cn(
                "transition-opacity duration-300",
                step === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <ArrowLeft size={16} className="mr-2" />
              Précédent
            </Button>
            
            {step > questions.length && (
              <Button
                onClick={handleNext}
                disabled={step === questions.length + 1 && !uploadedImage}
                className="bg-natural-leaf hover:bg-natural-leaf/90 text-white ml-auto"
              >
                Analyser
                <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DiagnosticContainer;
