import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '../i18n/en';
import bn from '../i18n/bn';

const translations = { en, bn };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key] || key, [lang]);
  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'bn' : 'en');

  return (
    <LanguageContext.Provider value={{ t, lang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be within LanguageProvider');
  return ctx;
};
