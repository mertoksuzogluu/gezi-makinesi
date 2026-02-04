import { Request } from '@/types';

// Mock initial requests for demo
export const initialRequests: Request[] = [
  {
    id: 'req-001',
    type: 'tour',
    userId: 'user-001',
    status: 'İncelemede',
    createdAt: '2026-01-05T10:30:00Z',
    updatedAt: '2026-01-07T14:20:00Z',
    payload: {
      fullName: 'Ahmet Yılmaz',
      phone: '05321234567',
      email: 'ahmet@example.com',
      groupSize: 8,
      startDate: '2026-03-15',
      endDate: '2026-03-20',
      transportType: 'ucak',
      departureCity: 'İstanbul',
      destination: 'İtalya - Roma, Floransa',
      roomCount: 4,
      roomType: 'cift',
      budgetType: 'kisi-basi',
      budgetAmount: 1500,
      hotelStandard: '4-yildiz',
      notes: 'Müze turları önemli, yemek deneyimleri dahil olsun.',
      kvkkConsent: true
    },
    statusHistory: [
      { status: 'Alındı', date: '2026-01-05T10:30:00Z' },
      { status: 'İncelemede', date: '2026-01-07T14:20:00Z', note: 'Tur programı hazırlanıyor' }
    ]
  },
  {
    id: 'req-002',
    type: 'visa',
    userId: 'user-001',
    status: 'Eksik Evrak',
    createdAt: '2026-01-03T09:15:00Z',
    updatedAt: '2026-01-08T11:00:00Z',
    payload: {
      fullName: 'Ahmet Yılmaz',
      phone: '05321234567',
      email: 'ahmet@example.com',
      country: 'almanya',
      travelPurpose: 'turistik',
      travelDate: '2026-04-10',
      previousVisa: true,
      passportExpiry: '2028-05-20',
      notes: 'Daha önce Fransa Schengen vizem vardı.',
      kvkkConsent: true
    },
    statusHistory: [
      { status: 'Alındı', date: '2026-01-03T09:15:00Z' },
      { status: 'İncelemede', date: '2026-01-05T10:00:00Z' },
      { status: 'Eksik Evrak', date: '2026-01-08T11:00:00Z', note: 'Güncel banka hesap dökümü gerekli' }
    ]
  },
  {
    id: 'req-003',
    type: 'visa',
    userId: 'user-002',
    status: 'Tamamlandı',
    createdAt: '2025-12-15T14:00:00Z',
    updatedAt: '2026-01-02T16:30:00Z',
    payload: {
      fullName: 'Zeynep Kaya',
      phone: '05559876543',
      email: 'zeynep@example.com',
      country: 'dubai',
      travelPurpose: 'turistik',
      travelDate: '2026-01-10',
      previousVisa: false,
      passportExpiry: '2029-08-15',
      notes: '',
      kvkkConsent: true
    },
    statusHistory: [
      { status: 'Alındı', date: '2025-12-15T14:00:00Z' },
      { status: 'İncelemede', date: '2025-12-17T09:00:00Z' },
      { status: 'Tamamlandı', date: '2026-01-02T16:30:00Z', note: 'E-vize onaylandı ve gönderildi' }
    ]
  }
];

// Storage key for localStorage
export const REQUESTS_STORAGE_KEY = 'gezi_makinesi_requests';

// Helper functions
export function getStoredRequests(): Request[] {
  if (typeof window === 'undefined') return initialRequests;
  
  const stored = localStorage.getItem(REQUESTS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(initialRequests));
    return initialRequests;
  }
  return JSON.parse(stored);
}

export function saveRequest(request: Request): void {
  const requests = getStoredRequests();
  requests.push(request);
  localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
}

export function getRequestById(id: string): Request | undefined {
  const requests = getStoredRequests();
  return requests.find(r => r.id === id);
}

export function getRequestsByUserId(userId: string): Request[] {
  const requests = getStoredRequests();
  return requests.filter(r => r.userId === userId);
}

export function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

