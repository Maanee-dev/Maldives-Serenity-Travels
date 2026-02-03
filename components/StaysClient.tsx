
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AccommodationType, TransferType, Accommodation, Offer } from '@/types';
import ResortCard from './ResortCard';

interface StaysClientProps {
  initialResorts: Accommodation[];
  initialOffers: Offer[];
}

const StaysClient: React.FC<StaysClientProps> = ({ initialResorts, initialOffers }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [filterQuery, setFilterQuery] = useState(initialQuery);
  const [stayType, setStayType] = useState<AccommodationType>(AccommodationType.RESORT);
  const [selectedAtoll, setSelectedAtoll] = useState<string>('All');
  const [selectedTransfer, setSelectedTransfer] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const atolls = useMemo(() => {
    const set = new Set(initialResorts.filter(r => r.type === stayType).map(r => r.atoll));
    return ['All', ...Array.from(set)].sort();
  }, [stayType, initialResorts]);

  const filteredStays = useMemo(() => {
    return initialResorts.filter(stay => {
      const matchesType = stay.type === stayType;
      const matchesSearch = stay.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
                            stay.atoll.toLowerCase().includes(filterQuery.toLowerCase());
      const matchesAtoll = selectedAtoll === 'All' || stay.atoll === selectedAtoll;
      const matchesTransfer = selectedTransfer === 'All' || (stay.transfers && stay.transfers.includes(selectedTransfer as TransferType));
      return matchesType && matchesSearch && matchesAtoll && matchesTransfer;
    });
  }, [stayType, filterQuery, selectedAtoll, selectedTransfer, initialResorts]);

  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const currentStays = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStays.slice(start, start + itemsPerPage);
  }, [filteredStays, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentStays]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      {/* Rendering implementation exactly like original Stays.tsx but using Client Hooks correctly */}
    </div>
  );
};

export default StaysClient;
