'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFoods } from '@/hooks/useFoods';
import type { Food } from '@/lib/types';

interface FoodsContextType {
  foods: Food[];
  allFoods: Food[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  search: (query: string) => void;
  addFood: (food: Omit<Food, 'id'>) => Promise<void>;
  updateFood: (id: string, updates: Partial<Food>) => Promise<void>;
  deleteFood: (id: string) => Promise<void>;
  refetch: () => void;
}

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: ReactNode }) {
  const foodsData = useFoods();

  return (
    <FoodsContext.Provider value={foodsData}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoodsContext() {
  const context = useContext(FoodsContext);
  if (context === undefined) {
    throw new Error('useFoodsContext must be used within a FoodsProvider');
  }
  return context;
}

