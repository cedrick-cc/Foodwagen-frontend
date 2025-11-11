// src/components/FoodCard.tsx
'use client';

import Image from 'next/image';
import { Food } from '@/lib/types';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Base64 fallback for main image
const FALLBACK = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";

// Small fallback for restaurant logo
const LOGO_FALLBACK = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZmlsbD0iIzk5OSI+TG9nbzwvdGV4dD48L3N2Zz4=";

interface Props {
  food: Food;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FoodCard({ food, onEdit, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  // SAFE: Only check status if restaurant exists
  const isOpen = food.restaurant?.status === "Open Now";

  // SAFE URL VALIDATION
  const isValidUrl = (url?: string): boolean => {
    if (!url || url === '---' || url.trim() === '') return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const foodImage = isValidUrl(food.foodImage) ? food.foodImage : FALLBACK;

  // SAFE LOGO: Check if restaurant AND logo exist
  const logoImage = food.restaurant && isValidUrl(food.restaurant.logo)
    ? food.restaurant.logo
    : LOGO_FALLBACK;

  // SAFE RATING
  const rating = typeof food.foodRating === 'number' ? food.foodRating : 0.0;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-sm mx-auto">
      <div className="relative">
        <Image
          src={foodImage}
          alt={food.foodName}
          width={500}
          height={350}
          className="w-full h-64 object-cover"
          placeholder="blur"
          blurDataURL={FALLBACK}
        />

        {/* Price Tag */}
        <div className="absolute top-4 left-4 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-bold text-lg shadow-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
          </svg>
          ${food.price}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Restaurant Logo + Name + Rating */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-md flex-shrink-0">
              <Image
                src={logoImage}
                alt={food.restaurant?.name || "Restaurant"}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                {food.foodName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 text-sm">★★★★★</span>
                <span className="font-semibold text-gray-700 text-sm">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* 3-dot Menu */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {menuOpen && (
              <div className="absolute top-10 right-0 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 w-48">
                <button
                  onClick={() => { onEdit(); setMenuOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-gray-700 w-full text-left"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => { onDelete(); setMenuOpen(false); }}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left border-t"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-5">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>
    </article>
  );
}