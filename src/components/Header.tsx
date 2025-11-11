// src/components/Header.tsx
'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';

export default function Header({ onAddMeal }: { onAddMeal: () => void }) {
  return (
    <header className="bg-white text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="">
            <Image
              src="/logo.png"
              alt="FoodWagen Logo"
              width={150}
              height={48}
              className="rounded-full"
            />
          </div>
        </div>
        <button
          onClick={onAddMeal}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 cursor-pointer text-white-600 px-8 py-4 rounded-md font-bold hover:bg-yellow-500 transition flex items-center gap-3 shadow-lg text-sm"
        >
          Add Meal
        </button>
      </div>
    </header>
  );
}