// src/lib/types.ts
export type RestaurantStatus = "Open Now" | "Closed";

export interface Restaurant {
  name: string;
  logo: string;
  status: RestaurantStatus;
}

export interface Food {
  id: string;
  foodName: string;
  foodRating: number;
  foodImage: string;
  price: string;
  restaurant?: Restaurant;
}