
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { QuestionOption } from "./diagnostic/QuestionOption";
import { OtherOptionInput } from "./diagnostic/OtherOptionInput";

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
  const { t } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [otherText, setOtherText] = useState("");
  const otherOptionText = t("diagnostic.problems.options.other");

  useEffect(() => {
    setSelectedOption(null);
    setSelectedOptions([]);
    setIsAnimatingOut(false);
    setOtherText("");
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (multiSelect) {
      // Mode multi-sélection
      if (option === otherOptionText) {
        // Si "Autre" est cliqué en mode multi-sélection
        if (!selectedOptions.includes(otherOptionText)) {
          setSelectedOptions(prev => [...prev, otherOptionText]);
        } else {
          setSelectedOptions(prev => prev.filter(opt => opt !== otherOptionText));
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
      // Mode sélection unique
      setSelectedOption(option);
      
      if (option === otherOptionText) {
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
      if (selectedOptions.includes(otherOptionText) && otherText.trim()) {
        const index = answers.indexOf(otherOptionText);
        answers[index] = `${otherOptionText}: ${otherText}`;
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
        onAnswer(`${otherOptionText}: ${otherText}`);
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
                {t("diagnostic.problems.multiSelect")}
              </span>
            )}
          </motion.h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => (
              <QuestionOption
                key={option}
                option={option}
                index={index}
                isSelected={multiSelect ? selectedOptions.includes(option) : selectedOption === option}
                multiSelect={multiSelect}
                onClick={() => handleOptionClick(option)}
              />
            ))}
          </div>
          
          <OtherOptionInput
            otherText={otherText}
            setOtherText={setOtherText}
            showOtherInput={(multiSelect && selectedOptions.includes(otherOptionText)) || 
              (!multiSelect && selectedOption === otherOptionText)}
            multiSelect={multiSelect}
            selectedOptions={selectedOptions}
            handleMultiSelectionSubmit={handleMultiSelectionSubmit}
            handleOtherSubmit={handleOtherSubmit}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DiagnosticQuestion;
