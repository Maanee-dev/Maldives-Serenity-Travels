import React from 'react';
import { Metadata } from 'next';
import PlanMyTrip from '@/components/PlanMyTrip';

export const metadata: Metadata = {
  title: "Plan Your Escape | Serenity Maldives",
  description: "Curate your perfect Maldivian journey with our bespoke planning concierge.",
};

export default function PlanPage() {
  return <PlanMyTrip />;
}
