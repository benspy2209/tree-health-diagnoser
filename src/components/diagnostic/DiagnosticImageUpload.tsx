
import { motion } from "framer-motion";
import ImageUploader from "../ImageUploader";
import { useLanguage } from "@/i18n/LanguageContext";

interface DiagnosticImageUploadProps {
  onImageUpload: (files: File[]) => void;
}

export const DiagnosticImageUpload = ({ onImageUpload }: DiagnosticImageUploadProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">{t("diagnostic.imageUpload.title")}</h3>
        <ul className="text-muted-foreground list-disc list-inside space-y-1">
          <li>{t("diagnostic.imageUpload.instructions.fullView")}</li>
          <li>{t("diagnostic.imageUpload.instructions.concernedAreas")}</li>
          <li>{t("diagnostic.imageUpload.instructions.details")}</li>
        </ul>
      </div>
      <ImageUploader onImageUpload={onImageUpload} />
    </div>
  );
};
