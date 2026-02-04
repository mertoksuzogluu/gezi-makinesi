import { Tour, VisaCountry } from '@/types';
import { tours as defaultTours } from '@/data/tours';
import { visaCountries as defaultVisaCountries } from '@/data/visa-countries';

const TOURS_KEY = 'gezi_tours';
const VISA_COUNTRIES_KEY = 'gezi_visa_countries';

// Initialize localStorage with default data if empty
function initializeData() {
  if (typeof window === 'undefined') return;
  
  // Check if localStorage has old data with "rehberlik" or missing new tours
  const existingTours = localStorage.getItem(TOURS_KEY);
  if (existingTours) {
    const tours = JSON.parse(existingTours);
    const hasRehberlik = JSON.stringify(tours).toLowerCase().includes('rehberlik');
    // Check if new tours are missing
    const hasBansko = tours.some((t: Tour) => t.slug === 'bansko-kayak-turu');
    const hasNewYork = tours.some((t: Tour) => t.slug === 'new-york-sehir-enerjisi');
    const hasPrag = tours.some((t: Tour) => t.slug === 'prag-orta-avrupa-incisi');
    const banskoTour = tours.find((t: Tour) => t.slug === 'bansko-kayak-turu');
    const hasWrongImage = banskoTour && !banskoTour.heroImage.includes('/bansko-ski.jpg');
    // Update if any new tours are missing or if there are issues
    if (hasRehberlik || !hasBansko || !hasNewYork || !hasPrag || hasWrongImage || tours.length < defaultTours.length) {
      localStorage.setItem(TOURS_KEY, JSON.stringify(defaultTours));
    }
  } else {
    localStorage.setItem(TOURS_KEY, JSON.stringify(defaultTours));
  }
  
  if (!localStorage.getItem(VISA_COUNTRIES_KEY)) {
    localStorage.setItem(VISA_COUNTRIES_KEY, JSON.stringify(defaultVisaCountries));
  }
}

// Tours CRUD
export function getAllTours(): Tour[] {
  if (typeof window === 'undefined') return defaultTours;
  initializeData();
  const data = localStorage.getItem(TOURS_KEY);
  return data ? JSON.parse(data) : defaultTours;
}

export function getTourById(id: string): Tour | undefined {
  const tours = getAllTours();
  return tours.find(t => t.id === id);
}

export function getTourBySlug(slug: string): Tour | undefined {
  const tours = getAllTours();
  return tours.find(t => t.slug === slug);
}

export function saveTour(tour: Tour): void {
  if (typeof window === 'undefined') return;
  const tours = getAllTours();
  const index = tours.findIndex(t => t.id === tour.id);
  
  if (index >= 0) {
    tours[index] = tour;
  } else {
    tours.push(tour);
  }
  
  localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
}

export function deleteTour(id: string): void {
  if (typeof window === 'undefined') return;
  const tours = getAllTours().filter(t => t.id !== id);
  localStorage.setItem(TOURS_KEY, JSON.stringify(tours));
}

export function generateTourId(): string {
  return `tour-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Visa Countries CRUD
export function getAllVisaCountries(): VisaCountry[] {
  if (typeof window === 'undefined') return defaultVisaCountries;
  initializeData();
  const data = localStorage.getItem(VISA_COUNTRIES_KEY);
  return data ? JSON.parse(data) : defaultVisaCountries;
}

export function getVisaCountryBySlug(slug: string): VisaCountry | undefined {
  const countries = getAllVisaCountries();
  return countries.find(c => c.slug === slug);
}

export function getVisaCountryByCode(code: string): VisaCountry | undefined {
  const countries = getAllVisaCountries();
  return countries.find(c => c.code === code);
}

export function saveVisaCountry(country: VisaCountry): void {
  if (typeof window === 'undefined') return;
  const countries = getAllVisaCountries();
  const index = countries.findIndex(c => c.code === country.code);
  
  if (index >= 0) {
    countries[index] = country;
  } else {
    countries.push(country);
  }
  
  localStorage.setItem(VISA_COUNTRIES_KEY, JSON.stringify(countries));
}

export function deleteVisaCountry(code: string): void {
  if (typeof window === 'undefined') return;
  const countries = getAllVisaCountries().filter(c => c.code !== code);
  localStorage.setItem(VISA_COUNTRIES_KEY, JSON.stringify(countries));
}

// Reset to defaults
export function resetToursToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOURS_KEY, JSON.stringify(defaultTours));
}

export function resetVisaCountriesToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VISA_COUNTRIES_KEY, JSON.stringify(defaultVisaCountries));
}

