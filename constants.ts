import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

/**
 * HELPER: Simple Slugify
 */
const slugify = (text: string) => text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

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
      { name: 'Sunset Villa', size: '95 sqm', capacity: '3 Adults', description: 'Bask in the golden hour from your private deck over the turquoise lagoon.', highlights: ['Plunge Pool', 'Rain shower', 'DVD Player'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200' }
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
    description: 'Adaaran Prestige Water Villas, an oasis of tranquillity and relaxation in the exotic setting of the Maldive Islands, captivates the discerning traveler with exquisitely designed wooden interiors, private sundecks, and personal Jacuzzis.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Personalized butler service', 'Private Jacuzzi on the deck', 'Mandara Spa Access', 'Pillow menu', 'Wireless Bluetooth speaker'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Luxury wooden interiors with blue crystal ocean water right in front of you.',
    roomTypes: [
      { name: 'Water Villa', size: '84 sqm', capacity: '2 Adults', description: 'Exquisite overwater sanctuary featuring a sun deck and private Jacuzzi.', highlights: ['Personalized Butler', 'Private Jacuzzi', 'Sound System', 'Pillow Menu'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Jaafaiy Restaurant', cuisine: 'International Buffet', vibe: 'Grand', description: 'The main restaurant serving an extensive array of global delicacies.', highlights: ['Breakfast: 07.30 a.m - 09.30 a.m', 'Lunch: 12.30 p.m - 02.30 p.m', 'Dinner: 07.30 p.m - 09.30 p.m'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
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
    shortDescription: 'The ultimate surf island experience in the Maldives.',
    description: 'Experience a holiday in the tropics beyond compare at Adaaran Select Hudhuran Fushi. Blessed with thriving vegetation & pristine waters, the Island of White Gold finds itself in peaceful seclusion in the North Male Atoll, making it one of the best resorts in Maldives. The resort is particularly famous for being a world-class surfing destination with a private left break.',
    images: ['https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200'],
    features: ['World-class Surfing', 'Tennis Court', 'Squash', 'Table Tennis', 'Badminton', 'Beach Volleyball', 'Scuba Diving'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Surf world-class waves and relax in an island of white gold.',
    roomTypes: [
      { name: 'Lohis Villa', description: 'Just steps away from the famous Lohis surf break, perfect for wave seekers.', highlights: ['Surf Access', 'Beach Front', 'Outdoor Shower'], image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Banyan Restaurant', cuisine: 'International', vibe: 'Casual', description: 'Main restaurant offering buffet meals with a wide variety of choices.', highlights: ['Buffet Style', 'Open Air'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
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
    shortDescription: 'A mature island sanctuary offering premium all-inclusive luxury.',
    description: 'Settled under the shade of mature trees on a lush island, Adaaran Select Meedhupparu is a tranquil sanctuary in the Raa Atoll. Offering a premium all-inclusive experience, the resort is perfect for families, couples, and divers seeking a vibrant house reef and diverse dining options.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['Premium All-Inclusive', 'Ayurvedic Spa', 'Vibrant House Reef', 'Water Sports Centre', 'Fitness Centre'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Lush vegetation and crystal clear waters on a mature island.',
    roomTypes: [
      { name: 'Beach Villa', description: 'Nestled amidst lush greenery with direct access to the white sandy beach.', highlights: ['Beachfront', 'Private Terrace', 'Mini Bar'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Jaafaiy Main Restaurant', cuisine: 'Global', vibe: 'Bustling', description: 'Extensive buffets serving flavors from around the world.', highlights: ['Themed Nights', 'Live Cooking'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
    ]
  }
];

export const OFFERS: Offer[] = [
  {
    id: 'early-bird-vadoo',
    title: 'Early Bird Privilege',
    discount: '25% OFF',
    resortName: 'Adaaran Prestige Vadoo',
    expiryDate: '2026-12-31',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    category: 'Early Bird'
  },
  {
    id: 'honeymoon-serenity',
    title: 'Honeymoon Serenity',
    discount: '30% OFF',
    resortName: 'Adaaran Prestige Water Villas',
    expiryDate: '2026-11-30',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    category: 'Honeymoon'
  },
  {
    id: 'last-minute-meedhupparu',
    title: 'Tropical Last Minute',
    discount: '20% OFF',
    resortName: 'Adaaran Select Meedhupparu',
    expiryDate: '2026-08-31',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
    category: 'Last Minute'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'sandbank-dining',
    title: 'Private Sandbank Soirée',
    description: 'A secluded escape for two on a ribbon of white sand surrounded by nothing but the azure Indian Ocean. Champagne, starlit skies, and a bespoke menu curated by our private chefs.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200',
    category: 'Culinary'
  },
  {
    id: 'manta-safari',
    title: 'Baa Atoll Manta Safari',
    description: 'Dive into the UNESCO Biosphere Reserve and witness the rhythmic dance of hundreds of manta rays at Hanifaru Bay. An unforgettable encounter with the ocean\'s most graceful giants.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'dispatch-01',
    title: 'The Rise of Regenerative Tourism',
    slug: 'rise-of-regenerative-tourism',
    excerpt: 'Beyond sustainability, the Maldives is embracing a new era of travel that actively restores our delicate coral ecosystems.',
    content: 'Regenerative tourism is the next evolution of sustainable travel. It doesn’t just aim to "do no harm"; it aims to leave the destination better than it was found. In the Maldives, this means resort-led coral nurseries, guest-participated reef restoration projects, and zero-waste initiatives that transform organic waste into island-grown nutrients.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2026-05-15',
    author: 'Elena Rossi',
    category: 'Dispatch',
    is_featured: true
  },
  {
    id: 'guide-01',
    title: 'A Guide to Private Island Buyouts',
    slug: 'guide-private-island-buyouts',
    excerpt: 'Ultimate seclusion for those who demand the entire archipelago to themselves.',
    content: 'For the ultimate in privacy, several Maldivian resorts now offer full island buyouts. This allows guests to control every aspect of their stay, from the dining menus to the operational hours of the spa. We look at the top five islands currently available for exclusive takeover.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    date: '2026-04-10',
    author: 'Markus Weber',
    category: 'Guide'
  },
  {
    id: 'dispatch-02',
    title: 'Michelin Stars Over the Indian Ocean',
    slug: 'michelin-stars-maldives',
    excerpt: 'The Maldives is becoming a global culinary hotspot, attracting the world\'s most decorated chefs for seasonal residencies.',
    content: 'From underwater dining rooms to treehouse bistros, the culinary scene in the Maldives has reached new heights. In 2024, several resorts have announced partnerships with Michelin-starred chefs, bringing refined gastronomy to the remote atolls.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    date: '2026-03-22',
    author: 'Elena Rossi',
    category: 'Dispatch'
  },
  {
    id: 'update-01',
    title: 'Seaplane Network Expansion for 2026',
    slug: 'seaplane-network-expansion',
    excerpt: 'New routes and modern fleets make reaching remote atolls faster and more comfortable than ever.',
    content: 'Trans Maldivian Airways and Manta Air have announced a joint expansion project to include 15 new floating platforms in the southern atolls, significantly reducing transit times for luxury travelers heading to the most secluded retreats.',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200',
    date: '2026-02-15',
    author: 'Admin',
    category: 'Update'
  },
  {
    id: 'dispatch-03',
    title: 'The Art of the Sandbank Soirée',
    slug: 'art-of-sandbank-soiree',
    excerpt: 'The definitive Maldivian experience: a private dinner on a ribbon of sand, appearing only at low tide.',
    content: 'There is no setting more romantic or exclusive than a private sandbank. As the tide recedes, a temporary stage is set for a dining experience like no other. We explore the logistics and the magic behind these bespoke events.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200',
    date: '2026-01-05',
    author: 'Markus Weber',
    category: 'Dispatch'
  },
  {
    id: 'guide-02',
    title: 'Maldives Architecture: Circularity and Sea',
    slug: 'maldives-architecture-circularity',
    excerpt: 'How the latest resorts are blending traditional Maldivian craftsmanship with futuristic circular design.',
    content: 'Modern Maldivian architecture is moving away from the traditional rustic look towards a sleek, minimalist aesthetic that emphasizes circularity and integration with the reef. Projects like the Ritz-Carlton Fari Islands are leading the way.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2025-12-12',
    author: 'Elena Rossi',
    category: 'Guide'
  },
  {
    id: 'tip-01',
    title: 'Packing for the Atolls: A Curated Edit',
    slug: 'packing-for-the-atolls',
    excerpt: 'The "Barefoot Luxury" dress code explained, along with the essential kit for a Maldivian escape.',
    content: 'Less is more when visiting the Maldives. We provide a curated list of essentials, focusing on sustainable fabrics, high-quality swimwear, and why you should leave your shoes in the suitcase.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200',
    date: '2025-11-20',
    author: 'Elena Rossi',
    category: 'Tip'
  },
  {
    id: 'dispatch-04',
    title: 'Diving with Gentle Giants: Baa Atoll',
    slug: 'diving-gentle-giants-baa-atoll',
    excerpt: 'A firsthand account of the annual Manta Ray aggregation in the UNESCO Biosphere Reserve.',
    content: 'Hanifaru Bay remains the world\'s premiere destination for Manta Ray encounters. Our team spent a week documenting the feeding frenzies that occur during the lunar tides of the monsoon season.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2025-10-30',
    author: 'Markus Weber',
    category: 'Dispatch'
  },
  {
    id: 'dispatch-05',
    title: 'The Wellness Retreats of 2026',
    slug: 'wellness-retreats-2026',
    excerpt: 'Holistic healing meets island seclusion in the newest wave of Maldivian wellness sanctuaries.',
    content: 'From bio-hacking labs to ancient Ayurvedic practices, Maldivian resorts are redefining what it means to go on a wellness retreat. We visit three islands that offer bespoke health protocols for the modern traveler.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200',
    date: '2025-09-15',
    author: 'Elena Rossi',
    category: 'Dispatch'
  },
  {
    id: 'guide-03',
    title: 'Sustainable Surfing in the North Male Atoll',
    slug: 'sustainable-surfing-north-male',
    excerpt: 'Chasing the perfect left at Lohis and how surf tourism is supporting local reef health.',
    content: 'The Maldives is a surfer\'s paradise, but the impact on the environment is a growing concern. We look at how resorts like Hudhuran Fushi are leading the way in sustainable surf tourism.',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    date: '2025-08-05',
    author: 'Admin',
    category: 'Guide'
  }
];
