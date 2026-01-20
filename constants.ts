import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

// Helper to generate 6 dummy room types with dynamic resort naming
const generateDummyRooms = (resortName: string) => [
  {
    name: 'Beach Sunrise Villa',
    description: `Wake up to the gentle sounds of the Indian Ocean in this secluded beachfront haven at ${resortName}. Designed with natural textures and open-air spaces.`,
    highlights: ['Direct beach access', 'Private plunge pool', 'Outdoor rain shower'],
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800',
    size: '150 sqm',
    capacity: '2 Adults'
  },
  {
    name: 'Sunset Water Villa with Pool',
    description: 'Perched over the turquoise lagoon, offering unobstructed views of the horizon as the sun dips below the waves. Features a glass floor panel in the living area.',
    highlights: ['Infinity pool', 'Glass floor panel', 'Sunset views'],
    image: 'https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800',
    size: '185 sqm',
    capacity: '2 Adults + 1 Child'
  },
  {
    name: 'Two-Bedroom Family Pavilion',
    description: 'A spacious retreat designed for families, featuring interconnected spaces and a shared private garden with a large family pool.',
    highlights: ['Family-sized pool', 'Butler service', 'Kids amenity kit'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    size: '320 sqm',
    capacity: '4 Adults + 2 Children'
  },
  {
    name: 'Ocean Residence with Water Slide',
    description: 'The ultimate playground for adults and children alike, featuring a signature slide into the crystal lagoon from the second floor.',
    highlights: ['Private water slide', 'Retractable roof', 'Sunken lounge'],
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800',
    size: '450 sqm',
    capacity: '2 Adults + 2 Children'
  },
  {
    name: 'Island Sanctuary Reserve',
    description: 'Hidden deep within the island jungle, this villa offers maximum privacy and an authentic natural experience with a private beach strip.',
    highlights: ['Private jungle garden', 'Dedicated villa host', 'Sustainable design'],
    image: 'https://images.unsplash.com/photo-1506953064870-15873d93f893?auto=format&fit=crop&q=80&w=800',
    size: '500 sqm',
    capacity: '6 Adults'
  },
  {
    name: 'Royal Panoramic Suite',
    description: 'Commanding 360-degree views of the atoll, this suite is the pinnacle of luxury and architectural brilliance with a private gym and spa room.',
    highlights: ['Rooftop terrace', 'Personal gym', 'Chef’s kitchen'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800',
    size: '750 sqm',
    capacity: '4 Adults'
  }
];

// Helper to generate 6 dummy dining venues with dynamic resort naming
const generateDummyDining = (resortName: string) => [
  {
    name: 'Azure Waters',
    cuisine: 'Modern Mediterranean',
    description: 'Al fresco dining with the freshest seafood caught daily from the surrounding reefs, paired with fine Mediterranean wines.',
    highlights: ['Ocean-to-table', 'Sunset views', 'Catch of the day'],
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    vibe: 'Beachfront Chic'
  },
  {
    name: 'Spice Route',
    cuisine: 'Authentic Thai & Indian',
    description: 'A sensory journey through the ancient spice routes, featuring aromatic curries and clay-oven specialties in an exotic setting.',
    highlights: ['Tandoor station', 'Wok-fired favorites', 'Vegetarian focus'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=800',
    vibe: 'Exotic Elegance'
  },
  {
    name: 'The Sandbank Grill',
    cuisine: 'Steakhouse & BBQ',
    description: 'Barefoot luxury at its finest. Enjoy premium cuts of meat and grilled delights on a private sandbank under the stars.',
    highlights: ['Customizable BBQ', 'Toes-in-sand', 'Private dining available'],
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800',
    vibe: 'Romantic Castaway'
  },
  {
    name: 'Indigo Lounge',
    cuisine: 'Tapas & Cocktails',
    description: 'The social heartbeat of the resort. Sip on artisanal cocktails while the DJ spins ambient beats against the sunset.',
    highlights: ['Molecular mixology', 'Gourmet snacks', 'Late-night vibes'],
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800',
    vibe: 'Vibrant Social'
  },
  {
    name: 'Under the Canopy',
    cuisine: 'Organic & Farm-to-Table',
    description: 'Nestled in the island’s vegetable gardens, serving nutritious meals prepared with zero-waste principles and fresh harvest.',
    highlights: ['Hydroponic produce', 'Vegan options', 'Natural wines'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    vibe: 'Sustainable Serenity'
  },
  {
    name: 'Crystallin',
    cuisine: 'Japanese Teppanyaki',
    description: 'Watch our master chefs showcase their skills on the teppan grill in an intimate overwater setting with premium ingredients.',
    highlights: ['A5 Wagyu', 'Chef’s table', 'Sake pairing'],
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800',
    vibe: 'Theatrical Fine Dining'
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
    roomTypes: generateDummyRooms('Anantara Kihavah'),
    diningVenues: generateDummyDining('Anantara Kihavah')
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
    roomTypes: generateDummyRooms('Anantara Dhigu'),
    diningVenues: generateDummyDining('Anantara Dhigu')
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
    roomTypes: generateDummyRooms('Kaani Grand'),
    diningVenues: generateDummyDining('Kaani Grand')
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