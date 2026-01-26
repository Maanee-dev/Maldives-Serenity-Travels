
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS } from '../constants';
import { Accommodation, AccommodationType, TransferType, MealPlan, Offer, RoomType } from '../types';
import ResortCard from '../components/ResortCard';

const INQUIRY_STORAGE_KEY = 'serenity_inquiry_draft';

// Simple Country Data with Flags
const COUNTRIES = [
  { name: 'United Kingdom', code: 'GB', dial: '+44', flag: '🇬🇧' },
  { name: 'United States', code: 'US', dial: '+1', flag: '🇺🇸' },
  { name: 'United Arab Emirates', code: 'AE', dial: '+971', flag: '🇦🇪' },
  { name: 'Germany', code: 'DE', dial: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dial: '+33', flag: '🇫🇷' },
  { name: 'Russia', code: 'RU', dial: '+7', flag: '🇷🇺' },
  { name: 'China', code: 'CN', dial: '+86', flag: '🇨🇳' },
  { name: 'India', code: 'IN', dial: '+91', flag: '🇮🇳' },
  { name: 'Italy', code: 'IT', dial: '+39', flag: '🇮🇹' },
  { name: 'Switzerland', code: 'CH', dial: '+41', flag: '🇨🇭' },
  { name: 'Australia', code: 'AU', dial: '+61', flag: '🇦🇺' },
  { name: 'Maldives', code: 'MV', dial: '+960', flag: '🇲🇻' },
].sort((a, b) => a.name.localeCompare(b.name));

const ResortDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resort, setResort] = useState<Accommodation | null>(null);
  const [allResorts, setAllResorts] = useState<Accommodation[]>([]);
  const [resortOffers, setResortOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Multi-step Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quoteData, setQuoteData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: null as RoomType | null,
    mealPlan: '',
    adults: 2,
    children: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerPhoneCode: '+44',
    customerCountry: 'United Kingdom',
    customerCountryFlag: '🇬🇧',
    notes: ''
  });

  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(INQUIRY_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuoteData(prev => ({
          ...prev,
          customerName: parsed.customerName || '',
          customerEmail: parsed.customerEmail || '',
          customerPhone: parsed.customerPhone || '',
          customerPhoneCode: parsed.customerPhoneCode || '+44',
          customerCountry: parsed.customerCountry || 'United Kingdom',
          customerCountryFlag: parsed.customerCountryFlag || '🇬🇧'
        }));
      } catch (e) {
        console.error("Failed to load inquiry draft:", e);
      }
    }
  }, []);

  // Save contact details to localStorage
  useEffect(() => {
    const dataToSave = {
      customerName: quoteData.customerName,
      customerEmail: quoteData.customerEmail,
      customerPhone: quoteData.customerPhone,
      customerPhoneCode: quoteData.customerPhoneCode,
      customerCountry: quoteData.customerCountry,
      customerCountryFlag: quoteData.customerCountryFlag
    };
    localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [quoteData.customerName, quoteData.customerEmail, quoteData.customerPhone, quoteData.customerCountry]);

  const parseHighlights = (item: any): string[] => {
    if (Array.isArray(item)) return item;
    if (!item) return [];
    try {
      const parsed = typeof item === 'string' ? JSON.parse(item) : item;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  };

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        const { data: allData } = await supabase.from('resorts').select('*');
        if (allData) {
           const mapped = allData.map(item => ({ 
             ...item, 
             priceRange: item.price_range,
             transfers: item.transfers || [],
             mealPlans: item.meal_plans || [],
             roomTypes: item.room_types || [],
             diningVenues: item.dining_venues || [],
             images: item.images || []
           })) as unknown as Accommodation[];
           setAllResorts(mapped.length > 0 ? mapped : RESORTS);
        }

        const { data: resData } = await supabase.from('resorts').select('*').eq('slug', slug).maybeSingle();
        const localBackup = RESORTS.find(r => r.slug === slug);

        if (resData) {
          const mappedResort: Accommodation = {
            id: resData.id,
            name: resData.name,
            slug: resData.slug,
            type: (resData.type || 'RESORT') as AccommodationType,
            atoll: resData.atoll || 'Maldives',
            priceRange: resData.price_range || '$$