
import { motion } from "framer-motion";
import DiagnosticContainer from "@/components/DiagnosticContainer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-natural-light"
    >
      <main className="flex-1 py-8 px-4">
        <DiagnosticContainer />
      </main>
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="py-4 px-6 text-center text-sm text-muted-foreground"
      >
        <p>© 2023 Diagnostic de Santé des Arbres - Tous droits réservés</p>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
