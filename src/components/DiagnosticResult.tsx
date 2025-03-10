
import { motion } from "framer-motion";
import { Check, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResultStatus = "healthy" | "warning" | "danger" | "unknown";

interface DiagnosticResultProps {
  status: ResultStatus;
  title: string;
  description: string;
  recommendations: string[];
  onRestart: () => void;
  className?: string;
}

const StatusIcon = ({ status }: { status: ResultStatus }) => {
  switch (status) {
    case "healthy":
      return <Check className="h-8 w-8 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-8 w-8 text-amber-500" />;
    case "danger":
      return <AlertTriangle className="h-8 w-8 text-red-500" />;
    default:
      return <Info className="h-8 w-8 text-blue-500" />;
  }
};

const statusClasses = {
  healthy: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  danger: "bg-red-50 border-red-200 text-red-900",
  unknown: "bg-blue-50 border-blue-200 text-blue-900",
};

const DiagnosticResult = ({
  status,
  title,
  description,
  recommendations,
  onRestart,
  className,
}: DiagnosticResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-2xl mx-auto px-4", className)}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className={cn(
            "rounded-full p-4 inline-flex",
            status === "healthy" ? "bg-green-100" : "",
            status === "warning" ? "bg-amber-100" : "",
            status === "danger" ? "bg-red-100" : "",
            status === "unknown" ? "bg-blue-100" : "",
          )}>
            <StatusIcon status={status} />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-2xl font-bold mb-2"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={cn(
          "border rounded-xl p-6 mb-6",
          statusClasses[status]
        )}
      >
        <h3 className="font-semibold mb-3">Recommandations :</h3>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="flex items-start"
            >
              <Check size={16} className="mt-1 mr-2 shrink-0" />
              <span>{recommendation}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <Button onClick={onRestart} className="bg-natural-leaf hover:bg-natural-leaf/90 text-white">
          Démarrer un nouveau diagnostic
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosticResult;
