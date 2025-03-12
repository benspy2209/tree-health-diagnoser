import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DiagnosticHeader from "./DiagnosticHeader";
import DiagnosticStepper from "./DiagnosticStepper";
import DiagnosticQuestion from "./DiagnosticQuestion";
import AnalyzingState from "./AnalyzingState";
import { Button } from "@/components/ui/button";
import { generateDiagnostic, isApiKeySet } from "@/services/openAIService";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { DiagnosticQuestions } from "./diagnostic/DiagnosticQuestions";
import { DiagnosticNavigation } from "./diagnostic/DiagnosticNavigation";
import { DiagnosticImageUpload } from "./diagnostic/DiagnosticImageUpload";
import { useDiagnosticAnalysis } from "@/hooks/useDiagnosticAnalysis";
import DiagnosticResult from "./DiagnosticResult";

interface DiagnosticContainerProps {
  className?: string;
}

const DiagnosticContainer = ({ className }: DiagnosticContainerProps) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDiagnostic, setAiDiagnostic] = useState<string | null>(null);
  
  const questions = DiagnosticQuestions();
  const totalSteps = questions.length + 2; // Questions + Image upload + Results
  
  const handleAnswer = (answer: string | string[]) => {
    setAnswers({ ...answers, [step]: answer });
    
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 500);
  };
  
  const { determineStatus } = useDiagnosticAnalysis(answers);
  
  const handleImageUpload = (files: File[]) => {
    if (files.length > 0) {
      setUploadedImages(prevImages => {
        const newImages = [...prevImages, ...files];
        return newImages.slice(0, 5);
      });
    }
  };
  
  const handleNext = async () => {
    if (step === questions.length + 1) {
      if (uploadedImages.length === 0) {
        toast({
          title: t("diagnostic.errors.noImage.title"),
          description: t("diagnostic.errors.noImage.description"),
          variant: "destructive"
        });
        return;
      }

      if (!isApiKeySet()) {
        toast({
          title: t("diagnostic.errors.apiConfig.title"),
          description: t("diagnostic.errors.apiConfig.description"),
          variant: "destructive"
        });
        return;
      }

      setIsAnalyzing(true);
      
      try {
        const diagnosticData = {
          answers,
          questions,
          images: uploadedImages,
          language
        };
        
        const diagnosis = await generateDiagnostic(diagnosticData);
        setAiDiagnostic(diagnosis);
        
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep(step + 1);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors de l'analyse:", error);
        toast({
          title: t("diagnostic.errors.analysis.title"),
          description: t("diagnostic.errors.analysis.description"),
          variant: "destructive"
        });
        setIsAnalyzing(false);
      }
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
    setUploadedImages([]);
    setAiDiagnostic(null);
  };
  
  const renderContent = () => {
    if (isAnalyzing) {
      return <AnalyzingState />;
    }
    
    if (step === questions.length + 2) {
      if (aiDiagnostic) {
        return (
          <DiagnosticResult
            status="custom"
            title={t("diagnostic.results.customTitle")}
            description={aiDiagnostic}
            recommendations={[]}
            onRestart={handleRestart}
          />
        );
      }
      
      const status = determineStatus();
      
      const statusKey = `diagnostic.results.${status}.recommendations`;
      let recommendations: string[] = [];
      
      const recommendationsValue = t(statusKey);
      if (Array.isArray(recommendationsValue)) {
        recommendations = recommendationsValue;
      } else if (typeof recommendationsValue === 'string') {
        recommendations = [recommendationsValue];
      }
      
      return (
        <DiagnosticResult
          status={status as "healthy" | "warning" | "danger" | "unknown"}
          title={t(`diagnostic.results.${status}.title`)}
          description={t(`diagnostic.results.${status}.description`)}
          recommendations={recommendations}
          onRestart={handleRestart}
        />
      );
    }
    
    if (step === questions.length + 1) {
      return <DiagnosticImageUpload onImageUpload={handleImageUpload} />;
    }
    
    if (step <= questions.length) {
      const questionData = questions[step - 1];
      return (
        <DiagnosticQuestion
          question={questionData.question}
          options={questionData.options}
          subtitle={questionData.subtitle}
          onAnswer={handleAnswer}
          multiSelect={questionData.multiSelect}
          questionNumber={step}
        />
      );
    }
    
    return null;
  };
  
  return (
    <div className={className ? className : "w-full max-w-4xl mx-auto py-8 px-4"}>
      <DiagnosticHeader />
      
      <div className="py-6">
        <DiagnosticStepper
          currentStep={step}
          totalSteps={totalSteps}
          setCurrentStep={(newStep) => {
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
        
        {!isAnalyzing && step !== questions.length + 2 && (
          <DiagnosticNavigation 
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            step={step}
            totalQuestions={questions.length}
            hasUploadedImages={uploadedImages.length > 0}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DiagnosticContainer;
