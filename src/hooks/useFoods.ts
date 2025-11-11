// src/hooks/useFoods.ts
import { useState, useEffect, useCallback } from 'react';
import { foodApi } from '@/lib/api';
import type { Food } from '@/lib/types';
import toast from 'react-hot-toast';

export function useFoods() {
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all foods on component mount
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await foodApi.getAll();
        setAllFoods(data);
        setFilteredFoods(data); // Initially show all foods
        console.log('Fetched foods:', data.length);
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'Failed to load meals';
        setError(message);
        toast.error(message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Apply search filter whenever searchQuery or allFoods changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      // No search query, show all foods
      setFilteredFoods([...allFoods]);
      return;
    }

    // Filter foods based on search query
    const query = searchQuery.toLowerCase().trim();
    const filtered = allFoods.filter(food => {
      const nameMatch = food.foodName?.toLowerCase().includes(query);
      const restaurantMatch = food.restaurant?.name?.toLowerCase().includes(query);
      return nameMatch || restaurantMatch;
    });
    
    setFilteredFoods(filtered);
  }, [searchQuery, allFoods]);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const addFood = async (food: Omit<Food, 'id'>) => {
    try {
      const newFood = await foodApi.create(food);
      setAllFoods(prev => [...prev, newFood]);
      // The useEffect will automatically update filteredFoods
      toast.success('Meal added successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add meal');
      throw err;
    }
  };

  const updateFood = async (id: string, updates: Partial<Food>) => {
    try {
      const updated = await foodApi.update(id, updates);
      setAllFoods(prev => prev.map(f => f.id === id ? updated : f));
      // The useEffect will automatically update filteredFoods
      toast.success('Meal updated!');
    } catch (err: any) {
      toast.error('Failed to update meal');
      throw err;
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await foodApi.delete(id);
      setAllFoods(prev => prev.filter(f => f.id !== id));
      // The useEffect will automatically update filteredFoods
      toast.success('Meal deleted');
    } catch (err: any) {
      toast.error('Failed to delete meal');
      throw err;
    }
  };

  return {
    foods: filteredFoods, // This is what the grid should display
    allFoods, // For debugging
    loading,
    error,
    searchQuery,
    search,
    addFood,
    updateFood,
    deleteFood,
    refetch: () => window.location.reload(), // Simple reload for now
  };
}