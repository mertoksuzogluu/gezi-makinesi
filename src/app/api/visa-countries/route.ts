import { NextRequest, NextResponse } from 'next/server';
import { getAllVisaCountries, saveVisaCountry, deleteVisaCountry } from '@/lib/admin-data';
import { VisaCountry } from '@/types';

// GET - Tüm vize ülkelerini getir
export async function GET(request: NextRequest) {
  try {
    const countries = getAllVisaCountries();
    return NextResponse.json({ success: true, data: countries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Vize ülkeleri getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni vize ülkesi ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const country: VisaCountry = body;
    
    saveVisaCountry(country);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Vize ülkesi başarıyla eklendi',
      data: country 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Vize ülkesi eklenemedi' },
      { status: 500 }
    );
  }
}

