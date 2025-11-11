// src/components/DeleteModal.tsx
'use client';

import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* BACKDROP WITH REAL BLUR — 100% WORKING */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-orange-500">Delete Meal</h2>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Are you sure you want to delete this meal? 
          <span className="block mt-2 text-gray-700 font-medium">
            Actions cannot be reversed.
          </span>
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-10 py-4 border-2 border-orange-500 text-orange-500 rounded-full font-bold text-lg hover:bg-orange-50 transition-all hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-10 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}