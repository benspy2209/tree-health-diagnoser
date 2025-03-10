
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DiagnosticQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  className?: string;
}

const DiagnosticQuestion = ({
  question,
  options,
  onAnswer,
  className,
}: DiagnosticQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnimatingOut(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsAnimatingOut(true);
    
    setTimeout(() => {
      onAnswer(option);
    }, 500);
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
          <motion.h2 
            className="text-2xl font-semibold text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {question}
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
                  selectedOption === option 
                    ? "border-natural-leaf bg-accent/50 ring-2 ring-natural-leaf/30" 
                    : "border-border bg-card"
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                    selectedOption === option 
                      ? "bg-natural-leaf text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>
                  <span className="font-medium">{option}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default DiagnosticQuestion;
