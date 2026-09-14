import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Smartphone, 
  Award, 
  ChevronRight,
  Eye,
  CreditCard
} from 'lucide-react';
import { BRANDS, MODELS, REPAIR_SERVICES } from '../data/repairData';
import { DeviceBrand, DeviceModel, RepairService } from '../types';

interface HeroProps {
  onQuickBook: (brand: string, model: string, issue: string, estimatedPrice: number) => void;
  onExploreModels: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuickBook, onExploreModels }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('apple');
  const [selectedModelId, setSelectedModelId] = useState<string>('iphone-14-pro');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('broken-screen');
  const [partQuality, setPartQuality] = useState<'oem' | 'standard'>('oem');

  // Filter models for selected brand
  const brandModels = MODELS.filter((m) => m.brandId === selectedBrandId);
  const currentModel = brandModels.find((m) => m.id === selectedModelId) || brandModels[0];
  const currentIssue = REPAIR_SERVICES.find((s) => s.id === selectedIssueId) || REPAIR_SERVICES[0];

  // Calculate instant price
  const calculatePrice = () => {
    if (!currentModel || !currentIssue) return 1999;
    const mult = partQuality === 'oem' ? currentIssue.oemPriceMultiplier : currentIssue.standardPriceMultiplier;
    return Math.round(currentModel.basePrice * mult);
  };

  const estimatedPrice = calculatePrice();

  const handleBrandChange = (brandId: string) => {
    setSelectedBrandId(brandId);
    const newModels = MODELS.filter((m) => m.brandId === brandId);
    if (newModels.length > 0) {
      setSelectedModelId(newModels[0].id);
    }
  };

  const handleStartBooking = () => {
    const brandObj = BRANDS.find((b) => b.id === selectedBrandId);
    onQuickBook(
      brandObj ? brandObj.name : 'Apple iPhone',
      currentModel ? currentModel.name : 'iPhone 14 Pro',
      currentIssue ? currentIssue.name : 'Screen / Display Replacement',
      estimatedPrice
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background grid and glowing orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>India's Most Trusted Doorstep Repair Startup</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span className="text-white font-bold">18,400+ Repaired</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active in <strong>Noida</strong>, <strong>Ghaziabad</strong> & <strong>Delhi NCR</strong></span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-['Outfit',sans-serif]">
              Doorstep Phone Repair in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                30 to 60 Minutes.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Certified master engineers repair your smartphone, iPhone, or iPad{' '}
              <strong className="text-white font-semibold">right in front of you</strong> at your home or office. 
              Zero data theft risk, genuine OEM parts, and up to{' '}
              <strong className="text-amber-400 font-semibold">1-Year Warranty</strong>.
            </p>

            {/* 4 Core Value Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-left">
                <div className="flex items-center space-x-1.5 text-blue-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Fast Fix</span>
                </div>
                <p className="text-sm font-bold text-white">30-60 Mins</p>
                <p className="text-[11px] text-slate-400">Doorstep arrival</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-left">
                <div className="flex items-center space-x-1.5 text-emerald-400 mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Repair</span>
                </div>
                <p className="text-sm font-bold text-white">100% Privacy</p>
                <p className="text-[11px] text-slate-400">Fixed before you</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-left">
                <div className="flex items-center space-x-1.5 text-amber-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Warranty</span>
                </div>
                <p className="text-sm font-bold text-white">Up to 12 Mo</p>
                <p className="text-[11px] text-slate-400">Instant replace</p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs text-left">
                <div className="flex items-center space-x-1.5 text-purple-400 mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Zero Risk</span>
                </div>
                <p className="text-sm font-bold text-white">Pay After</p>
                <p className="text-[11px] text-slate-400">Verify then pay</p>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <span>★ 4.9 / 5</span>
                <span className="text-slate-400 font-normal">(Google Verified Reviews)</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>48-Point Diagnostic QC App Test</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Free Doorstep Visit</span>
              </div>
            </div>
          </div>

          {/* Right Hero: Instant Repair Price & Booking Card (withinstafix style) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-blue-900/40 border border-slate-100 relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-extrabold tracking-wide uppercase text-blue-600">
                      Instant Repair Estimator
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Select Device & Get Instant Price
                  </h2>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Smartphone className="w-5 h-5" />
                </div>
              </div>

              {/* Step 1: Select Brand */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    1. Select Brand
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {BRANDS.slice(0, 4).map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleBrandChange(brand.id)}
                        className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all border ${
                          selectedBrandId === brand.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {brand.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                  {/* Secondary Brand Select */}
                  <div className="mt-2">
                    <select
                      value={selectedBrandId}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden focus:border-blue-500"
                    >
                      <option disabled>Or choose other brands...</option>
                      {BRANDS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 2: Select Model */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      2. Select Model
                    </label>
                    <button
                      onClick={onExploreModels}
                      className="text-[11px] font-semibold text-blue-600 hover:underline"
                    >
                      Browse all {brandModels.length} models
                    </button>
                  </div>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  >
                    {brandModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.screenType})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Select Issue */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    3. Select Issue
                  </label>
                  <select
                    value={selectedIssueId}
                    onChange={(e) => setSelectedIssueId(e.target.value)}
                    className="w-full text-sm font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
                  >
                    {REPAIR_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.turnaroundMinutes} Mins Fix)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Part Quality Selector */}
                <div className="pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Part Grade:</span>
                    <span className="text-[11px] text-emerald-600 font-bold">100% Guaranteed</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPartQuality('oem')}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                        partQuality === 'oem'
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>Original OEM</span>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${partQuality === 'oem' ? 'text-blue-600' : 'opacity-0'}`} />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">12 Months Warranty • 100% Spec</p>
                    </button>

                    <button
                      onClick={() => setPartQuality('standard')}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                        partQuality === 'standard'
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>Standard High-Grade</span>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${partQuality === 'standard' ? 'text-blue-600' : 'opacity-0'}`} />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">6 Months Warranty • Budget Friendly</p>
                    </button>
                  </div>
                </div>

                {/* Instant Quote Breakdown */}
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                        Estimated Total (All-Inclusive)
                      </p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                          ₹{estimatedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{Math.round(estimatedPrice * 1.35).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Doorstep Visit: FREE
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        ⏱️ ~{currentIssue.turnaroundMinutes} Mins Fix
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                      {partQuality === 'oem' ? '12 Months' : '6 Months'} Doorstep Warranty
                    </span>
                    <span className="text-slate-500 font-medium">Pay only after testing</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  id="hero-book-now-btn"
                  onClick={handleStartBooking}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Book Doorstep Repair</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[11px] text-slate-500 font-medium">
                  🔒 Zero Advance Payment Required • Free Cancellation Anytime
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
