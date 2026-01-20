
export enum AccommodationType {
  RESORT = 'RESORT',
  GUEST_HOUSE = 'GUEST_HOUSE'
}

export enum TransferType {
  SEAPLANE = 'SEAPLANE',
  SPEEDBOAT = 'SPEEDBOAT',
  DOMESTIC_FLIGHT = 'DOMESTIC_FLIGHT'
}

export enum MealPlan {
  ALL_INCLUSIVE = 'ALL_INCLUSIVE',
  FULL_BOARD = 'FULL_BOARD',
  HALF_BOARD = 'HALF_BOARD',
  BED_BREAKFAST = 'BED_BREAKFAST'
}

export interface Accommodation {
  id: string;
  name: string;
  slug: string;
  type: AccommodationType;
  atoll: string;
  priceRange: string;
  rating: number;
  description: string;
  shortDescription: string;
  images: string[];
  features: string[];
  transfers: TransferType[];
  mealPlans: MealPlan[];
  uvp: string; // Unique Value Proposition
  isFeatured?: boolean;
  // New fields for detailed content
  rooms?: {
    description: string;
    highlights: string[];
    image: string;
  };
  dining?: {
    description: string;
    highlights: string[];
    image: string;
  };
}

export interface Offer {
  id: string;
  title: string;
  discount: string;
  resortName: string;
  expiryDate: string;
  image: string;
  category: 'Early Bird' | 'Last Minute' | 'Honeymoon';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Water Sports' | 'Relaxation' | 'Adventure';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
