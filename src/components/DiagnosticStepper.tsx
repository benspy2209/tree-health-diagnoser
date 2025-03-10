
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosticStepperProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
  className?: string;
}

const DiagnosticStepper = ({
  currentStep,
  totalSteps,
  setCurrentStep,
  className,
}: DiagnosticStepperProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("flex justify-center items-center w-full py-4", className)}
    >
      <div className="relative flex items-center justify-between w-full max-w-md">
        {/* Ligne de connexion */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2 z-0" />
        
        {/* Points d'étape */}
        {steps.map((step) => {
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;
          
          return (
            <motion.div
              key={step}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: isCurrent ? 1.1 : 1,
                transition: { duration: 0.3 }
              }}
              onClick={() => setCurrentStep && step < currentStep && setCurrentStep(step)}
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                isCompleted ? "bg-natural-leaf text-white cursor-pointer" : "",
                isCurrent ? "bg-natural-leaf text-white ring-4 ring-accent/50" : "",
                !isCompleted && !isCurrent ? "bg-muted text-muted-foreground" : "",
                setCurrentStep && step < currentStep ? "hover:ring-2 hover:ring-natural-leaf/30" : ""
              )}
            >
              {isCompleted ? (
                <Check size={16} className="text-white" />
              ) : (
                step
              )}
              
              {/* Étiquette d'étape pour l'étape courante */}
              {isCurrent && (
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground"
                >
                  Étape {step}/{totalSteps}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DiagnosticStepper;
