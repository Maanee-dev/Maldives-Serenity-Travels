
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
    roomTypes: [
      {
        name: '1 Bedroom Water Retreat with Slide',
        description: 'Set over two floors, the villa comes with its own private pool surrounded by ample areas for sunbathing and taking in the ocean views.',
        highlights: ['Private water slide', 'Retractable roof', 'Overwater study'],
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
        size: '411 sqm',
        capacity: '2 Adults + 2 Children'
      },
      {
        name: '2 Bedroom Water Retreat with Slide',
        description: 'An expansive overwater villa perfect for families, featuring a huge living area and two master bedrooms.',
        highlights: ['Upstairs terrace', 'Pantry and minibar', 'Direct lagoon access'],
        image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800',
        size: '610 sqm',
        capacity: '4 Adults + 2 Children'
      },
      {
        name: 'Chapter Two Island Reserve',
        description: 'Nestled in the lush jungle on the beach, these residences offer total privacy and a connection to the island nature.',
        highlights: ['Private beach access', 'Sustainable wood design', 'Sunken dining area'],
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
        size: '555 sqm',
        capacity: '4 Adults'
      }
    ],
    diningVenues: [
      {
        name: 'The Gathering',
        cuisine: 'International & Fusion',
        description: 'The heart of the resort, this three-story overwater structure houses several dining outlets under one roof.',
        highlights: ['Freshly caught seafood', 'Organic garden produce', 'Open kitchen concept'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        vibe: 'Signature Social Hub'
      },
      {
        name: 'Director’s Cut',
        cuisine: 'Modern Japanese',
        description: 'Enjoy a bespoke menu of sashimi and nigiri while watching classics at the overwater silent cinema.',
        highlights: ['Cinema Paradiso views', 'Hand-crafted rolls', 'Aged sake selection'],
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
        vibe: 'Exotic & Cinematic'
      },
      {
        name: 'So Wild by Diana Von Cranach',
        cuisine: 'Plant-based Raw Food',
        description: 'A fully raw and vegan menu that explores the diverse flavors of the Indonesian archipelago.',
        highlights: ['Garden-to-table', 'Nutrient-rich preparations', 'Herbal tonics'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800',
        vibe: 'Eco-Conscious Wellness'
      }
    ]
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
    roomTypes: [
      {
        name: 'Beach Villa with Pool',
        description: 'Positioned on the beach and hidden by lush tropical foliage, these villas offer total seclusion with private access to the white sands.',
        highlights: ['Private beach access', 'Infinity pool', 'Outdoor stone bathtub'],
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
        size: '165 sqm',
        capacity: '2 Adults + 1 Child'
      },
      {
        name: 'Water Villa',
        description: 'Perched over the crystal turquoise lagoon, featuring nets for lounging and direct steps into the water.',
        highlights: ['Overwater hammocks', 'Sunset views', 'Bespoke smeg mini-bars'],
        image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800',
        size: '149 sqm',
        capacity: '2 Adults'
      },
      {
        name: 'Grand Sunset Residence',
        description: 'The ultimate in island living. Three separate bedrooms and a 50m private beach strip.',
        highlights: ['20m swimming pool', 'Personal villa host', 'Outdoor cinema'],
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
        size: '457 sqm',
        capacity: '6 Adults'
      }
    ],
    diningVenues: [
      {
        name: 'Botanica',
        cuisine: 'Garden-to-table',
        description: 'Dine in an enchanted garden where fresh organic ingredients are celebrated in their natural form.',
        highlights: ['Al fresco dining', 'Organic farm focus', 'Signature botanical cocktails'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        vibe: 'Rustic Elegance'
      },
      {
        name: 'Tapasake',
        cuisine: 'Modern Japanese',
        description: 'Perched over the water, this venue combines modern Japanese flavors with a sophisticated tapas-style concept.',
        highlights: ['Sunset views', 'Teppanyaki stations', 'World-class sake cellar'],
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
        vibe: 'Chic & Vibrant'
      },
      {
        name: 'Reethi',
        cuisine: 'International',
        description: 'Split into three distinct areas: Earth, Fire, and Aqua, offering a theatrical culinary experience.',
        highlights: ['Vaulted ceilings', 'Italian, French & Asian flavors', 'Extensive breakfast buffet'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800',
        vibe: 'Grand Gastronomy'
      }
    ]
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
    roomTypes: [
      {
        name: 'Ocean Pool Villa',
        description: 'The signature circular villa design with floor-to-ceiling glass doors and an infinity pool that merges with the horizon.',
        highlights: ['Curved architectural lines', 'Solar-powered heating', 'Integrated Aris Meeha service'],
        image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800',
        size: '150 sqm',
        capacity: '3 Adults'
      }
    ],
    diningVenues: [
      {
        name: 'Summer Pavilion',
        cuisine: 'Modern Cantonese',
        description: 'Inspired by the Michelin-starred Singapore original, offering a contemporary take on Cantonese classics.',
        highlights: ['Overwater setting', 'Signature roast duck', 'Bespoke tea pairings'],
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
        vibe: 'Refined Luxury'
      }
    ]
  },
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
    roomTypes: [
      {
        name: 'Overwater Sunset Pool Villa',
        description: 'Featuring glass-bottom bathtubs and overwater hammocks, these villas are designed for ultimate relaxation.',
        highlights: ['Glass floor viewing panels', 'Infinity pool', '24-hour host service'],
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
        size: '259 sqm',
        capacity: '2 Adults + 2 Children'
      }
    ],
    diningVenues: [
      {
        name: 'SEA',
        cuisine: 'Fine Dining & Wine Cellar',
        description: 'One of the few underwater restaurants in the world, featuring a mirror-glass interior that reflects the coral life.',
        highlights: ['Underwater wine cellar', '360-degree marine views', 'Gourmet degustation menu'],
        image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800',
        vibe: 'Surreal & Immersive'
      }
    ]
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
    roomTypes: [
      {
        name: 'Sunset Beach Villa',
        description: 'Step directly onto the sand from your private terrace, located on the best side of the island for sunset views.',
        highlights: ['Direct beach access', 'Outdoor garden shower', 'Spacious sun deck'],
        image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800',
        size: '125 sqm',
        capacity: '2 Adults + 2 Children'
      }
    ],
    diningVenues: [
      {
        name: 'Fushi Café',
        cuisine: 'International Buffet',
        description: 'A bountiful spread of international flavors for breakfast and theme nights by the lagoon.',
        highlights: ['Toes-in-sand dining', 'Live cooking stations', 'Family friendly'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
        vibe: 'Casual Beachfront'
      }
    ]
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
    roomTypes: [
      {
        name: 'Super Deluxe Seaview Room',
        description: 'Modern and minimalist rooms with a private balcony overlooking the turquoise waters of Maafushi.',
        highlights: ['Sea views', 'Balcony', 'King size bed'],
        image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800',
        size: '32 sqm',
        capacity: '2 Adults'
      }
    ],
    diningVenues: [
      {
        name: 'Seaview Restaurant',
        cuisine: 'Maldivian & International',
        description: 'Dine with a view of the Indian Ocean, featuring fresh local fish and international favorites.',
        highlights: ['Rooftop setting', 'Fresh fruit juices', 'Buffet dinners'],
        image: 'https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=800',
        vibe: 'Bustling Local Charm'
      }
    ]
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
