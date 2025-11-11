// src/lib/api.ts
import axios from 'axios';
import type { Food } from './types';

const BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io';

const normalizeFood = (item: any): Food => ({
  id: item.id,
  foodName: item.food_name || item.name || "Unknown Meal",
  foodRating: Number(item.food_rating || item.rating || 0),
  foodImage: item.food_image || item.image || item.avatar || "https://via.placeholder.com/400x300?text=No+Image",
  price: String(item.price || item.Price || "0.00"),
  restaurant: item.restaurant_name || item.restaurant_logo
    ? {
        name: item.restaurant_name || item.name || "Unknown Restaurant",
        logo: item.restaurant_image || item.restaurant_logo || item.logo || "https://via.placeholder.com/40",
        status: (item.restaurant_status || item.status || "Closed") === "Open Now" || item.open
          ? "Open Now"
          : "Closed",
      }
    : undefined,
});

export const foodApi = {
  getAll: async (): Promise<Food[]> => {
    const res = await axios.get(`${BASE_URL}/Food`);
    return res.data.map(normalizeFood);
  },

  create: async (data: Omit<Food, 'id'>): Promise<Food> => {
    const res = await axios.post(`${BASE_URL}/Food`, {
      food_name: data.foodName,
      food_rating: data.foodRating,
      food_image: data.foodImage,
      price: data.price,
      restaurant_name: data.restaurant?.name,
      restaurant_image: data.restaurant?.logo,
      restaurant_status: data.restaurant?.status,
    });
    return normalizeFood(res.data);
  },

  update: async (id: string, data: Partial<Food>): Promise<Food> => {
    const res = await axios.put(`${BASE_URL}/Food/${id}`, {
      food_name: data.foodName,
      food_rating: data.foodRating,
      food_image: data.foodImage,
      price: data.price,
      restaurant_name: data.restaurant?.name,
      restaurant_image: data.restaurant?.logo,
      restaurant_status: data.restaurant?.status,
    });
    return normalizeFood(res.data);
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/Food/${id}`);
  },
};