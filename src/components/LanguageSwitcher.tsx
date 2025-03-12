
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";

interface LanguageOption {
  value: "fr" | "en" | "nl";
  label: string;
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: LanguageOption[] = [
    { value: "fr", label: "FR" },
    { value: "en", label: "EN" },
    { value: "nl", label: "NL" },
  ];

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.value}
          onClick={() => setLanguage(lang.value)}
          variant={language === lang.value ? "default" : "outline"}
          size="sm"
          className={`px-3 min-w-11 ${
            language === lang.value 
              ? "bg-natural-leaf text-white" 
              : "text-natural-leaf border-natural-leaf border"
          }`}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}
