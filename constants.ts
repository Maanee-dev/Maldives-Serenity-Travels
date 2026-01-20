
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
  // --- ULTRA LUXURY SIGNATURES ---
  {
    id: 'soneva-jani',
    name: 'Soneva Jani',
    slug: 'soneva-jani-luxury-overwater-villas',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Iconic overwater villas with private slides into the lagoon.',
    description: 'Soneva Jani is a sanctuary of sustainable luxury. Each villa opens to its own stretch of lagoon and comes with a private pool and a retractable roof to stargaze from the master bedroom.',
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Retractable Roof', 'Water Slides', 'Private Pools', 'Outdoor Cinema'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.HALF_BOARD, MealPlan.ALL_INCLUSIVE],
    uvp: 'The only resort in the Maldives with retractable roofs for stargazing and private slides in every villa.',
    isFeatured: true,
    rooms: {
      description: 'The Chapter Two overwater villas are architectural marvels. Crafted from sustainable woods, they feature expansive living areas and the signature retractable roof.',
      highlights: ['Retractable roof for stargazing', 'Private water slide into the ocean', 'Catamaran nets for lounging'],
      image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'A global culinary journey from organic salads grown on-island to high-end Japanese fare at Director’s Cut.',
      highlights: ['The Gathering: Overwater dining hub', 'So Wild: Plant-based reimagining', 'Cinema Paradiso: Dining with stars'],
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'one-only-reethi-rah',
    name: 'One&Only Reethi Rah',
    slug: 'one-and-only-reethi-rah-maldives-luxury',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Ultra-luxury private island with twelve pristine beaches.',
    description: 'A playground for the elite, offering twelve distinct beaches and an unrivaled level of privacy and style.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['12 Pristine Beaches', 'Beach Club', 'Private Concierge', 'Overwater Yoga'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Celebrity-favorite private island with twelve distinct beaches and world-class luxury.',
    isFeatured: true,
    rooms: {
      description: 'The Beach Villas are secluded by lush foliage, while Water Villas offer direct access to the turquoise lagoon.',
      highlights: ['Grand Sunset Residences', 'Private beach cabanas', 'Hammocks over the reef'],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Culinary brilliance ranging from contemporary Japanese at Tapasake to organic garden dining at Botanica.',
      highlights: ['Tapasake: Modern Japanese', 'Botanica: Garden-to-table', 'Reethi: Global fusion pavilion'],
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'ritz-carlton-maldives',
    name: 'The Ritz-Carlton Maldives, Fari Islands',
    slug: 'the-ritz-carlton-maldives-fari-islands',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Architectural masterpiece with a minimalist, circular design.',
    description: 'Set within the integrated Fari Islands development, this resort offers a modern take on Maldivian luxury.',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'],
    features: ['Circular Villas', 'Aris Meeha Butler', 'Fari Marina Access'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Iconic circular architecture and access to the vibrant Fari Marina beach club.',
    rooms: {
      description: 'The villas feature a unique circular design that blends indoor and outdoor spaces seamlessly.',
      highlights: ['100% solar powered villas', 'Private infinity pools', 'Circular glass doors with 270-degree views'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Seven dining venues, including the Michelin-starred Summer Pavilion for exquisite Cantonese cuisine.',
      highlights: ['Summer Pavilion: Cantonese fine dining', 'Iwau: Chef’s table Teppanyaki', 'Beach Shack: Mediterranean vibes'],
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800'
    }
  },
  // --- ANANTARA COLLECTION ---
  {
    id: 'anantara-kihavah',
    name: 'Anantara Kihavah Maldives Villas',
    slug: 'anantara-kihavah-maldives-villas',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Home to the iconic underwater restaurant and sky observatory.',
    description: 'Voted the most Instagrammable resort in the world, Kihavah offers the ultimate luxury escape in the UNESCO Biosphere Baa Atoll.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['Underwater Dining', 'Overwater Observatory', 'Glass Bottom Tubs'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Dine five meters below the sea or stargaze from the only overwater observatory in the Maldives.',
    rooms: {
      description: 'The beach and water villas are incredibly spacious, each featuring a private infinity pool and glass-bottom bathtubs.',
      highlights: ['Private villa pools', 'Bespoke pillow menus', 'Indoor and outdoor rain showers'],
      image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'The award-winning SEA underwater restaurant offers a truly immersive 360-degree view of marine life.',
      highlights: ['SEA: Underwater wine cellar & restaurant', 'FIRE: Teppanyaki under the stars', 'SKY: Overwater observatory bar'],
      image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'anantara-dhigu',
    name: 'Anantara Dhigu Maldives Resort',
    slug: 'anantara-dhigu-maldives-resort',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'Family-friendly luxury in a shallow turquoise lagoon.',
    description: 'Anantara Dhigu offers an idyllic island escape for families and couples, with a wide range of water sports and spa treatments.',
    images: ['https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200'],
    features: ['Kids Club', 'Overwater Spa', 'Surf School'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'The ultimate family playground with a dedicated surf school and overwater spa.',
    rooms: {
      description: 'Elegantly designed villas with direct beach or lagoon access, perfect for families needing extra space.',
      highlights: ['Family Beach Villas', 'Overwater Suites', 'Outdoor garden bathrooms'],
      image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Fushi Café serves a bountiful breakfast while Sea.Fire.Salt. offers freshly caught seafood and grilled meats.',
      highlights: ['Sea.Fire.Salt.: Overwater grill', 'Fushi Café: International buffet', 'Aqua Bar: Poolside cocktails'],
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'kaani-grand-maafushi',
    name: 'Kaani Grand Seaview',
    slug: 'kaani-grand-seaview-maafushi-guest-house',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'South Male Atoll',
    priceRange: '$',
    rating: 4,
    shortDescription: 'Premier beachside guest house in the heart of Maafushi local island.',
    description: 'Experience the real Maldives. Kaani Grand Seaview offers premium accommodation directly facing the bikini beach of Maafushi.',
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200'],
    features: ['Bikini Beach Access', 'Rooftop Dining', 'Daily Excursions'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'The most popular high-end stay on Maafushi local island with resort-style amenities.',
    rooms: {
      description: 'Our Super Deluxe Seaview Rooms offer panoramic views of the turquoise ocean. Designed with a modern aesthetic, each room features a private balcony.',
      highlights: ['Private sea-view balconies', 'Modern minimalist interiors', 'Complimentary snorkeling gear'],
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'The rooftop restaurant serves a blend of traditional Maldivian flavors and international buffet selections.',
      highlights: ['Rooftop sunset dining', 'Fresh local fish grill', 'Floating breakfast options'],
      image: 'https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=800'
    }
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'early-bird-2024',
    title: 'Early Bird Summer Escape',
    discount: '30% OFF',
    resortName: 'Soneva Jani',
    expiryDate: '2024-08-31',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    category: 'Early Bird'
  },
  {
    id: 'honeymoon-perks',
    title: 'Honeymoon Dreams Bundle',
    discount: 'COMPLIMENTARY DINNER',
    resortName: 'One&Only Reethi Rah',
    expiryDate: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    category: 'Honeymoon'
  },
  {
    id: 'last-minute-luxury',
    title: 'Last Minute Overwater Bliss',
    discount: '40% OFF',
    resortName: 'Adaaran Prestige Vadoo',
    expiryDate: '2024-07-15',
    image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800',
    category: 'Last Minute'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'whale-shark-dive',
    title: 'Whale Shark Quest',
    description: 'Swim alongside the gentle giants of the ocean in the South Ari Atoll marine protected area.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=800',
    category: 'Adventure'
  },
  {
    id: 'sandbank-picnic',
    title: 'Private Sandbank Picnic',
    description: 'A castaway experience on a deserted strip of white sand, surrounded only by turquoise waters.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800',
    category: 'Relaxation'
  },
  {
    id: 'underwater-dining',
    title: 'Gourmet Underwater Dining',
    description: 'Dine 5 meters below the surface with 360-degree views of the coral reef.',
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    category: 'Relaxation'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'guide-to-transfers',
    title: 'The Ultimate Guide to Maldives Transfers',
    slug: 'maldives-transfer-guide-seaplane-speedboat',
    excerpt: 'Everything you need to know about getting from Velana International Airport to your island paradise.',
    content: 'Navigating the Maldives archipelago requires a mix of seaplanes, speedboats, and domestic flights. Seaplanes offer the most iconic views but only fly during daylight hours...',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    date: '2024-05-15',
    author: 'Ahmed Naseem'
  },
  {
    id: 'resort-vs-guesthouse',
    title: 'Resort vs. Guest House: Which is right for you?',
    slug: 'maldives-resort-vs-guesthouse-comparison',
    excerpt: 'Comparing the ultra-luxury private island experience with the authentic charm of local island stays.',
    content: 'While resorts offer total seclusion and luxury, guest houses on islands like Maafushi allow you to experience the local culture and save significantly on your budget...',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800',
    date: '2024-06-02',
    author: 'Sarah Jenkins'
  }
];
