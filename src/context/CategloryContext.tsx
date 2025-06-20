'use client'; // ต้องใช้เพราะมี useState/useEffect

import { createContext, useContext, useState, ReactNode } from 'react';

export type Categlory = {
  id: number;
  name: string;
//   image: string; // หรือ StaticImageData ถ้าใช้กับ next/image
};

type CategloryContextType = {
  categlories: Categlory[];
  setCateglories: (categlories: Categlory[]) => void;
};

const CategloryContext = createContext<CategloryContextType | undefined>(undefined);

export const CategloryProvider = ({ children }: { children: ReactNode }) => {
  const [categlories, setCateglories] = useState<Categlory[]>([]);

  return (
    <CategloryContext.Provider value={{ categlories, setCateglories }}>
      {children}
    </CategloryContext.Provider>
  );
};

export const useCateglory = () => {
  const context = useContext(CategloryContext);
  if (!context) throw new Error('useCateglory must be used within a CategloryProvider');
  return context;
};
