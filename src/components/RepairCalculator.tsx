import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  HelpCircle,
  Tag,
  Wrench
} from 'lucide-react';
import { BRANDS, MODELS, REPAIR_SERVICES } from '../data/repairData';
import { DeviceModel } from '../types';

interface RepairCalculatorProps {
  onConfirmBooking: (
    brandName: string, 
    modelName: string, 
    issues: string[], 
    partQuality: 'oem' | 'standard', 
    totalPrice: number
  ) => void;
}

export const RepairCalculator: React.FC<RepairCalculatorProps> = ({ onConfirmBooking }) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>('apple');
  const [selectedModelId, setSelectedModelId] = useState<string>('iphone-14-pro');
  const [selectedIssues, setSelectedIssues] = useState<string[]>(['broken-screen']);
  const [partQuality, setPartQuality] = useState<'oem' | 'standard'>('oem');

  const brandModels = MODELS.filter((m) => m.brandId === selectedBrandId);
  const currentModel = brandModels.find((m) => m.id === selectedModelId) || brandModels[0];

  const handleToggleIssue = (issueId: string) => {
    if (selectedIssues.includes(issueId)) {
      if (selectedIssues.length === 1) return; // Keep at least one
      setSelectedIssues(selectedIssues.filter(id => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  // Pricing calculations
  const calculateItemPrice = (serviceId: string) => {
    const service = REPAIR_SERVICES.find(s => s.id === serviceId);
    if (!service || !currentModel) return 0;
    const mult = partQuality === 'oem' ? service.oemPriceMultiplier : service.standardPriceMultiplier;
    return Math.round(currentModel.basePrice * mult);
  };

  const subtotal = selectedIssues.reduce((sum, id) => sum + calculateItemPrice(id), 0);
  // Multi-issue combo discount (15% off if 2 or more repairs)
  const comboDiscount = selectedIssues.length > 1 ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - comboDiscount;

  const handleProceed = () => {
    const brandObj = BRANDS.find(b => b.id === selectedBrandId);
    const issueNames = selectedIssues.map(id => {
      const s = REPAIR_SERVICES.find(x => x.id === id);
      return s ? s.name : id;
    });

    onConfirmBooking(
      brandObj ? brandObj.name : 'Apple iPhone',
      currentModel ? currentModel.name : 'iPhone 14 Pro',
      issueNames,
      partQuality,
      finalTotal
    );
  };

  return (
    <section id="pricing-calc" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparent Pricing Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Calculate Your Device Repair Cost
          </h2>
          <p className="mt-3 text-base text-slate-600">
            No hidden technician charges, no unexpected surcharges. Pick your device and the exact issues you'd like fixed at your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Device & Issue Configurator */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            
            {/* Step 1: Device Model Selection */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                1. Select Brand & Device Model
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold mb-1 block">Brand</span>
                  <select
                    value={selectedBrandId}
                    onChange={(e) => {
                      setSelectedBrandId(e.target.value);
                      const m = MODELS.filter(x => x.brandId === e.target.value);
                      if (m.length > 0) setSelectedModelId(m[0].id);
                    }}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-blue-500"
                  >
                    {BRANDS.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold mb-1 block">Model</span>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-blue-500"
                  >
                    {brandModels.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Quality Grade */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-3">
                2. Select Quality Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPartQuality('oem')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    partQuality === 'oem'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Grade-A OEM Original</span>
                    <CheckCircle2 className={`w-4 h-4 ${partQuality === 'oem' ? 'text-blue-600' : 'text-slate-300'}`} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">100% factory specifications, colors & peak refresh rate.</p>
                  <div className="mt-2 inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    🛡️ 12 Months Warranty
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPartQuality('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    partQuality === 'standard'
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Standard Premium</span>
                    <CheckCircle2 className={`w-4 h-4 ${partQuality === 'standard' ? 'text-blue-600' : 'text-slate-300'}`} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Cost-effective certified replacement part.</p>
                  <div className="mt-2 inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    🛡️ 6 Months Warranty
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Pick Issues (Multi-select) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  3. Select Issue(s) to Repair
                </label>
                <span className="text-[11px] font-bold text-blue-600">
                  {selectedIssues.length > 1 ? '🎁 15% Combo Discount Applied' : 'Select multiple to save 15%'}
                </span>
              </div>

              <div className="space-y-2">
                {REPAIR_SERVICES.map((service) => {
                  const isChecked = selectedIssues.includes(service.id);
                  const price = calculateItemPrice(service.id);

                  return (
                    <div
                      key={service.id}
                      onClick={() => handleToggleIssue(service.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-blue-500 bg-blue-50/50 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-bold">{service.name}</p>
                          <p className="text-[11px] text-slate-500">~{service.turnaroundMinutes} Mins Fix</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">
                          ₹{price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Transparent Itemized Receipt */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                  Doorstep Estimate
                </span>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
                  {currentModel?.name || 'Selected Device'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                {partQuality === 'oem' ? 'Original OEM' : 'Standard'}
              </span>
            </div>

            {/* Line Items */}
            <div className="py-4 space-y-3 border-b border-slate-100 text-xs">
              {selectedIssues.map((id) => {
                const s = REPAIR_SERVICES.find(x => x.id === id);
                if (!s) return null;
                const price = calculateItemPrice(id);
                return (
                  <div key={id} className="flex items-center justify-between text-slate-700">
                    <span>{s.name}</span>
                    <span className="font-bold text-slate-900">₹{price.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}

              {comboDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span className="flex items-center">
                    <Tag className="w-3.5 h-3.5 mr-1" /> Multi-Issue Combo Discount (15%)
                  </span>
                  <span>- ₹{comboDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center">
                  <Wrench className="w-3.5 h-3.5 text-blue-600 mr-1" /> Doorstep Technician Visit
                </span>
                <span className="font-bold text-emerald-600 uppercase">FREE</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600 mr-1" /> 48-Point Diagnostic QC App
                </span>
                <span className="font-bold text-emerald-600 uppercase">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="py-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                    Total Estimated Amount
                  </p>
                  <p className="text-[11px] text-slate-400">Includes all taxes & warranty</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1.5 mb-6">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Pay After Repair:</strong> Test your device before paying.</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>{partQuality === 'oem' ? '12 Months' : '6 Months'} Warranty:</strong> Digital warranty card issued.</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleProceed}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 transition-all"
            >
              <span>Schedule Doorstep Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
