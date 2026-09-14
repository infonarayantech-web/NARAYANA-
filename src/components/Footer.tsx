import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Zap,
  Heart
} from 'lucide-react';
import { CITIES } from '../data/repairData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBooking,
  onOpenTracker,
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white font-['Outfit',sans-serif]">
                  NARAYAN<span className="text-blue-500">TECH</span>
                </span>
                <span className="text-[10px] ml-1.5 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300">
                  Fix
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NARAYANTECH is India's premier on-demand doorstep smartphone and gadget repair service. 
              We bring the repair lab to your doorstep with certified engineers, genuine OEM parts, and 
              up to 12 months comprehensive warranty.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <a href="tel:+918447206098" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">+91 84472 06098</span>
              </a>
              <a href="mailto:infonarayantech@gmail.com" className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>infonarayantech@gmail.com</span>
              </a>
              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Doorstep Hubs: Noida (Sector 62/18), Ghaziabad (Indirapuram/Vaishali), Gurugram & Delhi NCR</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Doorstep Hours: 8:00 AM to 10:00 PM (Monday - Sunday)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Repair Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">iPhone Screen Replacement</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">Glass-Only Change (Display OK)</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">0-Cycle Battery Replacement</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">Charging Port & Mic Flex</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">Camera & Lens Replacement</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">Back Glass Laser Removal</button></li>
              <li><button onClick={() => onNavigateSection('services')} className="hover:text-blue-400 transition-colors">Logic Board Diagnostics</button></li>
            </ul>
          </div>

          {/* Col 3: Supported Brands */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Popular Devices
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">Apple iPhone (11 - 15 Pro)</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">Samsung Galaxy (S21 - S24 Ultra)</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">OnePlus (9, 10, 11, 12, Nord)</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">Google Pixel (6, 7, 8 Pro)</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">Xiaomi & Redmi Note</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">Apple iPad & Tablets</button></li>
              <li><button onClick={() => onNavigateSection('device-selector')} className="hover:text-blue-400 transition-colors">MacBook Air & Pro</button></li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Quick Actions
            </h4>
            <div className="space-y-2.5 mb-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs text-center transition-colors shadow-sm"
              >
                Book Doorstep Repair
              </button>
              <button
                onClick={onOpenTracker}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors"
              >
                Track Live Repair
              </button>
            </div>

            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Operational Cities
            </h5>
            <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
              {CITIES.map(c => (
                <span key={c.id} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                  {c.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} <strong>NARAYANTECH</strong> (withinstafix model). All rights reserved.
          </p>

          <p className="text-[11px] max-w-xl text-center md:text-right">
            Disclaimer: NARAYANTECH is an independent third-party doorstep service provider. All brand names, trademarks, and logos (Apple, Samsung, OnePlus, etc.) are the property of their respective owners and used purely for model identification purposes.
          </p>
        </div>

      </div>
    </footer>
  );
};
