
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  multiSelect: boolean;
  onClick: () => void;
}

export const QuestionOption = ({
  option,
  index,
  isSelected,
  multiSelect,
  onClick
}: QuestionOptionProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className={cn(
        "text-left p-4 rounded-xl border transition-all duration-300",
        "hover:border-natural-leaf/50 hover:bg-accent/50",
        "active:scale-98 focus:outline-none focus-visible:ring focus-visible:ring-natural-leaf/30",
        isSelected
          ? "border-natural-leaf bg-accent/50 ring-2 ring-natural-leaf/30"
          : "border-border bg-card"
      )}
    >
      <span className="flex items-center gap-3">
        <span className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
          isSelected
            ? "bg-natural-leaf text-white"
            : "bg-muted text-muted-foreground"
        )}>
          {multiSelect ? (isSelected ? "✓" : " ") : index + 1}
        </span>
        <span className="font-medium">{option}</span>
      </span>
    </motion.button>
  );
};
