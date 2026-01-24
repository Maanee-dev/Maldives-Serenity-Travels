import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const RESORTS: Accommodation[] = [
  {
    id: 'adaaran-prestige-vadoo',
    name: 'Adaaran Prestige Vadoo',
    slug: 'adaaran-prestige-vadoo',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'An intimate overwater affair featuring private jacuzzis and 24-hour butler service.',
    description: 'The picture-perfect romantic getaway in the tropics – Adaaran Prestige Vadoo transcends the tropical Maldivian experience to an intimate affair with overwater villas with private jacuzzis, plunge pools and butler services. Strategically located at the gateway to the South Atolls, the resort possesses its own exotic reef teeming with vibrant aquatic flora and fauna. The list of indulgences that awaits you here can only be matched by the captivating beauty of the surroundings, warmed by signature Adaaran hospitality.',
    images: [
      'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'
    ],
    features: [
      '24-Hour Butler Service',
      'Overwater Spa (Elemis Products)',
      'Private Plunge Pools',
      'Exotic House Reef',
      'Glass Floor Bathroom Panels',
      'PADI Diving Centre',
      'Traditional Maldivian Weddings'
    ],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD, MealPlan.HALF_BOARD],
    uvp: 'Transcend the tropical Maldivian experience to an intimate overwater affair.',
    isFeatured: true,
    roomTypes: [
      {
        name: 'Sunrise Villa',
        size: '95 sqm',
        capacity: '3 Adults',
        description: 'Wake up to the gentle sounds of the Indian Ocean with unobstructed sunrise views from your private deck.',
        highlights: ['Private Jacuzzi', 'Plunge Pool', 'Sundeck', 'Glass floor panel'],
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Sunset Villa',
        size: '95 sqm',
        capacity: '3 Adults',
        description: 'Perfectly positioned for the golden hour, these villas offer a private sanctuary to witness the Maldivian sunset.',
        highlights: ['Sunset views', 'Butler service', 'Plunge pool', 'Direct ocean access'],
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Overwater Villa',
        size: '95 sqm',
        capacity: '3 Adults',
        description: 'Classic overwater luxury featuring elegant interiors and direct access to the vibrant house reef.',
        highlights: ['Rain shower', 'Glass floor panel', 'Private deck', 'Jacuzzi'],
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Honeymoon Villa',
        size: '110 sqm',
        capacity: '2 Adults',
        description: 'The ultimate romantic escape, offering expanded living space and absolute privacy for newlyweds.',
        highlights: ['Enhanced privacy', 'Luxury bathroom', 'Private pool', 'Honeymoon amenities'],
        image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800'
      }
    ],
    diningVenues: [
      {
        name: 'Farivalhu Fine Dining',
        cuisine: 'International Fine Dining',
        vibe: 'Refined Elegance',
        description: 'Serving exquisite set menus and à la carte options across all three meals in a refined beachfront setting.',
        highlights: ['Breakfast: 6:30-10:00', 'Lunch: 12:30-14:30', 'Dinner: 19:30-22:30'],
        image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Kithajima Restaurant',
        cuisine: 'Japanese',
        vibe: 'Intimate Zen',
        description: 'Specializing in authentic Japanese flavors and fresh local catches in a zen-like atmosphere.',
        highlights: ['Japanese cuisine', 'Dinner: 19:30-22:30', 'Authentic flavors'],
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Kandolhi Bar',
        cuisine: 'Spirits, Wines & Cocktails',
        vibe: 'Evening Elegance',
        description: 'A serene overwater bar serving curated cocktails and fine wines from morning till midnight.',
        highlights: ['08:00 - 00:00', 'Panoramic lagoon views', 'Premium Spirits'],
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Dhoni Bar',
        cuisine: 'Spirits & Light Fare',
        vibe: 'Coastal Casual',
        description: 'A relaxed poolside bar serving refreshing drinks and spirits throughout the day.',
        highlights: ['10:00 - 17:00', '20:30 - 00:00', 'Poolside service'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'soneva-jani',
    name: 'Soneva Jani',
    slug: 'soneva-jani',
    type: AccommodationType.RESORT,
    atoll: 'Noonu Atoll',
    priceRange: '$$$$+',
    rating: 5,
    shortDescription: 'An overwater sanctuary of unparalleled imagination.',
    description: 'Soneva Jani is one of the world\'s lowest density resorts. Located in the Medhufaru lagoon in the Noonu Atoll, the resort features overwater villas with retractable roofs to stargaze from the master bedroom.',
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Retractable Roofs', 'Water Slides', 'Organic Gardens', 'Observatory'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.FULL_BOARD],
    uvp: 'Inspiring a lifetime of rare experiences.',
  },
  {
    id: 'ayada-maldives',
    name: 'Ayada Maldives',
    slug: 'ayada-maldives',
    type: AccommodationType.RESORT,
    atoll: 'Gaafu Dhaalu Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'Middle Eastern luxury in the deep south of Maldives.',
    description: 'Ayada Maldives is a luxury resort located amidst a pristine reef within the southern rim of the Gaafu Dhaalu Atoll in the southern Maldives.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['Turkish Bath', 'Surf Club', 'Private Pools', 'Island Biking'],
    transfers: [TransferType.DOMESTIC_FLIGHT, TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.HALF_BOARD],
    uvp: 'A Turkish-inspired paradise in the untouched south.',
  },
  {
    id: 'fulidhoo-guest-house',
    name: 'Island Break Fulidhoo',
    slug: 'island-break-fulidhoo',
    type: AccommodationType.GUEST_HOUSE,
    atoll: 'Vaavu Atoll',
    priceRange: '$',
    rating: 4,
    shortDescription: 'Authentic local island experience with legendary hospitality.',
    description: 'Experience the real Maldives on Fulidhoo island. Known for its stingrays and nurse sharks, this guest house offers clean, modern comfort at a fraction of resort prices.',
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200'],
    features: ['Stingray Feeding', 'Local Island Tours', 'Bikini Beach Access', 'Snorkeling Expeditions'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.BED_BREAKFAST, MealPlan.HALF_BOARD],
    uvp: 'Traditional Maldivian spirit with modern boutique comfort.',
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'Honeymoon Serenity Package',
    discount: '30% OFF',
    resortName: 'Adaaran Prestige Vadoo',
    expiryDate: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    category: 'Honeymoon'
  },
  {
    id: 'offer-2',
    title: 'Early Bird Summer Escape',
    discount: '25% OFF',
    resortName: 'Soneva Jani',
    expiryDate: '2024-09-30',
    image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800',
    category: 'Early Bird'
  },
  {
    id: 'offer-3',
    title: 'Last Minute Atoll Hopping',
    discount: '40% OFF',
    resortName: 'Island Break Fulidhoo',
    expiryDate: '2024-06-15',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800',
    category: 'Last Minute'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Sandbank Soirée',
    description: 'A private dining experience on a disappearing sandbank, surrounded only by the rising tide and flickering candlelight.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    category: 'Culinary'
  },
  {
    id: 'exp-2',
    title: 'Whale Shark Odyssey',
    description: 'Swim alongside the gentle giants of the South Ari Atoll in a guided, sustainable encounter.',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  },
  {
    id: 'exp-3',
    title: 'Bio-Luminescent Night',
    description: 'Witness the sea of stars as the shoreline glows with natural phosphorescence under the new moon.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    category: 'Wellness'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of the Seaplane: A Perspective',
    slug: 'art-of-the-seaplane',
    excerpt: 'How the worlds largest seaplane fleet defines the logistics of Maldivian luxury.',
    content: 'The Maldives is more than just luxury; it\'s a feeling of weightlessness. Whether you\'re flying in a seaplane or taking a slow local ferry, the views remain iconic. Planning your trip requires attention to detail—especially when it comes to transfers and weather windows.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2024-05-15',
    author: 'Elena Rossi',
    category: 'Dispatch'
  },
  {
    id: 'post-2',
    title: 'Sustainability in the Atolls',
    slug: 'sustainability-atolls',
    excerpt: 'Defining zero-waste luxury in the face of a changing climate.',
    content: 'Discover how resorts like Soneva are leading the way in sustainable architecture and coral reef preservation through innovative science and traditional wisdom.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200',
    date: '2024-04-20',
    author: 'Marcus Vance',
    category: 'Guide'
  }
];
