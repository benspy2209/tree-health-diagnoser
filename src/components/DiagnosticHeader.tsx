
import { motion } from "framer-motion";
import { TreeDeciduous } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosticHeaderProps {
  className?: string;
}

const DiagnosticHeader = ({ className }: DiagnosticHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col items-center justify-center py-6 px-4 text-center", className)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-4"
      >
        <TreeDeciduous size={48} className="text-natural-leaf" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold tracking-tight mb-2"
      >
        Diagnostic de Santé des Arbres
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-muted-foreground max-w-md mx-auto"
      >
        Analysez l'état de santé de vos arbres grâce à notre outil de diagnostic intelligent
      </motion.p>
    </motion.header>
  );
};

export default DiagnosticHeader;
