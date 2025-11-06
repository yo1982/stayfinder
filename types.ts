export interface Hotel {
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  description: string;
  imageUrl: string;
}

export interface SearchFilters {
  country: string;
  city: string;
  checkIn: string;
  checkOut: string;
  priceMin: string;
  priceMax: string;
}
