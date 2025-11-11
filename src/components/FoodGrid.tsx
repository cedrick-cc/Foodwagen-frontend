// src/components/FoodGrid.tsx
'use client';

import { useState } from 'react';
import FoodCard from './FoodCard';
import AddEditModal from './AddEditModal';
import DeleteModal from './DeleteModal';
import { useFoodsContext } from '@/contexts/FoodsContext';
import toast from 'react-hot-toast';
import Header from './Header';
import SearchBar from './SearchBar';

export default function FoodGrid() {
  const { foods, loading, error, searchQuery, addFood, updateFood, deleteFood, refetch } = useFoodsContext();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (food: any) => {
    setEditingFood(food);
    setIsAddOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const openAddModal = () => setIsAddOpen(true);

  // Better empty state messaging
  const showEmptyState = !loading && foods.length === 0;
  const isSearchResultEmpty = showEmptyState && searchQuery.trim() !== '';
  const isNoDataAtAll = showEmptyState && searchQuery.trim() === '';

  return (
    <>
      
      <Header onAddMeal={openAddModal} />
      <SearchBar />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Featured Meals</h2>
        </div>

        {error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-red-800 mb-3">Connection Failed</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button
                onClick={refetch}
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-3xl h-96 animate-pulse shadow-lg" />
            ))}
          </div>
        ) : showEmptyState ? (
          <div className="text-center py-32">
            <div className="mb-8">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto" />
            </div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">
              {isSearchResultEmpty ? 'No meals found' : 'No meals available'}
            </h3>
            <p className="text-gray-500 text-lg mb-8">
              {isSearchResultEmpty
                ? `No meals found for "${searchQuery}". Try a different search term.`
                : 'Be the first to add a delicious meal!'
              }
            </p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-yellow-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-600 transition shadow-lg flex items-center gap-3 mx-auto"
            >
              Add Your First Meal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onEdit={() => handleEdit(food)}
                onDelete={() => handleDelete(food.id)}
              />
            ))}
          </div>
        )}

        {foods.length > 0 && !loading && (
          <div className="text-center mt-16">
            <button className="bg-orange-500 text-white px-10 py-5 rounded-lg font-normal text-md hover:bg-yellow-500 transition shadow-lg">
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Modals */}
      <AddEditModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setEditingFood(null);
        }}
        food={editingFood}
        onSave={async (data) => {
          try {
            if (editingFood) {
              await updateFood(editingFood.id, data);
              toast.success('Meal updated!');
            } else {
              await addFood(data as any);
              toast.success('Meal added!');
            }
            setIsAddOpen(false);
            setEditingFood(null);
          } catch (error) {
            // Error is already handled in the hook
          }
        }}
      />


      <DeleteModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={async () => {
          if (deletingId) {
            await deleteFood(deletingId);
            setDeletingId(null);
            toast.success('Meal deleted!');
          }
        }}

      />
    </>
  );
}