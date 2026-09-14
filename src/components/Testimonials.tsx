import React from 'react';
import { Star, ShieldCheck, CheckCircle2, UserCheck, Smartphone } from 'lucide-react';
import { TESTIMONIALS } from '../data/repairData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Customer Trust & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-['Outfit',sans-serif]">
            Loved by 18,400+ Device Owners
          </h2>
          <p className="mt-3 text-base text-slate-600">
            See what customers say after having their phones repaired live at their homes and workspaces across Noida, Ghaziabad, Gurugram, Delhi NCR, and major hubs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">5.0</span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.location}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{t.date}</span>
                </div>

                <div className="mt-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-600 font-medium flex items-center">
                    <Smartphone className="w-3 h-3 mr-1 text-blue-600" /> {t.device}
                  </span>
                  <span className="text-emerald-700 font-bold">{t.issue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-slate-200/80 flex flex-wrap items-center justify-around gap-6 text-center">
          <div>
            <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">4.9 / 5</span>
            <p className="text-xs text-slate-500 mt-0.5">Google Verified Rating</p>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">18,400+</span>
            <p className="text-xs text-slate-500 mt-0.5">Doorstep Repairs Completed</p>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <div>
            <span className="text-2xl font-black text-slate-900 font-['Outfit',sans-serif]">35 Mins</span>
            <p className="text-xs text-slate-500 mt-0.5">Average Turnaround Time</p>
          </div>
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <div>
            <span className="text-2xl font-black text-emerald-600 font-['Outfit',sans-serif]">100%</span>
            <p className="text-xs text-slate-500 mt-0.5">Data Privacy Maintained</p>
          </div>
        </div>

      </div>
    </section>
  );
};
