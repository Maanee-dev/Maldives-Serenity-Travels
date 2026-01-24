import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

/**
 * HELPER: Simple Slugify
 */
const slugify = (text: string) => text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

/**
 * THE PORTFOLIO
 * Detailed profiles for the requested Adaaran properties plus others.
 */
export const RESORTS: Accommodation[] = [
  {
    id: 'adaaran-prestige-vadoo',
    name: 'Adaaran Prestige Vadoo',
    slug: 'adaaran-prestige-vadoo',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'An intimate overwater affair featuring private jacuzzis and butler service.',
    description: 'Adaaran Prestige Vadoo transcends the tropical Maldivian experience to an intimate affair with overwater villas with private jacuzzis, plunge pools and butler services. Strategically located at the gateway to the South Atolls, the resort possesses its own exotic reef teeming with vibrant aquatic flora and fauna.',
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['24-Hour Butler', 'Overwater Spa', 'Private Plunge Pools', 'Exotic House Reef', 'Glass floor panel', 'Jacuzzi', 'Submarine Dive'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'The picture-perfect romantic getaway in the tropics.',
    roomTypes: [
      { name: 'Sunrise Villa', size: '95 sqm', capacity: '3 Adults', description: 'Overwater luxury featuring a private sundeck and plunge pool with sunrise views.', highlights: ['Private Jacuzzi', 'Glass floor panel', '24-hour butler'], image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sunset Villa', size: '95 sqm', capacity: '3 Adults', description: 'Bask in the golden hour from your private deck over the turquoise lagoon.', highlights: ['Plunge Pool', 'Rain shower', 'DVD Player'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Farivalhu Fine Dining', cuisine: 'International', vibe: 'Refined', description: 'Exquisite set menus and à la carte dining overlooking the ocean.', highlights: ['Breakfast: 06:30 - 10:00', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 22:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Kithajima Restaurant', cuisine: 'Japanese', vibe: 'Sophisticated', description: 'Authentic Japanese flavors served in an intimate, traditional setting.', highlights: ['Dinner: 19:30 - 22:30'], image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'adaaran-prestige-water-villas',
    name: 'Adaaran Prestige Water Villas',
    slug: 'adaaran-prestige-water-villas',
    type: AccommodationType.RESORT,
    atoll: 'Raa Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'An oasis of tranquillity and relaxation with luxury wooden overwater interiors.',
    description: 'Adaaran Prestige Water Villas, an oasis of tranquillity and relaxation in the exotic setting of the Maldive Islands, never fails to captivate the discerning travellers who choose to stay in its well designed accommodations. Known for their exquisite interior with very own sun deck and private Jacuzzis to truly enjoy breath taking views of the horizon.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Personalized butler service', 'Private Jacuzzi on the deck', 'Mandara Spa Access', 'Pillow menu', 'Wireless Bluetooth speaker'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Luxury wooden interiors with blue crystal ocean water right in front of you.',
    roomTypes: [
      { name: 'Water Villa', size: '84 sqm', capacity: '2 Adults', description: 'Exquisite overwater sanctuary featuring a sun deck and private Jacuzzi.', highlights: ['Personalized Butler', 'Private Jacuzzi', 'Sound System', 'Pillow Menu'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Water Villa Restaurant', cuisine: 'A la carte', vibe: 'Exclusive', description: 'Fine dining exclusively for Water Villa guests with expansive views.', highlights: ['Breakfast: 06:30 - 12:00', 'Lunch: 12:00 - 14:30', 'Dinner: 18:00 - 22:00'], image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sufura Restaurant', cuisine: 'Indian', vibe: 'Authentic', description: 'Specialized Indian cuisine served in an elegant setting.', highlights: ['Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Café Mass', cuisine: 'Comfort Food', vibe: 'Casual', description: 'The social hub of the resort offering light snacks and comfort meals.', highlights: ['Open 10:00 - 22:00', 'Bar: 24 Hours'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'adaaran-select-hudhuran-fushi',
    name: 'Adaaran Select Hudhuran Fushi',
    slug: 'adaaran-select-hudhuran-fushi',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$',
    rating: 4,
    shortDescription: 'The "Surf Island" of the Maldives, featuring a world-class left breaking wave.',
    description: 'An unforgettable holiday experience in the tropical paradise of the Maldives. "Surf Island", Adaaran Select Hudhuran Fushi is an escape for the soul, offering a 24-hour Premium All-Inclusive experience. It is one of the best surf holiday resorts in the Maldives with a perfect left breaking down one side of the island and six other world class waves just a short boat ride away.',
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Lohis Surf Break', '24-hour Premium All-Inclusive', 'Tennis & Squash', 'Kiddies Pool', 'Resident Doctor'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Surf Island: A penchant for exploration and discovery.',
    roomTypes: [
      { name: 'Lohis Villa', size: '43 sqm', capacity: '3 Adults', description: 'Designed exclusively for surfers, just a 20 second walk to the Lohis surf break.', highlights: ['Surf Proximity', 'Outdoor Terrace', 'Bathtub'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Beach Villa', size: '59.4 sqm', capacity: '3 Adults', description: 'Classic island living with the ocean at your doorstep.', highlights: ['Beachfront', 'AC', 'Mini Bar'], image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' },
      { name: 'Family Beach Villa', size: '111 sqm', capacity: '6 Occupants', description: 'Expansive accommodation for larger groups and families.', highlights: ['Double Space', 'Family Amenities'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sunset Ocean Villa', size: '64 sqm', capacity: '3 Adults', description: 'Luxury overwater living with breathtaking sunset views.', highlights: ['Overwater Deck', 'Glass Floor Panel'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Banyan Restaurant', cuisine: 'International Buffet', vibe: 'Lively', description: 'Main restaurant with themed international buffets.', highlights: ['Breakfast: 07:30 - 09:30', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Indian Pavilion', cuisine: 'North & South Indian', vibe: 'Authentic', description: 'Specialized Indian cuisine with authentic flavors.', highlights: ['Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Lohis Wave', cuisine: 'Pizza & Buffet', vibe: 'Surfers Social', description: 'Buffet and special oven-baked pizza for surfers.', highlights: ['Oven baked pizza: 10:00 - 22:00', 'Bar: 10:00 - 23:00'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Hiyala Bar', cuisine: 'Selection of Spirits', vibe: 'Social', description: 'Main social hub of the island.', highlights: ['Open 24 Hours', 'Evening Snacks'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'adaaran-select-meedhupparu',
    name: 'Adaaran Select Meedhupparu',
    slug: 'adaaran-select-meedhupparu',
    type: AccommodationType.RESORT,
    atoll: 'Raa Atoll',
    priceRange: '$$$',
    rating: 4,
    shortDescription: 'A mature island hideaway in the Raa Atoll with 24-hour Premium All-Inclusive.',
    description: 'Your exquisite personal hideaway in the Maldives, Adaaran Select Meedhupparu is an island escape like no other. A mature island presenting plenty of sun, sea, sand and palm trees, the vast island is the perfect base to explore the Indian Ocean, partake in exhilarating fun activities, dine to your hearts content and unwind to recuperate.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Mandara Spa', 'Kids Club', 'Dive Center', 'Premium All-Inclusive', 'Private Plunge Pool (Select Categories)'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Island life full of breathtaking experiences.',
    roomTypes: [
      { name: 'Beach Villa', size: '51 sqm', capacity: '3 Adults', description: 'Classic island villa located steps from the beach.', highlights: ['Outdoor Shower', 'AC', 'Mini Bar'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Deluxe Jacuzzi Beach Villa', size: '51 sqm', capacity: '3 Adults', description: 'Beachfront villa featuring a private Jacuzzi.', highlights: ['Private Jacuzzi', 'Beach Access'], image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' },
      { name: 'Meedhupparu Residence with Pool', size: '158 sqm', capacity: '2 Adults', description: 'The peak of privacy and luxury with its own private pool.', highlights: ['Private Plunge Pool', 'Expansive Deck'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Jaafaiy Restaurant', cuisine: 'International Buffet', vibe: 'Spacious', description: 'Main buffet restaurant serving a variety of international dishes.', highlights: ['Breakfast: 07:30 - 09:30', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Thavaa Restaurant', cuisine: 'Mediterranean', vibe: 'Elegant', description: 'Enjoy flavors of the Mediterranean with ocean views.', highlights: ['Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Café Mass', cuisine: 'Street Food', vibe: 'Social', description: 'A laid-back venue for casual dining and street food.', highlights: ['Open 24 Hours'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Albino Bar', cuisine: 'Cocktails', vibe: 'Trendy', description: 'Specialized bar offering a wide range of exotic cocktails.', highlights: ['Open 09:00 - 00:00'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  ...[
    { name: 'Soneva Jani', atoll: 'Noonu Atoll', price: '$$$$+' },
    { name: 'JOALI Maldives', atoll: 'Raa Atoll', price: '$$$$+' },
    { name: 'Anantara Kihavah', atoll: 'Baa Atoll', price: '$$$$+' },
    { name: 'Waldorf Astoria Ithaafushi', atoll: 'South Male Atoll', price: '$$$$+' },
    { name: 'One&Only Reethi Rah', atoll: 'North Male Atoll', price: '$$$$+' }
  ].map(item => ({
    id: slugify(item.name),
    name: item.name,
    slug: slugify(item.name),
    type: AccommodationType.RESORT,
    atoll: item.atoll,
    priceRange: item.price,
    rating: 5,
    shortDescription: `A premier escape located in the beautiful ${item.atoll}.`,
    description: `Experience the pinnacle of Maldivian hospitality at ${item.name}. This sanctuary in ${item.atoll} offers an unparalleled blend of luxury, privacy, and natural beauty.`,
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Overwater Villas', 'Marine Biology Center', 'Signature Dining', 'Spa & Wellness'],
    transfers: [TransferType.SEAPLANE, TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.HALF_BOARD],
    uvp: `The ultimate definition of ${item.atoll} luxury.`,
    roomTypes: [
      { name: 'Ocean Villa with Pool', size: '150 sqm', capacity: '2 Adults', description: 'Suspended over the turquoise lagoon with panoramic views.', highlights: ['Glass Floor', 'Direct Lagoon Access'], image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Signature Kitchen', cuisine: 'Fine Dining', vibe: 'Coastal', description: 'Freshly caught treasures served under the stars.', highlights: ['Fresh Catch', 'Oceanfront'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
    ]
  }))
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
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Sandbank Soirée',
    description: 'A private dining experience on a disappearing sandbank.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    category: 'Culinary'
  },
  {
    id: 'exp-2',
    title: 'Dolphin Safari',
    description: 'Witness playful dolphins in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of the Seaplane',
    slug: 'art-of-the-seaplane',
    excerpt: 'How the worlds largest seaplane fleet defines luxury.',
    content: 'The Maldives is more than just luxury; it\'s a feeling of weightlessness.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2024-05-15',
    author: 'Elena Rossi',
    category: 'Dispatch'
  }
];
