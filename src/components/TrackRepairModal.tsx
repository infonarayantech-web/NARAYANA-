import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Wrench, 
  UserCheck, 
  AlertCircle,
  FileText,
  Navigation,
  Sparkles
} from 'lucide-react';
import { Booking } from '../types';

interface TrackRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  prefilledId?: string;
}

export const TrackRepairModal: React.FC<TrackRepairModalProps> = ({
  isOpen,
  onClose,
  bookings,
  prefilledId = '',
}) => {
  const [searchId, setSearchId] = useState(prefilledId || 'NT-84920');
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(() => {
    return bookings.find(b => b.id.toLowerCase() === (prefilledId || 'NT-84920').toLowerCase()) || bookings[0] || null;
  });
  const [searchError, setSearchError] = useState<string | null>(null);

  React.useEffect(() => {
    if (prefilledId) {
      setSearchId(prefilledId);
      const found = bookings.find(b => b.id.toLowerCase() === prefilledId.toLowerCase());
      if (found) setCurrentBooking(found);
    }
  }, [prefilledId, bookings]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const clean = searchId.trim().toUpperCase();
    const found = bookings.find(b => b.id.toUpperCase() === clean || b.phone.includes(clean));
    if (found) {
      setCurrentBooking(found);
    } else {
      setSearchError(`No active repair found for "${searchId}". Try sample ID "NT-84920" or "NT-77215".`);
    }
  };

  const steps = [
    { key: 'confirmed', title: 'Booking Confirmed', desc: 'Fault diagnosed & spare part reserved in local hub' },
    { key: 'assigned', title: 'Master Technician Assigned', desc: 'Certified level-3 hardware engineer assigned' },
    { key: 'en_route', title: 'En Route to Doorstep', desc: 'Technician on bike equipped with anti-static kit (ETA: ~18 mins)' },
    { key: 'in_progress', title: 'Live Doorstep Repair', desc: 'Parts replaced and verified in front of you' },
    { key: 'completed', title: '48-Pt QC Passed & Warranty Active', desc: 'Device tested, invoice & 1-year warranty card issued' },
  ];

  const getStepIndex = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'assigned': return 1;
      case 'en_route': return 2;
      case 'in_progress': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  const currentStepIdx = currentBooking ? getStepIndex(currentBooking.status) : 2;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>Real-Time Doorstep Tracker</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
            Track Your Repair Status
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Enter your NARAYANTECH Booking ID or registered mobile number.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Booking ID (e.g. NT-84920)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-400 text-xs font-semibold border border-slate-700 focus:outline-hidden focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
            >
              Track Status
            </button>
          </form>

          {searchError && (
            <p className="mt-2 text-xs text-rose-300 font-medium">{searchError}</p>
          )}
        </div>

        {/* Tracking Details */}
        {currentBooking ? (
          <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Status Top Banner */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
                  Active Booking
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <h4 className="text-lg font-black text-slate-900 font-['Outfit',sans-serif]">
                    {currentBooking.id}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {currentBooking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Device: <strong className="text-slate-900">{currentBooking.model}</strong> • {currentBooking.issues.join(', ')}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[11px] text-slate-500">Scheduled Slot</p>
                <p className="text-xs font-bold text-slate-900">{currentBooking.slotDate}</p>
                <p className="text-xs font-medium text-blue-600">{currentBooking.slotTime}</p>
              </div>
            </div>

            {/* Assigned Engineer Card */}
            {currentBooking.technician && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentBooking.technician.avatar}
                    alt={currentBooking.technician.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900">{currentBooking.technician.name}</span>
                      <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">
                      ★ {currentBooking.technician.rating} Rating • {currentBooking.technician.completedRepairs}+ Doorstep Repairs Done
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${currentBooking.technician.phone}`}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Engineer</span>
                </a>
              </div>
            )}

            {/* Live Timeline */}
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-4">
                Repair Milestones & Real-Time Progress
              </h5>

              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {steps.map((step, idx) => {
                  const isDone = idx < currentStepIdx;
                  const isCurrent = idx === currentStepIdx;

                  return (
                    <div key={step.key} className="relative">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h6 className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.title}
                          </h6>
                          {isCurrent && (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm bg-blue-100 text-blue-700">
                              Active Now
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Payment Info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-slate-500">Doorstep Location:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentBooking.address}, {currentBooking.city} ({currentBooking.pincode})</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Amount to Pay:</span>
                  <p className="text-sm font-black text-slate-900 font-['Outfit',sans-serif]">₹{currentBooking.totalCost.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-emerald-600 font-bold">Pay After QC Inspection</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Need support with this order?</span>
                <a href="tel:+918447206098" className="font-bold text-blue-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>Call +91 84472 06098</span>
                </a>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="font-medium text-slate-700">No repair details to show.</p>
            <p className="text-xs mt-1">Please enter a valid Booking ID above to track.</p>
          </div>
        )}

      </div>
    </div>
  );
};
