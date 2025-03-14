
import { motion } from "framer-motion";
import DiagnosticContainer from "@/components/DiagnosticContainer";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-[#F3F1EB]"
    >
      <main className="flex-1 py-4 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <DiagnosticContainer />
        </div>
      </main>
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="py-4 px-6 text-center text-sm text-muted-foreground"
      >
        <p>{t('footer')}</p>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
