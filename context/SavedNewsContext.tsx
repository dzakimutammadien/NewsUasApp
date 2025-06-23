import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SavedNewsContext = createContext<{
  saved: any[];
  add: (a: any) => void;
  remove: (url: string) => void;
}>({
  saved: [],
  add: () => {},
  remove: () => {},
});

export const SavedNewsProvider = ({ children }: PropsWithChildren) => {
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('saved').then((s) => {
      if (s) setSaved(JSON.parse(s));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('saved', JSON.stringify(saved));
  }, [saved]);

  const add = (article: any) => {
    setSaved((prev) => {
      if (prev.find((a) => a.url === article.url)) return prev;
      return [...prev, article];
    });
  };

  const remove = (url: string) => {
    setSaved((prev) => prev.filter((a) => a.url !== url));
  };

  return (
    <SavedNewsContext.Provider value={{ saved, add, remove }}>
      {children}
    </SavedNewsContext.Provider>
  );
};
