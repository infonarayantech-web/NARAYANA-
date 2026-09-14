import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X, 
  Zap,
  CalendarCheck
} from 'lucide-react';
import { CITIES } from '../data/repairData';
import { CityLocation } from '../types';

interface HeaderProps {
  selectedCity: CityLocation;
  onSelectCity: (city: CityLocation) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onSelectCity,
  onOpenBooking,
  onOpenTracker,
  onNavigateSection,
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeQuery.trim()) return;
    const clean = pincodeQuery.trim();
    // Check if in any city's pincodes or matching prefix
    let foundCity = CITIES.find(c => c.pincodes.includes(clean));
    if (!foundCity) {
      if (clean.startsWith('2013')) foundCity = CITIES.find(c => c.id === 'noida');
      else if (clean.startsWith('2010')) foundCity = CITIES.find(c => c.id === 'ghaziabad');
      else if (clean.startsWith('122')) foundCity = CITIES.find(c => c.id === 'gurugram');
      else if (clean.startsWith('110')) foundCity = CITIES.find(c => c.id === 'south-delhi' || c.id === 'west-delhi');
    }

    if (foundCity) {
      onSelectCity(foundCity);
      setPincodeStatus(`Doorstep service is active in ${foundCity.name}! Express 30-45 mins arrival.`);
    } else {
      setPincodeStatus(`Service available via nearby doorstep technician in ${clean}!`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Live in {selectedCity.name}
            </span>
            <span className="hidden sm:inline text-slate-300">
              ⚡ Doorstep Smartphone & iPhone Repair in <strong className="text-amber-400">30-60 Minutes</strong>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-slate-300 text-xs">
            <a 
              href="tel:+918447206098" 
              className="flex items-center hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span className="font-semibold text-white tracking-wide">+91 84472 06098</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden md:flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-blue-400" />
              <span>8:00 AM - 10:00 PM (All 7 Days)</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <a 
              href="mailto:infonarayantech@gmail.com" 
              className="hidden lg:flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <span>infonarayantech@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onNavigateSection('hero')}
              className="flex items-center space-x-2 text-left group focus:outline-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-2xl tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                    NARAYAN<span className="text-blue-600">TECH</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    Fix
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 -mt-0.5 flex items-center">
                  <Zap className="w-3 h-3 text-amber-500 mr-0.5 inline" />
                  Doorstep Device Repair Service
                </p>
              </div>
            </button>

            {/* City Selector Pill */}
            <div className="relative hidden md:block ml-4">
              <button
                id="city-selector-btn"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>{selectedCity.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">Select Your Location</p>
                    <p className="text-[11px] text-slate-500">Doorstep technicians available across:</p>
                  </div>

                  <div className="max-h-56 overflow-y-auto py-1">
                    {CITIES.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          onSelectCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                          selectedCity.id === city.id ? 'bg-blue-50/80 font-bold text-blue-700' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{city.name}</span>
                        </div>
                        {city.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                            {city.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="px-3 pt-2 mt-1 border-t border-slate-100">
                    <form onSubmit={handleCheckPincode} className="flex gap-1">
                      <input
                        type="text"
                        placeholder="Enter 6-digit Pincode"
                        maxLength={6}
                        value={pincodeQuery}
                        onChange={(e) => setPincodeQuery(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 whitespace-nowrap"
                      >
                        Check
                      </button>
                    </form>
                    {pincodeStatus && (
                      <p className="text-[11px] mt-1.5 text-blue-700 font-medium">{pincodeStatus}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700">
            <button 
              onClick={() => onNavigateSection('device-selector')}
              className="hover:text-blue-600 transition-colors"
            >
              Select Device
            </button>
            <button 
              onClick={() => onNavigateSection('services')}
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => onNavigateSection('pricing-calc')}
              className="hover:text-blue-600 transition-colors"
            >
              Pricing Calculator
            </button>
            <button 
              onClick={() => onNavigateSection('how-it-works')}
              className="hover:text-blue-600 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => onNavigateSection('qc-inspection')}
              className="hover:text-blue-600 transition-colors"
            >
              48-Point QC
            </button>
            <button 
              onClick={() => onNavigateSection('reviews')}
              className="hover:text-blue-600 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => onNavigateSection('faqs')}
              className="hover:text-blue-600 transition-colors"
            >
              FAQs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Track Order Button */}
            <button
              id="header-track-btn"
              onClick={onOpenTracker}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs font-bold shadow-xs hover:bg-slate-50 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Track Repair</span>
            </button>

            {/* Book Repair CTA */}
            <button
              id="header-book-btn"
              onClick={onOpenBooking}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Doorstep Repair</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenTracker}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              title="Track Repair"
            >
              <Search className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-1.5 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Current City:</span>
              <strong className="text-slate-900">{selectedCity.name}</strong>
            </div>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const found = CITIES.find(c => c.id === e.target.value);
                if (found) onSelectCity(found);
              }}
              className="text-xs border border-slate-200 rounded-lg p-1 font-semibold text-slate-700"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            <button
              onClick={() => { onNavigateSection('device-selector'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              📱 Select Device
            </button>
            <button
              onClick={() => { onNavigateSection('services'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              🔧 Repair Services
            </button>
            <button
              onClick={() => { onNavigateSection('pricing-calc'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              💰 Price Calculator
            </button>
            <button
              onClick={() => { onNavigateSection('how-it-works'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              ⏱️ How It Works
            </button>
            <button
              onClick={() => { onNavigateSection('qc-inspection'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              🛡️ 48-Point QC Test
            </button>
            <button
              onClick={() => { onNavigateSection('reviews'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-50 text-left hover:bg-blue-50"
            >
              ⭐ Customer Reviews
            </button>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => { onOpenBooking(); setMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm text-center shadow-md shadow-blue-500/20"
            >
              Book Doorstep Repair (30-60 Mins)
            </button>
            <button
              onClick={() => { onOpenTracker(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm text-center bg-slate-50"
            >
              Track Ongoing Repair
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
