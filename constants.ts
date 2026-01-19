import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
  // --- ULTRA LUXURY & SIGNATURE ---
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
    isFeatured: true
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
    isFeatured: true
  },
  {
    id: 'waldorf-astoria-ithaafushi',
    name: 'Waldorf Astoria Maldives Ithaafushi',
    slug: 'waldorf-astoria-ithaafushi-luxury-resort',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Spanning across three private islands with 11 unique dining venues.',
    description: 'Escape to a world of luxury at Waldorf Astoria Maldives Ithaafushi. Offering the ultimate in exclusivity, featuring 11 celebrated dining venues and an Aqua Wellness Center.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['11 Dining Venues', 'Private Island Residences', 'Aqua Wellness Center'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Home to the largest private island estate in the Maldives and a unique treehouse dining experience.',
    isFeatured: true
  },
  {
    id: 'ritz-carlton-maldives',
    name: 'The Ritz-Carlton Maldives, Fari Islands',
    slug: 'ritz-carlton-maldives-fari-islands-luxury',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Architectural masterpiece with a minimalist, circular design.',
    description: 'Set within an integrated island development, the Ritz-Carlton Maldives offers a modern take on Maldivian luxury with its iconic circular villas.',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'],
    features: ['Circular Villas', 'Fari Marina Access', 'Aris Meeha Butler Service'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Iconic circular architecture and access to the vibrant Fari Marina beach club.',
    isFeatured: true
  },

  // --- BAA ATOLL (UNESCO BIOSPHERE) ---
  {
    id: 'anantara-kihavah',
    name: 'Anantara Kihavah Maldives Villas',
    slug: 'anantara-kihavah-luxury-villas-baa-atoll',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Home to the world\'s most famous underwater restaurant and overwater observatory.',
    description: 'Located on the Baa Atoll in a UNESCO Biosphere Reserve, Anantara Kihavah offers the ultimate in luxury with its underwater restaurant and overwater observatory.',
    images: ['https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200'],
    features: ['Underwater Dining', 'SKY Observatory', 'Pool Villas'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'SEA - The world\'s first underwater wine cellar and restaurant.'
  },
  {
    id: 'four-seasons-landaa',
    name: 'Four Seasons Resort Landaa Giraavaru',
    slug: 'four-seasons-landaa-giraavaru-luxury',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'A remote wilderness of UNESCO-protected coral reefs and world-class service.',
    description: 'Combining innovation and conservation, Landaa Giraavaru is home to the Maldives\' most successful turtle rehabilitation center.',
    images: ['https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=1200'],
    features: ['Manta Ray Research', 'Holographic Spa', 'Turtle Rehab'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Home to a holographic spa and the DeepFlight Super Falcon submarine.'
  },
  {
    id: 'amilla-maldives',
    name: 'Amilla Maldives Resort & Residences',
    slug: 'amilla-maldives-resort-residences',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Spacious white villas and a focus on wellness and ethical dining.',
    description: 'Amilla is known for its "Wellness Your Way" menus and unusually large villas, offering a fresh, modern Maldivian experience.',
    images: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=1200'],
    features: ['Ethical Dining', 'Treetop Villas', 'Wellness Your Way'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.ALL_INCLUSIVE],
    uvp: 'The first resort in the Maldives to offer comprehensive Keto, Paleo, and GF menus.'
  },

  // --- SOUTH ARI ATOLL (WHALE SHARKS) ---
  {
    id: 'lux-south-ari',
    name: 'LUX* South Ari Atoll',
    slug: 'lux-south-ari-atoll-whale-shark-diving',
    type: AccommodationType.RESORT,
    atoll: 'South Ari Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'The best place for whale shark sightings year-round with a playful vibe.',
    description: 'Cycle through the tropical pathways of one of the largest islands in the Maldives. Famous for its marine biology center and year-round whale sharks.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Whale Shark Diving', 'Outdoor Cinema', '8 Restaurants'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD],
    uvp: 'Located in a Marine Protected Area with guaranteed whale shark encounters.'
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
    uvp: 'Home to the first underwater restaurant and the first underwater villa (The Muraka).'
  },

  // --- ADAARAN COLLECTION ---
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
    uvp: 'The closest all-water-villa resort to Male, perfect for quick luxury escapes.'
  },
  {
    id: 'adaaran-huduran-fushi',
    name: 'Adaaran Select Huduran Fushi',
    slug: 'adaaran-select-huduran-fushi-surf-resort',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$',
    rating: 4,
    shortDescription: 'Premier surf resort with a legendary left-hand break.',
    description: 'Blessed with thriving vegetation and pristine waters, the "Island of White Gold" is a paradise for surfers and adventure seekers.',
    images: ['https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200'],
    features: ['Lohis Surf Break', 'Premium All-Inclusive', 'Tennis Courts'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'One of the best surf resorts in the world with exclusive access to the Lohis break.'
  },

  // --- SUN SIYAM GROUP ---
  {
    id: 'siyam-world',
    name: 'Siyam World Maldives',
    slug: 'siyam-world-maldives-all-inclusive-fun',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'A massive, fun-filled island with its own water park and horse riding.',
    description: 'Siyam World is one of the largest islands in the Maldives, offering a vast array of activities including horse riding and a massive floating water park.',
    images: ['https://images.unsplash.com/photo-1506929662133-570c13349a7c?auto=format&fit=crop&q=80&w=1200'],
    features: ['Floating Water Park', 'Horse Riding', 'Villas with Slides'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'The largest floating water park in Southeast Asia and the first horse ranch in the Maldives.'
  },
  {
    id: 'sun-siyam-olhuveli',
    name: 'Sun Siyam Olhuveli',
    slug: 'sun-siyam-olhuveli-all-inclusive-resort',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$',
    rating: 4,
    shortDescription: 'Traditional Maldives meets modern design across three interconnected islands.',
    description: 'Spread across three islands, Sun Siyam Olhuveli offers a massive variety of rooms and water sports activities.',
    images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200'],
    features: ['3 Swimming Pools', 'Kite Surfing', 'Sandbank Picnics'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD],
    uvp: 'The best value-for-money premium all-inclusive resort in the South Malé Atoll.'
  },

  // --- GUEST HOUSES (LOCAL ISLANDS) ---
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
    uvp: 'The most popular high-end stay on Maafushi local island with resort-style amenities.'
  },
  {
    id: 'season-paradise-thulusdhoo',
    name: 'Season Paradise',
    slug: 'season-paradise-thulusdhoo-surf-hotel',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'North Male Atoll',
    priceRange: '$',
    rating: 4,
    shortDescription: 'Award-winning surf hotel on the vibrant local island of Thulusdhoo.',
    description: 'Season Paradise is a 48-room boutique hotel offering an rooftop infinity pool and direct access to Cokes and Chickens surf breaks.',
    images: ['https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200'],
    features: ['Rooftop Infinity Pool', 'Surf Breaks Access', 'Local Island Tours'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Voted the leading guest house in the Maldives, offering a rooftop pool with surf break views.'
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
    uvp: 'The most sustainable guest house in the Maldives with its own private beach and forest area.'
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
