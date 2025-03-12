
import { useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageContext, Language } from './LanguageContext';
import fr from './locales/fr.json';
import en from './locales/en.json';
import nl from './locales/nl.json';

const translations = { fr, en, nl };

interface LanguageProviderProps {
  children: ReactNode;
}

const getInitialLanguage = (): Language => {
  // Extraction de la langue depuis le path de l'URL
  const path = window.location.pathname;
  const pathSegments = path.split('/').filter(segment => segment.length > 0);
  
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0].toLowerCase();
    if (['fr', 'en', 'nl'].includes(firstSegment)) {
      return firstSegment as Language;
    }
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
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Mise à jour du localStorage
    localStorage.setItem('language', language);
    
    // Mise à jour du path d'URL sans recharger la page
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment.length > 0);
    
    // Si le premier segment est une langue connue, le retirer pour obtenir le reste du chemin
    let restOfPath = '';
    if (pathSegments.length > 0 && ['fr', 'en', 'nl'].includes(pathSegments[0])) {
      restOfPath = '/' + pathSegments.slice(1).join('/');
    } else {
      // Si pas de préfixe de langue, utiliser le chemin actuel
      restOfPath = pathname;
    }
    
    // Si la langue est le français et que nous n'avons pas déjà de préfixe /fr/
    if (language === 'fr' && !pathname.startsWith('/fr/')) {
      // Pour le français, on peut garder l'URL sans préfixe de langue
      if (pathname.startsWith('/en/') || pathname.startsWith('/nl/')) {
        // Si l'URL a déjà un préfixe de langue, le retirer
        navigate(restOfPath, { replace: true });
      }
      // Sinon, laisser l'URL telle quelle
    } else if (language !== 'fr' && !pathname.startsWith(`/${language}/`)) {
      // Pour les autres langues, toujours ajouter le préfixe
      navigate(`/${language}${restOfPath}`, { replace: true });
    }
  }, [language, location, navigate]);
  
  // Effet supplémentaire pour synchroniser l'état de la langue avec l'URL actuelle
  useEffect(() => {
    const path = location.pathname;
    const pathSegments = path.split('/').filter(segment => segment.length > 0);
    
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0].toLowerCase();
      if (['en', 'nl'].includes(firstSegment) && language !== firstSegment) {
        // Si l'URL a un préfixe de langue différent de l'état actuel
        setLanguage(firstSegment as Language);
      } else if (!['fr', 'en', 'nl'].includes(firstSegment) && language !== 'fr') {
        // Si l'URL n'a pas de préfixe de langue et la langue n'est pas le français
        setLanguage('fr');
      }
    } else if (language !== 'fr') {
      // Si le chemin est vide (racine) et la langue n'est pas le français
      setLanguage('fr');
    }
  }, [location, language]);
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  };
  
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
