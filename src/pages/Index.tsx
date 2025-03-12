
import { motion } from "framer-motion";
import DiagnosticContainer from "@/components/DiagnosticContainer";
import IframeViewer from "@/components/IframeViewer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-natural-light"
    >
      <main className="flex-1 py-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-8">Diagnostic de Santé des Arbres</h1>
        
        <div className="w-full max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Application intégrée</h2>
          <IframeViewer 
            url="https://diagnostic.plumridge.be/" 
            title="Diagnostic de Santé des Arbres" 
          />
        </div>
        
        <div className="border-t border-border pt-8 mt-8">
          <h2 className="text-xl font-semibold mb-4">Version locale</h2>
          <DiagnosticContainer />
        </div>
      </main>
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="py-4 px-6 text-center text-sm text-muted-foreground"
      >
        <p>© 2025 Diagnostic de Santé des Arbres - Tous droits réservés</p>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
