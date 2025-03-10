
import { motion } from "framer-motion";
import { TreeDeciduousBinary } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyzingStateProps {
  className?: string;
}

const AnalyzingState = ({ className }: AnalyzingStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full py-16 flex flex-col items-center justify-center", className)}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="relative mb-8"
      >
        <TreeDeciduousBinary size={64} className="text-natural-leaf" />
        
        {/* Éléments pulsants autour de l'icône */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-natural-leaf/20"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-natural-leaf/10"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
        />
      </motion.div>
      
      <motion.h2
        className="text-2xl font-semibold mb-3 text-center"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Analyse en cours...
      </motion.h2>
      
      <motion.p
        className="text-muted-foreground text-center max-w-md"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        Nous analysons vos réponses et les images téléchargées pour établir un diagnostic précis
      </motion.p>
      
      {/* Indicateur de progression */}
      <motion.div
        className="w-60 h-1 bg-muted rounded-full mt-6 overflow-hidden"
      >
        <motion.div
          className="h-full bg-natural-leaf rounded-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AnalyzingState;
