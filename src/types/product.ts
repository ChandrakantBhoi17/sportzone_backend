export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  material: 'Nike' | 'Adidas' | 'Puma' | 'Under Armour';
  category: 'Running' | 'Basketball' | 'Football' | 'Tennis' | 'Swimming' | 'Gym' | 'Cycling';
  weight: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  dailyWear?: boolean;
}

