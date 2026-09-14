import React from 'react';
import { 
  CalendarClock, 
  MapPin, 
  Eye, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Smartphone,
  CreditCard
} from 'lucide-react';

interface HowItWorksProps {
  onStartBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Book in 60 Seconds',
      description: 'Select your phone model, choose the fault, and pick an on-demand slot (as fast as 30 minutes) or schedule for later.',
      icon: <CalendarClock className="w-7 h-7 text-blue-600" />,
      badge: 'Zero Advance Fee',
    },
    {
      num: '02',
      title: 'Engineer Visits Doorstep',
      description: 'Our background-verified Master Technician arrives at your home, office, or cafe with a mobile anti-static ESD workstation.',
      icon: <MapPin className="w-7 h-7 text-emerald-600" />,
      badge: 'Certified Tools',
    },
    {
      num: '03',
      title: 'Repaired Live In Front Of You',
      description: 'Watch the entire repair process on your desk. Never hand over passcodes, private photos, or banking apps to an unknown backroom.',
      icon: <Eye className="w-7 h-7 text-amber-500" />,
      badge: '100% Data Privacy',
    },
    {
      num: '04',
      title: '48-Point QC, Pay & Warranty',
      description: 'Test all display, camera, and touch functions. Pay via UPI, Card, or Cash only when satisfied. Digital warranty card activated.',
      icon: <CheckCircle className="w-7 h-7 text-purple-600" />,
      badge: 'Up to 12 Mo Warranty',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
            Convenient & Secure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight font-['Outfit',sans-serif]">
            How NARAYANTECH Doorstep Fix Works
          </h2>
          <p className="mt-4 text-base text-slate-600">
            No more traveling in traffic, waiting in long queues at service centers, or parting with your phone for 1-2 weeks.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="relative bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors font-['Outfit',sans-serif]">
                    {step.num}
                  </span>
                </div>

                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800 mb-2">
                  {step.badge}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>Step {step.num} of 04</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
              Need your phone fixed today before an important meeting?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our express dispatch units are active in your area right now.
            </p>
          </div>

          <button
            onClick={onStartBooking}
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center space-x-2 whitespace-nowrap transition-all"
          >
            <span>Book Express Technician</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
