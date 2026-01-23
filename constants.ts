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

const RAW_RESORTS = [
  { name: 'Adaaran Prestige Vadoo', atoll: 'South Male Atoll' },
  { name: 'Adaaran Prestige Water Villas', atoll: 'Raa Atoll' },
  { name: 'Adaaran Select Huduran Fushi', atoll: 'North Male Atoll' },
  { name: 'Adaaran Select Meedhupparu', atoll: 'Raa Atoll' },
  { name: 'Alila Kothaifaru Maldives', atoll: 'Raa Atoll' },
  { name: 'Amilla Maldives', atoll: 'Baa Atoll' },
  { name: 'Ananea Madivaru Maldives', atoll: 'North Ari Atoll' },
  { name: 'Anantara Dhigu Maldives Resort', atoll: 'South Male Atoll' },
  { name: 'Anantara Kihavah Maldives Villas', atoll: 'Baa Atoll' },
  { name: 'Anantara Veli Maldives Resort', atoll: 'South Male Atoll' },
  { name: 'Angsana Velavaru', atoll: 'Dhaalu Atoll' },
  { name: 'Angsana Velavaru In-Ocean Villas', atoll: 'Dhaalu Atoll' },
  { name: 'Atmosphere Kanifushi', atoll: 'Lhaviyani Atoll' },
  { name: 'Avani Plus Fares Maldives Resort', atoll: 'Baa Atoll' },
  { name: 'Ayada Maldives', atoll: 'Gaafu Dhaalu Atoll' },
  { name: 'Baglioni Resort Maldives', atoll: 'Dhaalu Atoll' },
  { name: 'Bandos Maldives', atoll: 'North Male Atoll' },
  { name: 'Banyan Tree Vabbinfaru', atoll: 'North Male Atoll' },
  { name: 'Baros Maldives', atoll: 'North Male Atoll' },
  { name: 'Brennia Kottefaru Maldives', atoll: 'Raa Atoll' },
  { name: 'COMO Cocoa Island', atoll: 'South Male Atoll' },
  { name: 'COMO Maalifushi', atoll: 'Thaa Atoll' },
  { name: 'Canareef Resort Maldives', atoll: 'Addu Atoll' },
  { name: 'Centara Grand Lagoon Maldives', atoll: 'South Male Atoll' },
  { name: 'Centara Mirage Lagoon Maldives', atoll: 'North Male Atoll' },
  { name: 'Centara Ras Fushi Resort & Spa Maldives', atoll: 'North Male Atoll' },
  { name: 'Cinnamon Dhonveli Maldives', atoll: 'North Male Atoll' },
  { name: 'Cinnamon Hakuraa Huraa Maldives', atoll: 'Meemu Atoll' },
  { name: 'Cinnamon Velifushi Maldives', atoll: 'Vaavu Atoll' },
  { name: 'Coco Bodu Hithi', atoll: 'North Male Atoll' },
  { name: 'Coco Palm Dhuni Kolhu', atoll: 'Baa Atoll' },
  { name: 'Conrad Maldives Rangali Island', atoll: 'South Ari Atoll' },
  { name: 'Constance Moofushi Maldives', atoll: 'South Ari Atoll' },
  { name: 'Dhigali Maldives', atoll: 'Raa Atoll' },
  { name: 'Dhigufaru Island Resort', atoll: 'Baa Atoll' },
  { name: 'Diamonds Athuruga Maldives Resort & Spa', atoll: 'South Ari Atoll' },
  { name: 'Diamonds Thudufushi Maldives Resort & Spa', atoll: 'South Ari Atoll' },
  { name: 'Dusit Thani Maldives', atoll: 'Baa Atoll' },
  { name: 'Ellaidhoo Maldives by Cinnamon', atoll: 'North Ari Atoll' },
  { name: 'Emerald Faarufushi Resort & Spa', atoll: 'Raa Atoll' },
  { name: 'Emerald Maldives Resort & Spa', atoll: 'Raa Atoll' },
  { name: 'Eri Maldives', atoll: 'North Male Atoll' },
  { name: 'Filitheyo Island Resort', atoll: 'Faafu Atoll' },
  { name: 'Finolhu, A Seaside Collection Resort', atoll: 'Baa Atoll' },
  { name: 'Four Seasons Resort Maldives at Kuda Huraa', atoll: 'North Male Atoll' },
  { name: 'Four Seasons Resort Maldives at Landaa Giraavaru', atoll: 'Baa Atoll' },
  { name: 'Furaveri Maldives', atoll: 'Raa Atoll' },
  { name: 'Gangehi Island Resort & Spa', atoll: 'North Ari Atoll' },
  { name: 'Gili Lankanfushi Maldives', atoll: 'North Male Atoll' },
  { name: 'Grand Park Kodhipparu Maldives', atoll: 'North Male Atoll' },
  { name: 'Hard Rock Hotel Maldives', atoll: 'South Male Atoll' },
  { name: 'Heritance Aarah', atoll: 'Raa Atoll' },
  { name: 'Hideaway Beach Resort & Spa', atoll: 'Haa Alifu Atoll' },
  { name: 'Hilton Maldives Amingiri Resort & Spa', atoll: 'North Male Atoll' },
  { name: 'Holiday Inn Resort Kandooma Maldives', atoll: 'South Male Atoll' },
  { name: 'Hondaafushi Island Resort', atoll: 'Haa Dhaalu Atoll' },
  { name: 'Hurawalhi Island Resort', atoll: 'Lhaviyani Atoll' },
  { name: 'Huvafen Fushi Maldives', atoll: 'North Male Atoll' },
  { name: 'Ifuru Island Maldives', atoll: 'Raa Atoll' },
  { name: 'Intercontinental Maldives Maamunagau Resort', atoll: 'Raa Atoll' },
  { name: 'JA Manafaru, The Real Maldives', atoll: 'Haa Alifu Atoll' },
  { name: 'JOALI Maldives', atoll: 'Raa Atoll' },
  { name: 'JW Marriott Maldives Resort & Spa', atoll: 'Shaviyani Atoll' },
  { name: 'Jawakara Islands Maldives', atoll: 'Lhaviyani Atoll' },
  { name: 'Joy Island Maldives All Inclusive Resort', atoll: 'North Male Atoll' },
  { name: 'Jumeirah Olhahali Island Maldives', atoll: 'North Male Atoll' },
  { name: 'Kagi Maldives Resort & Spa', atoll: 'North Male Atoll' },
  { name: 'Kandima Maldives', atoll: 'Dhaalu Atoll' },
  { name: 'Kandolhu Maldives', atoll: 'North Ari Atoll' },
  { name: 'Komandoo Island Resort & Spa', atoll: 'Lhaviyani Atoll' },
  { name: 'Kuda Villingili Maldives', atoll: 'North Male Atoll' },
  { name: 'Kudadoo Maldives Private Island', atoll: 'Lhaviyani Atoll' },
  { name: 'Kuramathi Maldives', atoll: 'North Ari Atoll' },
  { name: 'Kuredu Island Resort & Spa', atoll: 'Lhaviyani Atoll' },
  { name: 'Kurumba Maldives', atoll: 'North Male Atoll' },
  { name: 'LUX* South Ari Atoll Resort & Villas', atoll: 'South Ari Atoll' },
  { name: 'Le Meridien Maldives Resort & Spa', atoll: 'Lhaviyani Atoll' },
  { name: 'Lily Beach Resort and Spa', atoll: 'South Ari Atoll' },
  { name: 'Madifushi Private Island', atoll: 'Meemu Atoll' },
  { name: 'Makunudu Island', atoll: 'North Male Atoll' },
  { name: 'Medhufushi Island Resort', atoll: 'Meemu Atoll' },
  { name: 'Meeru Maldives Resort Island', atoll: 'North Male Atoll' },
  { name: 'Mercure Maldives Kooddoo', atoll: 'Gaafu Alifu Atoll' },
  { name: 'Milaidhoo Maldives', atoll: 'Baa Atoll' },
  { name: 'NH Collection Maldives Havodda Resort', atoll: 'Gaafu Dhaalu Atoll' },
  { name: 'NH Collection Maldives Reethi Resort', atoll: 'Baa Atoll' },
  { name: 'NH Maldives Kuda Rah Resort', atoll: 'South Ari Atoll' },
  { name: 'NOOE Maldives Kunaavashi', atoll: 'Vaavu Atoll' },
  { name: 'Naladhu Private Island Maldives', atoll: 'South Male Atoll' },
  { name: 'Nika Island Resort & Spa', atoll: 'North Ari Atoll' },
  { name: 'Niyama Private Islands', atoll: 'Dhaalu Atoll' },
  { name: 'Noku Maldives, Vignette Collection', atoll: 'Noonu Atoll' },
  { name: 'Nova Maldives', atoll: 'South Ari Atoll' },
  { name: 'OBLU NATURE Helengeli', atoll: 'North Male Atoll' },
  { name: 'OBLU SELECT Lobigili', atoll: 'North Male Atoll' },
  { name: 'OBLU SELECT Sangeli', atoll: 'North Male Atoll' },
  { name: 'OBLU XPERIENCE Ailafushi', atoll: 'North Male Atoll' },
  { name: 'OUTRIGGER Maldives Maafushivaru Resort', atoll: 'South Ari Atoll' },
  { name: 'OZEN LIFE MAADHOO', atoll: 'South Male Atoll' },
  { name: 'OZEN RESERVE BOLIFUSHI', atoll: 'South Male Atoll' },
  { name: 'Oaga Art Resort Maldives', atoll: 'North Male Atoll' },
  { name: 'One&Only Reethi Rah', atoll: 'North Male Atoll' },
  { name: 'Park Hyatt Maldives Hadahaa', atoll: 'Gaafu Alifu Atoll' },
  { name: 'Patina Maldives, Fari Islands', atoll: 'North Male Atoll' },
  { name: 'Pullman Maldives Maamutaa', atoll: 'Gaafu Alifu Atoll' },
  { name: 'Radisson Blu Resort Maldives', atoll: 'South Ari Atoll' },
  { name: 'Riu Atoll', atoll: 'Dhaalu Atoll' },
  { name: 'Riu Palace Maldivas', atoll: 'Dhaalu Atoll' },
  { name: 'SAii Lagoon Maldives, Curio Collection By Hilton', atoll: 'South Male Atoll' },
  { name: 'SO/ Maldives', atoll: 'South Male Atoll' },
  { name: 'Safari Island', atoll: 'North Ari Atoll' },
  { name: 'Sandies Bathala', atoll: 'North Ari Atoll' },
  { name: 'Sheraton Maldives Full Moon Resort & Spa', atoll: 'North Male Atoll' },
  { name: 'Sirru Fen Fushi Private Lagoon', atoll: 'Shaviyani Atoll' },
  { name: 'Six Senses Kanuhura', atoll: 'Lhaviyani Atoll' },
  { name: 'Six Senses Laamu', atoll: 'Laamu Atoll' },
  { name: 'Siyam World Maldives', atoll: 'Noonu Atoll' },
  { name: 'Soneva Fushi', atoll: 'Baa Atoll' },
  { name: 'Soneva Jani', atoll: 'Noonu Atoll' },
  { name: 'St. Regis Maldives Vommuli Resort', atoll: 'Dhaalu Atoll' },
  { name: 'Summer Island Maldives', atoll: 'North Male Atoll' },
  { name: 'Sun Siyam Iru Fushi', atoll: 'Noonu Atoll' },
  { name: 'Sun Siyam Iru Veli', atoll: 'Dhaalu Atoll' },
  { name: 'Sun Siyam Olhuveli', atoll: 'South Male Atoll' },
  { name: 'Sun Siyam Vilu Reef', atoll: 'Dhaalu Atoll' },
  { name: 'Taj Exotica Resort & Spa, Maldives', atoll: 'South Male Atoll' },
  { name: 'The Barefoot Eco Hotel', atoll: 'Haa Dhaalu Atoll' },
  { name: 'The Centara Collection, Machchafushi', atoll: 'South Ari Atoll' },
  { name: 'The Nautilus Maldives', atoll: 'Baa Atoll' },
  { name: 'The Residence Maldives', atoll: 'Gaafu Alifu Atoll' },
  { name: 'The Residence Maldives at Dhigurah', atoll: 'Gaafu Alifu Atoll' },
  { name: 'The Ritz-Carlton Maldives, Fari Islands', atoll: 'North Male Atoll' },
  { name: 'The Standard, Huruvalhi Maldives', atoll: 'Raa Atoll' },
  { name: 'The Westin Maldives Miriandhoo Resort', atoll: 'Baa Atoll' },
  { name: 'V Villas Maldives at Mirihi', atoll: 'South Ari Atoll' },
  { name: 'VARU by Atmosphere', atoll: 'North Male Atoll' },
  { name: 'Vakkaru Maldives', atoll: 'Baa Atoll' },
  { name: 'Velassaru Maldives', atoll: 'South Male Atoll' },
  { name: 'Veligandu Maldives Resort Island', atoll: 'North Ari Atoll' },
  { name: 'Vilamendhoo Island Resort & Spa', atoll: 'South Ari Atoll' },
  { name: 'Villa Nautica Paradise Island Resort', atoll: 'North Male Atoll' },
  { name: 'Villa Park Sun Island Resort', atoll: 'South Ari Atoll' },
  { name: 'W Maldives', atoll: 'North Ari Atoll' },
  { name: 'Waldorf Astoria Maldives Ithaafushi', atoll: 'South Male Atoll' },
  { name: 'You & Me Maldives', atoll: 'Raa Atoll' },
  { name: 'dusitD2 Feydhoo Maldives', atoll: 'Addu Atoll' }
];

// Generator function to create the final RESORTS array
export const RESORTS: Accommodation[] = RAW_RESORTS.map(item => {
  const id = item.name.toLowerCase().replace(/[^a-z0-id]/g, '-');
  return {
    id: id,
    name: item.name,
    slug: `${id}-maldives-luxury-stay`,
    type: AccommodationType.RESORT,
    atoll: item.atoll,
    priceRange: '$$$$',
    rating: 5,
    shortDescription: `A premier luxury destination in ${item.atoll}.`,
    description: `${item.name} offers a curated Maldivian experience defined by tranquility, architectural elegance, and the crystal-clear waters of the ${item.atoll}. Every villa is designed to harmonize with the natural beauty of the archipelago.`,
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Private Pools', 'Fine Dining', 'Wellness Spa', 'Ocean Views'],
    transfers: [TransferType.SEAPLANE, TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.HALF_BOARD, MealPlan.ALL_INCLUSIVE],
    uvp: `The ultimate perspective of luxury in the ${item.atoll}.`,
    roomTypes: generateDummyRooms(item.name),
    diningVenues: generateDummyDining(item.name),
    isFeatured: ['Soneva Jani', 'One&Only Reethi Rah', 'The Ritz-Carlton Maldives, Fari Islands'].includes(item.name)
  };
});

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
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'dispatch-luxury-2026',
    title: 'The New Era of Maldivian Ultra-Luxury',
    slug: 'the-new-era-of-maldivian-luxury',
    excerpt: 'How the archipelago is redefining high-end hospitality through sustainable architecture and private atoll concepts.',
    content: 'The Maldives has always been a beacon for luxury seekers, but the latest wave of resort openings in Noonu and Raa Atolls is pushing boundaries. Beyond overwater villas, we are seeing the rise of "Total Privacy" concepts where entire islands are dedicated to a single guest party...',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1200',
    date: '2026-02-15',
    author: 'Elena Vance',
    category: 'Dispatch'
  },
  {
    id: 'atoll-guide-2026',
    title: 'The Ultimate Atoll Selection Guide',
    slug: 'maldives-atoll-selection-guide',
    excerpt: 'Not all islands are created equal. Discover which atoll suits your personal perspective of paradise.',
    content: 'Choosing the right atoll is the most critical decision in planning your Maldivian escape. From the UNESCO Biosphere of Baa Atoll to the whale shark corridors of South Ari, each region offers a distinct ecological and luxury signature.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-23',
    author: 'Travel Intelligence',
    category: 'Guide'
  },
  {
    id: 'dispatch-culture-2026',
    title: 'Restoring Heritage: The Handcrafted Dhoni',
    slug: 'restoring-maldives-heritage-dhoni',
    excerpt: 'A look into the revival of traditional shipbuilding and how it’s becoming the ultimate guest experience.',
    content: 'On the island of Alifushi, master boatbuilders are seeing a resurgence in demand for traditional Dhonis. These are no longer just fishing vessels but high-art vessels of exploration...',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200',
    date: '2026-03-01',
    author: 'Ismail Ahmed',
    category: 'Dispatch'
  },
  {
    id: 'seaplane-logistics-2026',
    title: 'Navigating the Blue: Seaplane & Transfer Logistics',
    slug: 'maldives-seaplane-transfer-logistics',
    excerpt: 'Everything you need to know about the most scenic (and complex) part of your journey.',
    content: 'The seaplane transfer is an iconic Maldivian experience, but it requires careful coordination with your international arrival.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-23',
    author: 'Logistics Desk',
    category: 'Guide'
  }
];
