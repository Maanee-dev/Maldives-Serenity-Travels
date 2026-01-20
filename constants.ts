
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
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
      description: 'The Chapter Two overwater villas are among the largest in the world. Crafted from sustainable woods, they feature expansive living areas, private pools, and the signature retractable roof over the master bedroom.',
      highlights: ['Retractable roof for stargazing', 'Private water slide into the ocean', 'Catamaran nets for lounging over water'],
      image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Gastronomy at Soneva Jani is a global journey. From fresh organic salads grown on the island to "So Wild" by Diana Von Cranach, a plant-based experience that reimagines raw food.',
      highlights: ['The Gathering: Three-story dining hub', 'Director’s Cut: Modern Japanese cuisine', 'So Primitive: Fire-pit cooking on the sand'],
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
    description: 'One&Only Reethi Rah offers an unrivaled level of style and sophistication. Surrounded by the crystal clear waters of the Indian Ocean, this superb all-villa resort offers a sanctuary of privacy.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['12 Pristine Beaches', 'Beach Club', 'Private Concierge', 'Overwater Yoga'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Celebrity-favorite private island with twelve distinct beaches and world-class luxury.',
    isFeatured: true,
    rooms: {
      description: 'Villas are positioned for ultimate privacy, either on the beach hidden by lush foliage or over the crystal turquoise lagoon. Each features high ceilings, oversized bathtubs, and a dedicated Villa Host.',
      highlights: ['Grand Water Sunset Villa with 20m pool', 'Private outdoor rain showers', 'Bespoke smeg mini-bars and luxury linens'],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Six world-class restaurants offer everything from organic "garden-to-table" fare at Botanica to contemporary Japanese at Tapasake, perched on the island’s edge.',
      highlights: ['Tapasake: Modern Japanese with sunset views', 'Reethi: Global flavors in a spectacular pavilion', 'The Beach Club: Chic toes-in-the-sand dining'],
      image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'conrad-rangali',
    name: 'Conrad Maldives Rangali Island',
    slug: 'conrad-maldives-rangali-island-underwater-villas',
    type: AccommodationType.RESORT,
    atoll: 'South Ari Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Dual-island concept featuring the world\'s first underwater bedroom.',
    description: 'Rangali Island is spread across two islands connected by a bridge. Home to Ithaa, the world\'s first underwater restaurant.',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'],
    features: ['The Muraka Villa', 'Ithaa Underwater Restaurant', 'Two-Island Concept'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Home to the first underwater restaurant and the first underwater villa (The Muraka).',
    isFeatured: true,
    rooms: {
      description: 'The resort is home to "THE MURAKA," a first-of-its-kind luxury residence with a master bedroom submerged over 16 feet below sea level. Other villas offer sunset views and private infinity pools.',
      highlights: ['The MURAKA underwater residence', 'Sunset Water Villas with glass-floor living areas', 'Beach Villas with outdoor garden bathrooms'],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Home to 12 world-class restaurants and bars. The crown jewel is Ithaa, the world’s first all-glass undersea restaurant, offering a truly immersive 270-degree view of marine life.',
      highlights: ['Ithaa Undersea Restaurant', 'Ufaa by Jereme Leung: Authentic Chinese', 'Cheese & Wine Bar with 101 varieties'],
      image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'adaaran-vadoo',
    name: 'Adaaran Prestige Vadoo',
    slug: 'adaaran-prestige-vadoo-luxury-water-villas',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'Award-winning water villas with glass-floor bathrooms.',
    description: 'Located at the gateway to the South Atolls, Adaaran Prestige Vadoo has its own reef teeming with vibrant aquatic flora and fauna.',
    images: ['https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200'],
    features: ['Butler Service', 'Glass Floors', 'Plunge Pools'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'The closest all-water-villa resort to Male, perfect for quick luxury escapes.',
    rooms: {
      description: 'Each of the 50 overwater villas at Vadoo features teak wood flooring, thoughtfully designed interiors, and a private plunge pool on the sun deck with direct lagoon access.',
      highlights: ['Glass-bottom bathroom floors', 'Private infinity plunge pool', '24-hour dedicated butler service'],
      image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'Savor gourmet dishes across the Farivalhu and Kithajima restaurants, focusing on fresh seafood and traditional Japanese cuisine in a romantic overwater setting.',
      highlights: ['Farivalhu Fine Dining', 'Kithajima Japanese Restaurant', 'Dhoni Bar over the reef'],
      image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'
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
      description: 'Our Super Deluxe Seaview Rooms offer panoramic views of the turquoise ocean. Designed with a modern aesthetic, each room features a private balcony to enjoy the sea breeze.',
      highlights: ['Private sea-view balconies', 'Modern minimalist interiors', 'Complimentary snorkeling gear'],
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'The rooftop restaurant serves a blend of traditional Maldivian flavors and international buffet selections, all while overlooking the bustling local beach life.',
      highlights: ['Rooftop sunset dining', 'Fresh local fish grill', 'Floating breakfast options'],
      image: 'https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=800'
    }
  },
  {
    id: 'barefoot-eco-hotel',
    name: 'The Barefoot Eco Hotel',
    slug: 'barefoot-eco-hotel-hanimaadhoo-maldives',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'Haa Alifu Atoll',
    priceRange: '$',
    rating: 4,
    shortDescription: 'Unique ecological project on a local island with a focus on conservation.',
    description: 'Authentic Maldivian experiences on a local island with a focus on conservation and community. Located in the northernmost atoll.',
    images: ['https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200'],
    features: ['Marine Biology Center', 'Private Bikini Beach', 'Yoga Retreats'],
    transfers: [TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.HALF_BOARD, MealPlan.BED_BREAKFAST],
    uvp: 'The most sustainable guest house in the Maldives with its own private beach and forest area.',
    rooms: {
      description: 'The rooms are designed using ecological materials that blend into the surrounding tropical forest and white sand dunes, offering a peaceful, low-impact stay.',
      highlights: ['Eco-friendly design & materials', 'Direct forest-to-beach paths', 'Minimalist "Slow Living" aesthetic'],
      image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800'
    },
    dining: {
      description: 'The Barefoot Restaurant focuses on fresh, seasonal ingredients sourced from the island’s local farms and sustainable fishing practices, served in a Mediterranean style.',
      highlights: ['Organic farm-to-table focus', 'Mediterranean & Maldivian fusion', 'Zero-plastic dining policy'],
      image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800'
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
