import { z } from 'zod/v3';

// Common validations
const phoneRegex = /^05[0-9]{9}$/;

export const phoneValidation = z
  .string()
  .regex(phoneRegex, 'Geçerli bir telefon numarası giriniz (05XXXXXXXXX)');

export const emailValidation = z
  .string()
  .email('Geçerli bir e-posta adresi giriniz');

// Tour Request Schema
export const tourRequestSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  phone: phoneValidation,
  email: emailValidation,
  groupSize: z.number().min(1, 'En az 1 kişi olmalıdır').max(100, 'En fazla 100 kişi olabilir'),
  startDate: z.string().min(1, 'Başlangıç tarihi seçiniz'),
  endDate: z.string().min(1, 'Bitiş tarihi seçiniz'),
  transportType: z.enum(['ucak', 'otobus', 'ozel-arac', 'kararsiz'], {
    required_error: 'Ulaşım şekli seçiniz'
  }),
  departureCity: z.string().min(2, 'Kalkış şehri giriniz'),
  destination: z.string().min(2, 'Destinasyon giriniz'),
  roomCount: z.number().min(1, 'En az 1 oda'),
  roomType: z.enum(['tek', 'cift', 'uclu', 'karisik'], {
    required_error: 'Oda tipi seçiniz'
  }),
  budgetType: z.enum(['kisi-basi', 'toplam'], {
    required_error: 'Bütçe tipi seçiniz'
  }),
  budgetAmount: z.number().min(100, 'Bütçe en az 100 olmalıdır'),
  hotelStandard: z.enum(['3-yildiz', '4-yildiz', '5-yildiz', 'butik', 'farketmez'], {
    required_error: 'Otel standardı seçiniz'
  }),
  notes: z.string().optional(),
  kvkkConsent: z.boolean().refine(val => val === true, {
    message: 'KVKK onayı gereklidir'
  })
});

export type TourRequestFormData = z.infer<typeof tourRequestSchema>;

// Visa Request Schema
export const visaRequestSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  phone: phoneValidation,
  email: emailValidation,
  country: z.string().min(1, 'Ülke seçiniz'),
  travelPurpose: z.enum(['turistik', 'ticari', 'aile', 'diger'], {
    required_error: 'Seyahat amacı seçiniz'
  }),
  travelDate: z.string().min(1, 'Seyahat tarihi seçiniz'),
  previousVisa: z.boolean(),
  passportExpiry: z.string().min(1, 'Pasaport geçerlilik tarihi giriniz'),
  notes: z.string().optional(),
  kvkkConsent: z.boolean().refine(val => val === true, {
    message: 'KVKK onayı gereklidir'
  })
});

export type VisaRequestFormData = z.infer<typeof visaRequestSchema>;

// Auth Schemas
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır')
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  email: emailValidation,
  phone: phoneValidation,
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Contact Schema
export const contactSchema = z.object({
  fullName: z.string().min(3, 'Ad soyad en az 3 karakter olmalıdır'),
  email: emailValidation,
  phone: phoneValidation.optional(),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
  kvkkConsent: z.boolean().refine(val => val === true, {
    message: 'KVKK onayı gereklidir'
  })
});

export type ContactFormData = z.infer<typeof contactSchema>;

