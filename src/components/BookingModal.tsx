import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Wrench,
  Zap,
  Check
} from 'lucide-react';
import { Booking, CityLocation } from '../types';
import { CITIES } from '../data/repairData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    brand: string;
    model: string;
    issues: string[];
    partQuality: 'oem' | 'standard';
    totalPrice: number;
  };
  selectedCity: CityLocation;
  onBookingSuccess: (newBooking: Booking) => void;
  onOpenTrackerWithId: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialData,
  selectedCity,
  onBookingSuccess,
  onOpenTrackerWithId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [brand, setBrand] = useState(initialData?.brand || 'Apple iPhone');
  const [model, setModel] = useState(initialData?.model || 'iPhone 14 Pro');
  const [issues, setIssues] = useState<string[]>(initialData?.issues || ['Screen / Display Replacement']);
  const [partQuality, setPartQuality] = useState<'oem' | 'standard'>(initialData?.partQuality || 'oem');
  const [totalPrice, setTotalPrice] = useState<number>(initialData?.totalPrice || 3200);

  // Slot states
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [selectedSlot, setSelectedSlot] = useState<string>('Express in 30-45 Mins');

  // Address states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState(selectedCity.name);
  const [pincode, setPincode] = useState(selectedCity.pincodes[0] || '122002');
  const [notes, setNotes] = useState('');

  // Generated Booking
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  // Sync initialData changes when opened
  React.useEffect(() => {
    if (initialData) {
      setBrand(initialData.brand);
      setModel(initialData.model);
      setIssues(initialData.issues);
      setPartQuality(initialData.partQuality);
      setTotalPrice(initialData.totalPrice);
    }
    setCity(selectedCity.name);
    if (selectedCity.pincodes.length > 0) {
      setPincode(selectedCity.pincodes[0]);
    }
  }, [initialData, selectedCity]);

  if (!isOpen) return null;

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 3) {
      // Validate step 3
      if (!customerName.trim() || !customerPhone.trim() || !streetAddress.trim()) {
        alert('Please fill in your Name, Mobile Number and Doorstep Address.');
        return;
      }

      // Generate random booking ID
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const bookingId = `NT-${randomNum}`;

      const newBooking: Booking = {
        id: bookingId,
        customerName: customerName.trim(),
        phone: customerPhone.trim(),
        email: customerEmail.trim() || 'customer@narayantech.in',
        brand,
        model,
        issues,
        partQuality,
        serviceType: 'doorstep',
        address: streetAddress.trim(),
        landmark: landmark.trim(),
        city,
        pincode,
        slotDate: selectedDate,
        slotTime: selectedSlot,
        notes: notes.trim(),
        totalCost: totalPrice,
        status: 'assigned',
        technician: {
          name: 'Vikram Malhotra (Lead Master Tech)',
          phone: '+91 98711 02938',
          rating: 4.9,
          completedRepairs: 1850,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        createdAt: new Date().toISOString(),
      };

      setCompletedBooking(newBooking);
      onBookingSuccess(newBooking);
      setStep(4);
    } else {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Doorstep Fix in 30-60 Minutes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
            {step === 4 ? '🎉 Booking Confirmed!' : 'Schedule Doorstep Repair'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {step === 4 
              ? 'Our master technician has been assigned and dispatched.' 
              : 'Our engineer brings the parts and equipment directly to your location.'
            }
          </p>

          {/* Stepper Dots (if not completed) */}
          {step < 4 && (
            <div className="flex items-center space-x-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? 'w-8 bg-blue-400' : s < step ? 'w-4 bg-emerald-400' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
              <span className="text-[11px] text-slate-300 ml-2 font-medium">
                Step {step} of 3
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          
          {/* STEP 1: Review Fault & Quality */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                    Selected Device
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{model}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{brand}</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 font-['Outfit',sans-serif]">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-bold">Doorstep Visit: FREE</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Selected Repair Issue(s):
                </label>
                <div className="space-y-1.5">
                  {issues.map((iss, i) => (
                    <div key={i} className="flex items-center text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                      <Check className="w-3.5 h-3.5 text-blue-600 mr-2 shrink-0" />
                      <span>{iss}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Warranty & Quality:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPartQuality('oem')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      partQuality === 'oem'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Grade-A OEM</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-normal text-slate-500 mt-1">12 Months Doorstep Warranty</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPartQuality('standard')}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      partQuality === 'standard'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>Standard High-Grade</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <p className="text-[10px] font-normal text-slate-500 mt-1">6 Months Doorstep Warranty</p>
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Continue to Time Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Time & Date Slot */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Repair Date:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'Day After'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedDate === d
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Time Slot:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Express in 30-45 Mins',
                    '11:00 AM - 1:00 PM',
                    '2:00 PM - 4:00 PM',
                    '4:00 PM - 6:00 PM',
                    '6:00 PM - 8:00 PM',
                    '8:00 PM - 10:00 PM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        selectedSlot === slot
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{slot}</span>
                        {slot.includes('Express') && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                            Fastest
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Our engineer contacts you 15 minutes before arrival.</span>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Continue to Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Address & Contact Details */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 84472 06098"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (For Invoice)
                  </label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="122002"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Complete Doorstep Address * (Home / Office)
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat / Office No., Building Name, Street / Sector"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Near Metro Station or Market"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Total to Pay after repair: <strong>₹{totalPrice.toLocaleString('en-IN')}</strong></span>
                <span className="text-emerald-700 font-bold">Zero advance payment</span>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2"
                >
                  <span>Confirm Doorstep Booking</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && completedBooking && (
            <div className="text-center py-2 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <p className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                  Doorstep Repair Booking ID
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit',sans-serif] mt-1">
                  {completedBooking.id}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Device:</span>
                  <span className="font-bold text-slate-900">{completedBooking.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot:</span>
                  <span className="font-bold text-slate-900">{completedBooking.slotDate}, {completedBooking.slotTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-medium text-slate-900 truncate max-w-[220px]">{completedBooking.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Tech:</span>
                  <span className="font-bold text-blue-600">{completedBooking.technician?.name}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-700">Total Payable:</span>
                  <span className="font-black text-slate-900 text-sm">₹{completedBooking.totalCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                A confirmation SMS & WhatsApp message has been dispatched to <strong>{completedBooking.phone}</strong>. 
                Our engineer will call you before arrival.
              </p>

              <div className="pt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenTrackerWithId(completedBooking.id);
                  }}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  <Clock className="w-4 h-4" />
                  <span>Track Technician Live Status</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Back to Homepage
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
