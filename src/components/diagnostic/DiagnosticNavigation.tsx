
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface DiagnosticNavigationProps {
  handlePrevious: () => void;
  handleNext: () => void;
  step: number;
  totalQuestions: number;
  hasUploadedImages: boolean;
}

export const DiagnosticNavigation = ({
  handlePrevious,
  handleNext,
  step,
  totalQuestions,
  hasUploadedImages
}: DiagnosticNavigationProps) => {
  const { t } = useLanguage();

  return (
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
        {t("diagnostic.buttons.previous")}
      </Button>
      
      {step > totalQuestions && (
        <Button
          onClick={handleNext}
          disabled={step === totalQuestions + 1 && !hasUploadedImages}
          className="bg-natural-leaf hover:bg-natural-leaf/90 text-white ml-auto"
        >
          {t("diagnostic.buttons.analyze")}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      )}
    </motion.div>
  );
};
