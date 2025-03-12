
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface DiagnosticHeaderProps {
  className?: string;
}

const DiagnosticHeader = ({ className }: DiagnosticHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col items-center justify-center py-6 px-4 text-center", className)}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-[24px] font-quicksand font-semibold tracking-tight mb-2"
        style={{ color: '#744a26' }}
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-muted-foreground max-w-md mx-auto"
      >
        {t("diagnostic.subtitle")}
      </motion.p>
    </motion.header>
  );
};

export default DiagnosticHeader;
