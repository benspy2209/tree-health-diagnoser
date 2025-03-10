
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DiagnosticQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string | string[]) => void;
  className?: string;
  subtitle?: string;
  multiSelect?: boolean;
  questionNumber?: number;
}

const DiagnosticQuestion = ({
  question,
  options,
  onAnswer,
  className,
  subtitle,
  multiSelect = false,
  questionNumber,
}: DiagnosticQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [otherText, setOtherText] = useState("");

  useEffect(() => {
    setSelectedOption(null);
    setSelectedOptions([]);
    setIsAnimatingOut(false);
    setOtherText("");
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      // Mode multi-sélection
      if (option === "Autre") {
        // Si "Autre" est cliqué en mode multi-sélection
        if (!selectedOptions.includes("Autre")) {
          setSelectedOptions(prev => [...prev, "Autre"]);
        } else {
          setSelectedOptions(prev => prev.filter(opt => opt !== "Autre"));
          setOtherText("");
        }
      } else {
        // Pour les autres options en mode multi-sélection
        if (selectedOptions.includes(option)) {
          setSelectedOptions(prev => prev.filter(opt => opt !== option));
        } else {
          setSelectedOptions(prev => [...prev, option]);
        }
      }
    } else {
      // Mode sélection unique (comportement existant)
      setSelectedOption(option);
      
      if (option === "Autre") {
        return; // Ne soumet pas encore si "Autre" est sélectionné
      }
      
      setIsAnimatingOut(true);
      
      setTimeout(() => {
        onAnswer(option);
      }, 500);
    }
  };
  
  const handleMultiSelectionSubmit = () => {
    if (selectedOptions.length > 0) {
      let answers = [...selectedOptions];
      
      // Remplacer "Autre" par le texte spécifié si présent
      if (selectedOptions.includes("Autre") && otherText.trim()) {
        const index = answers.indexOf("Autre");
        answers[index] = `Autre: ${otherText}`;
      }
      
      setIsAnimatingOut(true);
      
      setTimeout(() => {
        onAnswer(answers);
      }, 500);
    }
  };
  
  const handleOtherSubmit = () => {
    if (otherText.trim()) {
      setIsAnimatingOut(true);
      
      setTimeout(() => {
        onAnswer(`Autre: ${otherText}`);
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-2xl mx-auto px-4", className)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={question}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isAnimatingOut ? 0 : 1, y: isAnimatingOut ? -20 : 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          {subtitle && (
            <motion.p
              className="text-lg text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          <motion.h2 
            className="text-2xl font-semibold text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {question}
            {multiSelect && (
              <span className="block text-base font-normal mt-2 text-natural-leaf">
                Plusieurs choix possibles
              </span>
            )}
          </motion.h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => (
              <motion.button
                key={option}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  "text-left p-4 rounded-xl border transition-all duration-300",
                  "hover:border-natural-leaf/50 hover:bg-accent/50",
                  "active:scale-98 focus:outline-none focus-visible:ring focus-visible:ring-natural-leaf/30",
                  multiSelect
                    ? selectedOptions.includes(option)
                      ? "border-natural-leaf bg-accent/50 ring-2 ring-natural-leaf/30"
                      : "border-border bg-card"
                    : selectedOption === option
                      ? "border-natural-leaf bg-accent/50 ring-2 ring-natural-leaf/30"
                      : "border-border bg-card"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                    multiSelect
                      ? selectedOptions.includes(option)
                        ? "bg-natural-leaf text-white"
                        : "bg-muted text-muted-foreground"
                      : selectedOption === option
                        ? "bg-natural-leaf text-white"
                        : "bg-muted text-muted-foreground"
                  )}>
                    {multiSelect ? (selectedOptions.includes(option) ? "✓" : " ") : index + 1}
                  </span>
                  <span className="font-medium">{option}</span>
                </span>
              </motion.button>
            ))}
          </div>
          
          {((multiSelect && selectedOptions.includes("Autre")) || 
             (!multiSelect && selectedOption === "Autre")) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 space-y-4"
            >
              <Input
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Précisez..."
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (multiSelect) {
                      handleMultiSelectionSubmit();
                    } else {
                      handleOtherSubmit();
                    }
                  }
                }}
              />
            </motion.div>
          )}
          
          {multiSelect && selectedOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
            >
              <Button 
                onClick={handleMultiSelectionSubmit}
                className="bg-natural-leaf hover:bg-natural-leaf/90 text-white w-full"
              >
                Valider ({selectedOptions.length} sélection{selectedOptions.length > 1 ? 's' : ''})
              </Button>
            </motion.div>
          )}
          
          {!multiSelect && selectedOption === "Autre" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <Button 
                onClick={handleOtherSubmit}
                disabled={!otherText.trim()}
                className="bg-natural-leaf hover:bg-natural-leaf/90 text-white w-full"
              >
                Valider
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DiagnosticQuestion;
