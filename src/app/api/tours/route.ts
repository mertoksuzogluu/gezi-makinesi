import { NextRequest, NextResponse } from 'next/server';
import { getAllTours, saveTour, deleteTour, getTourById } from '@/lib/admin-data';
import { Tour } from '@/types';

// GET - Tüm turları getir
export async function GET(request: NextRequest) {
  try {
    const tours = getAllTours();
    return NextResponse.json({ success: true, data: tours });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Turlar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni tur ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tour: Tour = body;
    
    saveTour(tour);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tur başarıyla eklendi',
      data: tour 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Tur eklenemedi' },
      { status: 500 }
    );
  }
}

