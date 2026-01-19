
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
  {
    id: '1',
    name: 'Soneva Jani',
    slug: 'soneva-jani-luxury-overwater-villas',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'The ultimate overwater playground featuring villas with private slides into the lagoon.',
    description: 'Soneva Jani is a sanctuary of sustainable luxury. Each villa opens to its own stretch of lagoon and comes with a private pool and a retractable roof to stargaze from the master bedroom.',
    images: ['https://picsum.photos/id/1015/800/600', 'https://picsum.photos/id/1016/800/600'],
    features: ['Retractable Roof', 'Water Slides', 'Private Pools', 'Outdoor Cinema'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.HALF_BOARD, MealPlan.ALL_INCLUSIVE],
    uvp: 'The only resort in the Maldives with retractable roofs for stargazing and private slides in every villa.',
    isFeatured: true
  },
  {
    id: '2',
    name: 'LUX* South Ari Atoll',
    slug: 'lux-south-ari-atoll-eco-luxury',
    type: AccommodationType.RESORT,
    atoll: 'South Ari Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'A lighter, brighter holiday experience in one of the largest resorts in the Maldives.',
    description: 'Cycle along the jetty, dive with whale sharks, or simply relax at the LUX* Me Spa. This resort offers a spontaneous and fun-filled Maldivian experience.',
    images: ['https://picsum.photos/id/1011/800/600', 'https://picsum.photos/id/1012/800/600'],
    features: ['Whale Shark Diving', '8 Restaurants', 'Eco-friendly', 'Family Friendly'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD],
    uvp: 'Located in a Marine Protected Area, offering the best year-round whale shark sightings.',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Kaani Village & Spa',
    slug: 'kaani-village-spa-maafushi',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'Maafushi',
    priceRange: '$',
    rating: 4,
    shortDescription: 'Affordable luxury on a local island with a private pool and bikini beach access.',
    description: 'Experience the local Maldivian culture while enjoying comfortable rooms and proximity to world-class excursion points.',
    images: ['https://picsum.photos/id/1021/800/600', 'https://picsum.photos/id/1022/800/600'],
    features: ['Pool', 'Spa', 'Local Island Experience', 'Excursions'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Best value-for-money guest house on Maafushi island with a central swimming pool.',
    isFeatured: false
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'o1',
    title: 'Honeymoon Special: 40% Off',
    resortName: 'Soneva Jani',
    discount: '40% OFF',
    expiryDate: '2024-12-31',
    image: 'https://picsum.photos/id/1031/400/300',
    category: 'Honeymoon'
  },
  {
    id: 'o2',
    title: 'Early Bird 2025: Free Transfers',
    resortName: 'LUX* South Ari Atoll',
    discount: 'FREE TRANSFERS',
    expiryDate: '2025-03-31',
    image: 'https://picsum.photos/id/1032/400/300',
    category: 'Early Bird'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    title: 'Whale Shark Safari',
    description: 'Swim with the gentle giants of the ocean in the South Ari Atoll.',
    image: 'https://picsum.photos/id/1033/400/300',
    category: 'Adventure'
  },
  {
    id: 'e2',
    title: 'Sandbank Picnic',
    description: 'A private dining experience on a secluded strip of white sand.',
    image: 'https://picsum.photos/id/1035/400/300',
    category: 'Relaxation'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Ultimate Guide to Maldives Transfers',
    slug: 'guide-to-maldives-transfers',
    excerpt: 'Seaplane vs Speedboat? Learn how to navigate between the islands of the Maldives.',
    content: 'Full article content about seaplanes, domestic flights, and speedboats...',
    image: 'https://picsum.photos/id/1036/800/400',
    date: '2024-05-15',
    author: 'Travel Expert'
  },
  {
    id: 'b2',
    title: 'Resort vs. Guest House: Which is right for you?',
    slug: 'resort-vs-guest-house',
    excerpt: 'Comparing luxury private islands with budget-friendly local island stays.',
    content: 'Comparing luxury private islands with budget-friendly local island stays...',
    image: 'https://picsum.photos/id/1037/800/400',
    date: '2024-06-01',
    author: 'Budget Voyager'
  }
];
