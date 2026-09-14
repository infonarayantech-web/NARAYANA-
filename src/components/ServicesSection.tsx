import React from 'react';
import { 
  Smartphone, 
  ShieldAlert, 
  BatteryCharging, 
  Zap, 
  Camera, 
  Layers, 
  Volume2, 
  Droplet, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { REPAIR_SERVICES } from '../data/repairData';
import { RepairService } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: RepairService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-amber-500" />;
      case 'BatteryCharging': return <BatteryCharging className="w-6 h-6 text-emerald-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-purple-600" />;
      case 'Camera': return <Camera className="w-6 h-6 text-rose-500" />;
      case 'Layers': return <Layers className="w-6 h-6 text-indigo-600" />;
      case 'Volume2': return <Volume2 className="w-6 h-6 text-cyan-600" />;
      case 'Droplet': return <Droplet className="w-6 h-6 text-sky-600" />;
      default: return <Smartphone className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
            Professional Doorstep Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight font-['Outfit',sans-serif]">
            What Can We Fix At Your Doorstep?
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            From cracked screens to depleted batteries and broken cameras, 90% of phone faults are solved in under 45 minutes on-site while you watch.
          </p>
        </div>

        {/* Feature Spotlight: Glass-Only vs Full Display (Instafix's Top Selling Proposition) */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Info className="w-3.5 h-3.5" />
                <span>Save Up To 60% On Screen Damage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit',sans-serif]">
                Don't Overpay: Glass Change vs. Full Display
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Most repair centers push for expensive full display replacement even when only your top outer glass is broken. If your touch response is working and there are no black blotches or lines, we can replace just the glass!
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-xs font-bold text-amber-300 uppercase">Option A: Glass-Only Change</span>
                  <p className="text-sm font-semibold text-white mt-1">Saves your original factory OLED</p>
                  <p className="text-xs text-slate-400 mt-0.5">Retains factory colors & TrueTone at ~40-50% lower cost.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                  <span className="text-xs font-bold text-cyan-300 uppercase">Option B: Full OEM Assembly</span>
                  <p className="text-sm font-semibold text-white mt-1">For lines, ink spots, or touch failure</p>
                  <p className="text-xs text-slate-400 mt-0.5">Brand new OEM Grade panel with 12 months instant warranty.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 p-5 sm:p-6 rounded-2xl border border-white/15 backdrop-blur-xs text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-1">
                48-Point QC Guarantee
              </p>
              <h4 className="text-xl font-bold text-white mb-2">Not Sure Which You Need?</h4>
              <p className="text-xs text-slate-300 mb-5">
                Our engineer conducts a non-destructive touch matrix test at your doorstep to recommend the most cost-effective solution.
              </p>
              <button
                onClick={() => {
                  const s = REPAIR_SERVICES.find(x => x.id === 'broken-screen') || REPAIR_SERVICES[0];
                  onSelectService(s);
                }}
                className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-lg"
              >
                Schedule Free Doorstep Inspection
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPAIR_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(service.iconName)}
                </div>

                <div className="flex items-center space-x-1.5 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-700">
                    {service.turnaroundMinutes} Mins Fix
                  </span>
                  {service.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-200/60 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Warranty:
                    </span>
                    <strong className="text-slate-900">{service.warrantyMonths} Months</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-blue-600 mr-1" /> Doorstep:
                    </span>
                    <strong className="text-emerald-600">Available</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectService(service)}
                className="w-full py-2.5 rounded-xl border border-slate-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white text-slate-800 text-xs font-bold transition-all flex items-center justify-center space-x-1"
              >
                <span>Book This Repair</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
