// Tour Types
export interface Tour {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationDays: number;
  startDate?: string; // YYYY-MM-DD format
  endDate?: string; // YYYY-MM-DD format
  location: string;
  country: string;
  priceFrom: number;
  heroImage: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: ItineraryDay[];
  gallery: string[];
  isPopular: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

// Visa Types
export type VisaCategory = 'Schengen' | 'USA' | 'UK' | 'UAE';

export interface DocumentGroup {
  title: string;
  documents: string[];
}

export interface VisaFAQ {
  question: string;
  answer: string;
}

export interface VisaCountry {
  code: string;
  slug: string;
  name: string;
  flagEmoji: string;
  category: VisaCategory;
  processingTime: string;
  visaFee: string;
  serviceFee: string;
  description: string;
  docGroups: DocumentGroup[];
  process: ProcessStep[];
  faqs: VisaFAQ[];
  isPopular: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

// Request Types
export type RequestType = 'tour' | 'visa';
export type RequestStatus = 
  | 'Alındı' 
  | 'İncelemede' 
  | 'Belgeler Bekleniyor'
  | 'Randevu Tarihi Belirlendi'
  | 'Konsolosluk Sürecinde'
  | 'Teklif Hazırlandı'
  | 'Onay Bekleniyor'
  | 'Pasaport Teslim Alındı'
  | 'Tamamlandı'
  | 'İptal Edildi'
  | 'Eksik Evrak'; // backwards compatibility

export interface TourRequestPayload {
  fullName: string;
  phone: string;
  email: string;
  groupSize: number;
  startDate: string;
  endDate: string;
  transportType: 'ucak' | 'otobus' | 'ozel-arac' | 'kararsiz';
  departureCity: string;
  destination: string;
  roomCount: number;
  roomType: 'tek' | 'cift' | 'uclu' | 'karisik';
  budgetType: 'kisi-basi' | 'toplam';
  budgetAmount: number;
  hotelStandard: '3-yildiz' | '4-yildiz' | '5-yildiz' | 'butik' | 'farketmez';
  notes?: string;
  kvkkConsent: boolean;
}

export interface VisaRequestPayload {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  travelPurpose: 'turistik' | 'ticari' | 'aile' | 'diger';
  travelDate: string;
  previousVisa: boolean;
  passportExpiry: string;
  notes?: string;
  kvkkConsent: boolean;
}

export interface Request {
  id: string;
  type: RequestType;
  userId: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  payload: TourRequestPayload | VisaRequestPayload;
  statusHistory: StatusHistoryItem[];
}

export interface StatusHistoryItem {
  status: RequestStatus;
  date: string;
  note?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  createdAt: string;
  role?: 'admin' | 'user';
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

