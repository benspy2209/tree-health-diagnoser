
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageContext";

interface OtherOptionInputProps {
  otherText: string;
  setOtherText: (text: string) => void;
  showOtherInput: boolean;
  multiSelect: boolean;
  selectedOptions: string[];
  handleMultiSelectionSubmit: () => void;
  handleOtherSubmit: () => void;
}

export const OtherOptionInput = ({
  otherText,
  setOtherText,
  showOtherInput,
  multiSelect,
  selectedOptions,
  handleMultiSelectionSubmit,
  handleOtherSubmit
}: OtherOptionInputProps) => {
  const { t } = useLanguage();

  if (!showOtherInput) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="mt-4 space-y-4"
      >
        <Input
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder={t("diagnostic.otherOption.placeholder")}
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
            {t("diagnostic.otherOption.validate")} ({selectedOptions.length} {selectedOptions.length > 1 
              ? t("diagnostic.otherOption.selections") 
              : t("diagnostic.otherOption.selection")})
          </Button>
        </motion.div>
      )}
      
      {!multiSelect && (
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
            {t("diagnostic.otherOption.validate")}
          </Button>
        </motion.div>
      )}
    </>
  );
};
