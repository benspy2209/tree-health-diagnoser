
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { setOpenAIApiKey, isApiKeySet } from "@/services/openAIService";
import { toast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
  onKeySet: () => void;
}

const ApiKeyInput = ({ onKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setOpenAIApiKey(apiKey.trim());
      toast({
        title: "Clé API enregistrée",
        description: "Votre clé API a été enregistrée avec succès pour cette session.",
      });
      onKeySet();
    } else {
      toast({
        title: "Clé API requise",
        description: "Veuillez entrer une clé API valide pour continuer.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-card border rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Configuration requise</h3>
      <p className="text-muted-foreground mb-4">
        Pour générer un diagnostic précis, veuillez entrer votre clé API OpenAI.
        Cette clé ne sera utilisée que pour cette session et ne sera pas stockée.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Votre clé API sera utilisée uniquement pour générer le diagnostic.
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-natural-leaf hover:bg-natural-leaf/90 text-white"
        >
          Continuer
        </Button>
      </form>
    </motion.div>
  );
};

export default ApiKeyInput;
