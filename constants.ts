import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

// Helper to generate room types
const generateDummyRooms = (resortName: string) => [
  {
    name: 'Beach Sunrise Villa',
    description: `Wake up to the gentle sounds of the Indian Ocean in this secluded beachfront haven at ${resortName}.`,
    highlights: ['Direct beach access', 'Private plunge pool', 'Outdoor rain shower'],
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    size: '150 sqm',
    capacity: '2 Adults'
  },
  {
    name: 'Sunset Water Villa',
    description: 'Perched over the turquoise lagoon, offering unobstructed views of the horizon.',
    highlights: ['Infinity pool', 'Glass floor panel', 'Sunset views'],
    image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800',
    size: '185 sqm',
    capacity: '2 Adults'
  },
  {
    name: 'Family Pavilion',
    description: 'A spacious retreat designed for families, featuring interconnected spaces.',
    highlights: ['Family-sized pool', 'Butler service', 'Kids amenity kit'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    size: '320 sqm',
    capacity: '4 Adults + 2 Children'
  }
];

// Helper to generate dining venues
const generateDummyDining = (resortName: string) => [
  {
    name: 'Azure Waters',
    cuisine: 'Mediterranean',
    description: 'Al fresco dining with the freshest seafood caught daily.',
    highlights: ['Ocean-to-table', 'Sunset views'],
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    vibe: 'Beachfront Chic'
  }
];

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
    roomTypes: generateDummyRooms('Soneva Jani'),
    diningVenues: generateDummyDining('Soneva Jani')
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
    roomTypes: generateDummyRooms('One&Only Reethi Rah'),
    diningVenues: generateDummyDining('One&Only Reethi Rah')
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
    description: 'Set within the integrated Fari Islands development, this resort offers a modern take on Maldivian luxury with iconic circular overwater villas.',
    images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200'],
    features: ['Circular Villas', 'Aris Meeha Butler', 'Fari Marina Access'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Iconic circular architecture and access to the vibrant Fari Marina beach club.',
    roomTypes: generateDummyRooms('The Ritz-Carlton Maldives'),
    diningVenues: generateDummyDining('The Ritz-Carlton Maldives')
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
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'whale-shark-dive',
    title: 'Whale Shark Quest',
    description: 'Swim alongside the gentle giants of the ocean in the South Ari Atoll corridor.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  },
  {
    id: 'sandbank-soirée',
    title: 'The Sandbank Soirée',
    description: 'A disappearing sanctuary where custom culinary artistry meets absolute oceanic isolation.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    category: 'Culinary'
  },
  {
    id: 'dhoni-stargazing',
    title: 'Heritage Stargazing',
    description: 'Navigate the night sky as ancient voyagers did, aboard a traditional handcrafted Dhoni.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200',
    category: 'Culture'
  },
  {
    id: 'coral-propagation',
    title: 'The Coral Ark',
    description: 'Engage in the art of restoration. Plant your legacy within the atolls under expert marine guidance.',
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  },
  {
    id: 'manta-ballet',
    title: 'Manta Ray Ballet',
    description: 'Witness the rhythmic dance of the ocean’s most graceful giants in the UNESCO Biosphere.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    category: 'Water Sports'
  },
  {
    id: 'subaquatic-vinology',
    title: 'Subaquatic Vinology',
    description: 'A curated tasting of rare vintages in an glass-walled cellar beneath the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200',
    category: 'Culinary'
  },
  {
    id: 'floating-yoga',
    title: 'Equilibrium Rituals',
    description: 'Find stillness on a floating pavilion, guided by masters of the Ayurvedic arts.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    category: 'Wellness'
  },
  {
    id: 'island-bivouac',
    title: 'The Private Bivouac',
    description: 'An overnight glamping residency on a completely uninhabited atoll under the Milky Way.',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  },
  {
    id: 'artisanal-residency',
    title: 'The Artisanal Path',
    description: 'Learn the craft of traditional mat weaving and lacquer work from local village elders.',
    image: 'https://images.unsplash.com/photo-1582213706367-175f73d8ba63?auto=format&fit=crop&q=80&w=1200',
    category: 'Culture'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'atoll-guide-2026',
    title: 'The Ultimate Atoll Selection Guide',
    slug: 'maldives-atoll-selection-guide',
    excerpt: 'Not all islands are created equal. Discover which atoll suits your personal perspective of paradise.',
    content: 'Choosing the right atoll is the most critical decision in planning your Maldivian escape. From the UNESCO Biosphere of Baa Atoll to the whale shark corridors of South Ari, each region offers a distinct ecological and luxury signature. In this guide, we break down the geography of the archipelago to help you find your sanctuary.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-23',
    author: 'Travel Intelligence',
    category: 'Guide'
  },
  {
    id: 'seaplane-logistics-2026',
    title: 'Navigating the Blue: Seaplane & Transfer Logistics',
    slug: 'maldives-seaplane-transfer-logistics',
    excerpt: 'Everything you need to know about the most scenic (and complex) part of your journey.',
    content: 'The seaplane transfer is an iconic Maldivian experience, but it requires careful coordination with your international arrival. Operating only during daylight hours, these flights offer bird\'s-eye views of the atolls that are unrivaled. This guide covers baggage limits, timing, and what to expect at the VIP terminals.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-23',
    author: 'Logistics Desk',
    category: 'Guide'
  },
  {
    id: 'sustainable-packing-2026',
    title: 'Sustainable Luxury: A Packing List for the Atolls',
    slug: 'maldives-sustainable-luxury-packing-list',
    excerpt: 'Leave only bubbles. Pack with the ocean in mind without sacrificing elegance.',
    content: 'Packing for the Maldives is an exercise in "Barefoot Luxury." We recommend lightweight linens, reef-safe sunscreens, and reusable essentials. With many resorts aiming for zero-plastic, your choices as a traveler can support the preservation of this delicate ecosystem.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-22',
    author: 'Aesthetic Living',
    category: 'Guide'
  },
  {
    id: 'cinnamon-flash-sale-2026',
    title: 'Cinnamon Hotels & Resorts Maldives Announces 80% Savings Flash Sale',
    slug: 'cinnamon-hotels-maldives-flash-sale-march-2026',
    excerpt: 'A limited-time offer inviting travellers to experience the Maldives in March with unprecedented savings across four luxury resorts.',
    content: 'Cinnamon Hotels & Resorts Maldives has announced a limited-time flash offer inviting travellers to experience the Maldives in March, one of the destination’s most favourable months, with savings of up to 80 per cent when booking direct. The promotion is available across all four Cinnamon resorts in the Maldives and combines discounted rates with added benefits for the ultimate spring escape.',
    image: 'https://hoteliermaldives.com/wp-content/uploads/2026/01/2-1-scaled.jpg',
    date: '2026-01-22',
    author: 'Hotelier News Desk',
    category: 'Dispatch'
  },
  {
    id: 'fitur-2026-showcase',
    title: 'Visit Maldives Showcases at FITUR 2026 in Madrid',
    slug: 'visit-maldives-showcase-fitur-2026-madrid',
    excerpt: 'The archipelago takes center stage at the first major travel exhibition of the year, fostering global industry engagement.',
    content: 'Visit Maldives Corporation (VMC) is showcasing the Maldives at the first travel exhibition of the year, FITUR 2026, held from 21 January to 25 January, in Madrid, Spain. Recognized globally as one of the world’s leading tourism fairs, FITUR provides a key platform for networking, industry engagement and business development, attracting more than 50,000 visitors annually.',
    image: 'https://visitmaldives.s3.amazonaws.com/KYyv2kqR/c/1kh8cyhe-square_md.jpg',
    date: '2026-01-21',
    author: 'Editorial Desk',
    category: 'Dispatch'
  },
  {
    id: 'ritz-carlton-masters-2026',
    title: 'The Ritz-Carlton Maldives, Fari Islands Announces Masters of Crafts Residencies',
    slug: 'ritz-carlton-maldives-masters-of-crafts-2026',
    excerpt: 'A year-long celebration of artistry and innovation featuring Michelin-starred chefs and world-renowned artisans at Fari Islands.',
    content: 'The Ritz-Carlton Maldives, Fari Islands unveils its highly anticipated Masters of Crafts program for 2026 in an inspired year-long celebration of artistry and innovation. From Michelin masters to innovative artisans, the residency program promises an unparalleled cultural exchange in a setting defined by architectural brilliance and natural beauty.',
    image: 'https://visitmaldives.s3.amazonaws.com/rY4G3JwB/c/k0j8fm8u-square_md.jpg',
    date: '2026-01-21',
    author: 'Luxury Insider',
    category: 'Dispatch'
  },
  {
    id: 'ambani-merchant-arrival',
    title: 'Island Royalty: Anant Ambani & Radhika Merchant Arrive in Maldives',
    slug: 'anant-ambani-radhika-merchant-maldives-holiday',
    excerpt: 'High-profile guests arrive in the archipelago for a secluded luxury holiday following world-renowned celebrations.',
    content: 'High-profile guests Anant Ambani and Radhika Merchant have arrived in the Maldives for a private holiday. Their presence underscores the Maldives as the destination of choice for the world\'s most discerning travellers seeking ultimate seclusion and luxury.',
    image: 'https://hoteliermaldives.com/wp-content/uploads/2026/01/Untitled-2000-x-900-px-51.png',
    date: '2026-01-20',
    author: 'Social Dispatch',
    category: 'Dispatch'
  }
];