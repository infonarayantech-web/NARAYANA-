import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DeviceSelector } from './components/DeviceSelector';
import { ServicesSection } from './components/ServicesSection';
import { RepairCalculator } from './components/RepairCalculator';
import { HowItWorks } from './components/HowItWorks';
import { ComparisonTable } from './components/ComparisonTable';
import { QualityControlSection } from './components/QualityControlSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TrackRepairModal } from './components/TrackRepairModal';
import { FloatingActions } from './components/FloatingActions';
import { CITIES, INITIAL_DEMO_BOOKINGS } from './data/repairData';
import { CityLocation, Booking, DeviceModel, RepairService } from './types';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(() => {
    const saved = localStorage.getItem('narayantech_city');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return CITIES[0]; // Gurugram
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('narayantech_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerTargetId, setTrackerTargetId] = useState<string>('');

  // Booking prefill data
  const [bookingPrefill, setBookingPrefill] = useState<{
    brand: string;
    model: string;
    issues: string[];
    partQuality: 'oem' | 'standard';
    totalPrice: number;
  }>({
    brand: 'Apple iPhone',
    model: 'iPhone 14 Pro',
    issues: ['Screen / Display Replacement'],
    partQuality: 'oem',
    totalPrice: 3200,
  });

  // Persist city and bookings
  useEffect(() => {
    localStorage.setItem('narayantech_city', JSON.stringify(selectedCity));
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem('narayantech_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero quick book handler
  const handleQuickBook = (brand: string, model: string, issue: string, estimatedPrice: number) => {
    setBookingPrefill({
      brand,
      model,
      issues: [issue],
      partQuality: 'oem',
      totalPrice: estimatedPrice,
    });
    setIsBookingOpen(true);
  };

  // Model select handler from catalog
  const handleSelectModel = (model: DeviceModel) => {
    setBookingPrefill({
      brand: model.category === 'tablet' ? 'Apple iPad' : model.category === 'laptop' ? 'Laptop' : 'Apple iPhone',
      model: model.name,
      issues: ['Screen / Display Replacement'],
      partQuality: 'oem',
      totalPrice: Math.round(model.basePrice * 1.0),
    });
    setIsBookingOpen(true);
  };

  // Service select handler
  const handleSelectService = (service: RepairService) => {
    setBookingPrefill(prev => ({
      ...prev,
      issues: [service.name],
      totalPrice: Math.round(2800 * service.oemPriceMultiplier),
    }));
    setIsBookingOpen(true);
  };

  // Calculator booking confirmation
  const handleCalculatorBooking = (
    brandName: string,
    modelName: string,
    issues: string[],
    partQuality: 'oem' | 'standard',
    totalPrice: number
  ) => {
    setBookingPrefill({
      brand: brandName,
      model: modelName,
      issues,
      partQuality,
      totalPrice,
    });
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleOpenTrackerWithId = (id: string) => {
    setTrackerTargetId(id);
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white pb-14 sm:pb-0">
      
      {/* Top Bar and Header */}
      <Header
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracker={() => {
          setTrackerTargetId('');
          setIsTrackerOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section with Quick Price Estimator */}
        <Hero
          onQuickBook={handleQuickBook}
          onExploreModels={() => handleNavigateSection('device-selector')}
        />

        {/* Device Selection Catalog */}
        <DeviceSelector
          onSelectModel={handleSelectModel}
        />

        {/* Core Services Spotlight */}
        <ServicesSection
          onSelectService={handleSelectService}
        />

        {/* Interactive Pricing Matrix & Multi-fault Calculator */}
        <RepairCalculator
          onConfirmBooking={handleCalculatorBooking}
        />

        {/* 4-Step Doorstep How-It-Works */}
        <HowItWorks
          onStartBooking={() => setIsBookingOpen(true)}
        />

        {/* Comparison Table: NARAYANTECH vs Others */}
        <ComparisonTable />

        {/* 48-Point Diagnostic QC App Feature */}
        <QualityControlSection />

        {/* Customer Reviews & Google Rating */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />

      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenTracker={() => {
          setTrackerTargetId('');
          setIsTrackerOpen(true);
        }}
      />

      {/* Floating Call & WhatsApp & Mobile CTA */}
      <FloatingActions
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingPrefill}
        selectedCity={selectedCity}
        onBookingSuccess={handleBookingSuccess}
        onOpenTrackerWithId={handleOpenTrackerWithId}
      />

      {/* Live Track Repair Modal */}
      <TrackRepairModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        bookings={bookings}
        prefilledId={trackerTargetId}
      />

    </div>
  );
}
