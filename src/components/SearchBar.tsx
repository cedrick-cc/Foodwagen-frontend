// src/components/SearchBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFoods } from '@/hooks/useFoods';
import { Search, Bike, Lock } from 'lucide-react';

export default function SearchBar() {
  const { search, searchQuery } = useFoods();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');

  // Sync with the hook's searchQuery
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Debounced search
  useEffect(() => {
    console.log('Local query changed:', localQuery);
    console.log('Current search query in SearchBar:', searchQuery);
    
    const timer = setTimeout(() => {
      if (localQuery !== searchQuery) {
        console.log('Triggering search with:', localQuery);
        search(localQuery);
      } else {
        console.log('Search query unchanged, skipping search');
      }
    }, 300);
    
    return () => {
      console.log('Clearing search timeout');
      clearTimeout(timer);
    };
  }, [localQuery, searchQuery, search]);
  
  // Force a re-render when searchQuery changes
  useEffect(() => {
    console.log('Search query prop changed in SearchBar:', searchQuery);
    // This will force the component to re-render when the searchQuery prop changes
  }, [searchQuery]);

  const handleFindMeal = () => {
    console.log('Find meal clicked with:', localQuery);
    search(localQuery);
  };

  return (
    <section className="bg-gradient-to-br from-orange-400 to-yellow-400 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* LEFT: Text + Search */}
          <div className="order-2 lg:order-1 z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-none text-center lg:text-left">
              Are you starving?
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
              <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
                <button
                  onClick={() => setDeliveryMode('delivery')}
                  className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-lg font-bold transition-all text-sm md:text-base ${
                    deliveryMode === 'delivery'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Bike className="w-5 h-5" />
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryMode('pickup')}
                  className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-lg font-bold transition-all text-sm md:text-base ${
                    deliveryMode === 'pickup'
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  Pickup
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-gray-50 rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-4 flex-1">
                  <Search className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="What do you like to eat today?"
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="flex-1 outline-none text-gray-800 text-base md:text-lg font-medium placeholder-gray-400"
                  />
                </div>
                <button
                  onClick={handleFindMeal}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:from-orange-500 hover:to-red-500 transition shadow-lg whitespace-nowrap"
                >
                  Find Meal
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Noodle Bowl */}
          <div className="order-1 lg:order-2 relative h-96 lg:h-full">
            <div className="absolute bottom-0 right-0 left-0 lg:left-auto lg:right-[-10%]">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-150 translate-y-20"></div>
                <img
                  src="/noodle_bowl.png"
                  alt="Delicious noodles"
                  className="relative w-full max-w-md mx-auto lg:mx-0 lg:max-w-none lg:w-auto h-auto rounded-3xl shadow-2xl object-cover object-bottom"
                  style={{
                    maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}