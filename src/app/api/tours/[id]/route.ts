import { NextRequest, NextResponse } from 'next/server';
import { getTourById, saveTour, deleteTour } from '@/lib/admin-data';
import { Tour } from '@/types';

// GET - Tek bir turu getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tour = getTourById(params.id);
    
    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: tour });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Tur getirilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Turu güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const tour: Tour = { ...body, id: params.id };
    
    saveTour(tour);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tur başarıyla güncellendi',
      data: tour 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Tur güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Turu sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    deleteTour(params.id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Tur başarıyla silindi' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Tur silinemedi' },
      { status: 500 }
    );
  }
}

