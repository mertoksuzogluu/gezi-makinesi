import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName, requestId, status, note, requestType } = body;

    if (!email || !fullName || !status) {
      return NextResponse.json(
        { error: 'Eksik bilgiler' },
        { status: 400 }
      );
    }

    // Durum mesajları
    const statusMessages: Record<string, { title: string; message: string }> = {
      'Alındı': {
        title: 'Talebiniz Alındı',
        message: 'Talebiniz başarıyla alındı. En kısa sürede size dönüş yapacağız.'
      },
      'İncelemede': {
        title: 'Talebiniz İnceleniyor',
        message: 'Talebiniz detaylı olarak inceleniyor. Size en uygun çözümü hazırlıyoruz.'
      },
      'Belgeler Bekleniyor': {
        title: 'Belgeleriniz Gerekli',
        message: 'Vize başvurunuz için bazı belgeler gerekiyor. Lütfen eksik belgeleri tamamlayın.'
      },
      'Randevu Tarihi Belirlendi': {
        title: 'Randevu Tarihiniz Belirlendi',
        message: note || 'Randevu tarihiniz belirlendi. Detaylar için lütfen bizimle iletişime geçin.'
      },
      'Konsolosluk Sürecinde': {
        title: 'Konsolosluk Sürecinde',
        message: 'Başvurunuz konsoloslukta değerlendiriliyor. Süreç hakkında bilgilendirileceksiniz.'
      },
      'Teklif Hazırlandı': {
        title: 'Teklifiniz Hazır',
        message: 'Size özel tur teklifiniz hazırlandı. Detayları inceleyebilirsiniz.'
      },
      'Onay Bekleniyor': {
        title: 'Onayınız Bekleniyor',
        message: 'Teklifimizi incelemenizi ve onayınızı bekliyoruz.'
      },
      'Pasaport Teslim Alındı': {
        title: 'Pasaportunuz Teslim Alındı',
        message: 'Pasaportunuz başarıyla teslim alındı. Vize işleminiz tamamlanmak üzere.'
      },
      'Tamamlandı': {
        title: 'Talebiniz Tamamlandı',
        message: 'Talebiniz başarıyla tamamlandı. İyi seyahatler dileriz!'
      },
      'İptal Edildi': {
        title: 'Talep İptal Edildi',
        message: 'Talebiniz iptal edilmiştir. Detaylar için lütfen bizimle iletişime geçin.'
      }
    };

    const statusInfo = statusMessages[status] || {
      title: 'Durum Güncellendi',
      message: 'Talebinizin durumu güncellendi.'
    };

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${statusInfo.title}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Vizelyio</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef; border-top: none;">
            <h2 style="color: #3b82f6; margin-top: 0;">${statusInfo.title}</h2>
            
            <p>Sayın <strong>${fullName}</strong>,</p>
            
            <p>${statusInfo.message}</p>
            
            ${note ? `
              <div style="background: #e7f3ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0;"><strong>Not:</strong> ${note}</p>
              </div>
            ` : ''}
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0;"><strong>Talep ID:</strong> ${requestId}</p>
              <p style="margin: 0 0 10px 0;"><strong>Talep Türü:</strong> ${requestType === 'tour' ? 'Tur Talebi' : 'Vize Talebi'}</p>
              <p style="margin: 0;"><strong>Durum:</strong> ${status}</p>
            </div>
            
            <p>Herhangi bir sorunuz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
              <p style="color: #6c757d; font-size: 14px; margin: 0;">
                Vizelyio - Turlar & Vize Danışmanlığı<br>
                <a href="https://vizelyio.com" style="color: #3b82f6; text-decoration: none;">vizelyio.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Email gönder
    const { data, error } = await resend.emails.send({
      from: 'Vizelyio <noreply@vizelyio.com>', // Resend'de domain doğrulaması yapmanız gerekecek
      to: email,
      subject: `${statusInfo.title} - ${requestId}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Email gönderilemedi', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id 
    });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}

