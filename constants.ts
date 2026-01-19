import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
  // --- FEATURED LUXURY ---
  {
    id: 'soneva-jani',
    name: 'Soneva Jani',
    slug: 'soneva-jani-luxury-overwater-villas',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'The ultimate overwater playground featuring villas with private slides into the lagoon.',
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
    slug: 'one-and-only-reethi-rah-maldives',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'The pinnacle of tropical luxury on one of the largest islands in North Malé Atoll.',
    description: 'One&Only Reethi Rah is an ultra-luxury resort offering an unrivaled level of style and sophistication. Surrounded by the crystal clear waters of the Indian Ocean.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['12 Pristine Beaches', 'Beach Club', 'Private Concierge', 'Overwater Yoga'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Celebrity-favorite private island with twelve distinct beaches and world-class tennis academies.',
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
    shortDescription: 'Spanning across three private islands, offering the ultimate in space and exclusivity.',
    description: 'Escape to a world of luxury at Waldorf Astoria Maldives Ithaafushi. With 11 celebrated dining venues and a world-class spa.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['11 Dining Venues', 'Private Island Residences', 'Aqua Wellness Center'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Home to the largest private island estate in the Maldives and a unique treehouse dining experience.',
    isFeatured: true
  },

  // --- ADAARAN COLLECTION ---
  {
    id: 'adaaran-vadoo',
    name: 'Adaaran Prestige Vadoo',
    slug: 'adaaran-prestige-vadoo-resort',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'Award-winning water villas with private plunge pools and glass-floor bathrooms.',
    description: 'Located at the gateway to the South Atolls, Adaaran Prestige Vadoo has its own reef teeming with vibrant aquatic flora and fauna.',
    images: ['https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200'],
    features: ['Butler Service', 'Glass Floors', 'Plunge Pools'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'World\'s Leading Water Villa retreat just 15 minutes from Male airport.'
  },
  {
    id: 'adaaran-huduran-fushi',
    name: 'Adaaran Select Huduran Fushi',
    slug: 'adaaran-select-huduran-fushi-surf',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$',
    rating: 4,
    shortDescription: 'One of the best surf resorts in the Maldives with consistent left-hand breaks.',
    description: 'Blessed with thriving vegetation and pristine waters, the "Island of White Gold" finds itself in peaceful seclusion in the North Malé Atoll.',
    images: ['https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200'],
    features: ['Lohis Surf Break', 'Premium All-Inclusive', 'Tennis Courts'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Home to the famous Lohis surf break, arguably the best left-hander in the country.'
  },

  // --- ANANTARA COLLECTION ---
  {
    id: 'anantara-kihavah',
    name: 'Anantara Kihavah Maldives Villas',
    slug: 'anantara-kihavah-luxury-villas',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Home to the world\'s most famous underwater restaurant and overwater observatory.',
    description: 'Anantara Kihavah offers the ultimate in luxury, located on the doorstep of Hanifaru Bay in a UNESCO Biosphere Reserve.',
    images: ['https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=1200'],
    features: ['Underwater Dining', 'SKY Observatory', 'Pool Villas'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'SEA - The world\'s first underwater wine cellar and restaurant.'
  },

  // --- SIYAM WORLD & SUN SIYAM ---
  {
    id: 'siyam-world',
    name: 'Siyam World Maldives',
    slug: 'siyam-world-maldives-all-inclusive',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'A bold, new world of possibilities. A quirky, fun-filled island experience.',
    description: 'Siyam World is one of the largest islands in the Maldives to host a resort. It features a massive water park and villa slides.',
    images: ['https://images.unsplash.com/photo-1506929662133-570c13349a7c?auto=format&fit=crop&q=80&w=1200'],
    features: ['Floating Water Park', 'Horse Riding', 'Villas with Slides'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'The largest floating water park in Southeast Asia and the first horse ranch in the Maldives.'
  },
  {
    id: 'sun-siyam-olhuveli',
    name: 'Sun Siyam Olhuveli',
    slug: 'sun-siyam-olhuveli-beach-resort',
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
    uvp: 'One of the best value-for-money premium all-inclusive resorts in the South Malé Atoll.'
  },

  // --- ICONIC PIONEERS ---
  {
    id: 'kurumba-maldives',
    name: 'Kurumba Maldives',
    slug: 'kurumba-maldives-first-resort',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$',
    rating: 5,
    shortDescription: 'The very first resort in the Maldives, offering timeless luxury near the capital.',
    description: 'Kurumba Maldives is a cosmopolitan island resort. Close to Malé, it offers a vibrant social scene and diverse dining.',
    images: ['https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200'],
    features: ['8 Restaurants', 'Marine Center', 'Kids Club'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.ALL_INCLUSIVE],
    uvp: 'The resort that started it all in 1972, perfect for short stays and transit luxury.'
  },
  {
    id: 'baros-maldives',
    name: 'Baros Maldives',
    slug: 'baros-maldives-boutique-luxury',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'A legendary boutique resort known for its romantic vibe and world-class house reef.',
    description: 'Baros is a lush, tropical island set in the shimmering waters of a shallow lagoon, ringed by a reef alive with marine life.',
    images: ['https://images.unsplash.com/photo-1589197331516-4d839303767b?auto=format&fit=crop&q=80&w=1200'],
    features: ['World-class Reef', 'Iconic Lighthouse Restaurant', 'Sandbank Dining'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Consistently voted the World\'s Most Romantic Resort for its intimate, natural charm.'
  },

  // --- AMILLA & JOALI (BAA ATOLL LUXURY) ---
  {
    id: 'amilla-maldives',
    name: 'Amilla Maldives',
    slug: 'amilla-maldives-resort-residences',
    type: AccommodationType.RESORT,
    atoll: 'Baa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Innovative design and sustainable luxury in a UNESCO Biosphere Reserve.',
    description: 'Amilla offers a unique "Wellness Your Way" concept. Featuring unique treetop villas and glamping pods.',
    images: ['https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=1200'],
    features: ['Treetop Villas', 'Glamping Pods', 'Ethical Dining'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.ALL_INCLUSIVE],
    uvp: 'Unusually spacious villas and the first resort to offer specific Keto and Paleo menus.'
  },
  {
    id: 'joali-maldives',
    name: 'JOALI Maldives',
    slug: 'joali-maldives-art-immersive-resort',
    type: AccommodationType.RESORT,
    atoll: 'Raa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'The Maldives\' first immersive art resort, where luxury meets creative expression.',
    description: 'Located on Muravandhoo island, JOALI is a design-forward sanctuary filled with interactive art installations.',
    images: ['https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=1200'],
    features: ['Art Studio', 'Manta Ray Treehouse', 'Whiskey Lounge'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'An "Art-immersive" luxury experience with unique architecture inspired by the surrounding nature.'
  },

  // --- CONRAD & LUX (SOUTH ARI ATOLL) ---
  {
    id: 'conrad-rangali',
    name: 'Conrad Maldives Rangali Island',
    slug: 'conrad-maldives-rangali-island-underwater',
    type: AccommodationType.RESORT,
    atoll: 'South Ari Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Pioneers of the underwater world, home to the Muraka underwater villa.',
    description: 'Rangali Island is a world-class destination spread across two islands connected by a bridge.',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'],
    features: ['The Muraka Villa', 'Ithaa Underwater Restaurant', 'Dual-island concept'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Home to the first underwater restaurant (Ithaa) and the first underwater bedroom (The Muraka).'
  },
  {
    id: 'lux-south-ari',
    name: 'LUX* South Ari Atoll',
    slug: 'lux-south-ari-atoll-whale-shark',
    type: AccommodationType.RESORT,
    atoll: 'South Ari Atoll',
    priceRange: '$$$',
    rating: 5,
    shortDescription: 'The best place for whale shark sightings year-round with a playful, eco-conscious vibe.',
    description: 'Cycle through the tropical pathways of one of the largest islands in the Maldives.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Whale Shark Diving', 'Outdoor Cinema', '8 Restaurants'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD],
    uvp: 'Located in a Marine Protected Area with guaranteed year-round whale shark encounters.'
  },

  // --- BUDGET & GUEST HOUSES (LOCAL ISLANDS) ---
  {
    id: 'barefoot-eco-hotel',
    name: 'The Barefoot Eco Hotel',
    slug: 'barefoot-eco-hotel-hanimaadhoo',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'Haa Alifu Atoll',
    priceRange: '$',
    rating: 4,
    shortDescription: 'A unique ecological project on the local island of Hanimaadhoo.',
    description: 'Authentic Maldivian experiences on a local island with a focus on conservation and community.',
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200'],
    features: ['Conservation Center', 'Yoga Pavilion', 'Bicycle Rentals'],
    transfers: [TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.HALF_BOARD, MealPlan.BED_BREAKFAST],
    uvp: 'One of the best-rated eco-hotels on a local island with a private bikini beach area.'
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
    resortName: 'LUX* South Ari Atoll',
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
