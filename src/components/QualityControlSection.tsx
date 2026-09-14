import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  Camera, 
  Battery, 
  Wifi, 
  Volume2, 
  Sliders, 
  Fingerprint, 
  Cpu,
  FileCheck
} from 'lucide-react';

export const QualityControlSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'display' | 'camera' | 'battery' | 'sensors'>('display');

  const qcChecklist = {
    display: [
      { name: 'Touch Digitizer Multi-point Grid', status: 'Passed', desc: '100% responsiveness across all 4 corners' },
      { name: 'OLED Sub-Pixel Uniformity', status: 'Passed', desc: 'Zero dead pixels, burn-in, or green vertical lines' },
      { name: 'TrueTone / Color Balance', status: 'Passed', desc: 'Ambient color temperature calibration restored' },
      { name: '120Hz ProMotion Refresh Rate', status: 'Passed', desc: 'Ultra-smooth animation and zero touch lag' },
    ],
    camera: [
      { name: 'Primary Sensor Autofocus (1x / 2x / 5x)', status: 'Passed', desc: 'Sharp optical focus at all focal distances' },
      { name: 'Optical Image Stabilization (OIS)', status: 'Passed', desc: 'Zero sensor wobble or motor grinding sound' },
      { name: 'Front Selfie & Portrait Depth', status: 'Passed', desc: 'Accurate background bokeh segmentation' },
      { name: 'LED TrueTone Flash Sync', status: 'Passed', desc: 'Dual-tone exposure balance verified' },
    ],
    battery: [
      { name: '0-Cycle Factory State Verification', status: 'Passed', desc: 'Brand new cell with 100% maximum capacity' },
      { name: 'Peak Wattage Fast Charge Test', status: 'Passed', desc: 'Tested with 20W-65W PD fast chargers' },
      { name: 'Thermal Dissipation Check', status: 'Passed', desc: 'Operating temperature stays below 36°C under load' },
      { name: 'Sleep State Power Consumption', status: 'Passed', desc: 'Zero phantom overnight battery drainage' },
    ],
    sensors: [
      { name: 'Face ID / Fingerprint Scanner', status: 'Passed', desc: 'Secure biometric authentication unlocks in 0.2s' },
      { name: 'Proximity Sensor (Call Blanking)', status: 'Passed', desc: 'Display turns off automatically during calls' },
      { name: 'Stereo Loudspeakers & Noise-Cancel Mic', status: 'Passed', desc: 'Crystal clear voice with zero distortion' },
      { name: '5G / Wi-Fi 6E / Bluetooth 5.3', status: 'Passed', desc: 'Full signal strength tested with live ping' },
    ],
  };

  return (
    <section id="qc-inspection" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Rigorous Standard</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit',sans-serif]">
              Our Proprietary 48-Point Diagnostic QC App
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Every NARAYANTECH doorstep engineer is equipped with our proprietary diagnostic software. 
              Before opening your phone and immediately after fitting the new part, a comprehensive 
              48-point test is executed right before you to guarantee 100% perfection.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pre-Repair Baseline Audit</h4>
                  <p className="text-xs text-slate-500">Records existing sensor and hardware health before starting.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Post-Repair Touch & Color Verification</h4>
                  <p className="text-xs text-slate-500">Interactive touch matrix grid ensures edge-to-edge sensitivity.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Instant Digital Warranty Certificate</h4>
                  <p className="text-xs text-slate-500">Emailed and sent to WhatsApp immediately with part serial number.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive QC Dashboard Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">NARAYANTECH QC App v4.2</h3>
                    <p className="text-[11px] text-slate-400">Doorstep Hardware Inspection</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  48 / 48 PASSED
                </span>
              </div>

              {/* Category Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-800/80 rounded-xl my-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('display')}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                    activeTab === 'display' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Display
                </button>
                <button
                  onClick={() => setActiveTab('camera')}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                    activeTab === 'camera' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Camera
                </button>
                <button
                  onClick={() => setActiveTab('battery')}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                    activeTab === 'battery' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Battery
                </button>
                <button
                  onClick={() => setActiveTab('sensors')}
                  className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                    activeTab === 'sensors' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sensors
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 py-1">
                {qcChecklist[activeTab].map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-200">{item.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <span className="inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Engineer: Level-3 Master Certified</span>
                <span className="text-emerald-400 font-semibold">100% Quality Assured</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
