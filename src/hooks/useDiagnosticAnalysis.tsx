
import { useCallback } from "react";

export const useDiagnosticAnalysis = (answers: Record<number, string | string[]>) => {
  const determineStatus = useCallback(() => {
    const containsKeywords = (value: string | string[], keywords: string[]) => {
      if (Array.isArray(value)) {
        return value.some(item => 
          keywords.some(keyword => item.toLowerCase().includes(keyword.toLowerCase()))
        );
      } else {
        return keywords.some(keyword => 
          value.toLowerCase().includes(keyword.toLowerCase())
        );
      }
    };
    
    const hasProblems = Object.values(answers).some(answer => 
      containsKeywords(answer, [
        "jaun", "tach", "fissur", "champ", "infest", "préoccupants", 
        "décolorées", "mortes", "cassées", "moisissures", "blessures", 
        "cavités", "penche", "discolored", "dead", "broken", "fungi", "mold",
        "cracks", "wounds", "cavities", "leaning", "concerning",
        "verkleurde", "dode", "gebroken", "schimmels", "scheuren", "wonden",
        "holtes", "helt", "zorgwekkende"
      ])
    );
    
    const hasSevereProblems = Object.values(answers).some(answer => 
      containsKeywords(answer, [
        "suint", "import", "Plus de 6 mois", "More than 6 months", "Meer dan 6 maanden"
      ])
    );
    
    if (hasSevereProblems) return "danger";
    if (hasProblems) return "warning";
    return "healthy";
  }, [answers]);

  return { determineStatus };
};
