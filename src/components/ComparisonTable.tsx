import React from 'react';
import { Check, X, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Service Location',
      narayan: 'At your doorstep (Home / Office / Cafe)',
      localShop: 'Walk-in crowded market shop',
      officialCenter: 'Travel to official authorized center',
      highlight: true,
    },
    {
      feature: 'Repair Turnaround Time',
      narayan: '30 to 60 Minutes on-the-spot',
      localShop: '2 to 4 Days (often delayed)',
      officialCenter: '7 to 15 Business Days',
      highlight: true,
    },
    {
      feature: 'Personal Data & Photos',
      narayan: '100% Safe (Phone never leaves your sight)',
      localShop: 'High risk (Must leave phone & passcode)',
      officialCenter: 'Mandatory complete device wipe/reset',
      highlight: true,
    },
    {
      feature: 'Part Quality Standards',
      narayan: 'Grade-A OEM with 48-Point Diagnostic QC',
      localShop: 'Unverified copy parts / No grading',
      officialCenter: 'Original OEM Parts',
      highlight: false,
    },
    {
      feature: 'Pricing & Transparency',
      narayan: 'Fixed upfront quote, Zero hidden fees',
      localShop: 'Prices change after opening device',
      officialCenter: '3x to 4x Expensive + Visit fees',
      highlight: true,
    },
    {
      feature: 'Warranty Coverage',
      narayan: 'Up to 12 Months (Instant Doorstep Replacement)',
      localShop: '7 to 15 Days (Excuses on claim)',
      officialCenter: '90 Days (Requires long RMA queue)',
      highlight: true,
    },
    {
      feature: 'Payment Terms',
      narayan: 'Pay ONLY after repair & your inspection',
      localShop: 'Advance cash payment required',
      officialCenter: 'Upfront non-refundable inspection fee',
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight font-['Outfit',sans-serif]">
            NARAYANTECH vs. Others
          </h2>
          <p className="mt-3 text-base text-slate-600">
            See how our doorstep service model eliminates the hassle, delays, and privacy anxieties of traditional phone repair.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="py-5 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-500 w-1/4">
                    Comparison Metrics
                  </th>
                  <th className="py-5 px-6 text-sm font-black text-blue-600 bg-blue-50/60 border-x border-blue-100 w-2/5 font-['Outfit',sans-serif]">
                    <div className="flex items-center space-x-1.5">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span>NARAYANTECH (Doorstep)</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-600 w-1/5">
                    Local Mobile Shops
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-slate-600 w-1/5">
                    Brand Service Centers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {row.feature}
                    </td>

                    <td className="py-4 px-6 font-bold text-slate-900 bg-blue-50/40 border-x border-blue-100/70">
                      <div className="flex items-center space-x-2 text-blue-950">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.narayan}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.localShop}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-600">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{row.officialCenter}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
