// src/components/AddEditModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  food?: any;
  onSave: (data: any) => void;
}

export default function AddEditModal({ isOpen, onClose, food, onSave }: Props) {
  const [formData, setFormData] = useState({
    foodName: '',
    foodRating: 5,
    foodImage: '',
    price: '',
    restaurant: {
      name: '',
      logo: '',
      status: 'Open Now' as 'Open Now' | 'Closed',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (food && isOpen) {
      setFormData({
        foodName: food.foodName || '',
        foodRating: food.foodRating || 5,
        foodImage: food.foodImage || '',
        price: food.price || '',
        restaurant: {
          name: food.restaurant?.name || '',
          logo: food.restaurant?.logo || '',
          status: food.restaurant?.status || 'Open Now',
        },
      });
    } else if (!food && isOpen) {
      setFormData({
        foodName: '',
        foodRating: 5,
        foodImage: '',
        price: '',
        restaurant: { name: '', logo: '', status: 'Open Now' },
      });
    }
    setErrors({});
  }, [food, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.foodName.trim()) newErrors.foodName = 'Food name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with REAL blur */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-orange-500">
              {food ? 'Edit Meal' : 'Add a meal'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Food name</label>
              <input
                type="text"
                value={formData.foodName}
                onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200   text-gray-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
                placeholder="e.g. Bow Lasagna"
              />
              {errors.foodName && <p className="text-red-500 text-sm mt-2">{errors.foodName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Food rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.foodRating}
                  onChange={(e) => setFormData({ ...formData, foodRating: parseFloat(e.target.value) || 0 })}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                  placeholder="12.99"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Food image (link)</label>
              <input
                type="url"
                value={formData.foodImage}
                onChange={(e) => setFormData({ ...formData, foodImage: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                placeholder="https://..."
              />
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-bold text-lg mb-4">Restaurant Details</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.restaurant.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    restaurant: { ...formData.restaurant, name: e.target.value }
                  })}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                  placeholder="Restaurant name"
                />
                <input
                  type="url"
                  value={formData.restaurant.logo}
                  onChange={(e) => setFormData({
                    ...formData,
                    restaurant: { ...formData.restaurant, logo: e.target.value }
                  })}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                  placeholder="Restaurant logo (link)"
                />
                <select
                  value={formData.restaurant.status}
                  onChange={(e) => setFormData({
                    ...formData,
                    restaurant: { ...formData.restaurant, status: e.target.value as any }
                  })}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-gray-700 border border-gray-200"
                >
                  <option>Open Now</option>
                  <option>Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-10 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-bold hover:bg-orange-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 shadow-lg"
            >
              {food ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}