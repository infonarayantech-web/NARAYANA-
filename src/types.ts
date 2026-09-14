export type DeviceCategory = 'smartphone' | 'tablet' | 'laptop';

export interface DeviceBrand {
  id: string;
  name: string;
  iconName: string;
  category: DeviceCategory;
  popular: boolean;
}

export interface DeviceModel {
  id: string;
  brandId: string;
  name: string;
  category: DeviceCategory;
  image?: string;
  screenType: string;
  basePrice: number;
}

export interface RepairService {
  id: string;
  name: string;
  shortDesc: string;
  iconName: string;
  category: 'screen' | 'battery' | 'camera' | 'charging' | 'housing' | 'audio' | 'board';
  popular: boolean;
  standardPriceMultiplier: number;
  oemPriceMultiplier: number;
  turnaroundMinutes: number;
  warrantyMonths: number;
  doorstepSupported: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  issues: string[];
  partQuality: 'oem' | 'standard';
  serviceType: 'doorstep' | 'pickup';
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  slotDate: string;
  slotTime: string;
  notes?: string;
  totalCost: number;
  status: 'confirmed' | 'assigned' | 'en_route' | 'in_progress' | 'completed';
  technician?: {
    name: string;
    phone: string;
    rating: number;
    completedRepairs: number;
    avatar: string;
  };
  createdAt: string;
}

export interface CityLocation {
  id: string;
  name: string;
  state: string;
  badge?: string;
  pincodes: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  device: string;
  issue: string;
  rating: number;
  comment: string;
  date: string;
  technician: string;
}
