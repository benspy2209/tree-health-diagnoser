
import { useState, useEffect, ReactNode } from 'react';
import { LanguageContext, Language } from './LanguageContext';
import fr from './locales/fr.json';
import en from './locales/en.json';
import nl from './locales/nl.json';

const translations = { fr, en, nl };

interface LanguageProviderProps {
  children: ReactNode;
}

const getInitialLanguage = (): Language => {
  // Vérifier d'abord le paramètre d'URL
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as Language;
  if (langParam && ['fr', 'en', 'nl'].includes(langParam)) {
    return langParam;
  }

  // Vérifier ensuite le localStorage
  const savedLang = localStorage.getItem('language') as Language;
  if (savedLang && ['fr', 'en', 'nl'].includes(savedLang)) {
    return savedLang;
  }

  // Par défaut, utiliser le français
  return 'fr';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Mise à jour du localStorage
    localStorage.setItem('language', language);
    
    // Mise à jour du paramètre d'URL sans recharger la page
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url.toString());
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
