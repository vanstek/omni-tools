import React, { createContext, useContext, useState, ReactNode } from 'react';

export type HomeLayoutType = 'compact' | 'textList';

interface HomeLayoutContextType {
  layoutType: HomeLayoutType;
  toggleLayout: () => void;
  setLayoutType: (type: HomeLayoutType) => void;
}

const HomeLayoutContext = createContext<HomeLayoutContextType | undefined>(
  undefined
);

export const HomeLayoutProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [layoutType, setLayoutType] = useState<HomeLayoutType>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('homeLayoutType');
    return (saved as HomeLayoutType) || 'compact';
  });

  const toggleLayout = () => {
    setLayoutType((prev) => {
      const newType = prev === 'compact' ? 'textList' : 'compact';
      localStorage.setItem('homeLayoutType', newType);
      return newType;
    });
  };

  const setLayout = (type: HomeLayoutType) => {
    setLayoutType(type);
    localStorage.setItem('homeLayoutType', type);
  };

  return (
    <HomeLayoutContext.Provider
      value={{ layoutType, toggleLayout, setLayoutType: setLayout }}
    >
      {children}
    </HomeLayoutContext.Provider>
  );
};

export const useHomeLayout = () => {
  const context = useContext(HomeLayoutContext);
  if (!context) {
    throw new Error('useHomeLayout must be used within a HomeLayoutProvider');
  }
  return context;
};
