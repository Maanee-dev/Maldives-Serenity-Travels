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
    description: 'Swim alongside the gentle giants of the ocean in the South Ari Atoll.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=800',
    category: 'Adventure'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'fitur-2026-showcase',
    title: 'Visit Maldives Showcases at FITUR 2026 in Madrid',
    slug: 'visit-maldives-showcase-fitur-2026-madrid',
    excerpt: 'The archipelago takes center stage at the first major travel exhibition of the year, fostering global industry engagement.',
    content: 'Visit Maldives Corporation (VMC) is showcasing the Maldives at FITUR 2026 in Madrid, Spain. As one of the world’s leading tourism fairs, FITUR provides a key platform for networking and industry growth, attracting more than 50,000 visitors.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Editorial Desk'
  },
  {
    id: 'ifuru-island-top-100',
    title: 'Ifuru Island Recognized in TOP 100 Hotels of 2025',
    slug: 'ifuru-island-maldives-top-100-hotels-2025',
    excerpt: 'An extraordinary achievement earning recognition among the worlds best by the Luxury Lifestyle Awards for the second year.',
    content: 'Ifuru Island Maldives celebrates earning recognition among the TOP 100 Hotels & Resorts of the World 2025. This milestone journey of excellence highlights the resorts commitment to unparalleled service and guest satisfaction.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Luxury Insider'
  },
  {
    id: 'ritz-carlton-masters-2026',
    title: 'Masters of Crafts 2026: Artistry at The Ritz-Carlton Fari Islands',
    slug: 'ritz-carlton-maldives-masters-of-crafts-2026',
    excerpt: 'Unveiling a year-long celebration of artistry and innovation featuring Michelin-starred chefs and world-renowned artisans.',
    content: 'The Ritz-Carlton Maldives, Fari Islands unveils its highly anticipated Masters of Crafts program for 2026. This year-long celebration brings global artistry and innovative culinary perspectives to the Maldives.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Arts & Culture'
  },
  {
    id: 'siyam-world-football-legends',
    title: 'Football Legends Torres and Noble Lead Kids’ Camp at Siyam World',
    slug: 'fernando-torres-mark-noble-siyam-world-football',
    excerpt: 'Unforgettable football masterclasses transformed the festive holidays into shared dreams for young guests.',
    content: 'Siyam World Maldives set the stage for two unforgettable football experiences as Fernando Torres and Mark Noble hosted kids’ football camps. The organic and carefully planned event offered young travelers a unique sporting holiday.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Sporting Travels'
  },
  {
    id: 'lily-beach-michelin-chef',
    title: 'Lily Beach Welcomes Michelin Chef Bruno Ménard for Valentine’s',
    slug: 'lily-beach-resort-chef-bruno-menard-valentines',
    excerpt: 'Asia’s most respected culinary icons bring an exclusive Valentine’s Day gastronomic celebration to the islands.',
    content: 'Lily Beach Resort & Spa is set to host world-renowned French chef Bruno Ménard. The exclusive Valentine’s Day culinary celebration promises a three-Michelin-star experience under the Maldivian stars.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Culinary Pulse'
  },
  {
    id: 'alila-kothaifaru-wine-dinner',
    title: 'Alila Kothaifaru Hosts Wine Dinner on Private Sandbank',
    slug: 'alila-kothaifaru-mastroberardino-wine-dinner-sandbank',
    excerpt: 'Inviting epicureans to an extraordinary evening of fine wine and gastronomy on a secluded strip of white sand.',
    content: 'Alila Kothaifaru Maldives invites discerning wine connoisseurs to an exclusive Mastroberardino Wine Dinner. The event takes place on a private sandbank, combining elite vintages with the serenity of the atoll.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-21',
    author: 'Gourmet Gazette'
  },
  {
    id: 'across-maldives-2026-diving',
    title: 'Across Maldives 2026: An Ambitious Underwater Record Attempt',
    slug: 'visit-maldives-shafraz-naeem-diving-record-2026',
    excerpt: 'Maldivian diver Shafraz Naeem sets out to cross the archipelago underwater in an unprecedented expedition.',
    content: 'Visit Maldives Corporation (VMC) has announced "Across Maldives 2026," an ambitious underwater record attempt by Maldivian diver Shafraz Naeem. Starting January 23, the expedition aims to showcase the archipelago’s maritime heritage.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-20',
    author: 'Ocean Affairs'
  },
  {
    id: 'tripadvisor-best-of-best-2026',
    title: 'Maldives Outshines Global Giants in TripAdvisor Best Rankings',
    slug: 'maldives-tripadvisor-best-of-best-2026-rankings',
    excerpt: 'Cementing its status as a premier global destination, securing prestigious spots in the Travelers’ Choice awards.',
    content: 'Maldives has once again outshone global giants in TripAdvisor’s elite "Best of the Best" rankings for 2026. The awards highlight the destination’s unrivaled commitment to hospitality and natural preservation.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-20',
    author: 'Travel Trends'
  },
  {
    id: 'cinnamon-hotels-flash-sale',
    title: 'Cinnamon Hotels & Resorts Announces 80% Savings Flash Sale',
    slug: 'cinnamon-hotels-maldives-march-flash-sale-80-percent',
    excerpt: 'A limited-time offer inviting travelers to experience the Maldives in March with unprecedented savings.',
    content: 'Cinnamon Hotels & Resorts Maldives has announced a flash sale with savings of up to 80 per cent for March bookings. The promotion is available across all four Cinnamon properties in the Maldives.',
    image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-22',
    author: 'Travel Finance'
  },
  {
    id: 'ambani-merchant-arrival',
    title: 'Island Royalty: Anant Ambani & Radhika Merchant Arrive in Maldives',
    slug: 'anant-ambani-radhika-merchant-maldives-holiday',
    excerpt: 'High-profile guests arrive in the archipelago for a secluded luxury holiday following world-renowned celebrations.',
    content: 'High-profile guests Anant Ambani and Radhika Merchant have arrived in the Maldives for a private holiday. Their presence underscores the Maldives as the destination of choice for the worlds most discerning travelers.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-20',
    author: 'Social Dispatch'
  },
  {
    id: 'tourist-arrivals-rise-2026',
    title: 'The Rising Tide: Tourist Arrivals Rise 10% in Early 2026',
    slug: 'maldives-tourist-arrivals-growth-2026',
    excerpt: 'The Maldives sees a significant surge in international visitors as the sunny side of life remains a top choice.',
    content: 'Tourist arrivals to the Maldives have risen by 10% in the first weeks of 2026. The growth reflects the destination’s enduring appeal and the successful marketing efforts of MMPRC.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-19',
    author: 'Market Watch'
  }
];