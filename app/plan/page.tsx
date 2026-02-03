
import React from 'react';
import { Metadata } from 'next';
import PlanMyTrip from '@/pages/PlanMyTrip';

export const metadata: Metadata = {
  title: "Plan Your Escape | Serenity Maldives",
  description: "Curate your perfect Maldivian journey with our bespoke planning concierge.",
};

export default function PlanPage() {
  // Wrapping the existing PlanMyTrip logic or creating a specialized Client component for it
  return <PlanMyTrip />;
}
