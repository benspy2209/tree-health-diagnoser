import { motion } from "framer-motion";
import { Check, AlertTriangle, Info, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

type ResultStatus = "healthy" | "warning" | "danger" | "unknown" | "custom";

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
    case "custom":
      return <Trees className="h-8 w-8 text-natural-leaf" />;
    default:
      return <Info className="h-8 w-8 text-blue-500" />;
  }
};

const statusClasses = {
  healthy: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  danger: "bg-red-50 border-red-200 text-red-900",
  unknown: "bg-blue-50 border-blue-200 text-blue-900",
  custom: "bg-natural-light border-natural-leaf/20 text-foreground",
};

const DiagnosticResult = ({
  status,
  title,
  description,
  recommendations,
  onRestart,
  className,
}: DiagnosticResultProps) => {
  const { t } = useLanguage();
  const isCustomDiagnostic = status === "custom";

  const formatCustomDiagnostic = (content: string) => {
    const sections: { [key: string]: JSX.Element[] } = {
      title: [],
      analysis: [],
      diagnosis: [],
      recommendations: [],
      nextSteps: [],
    };
    
    let currentSection = "title";
    
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.toLowerCase().includes(t("diagnostic.results.report.preliminary").toLowerCase())) {
        sections.title.push(<h1 key={`title-${i}`} className="text-2xl font-bold text-natural-leaf mb-4">{line}</h1>);
        currentSection = "title";
      } 
      else if (line.toLowerCase().includes(t("diagnostic.results.report.analysis").toLowerCase())) {
        sections.analysis.push(<h2 key={`analysis-${i}`} className="text-xl font-semibold text-natural-leaf mt-5 mb-3">{line}</h2>);
        currentSection = "analysis";
      } 
      else if (line.toLowerCase().includes(t("diagnostic.results.report.diagnosis").toLowerCase())) {
        sections.diagnosis.push(<h2 key={`diagnosis-${i}`} className="text-xl font-semibold text-natural-leaf mt-5 mb-3">{line}</h2>);
        currentSection = "diagnosis";
      } 
      else if (line.toLowerCase().includes(t("diagnostic.results.report.recommendations").toLowerCase())) {
        sections.recommendations.push(<h2 key={`recommendations-${i}`} className="text-xl font-semibold text-natural-leaf mt-5 mb-3">{line}</h2>);
        currentSection = "recommendations";
      } 
      else if (line.toLowerCase().includes(t("diagnostic.results.report.nextSteps").toLowerCase())) {
        sections.nextSteps.push(<h2 key={`nextSteps-${i}`} className="text-xl font-semibold text-natural-leaf mt-5 mb-3">{line}</h2>);
        currentSection = "nextSteps";
      } 
      else {
        if (currentSection === "diagnosis" || currentSection === "recommendations") {
          if (line.startsWith('*') || line.startsWith('-') || /^\d+\./.test(line)) {
            const bulletContentMatch = line.match(/^(?:\*|\-|\d+\.)\s*(?:\*\*)?([^:]*?)(?:\*\*)?:?(.*)/);
            
            if (bulletContentMatch) {
              const [, bulletTitle, bulletContent] = bulletContentMatch;
              
              sections[currentSection].push(
                <div key={`bullet-${i}`} className="flex items-start mb-4">
                  <div className="h-5 w-5 rounded-full bg-natural-leaf/20 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-natural-leaf"></div>
                  </div>
                  <div>
                    <span className="font-medium text-natural-leaf">{bulletTitle.trim()}</span>
                    <span>{bulletContent || ""}</span>
                  </div>
                </div>
              );
            } else {
              sections[currentSection].push(
                <div key={`bullet-${i}`} className="flex items-start mb-4">
                  <div className="h-5 w-5 rounded-full bg-natural-leaf/20 flex items-center justify-center mt-1 mr-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-natural-leaf"></div>
                  </div>
                  <div>{line.replace(/^(?:\*|\-|\d+\.)\s*/, '')}</div>
                </div>
              );
            }
          } else {
            sections[currentSection].push(<p key={`p-${i}`} className="mb-3 text-gray-700">{line}</p>);
          }
        } else {
          if (line.includes("info@plumridge.be")) {
            const parts = line.split(/(info@plumridge\.be)/);
            sections[currentSection].push(
              <p key={`p-${i}`} className="mb-3 text-gray-700">
                {parts.map((part, idx) => 
                  part === "info@plumridge.be" 
                    ? <a key={`mail-${idx}`} href="mailto:info@plumridge.be" className="text-natural-leaf hover:underline">{part}</a>
                    : part
                )}
              </p>
            );
          } else {
            sections[currentSection].push(<p key={`p-${i}`} className="mb-3 text-gray-700">{line}</p>);
          }
        }
      }
    }

    return (
      <div className="diagnostic-content space-y-2">
        {sections.title}
        <div className="space-y-1">
          {sections.analysis}
        </div>
        <div className="space-y-1">
          {sections.diagnosis}
        </div>
        <div className="space-y-1">
          {sections.recommendations}
        </div>
        <div className="space-y-1 mt-6 pt-4 border-t border-natural-leaf/10">
          {sections.nextSteps}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-4xl mx-auto px-4", className)}
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
            status === "custom" ? "bg-natural-light" : "",
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
        
        {!isCustomDiagnostic && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground"
          >
            {description}
          </motion.p>
        )}
      </div>

      {isCustomDiagnostic ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border rounded-xl p-6 mb-6 bg-white shadow-sm text-left"
        >
          {formatCustomDiagnostic(description)}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={cn(
            "border rounded-xl p-6 mb-6",
            statusClasses[status]
          )}
        >
          <h3 className="font-semibold mb-3">{t("diagnostic.results.recommendations")}:</h3>
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
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex justify-center mt-8"
      >
        <Button 
          onClick={onRestart} 
          className="bg-natural-leaf hover:bg-natural-leaf/90 text-white"
        >
          {t("diagnostic.buttons.newDiagnostic")}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosticResult;
