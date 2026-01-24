
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

/**
 * HELPER: Simple Slugify
 */
const slugify = (text: string) => text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

/**
 * THE PORTFOLIO
 * An exhaustive collection of Maldivian resorts and guest houses.
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
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.FULL_BOARD],
    uvp: 'The picture-perfect romantic getaway in the tropics.',
    roomTypes: [
      { name: 'Sunrise Villa', size: '95 sqm', capacity: '3 Adults', description: 'Overwater luxury featuring a private sundeck and plunge pool with sunrise views.', highlights: ['Private Jacuzzi', 'Glass floor panel', '24-hour butler'], image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sunset Villa', size: '95 sqm', capacity: '3 Adults', description: 'Bask in the golden hour from your private deck over the turquoise lagoon.', highlights: ['Plunge Pool', 'Rain shower', 'DVD Player'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' },
      { name: 'Overwater Villa', size: '95 sqm', capacity: '3 Adults', description: 'The signature Vadoo experience suspended above a rich underwater paradise.', highlights: ['Jacuzzi', 'Mini bar', 'Sundeck'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' },
      { name: 'Honeymoon Villa', size: '110 sqm', capacity: '2 Adults', description: 'Ultimate romantic escape with extra space and absolute privacy for couples.', highlights: ['Large Sundeck', 'Exclusive Amenities', 'Privacy'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Farivalhu Fine Dining', cuisine: 'International', vibe: 'Refined', description: 'Exquisite set menus and à la carte dining overlooking the ocean.', highlights: ['Breakfast: 06:30 - 10:00', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 22:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Kithajima Restaurant', cuisine: 'Japanese', vibe: 'Sophisticated', description: 'Authentic Japanese flavors served in an intimate, traditional setting.', highlights: ['Dinner: 07:30 p.m - 10:30 p.m'], image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Kandolhi Bar', cuisine: 'Spirits & Cocktails', vibe: 'Social', description: 'A perfect spot for sunset cocktails and premium spirits.', highlights: ['08.00 a.m - 12.00 a.m'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Dhoni Bar', cuisine: 'Spirits & Cocktails', vibe: 'Social', description: 'Traditional Dhoni-shaped bar offering tropical refreshments.', highlights: ['10.00 a.m - 05.00 p.m', '08.30 p.m - 12.00 a.m'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
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
    shortDescription: 'An oasis of tranquillity and relaxation in a rich underwater paradise.',
    description: 'Adaaran Prestige Water Villas, an oasis of tranquillity and relaxation in the exotic setting of the Maldive Islands, never fails to captivate discerning travellers. The delights of an idyllic tropical setting – sparkling turquoise seas and immaculate white beaches – may all be experienced at this fine resort.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Personalized Butler', 'Private Jacuzzi on Deck', 'Mandara Spa', 'Pillow Menu', 'Rich House Reef'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Luxury wooden interiors with spacious accommodation and blue crystal water.',
    roomTypes: [
      { name: 'Water Villa', size: '84 sqm', capacity: '2 Adults', description: 'Exquisite interior with its own sun deck and private Jacuzzi.', highlights: ['Butler Service', 'Private Jacuzzi', 'Glass floor panel'], image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Water Villa Restaurant', cuisine: 'A la carte', vibe: 'Exclusive', description: 'Fine dining exclusively for water villa guests.', highlights: ['Breakfast: 06:30 - 12:00', 'Lunch: 12:00 - 14:30', 'Dinner: 18:00 - 22:00'], image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Jaafaiy Restaurant', cuisine: 'International Buffet', vibe: 'Casual', description: 'Main buffet restaurant serving global delicacies.', highlights: ['Breakfast: 07:30 - 09:30', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sufura Restaurant', cuisine: 'Indian', vibe: 'Authentic', description: 'Authentic Indian cuisine prepared by specialty chefs.', highlights: ['Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'adaaran-select-hudhuran-fushi',
    name: 'Adaaran Select Hudhuran Fushi',
    slug: 'adaaran-select-hudhuran-fushi',
    type: AccommodationType.RESORT,
    atoll: 'North Male Atoll',
    priceRange: '$$$$',
    rating: 4,
    shortDescription: 'The "Surf Island" of the Maldives with 24-hour Premium All-Inclusive.',
    description: 'An unforgettable holiday experience in the tropical paradise of the Maldives, surrounded by thriving vegetation and pristine waters. "Surf Island", Adaaran Select Hudhuran Fushi is an escape for the soul, offering one of the best surf holiday resorts with a perfect left breaking down one side of the island.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['Lohis Surf Break', '24-hour Premium All-Inclusive', 'Tennis & Squash', 'Kiddies Pool', 'Animation Activities'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'The ideal holiday for surfers and adrenaline junkies.',
    roomTypes: [
      { name: 'Garden Villa', size: '43 sqm', capacity: '3 Adults', description: 'Set amidst lush greenery for ultimate seclusion.', highlights: ['Easy beach access', 'AC', 'Mini bar'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Lohis Villa', size: '43 sqm', capacity: '3 Adults', description: 'Designed exclusively for surfers, just a 20 second walk to the surf.', highlights: ['Surf Access', 'Terrace', 'Bathtub'], image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800' },
      { name: 'Beach Villa', size: '59.4 sqm', capacity: '3 Adults', description: 'Directly overlooking the pristine Maldivian beach.', highlights: ['Beachfront', 'Outdoor Shower'], image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sunrise Ocean Villa', size: '64 sqm', capacity: '3 Adults', description: 'Luxury overwater living with sunrise views.', highlights: ['Private Deck', 'Ocean View'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Banyan Restaurant', cuisine: 'International Buffet', vibe: 'Lively', description: 'Main restaurant with themed buffet nights.', highlights: ['Breakfast: 07:30 - 09:30', 'Lunch: 12:30 - 14:30', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sunset Restaurant', cuisine: 'International', vibe: 'Romantic', description: 'Exclusive for ocean villa guests with a la carte options.', highlights: ['Breakfast: 07:30 - 10:00', 'Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Lohis Wave', cuisine: 'Buffet & Pizza', vibe: 'Casual', description: 'Serving international buffet and special oven-baked pizza.', highlights: ['Oven baked pizza: 10:00 - 22:00'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'adaaran-select-meedhupparu',
    name: 'Adaaran Select Meedhupparu',
    slug: 'adaaran-select-meedhupparu',
    type: AccommodationType.RESORT,
    atoll: 'Raa Atoll',
    priceRange: '$$$$',
    rating: 4,
    shortDescription: 'A mature island sanctuary offering breathtaking experiences.',
    description: 'Adaaran Select Meedhupparu is an island escape like no other, offering a 24-hour Premium All-Inclusive experience. A mature island presenting plenty of sun, sea, and palm trees, it is the perfect base to explore the Indian Ocean and partake in exhilarating fun activities.',
    images: ['https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=1200'],
    features: ['Mandara Spa', '221 Well-appointed Villas', 'Meedhupparu Residence', 'Dive Center', 'Kids Club'],
    transfers: [TransferType.SEAPLANE, TransferType.DOMESTIC_FLIGHT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Your exquisite personal hideaway in the Raa Atoll.',
    roomTypes: [
      { name: 'Beach Villa', size: '51 sqm', capacity: '3 Adults', description: 'Classic Maldivian beach villas just steps from the shore.', highlights: ['Outdoor shower', 'Bathtub'], image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' },
      { name: 'Meedhupparu Residence with Pool', size: '158 sqm', capacity: '2 Adults', description: 'The peak of luxury on the island with a private pool.', highlights: ['Private Pool', 'Large Terrace'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Jaafaiy Restaurant', cuisine: 'International Buffet', vibe: 'Grand', description: 'Main dining hall with a wide range of global cuisines.', highlights: ['24-hour snacks at Cafe Mass'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
      { name: 'Sufura Restaurant', cuisine: 'Indian', vibe: 'Traditional', description: 'Signature Indian dining in a warm, welcoming setting.', highlights: ['Dinner: 19:30 - 21:30'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
      { name: 'Thavaa Restaurant', cuisine: 'Mediterranean', vibe: 'Coastal', description: 'Mediterranean flavors with stunning ocean views.', highlights: ['Lunch: 12:30 - 14:30'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
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
    shortDescription: 'A sanctuary of overwater imagination with retractable roofs.',
    description: 'Soneva Jani is one of the world\'s lowest density resorts. Located in the Medhufaru lagoon in the Noonu Atoll, the resort features overwater villas with retractable roofs to stargaze from the master bedroom.',
    images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200'],
    features: ['Retractable Roofs', 'Water Slides', 'Organic Gardens', 'Observatory'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.FULL_BOARD],
    uvp: 'Inspiring a lifetime of rare experiences.',
    roomTypes: [
      { name: '1BR Water Retreat with Slide', size: '411 sqm', capacity: '2 Adults + 2 Children', description: 'Featuring a private pool and water slide into the lagoon.', highlights: ['Water Slide', 'Retractable Roof'], image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'The Gathering', cuisine: 'Organic', vibe: 'Relaxed', description: 'The heart of the resort, offering fresh juices to wood-fired pizzas.', highlights: ['Sustainable', 'Lagoon Views'], image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  {
    id: 'joali-maldives',
    name: 'JOALI Maldives',
    slug: 'joali-maldives',
    type: AccommodationType.RESORT,
    atoll: 'Raa Atoll',
    priceRange: '$$$$+',
    rating: 5,
    shortDescription: 'The Maldives first art-immersive luxury resort.',
    description: 'JOALI Maldives is a luxury island retreat that celebrates the "Joy of Living". Located on Muravandhoo island, it features curated art pieces and sustainable luxury.',
    images: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200'],
    features: ['Art Studio', 'Herbal Garden', 'Whiskey & Cigar Lounge', 'Marine Biology Lab'],
    transfers: [TransferType.SEAPLANE],
    mealPlans: [MealPlan.HALF_BOARD],
    uvp: 'Experience the Joie de Vivre through art and nature.',
    roomTypes: [
      { name: 'Water Villa with Pool', size: '240 sqm', capacity: '3 Adults', description: 'Artistically designed villas over the turquoise waters.', highlights: ['Private Pool', 'Art Pieces'], image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Saoke', cuisine: 'Japanese', vibe: 'Sophisticated', description: 'Designed by world-renowned architect Noriyoshi Muramatsu.', highlights: ['Kotatsu Seating', 'Sake Selection'], image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  ...[
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
  ].map(item => ({
    id: slugify(item.name),
    name: item.name,
    slug: slugify(item.name),
    type: AccommodationType.RESORT,
    atoll: item.atoll,
    priceRange: item.name.includes('Soneva') || item.name.includes('Four Seasons') || item.name.includes('Ritz') ? '$$$$+' : '$$$$',
    rating: 5,
    shortDescription: `A premier escape located in the beautiful ${item.atoll}.`,
    description: `Experience the pinnacle of Maldivian hospitality at ${item.name}. This sanctuary in ${item.atoll} offers an unparalleled blend of luxury, privacy, and natural beauty.`,
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Overwater Villas', 'Marine Biology Center', 'Signature Dining', 'Spa & Wellness'],
    transfers: [TransferType.SEAPLANE, TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE, MealPlan.HALF_BOARD],
    uvp: `The ultimate definition of ${item.atoll} luxury.`,
    roomTypes: [
      { name: 'Beach Villa with Pool', size: '120 sqm', capacity: '2 Adults + 1 Child', description: 'Step directly from your deck into the soft white sands.', highlights: ['Private Pool', 'Beach Access'], image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Ocean Water Villa', size: '150 sqm', capacity: '2 Adults', description: 'Suspended over the turquoise lagoon with panoramic views.', highlights: ['Glass Floor', 'Direct Lagoon Access'], image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800' }
    ],
    diningVenues: [
      { name: 'Azure Horizon', cuisine: 'Seafood', vibe: 'Coastal', description: 'Freshly caught treasures served under the stars.', highlights: ['Fresh Catch', 'Oceanfront'], image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' }
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
    title: 'Tourist Submarine Dive',
    description: 'Explore the depths of the ocean without getting wet.',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  },
  {
    id: 'exp-3',
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
