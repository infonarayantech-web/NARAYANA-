import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Zap,
  Filter
} from 'lucide-react';
import { BRANDS, MODELS } from '../data/repairData';
import { DeviceModel, DeviceCategory } from '../types';

interface DeviceSelectorProps {
  onSelectModel: (model: DeviceModel) => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({ onSelectModel }) => {
  const [activeBrandId, setActiveBrandId] = useState<string>('apple');
  const [activeCategory, setActiveCategory] = useState<DeviceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter models
  const filteredModels = useMemo(() => {
    return MODELS.filter((model) => {
      // Category check
      if (activeCategory !== 'all' && model.category !== activeCategory) {
        return false;
      }
      // If search query exists, search across all models
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        return model.name.toLowerCase().includes(q);
      }
      // Otherwise filter by active brand
      return model.brandId === activeBrandId;
    });
  }, [activeBrandId, activeCategory, searchQuery]);

  return (
    <section id="device-selector" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Supported Devices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Select Your Device for On-Site Repair
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Certified parts in stock for 100+ phone and tablet models. Doorstep technicians arrive equipped with specialized ESD mobile repair mats and precision tools.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search model (e.g. iPhone 14 Pro, Galaxy S24, OnePlus 12)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-xl w-full sm:w-auto justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('smartphone')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ${
                  activeCategory === 'smartphone'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Smartphones</span>
              </button>
              <button
                onClick={() => setActiveCategory('tablet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ${
                  activeCategory === 'tablet'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-3 h-3" />
                <span>Tablets</span>
              </button>
              <button
                onClick={() => setActiveCategory('laptop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ${
                  activeCategory === 'laptop'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Laptop className="w-3 h-3" />
                <span>Laptops</span>
              </button>
            </div>
          </div>

          {/* Brand Horizontal Carousel / Pills (when not searching) */}
          {!searchQuery && (
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1 pr-2">
                Brands:
              </span>
              {BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrandId(brand.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    activeBrandId === brand.id
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{brand.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Device Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {model.category}
                  </span>
                  <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3 mr-0.5" /> Doorstep Ready
                  </span>
                </div>

                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {model.category === 'tablet' ? (
                      <Tablet className="w-5 h-5" />
                    ) : model.category === 'laptop' ? (
                      <Laptop className="w-5 h-5" />
                    ) : (
                      <Smartphone className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {model.screenType}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 py-2 border-y border-slate-100 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Repairs from:</span>
                    <strong className="text-slate-900 font-bold">
                      ₹{Math.round(model.basePrice * 0.45).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Screen fix time:</span>
                    <span className="font-semibold text-slate-700">~35 Mins</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Warranty:</span>
                    <span className="font-semibold text-emerald-600">Up to 12 Months</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectModel(model)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Select for Repair</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-600 font-medium">No models found matching "{searchQuery}".</p>
            <p className="text-xs text-slate-500 mt-1">
              Don't worry! We repair almost all phone models. Call our engineers directly at <strong className="text-blue-600">+91 98765 43210</strong>.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
