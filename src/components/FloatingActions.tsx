import React from 'react';
import { Phone, MessageSquare, CalendarCheck, Zap } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  return (
    <>
      {/* Desktop Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col space-y-3">
        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/918447206098?text=Hi%20NARAYANTECH,%20I%20want%20to%20get%20my%20phone%20repaired%20at%20my%20doorstep."
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-108 transition-all group relative"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-15 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Chat on WhatsApp (+91 84472 06098)
          </span>
        </a>

        {/* Quick Call */}
        <a
          href="tel:+918447206098"
          className="w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-108 transition-all group relative"
          title="Call Engineer Now"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-15 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
            Call +91 84472 06098
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
        <a
          href="tel:+918447206098"
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5 border border-slate-200 active:bg-slate-200"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Call Us</span>
        </a>

        <a
          href="https://wa.me/918447206098?text=Hi%20NARAYANTECH,%20I%20want%20to%20get%20my%20phone%20repaired%20at%20my%20doorstep."
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold flex items-center justify-center space-x-1.5 shadow-md shadow-blue-500/20 active:scale-98"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Book Fix</span>
        </button>
      </div>
    </>
  );
};
