
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, Experience, BlogPost } from './types';

export const OFFERS: Offer[] = [
  {
    id: 'off-1',
    resortId: '739a8c14-2391-4d32-8456-789012345678',
    resortSlug: 'adaaran-prestige-vadoo',
    resortName: 'Villa Park Maldives Resort',
    roomCategory: 'Sunset Deluxe Beach Villa',
    title: 'Romance and Relaxation | 25% off | All-Inclusive',
    discount: '25% OFF',
    nights: 7,
    price: 3472,
    priceSubtext: 'for 2 adults',
    rating: 5,
    expiryDate: '2026-12-31',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    category: 'Honeymoon'
  },
  {
    id: 'off-2',
    resortId: 'res-nautica',
    resortSlug: 'villa-nautica',
    resortName: 'Villa Nautica',
    roomCategory: 'Deluxe Beach Pool Villa',
    title: 'Easter Holiday at Villa Nautica with All-Inclusive Infinity & Transfer Included',
    discount: 'SPECIAL',
    nights: 5,
    price: 10500,
    priceSubtext: 'rate is for family of 3',
    rating: 5,
    expiryDate: '2026-04-30',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200',
    category: 'Early Bird'
  },
  {
    id: 'off-3',
    resortId: 'res-intercon',
    resortSlug: 'intercontinental-maldives',
    resortName: 'InterContinental Maldives Maamunagau Resort',
    roomCategory: 'One Bedroom Lagoon Pool Villa',
    title: "Valentine's Deal | 40% off | InterContinental Maldives | All-Inclusive | with seaplane transfers",
    discount: '40% OFF',
    nights: 5,
    price: 10952,
    priceSubtext: 'for 2 adults',
    rating: 5,
    expiryDate: '2026-02-28',
    image: 'https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=1200',
    category: 'Last Minute'
  },
  {
    id: 'off-4',
    resortId: 'res-finolhu',
    resortSlug: 'seaside-finolhu',
    resortName: 'Seaside Finolhu Baa Atoll Maldives',
    roomCategory: 'Lagoon Villa',
    title: 'New Year Sale | May - September 2026 | 35% Discount and Free Half Board | Finolhu, A Seaside Collection Resort',
    discount: '35% OFF',
    nights: 7,
    price: 6731,
    priceSubtext: 'for 2 adults',
    rating: 5,
    expiryDate: '2026-09-30',
    image: 'https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=1200',
    category: 'Early Bird'
  }
];

export const RESORTS: Accommodation[] = [
  {
    id: '739a8c14-2391-4d32-8456-789012345678',
    name: 'Adaaran Prestige Vadoo',
    slug: 'adaaran-prestige-vadoo',
    type: AccommodationType.RESORT,
    atoll: 'South Male Atoll',
    priceRange: '$$$$',
    rating: 5,
    shortDescription: 'An intimate overwater affair featuring private jacuzzis and butler service.',
    description: 'Adaaran Prestige Vadoo transcends the tropical Maldivian experience to an intimate affair with overwater villas with private jacuzzis, plunge pools and butler services. Strategically located at the gateway to the South Atolls, the resort possesses its own exotic reef teeming with vibrant aquatic flora and fauna.',
    images: ['https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200'],
    features: ['Overwater Villas', 'Private Jacuzzi', 'Butler Service', 'House Reef'],
    transfers: [TransferType.SPEEDBOAT],
    mealPlans: [MealPlan.ALL_INCLUSIVE],
    uvp: 'Defined by intimacy.'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Whale Shark Safari',
    description: 'Swim alongside the gentle giants of the ocean in South Ari Atoll.',
    image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=1200',
    category: 'Adventure'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Art of the Seaplane',
    slug: 'art-of-the-seaplane',
    excerpt: 'Discover why the journey to your island is as magical as the stay itself.',
    content: 'The Maldivian archipelago is best viewed from above...',
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200',
    date: '2024-05-25',
    author: 'Elena Rossi',
    category: 'Dispatch'
  }
];
