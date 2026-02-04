import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  turlar: [
    { title: 'Tüm Turlar', href: '/turlar' },
    { title: 'Kendi Turunu Oluştur', href: '/turlar/kendi-turunu-olustur' },
    { title: 'Popüler Turlar', href: '/turlar?filter=popular' },
  ],
  vize: [
    { title: 'Vize Danışmanlığı', href: '/vize' },
    { title: 'Ülkeler', href: '/vize/ulkeler' },
    { title: 'Vize Talebi Oluştur', href: '/vize/talep-olustur' },
  ],
  kurumsal: [
    { title: 'Hakkımızda', href: '/hakkimizda' },
    { title: 'İletişim', href: '/iletisim' },
    { title: 'SSS', href: '/sss' },
  ],
  yasal: [
    { title: 'Gizlilik Politikası', href: '/gizlilik' },
    { title: 'Kullanım Şartları', href: '/kullanim-sartlari' },
    { title: 'KVKK', href: '/gizlilik#kvkk' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Vizelyio"
                width={180}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm mb-4 text-slate-300 max-w-md">
              Vizelyio ile hayalinizdeki tatili planlayın. Turlar, vize danışmanlığı ve 
              özel tur organizasyonları ile seyahatlerinizi kolaylaştırıyoruz.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+90 212 XXX XX XX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@vizelyio.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Turlar</h3>
            <ul className="space-y-2">
              {footerLinks.turlar.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Vize</h3>
            <ul className="space-y-2">
              {footerLinks.vize.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mb-4 mt-6">Kurumsal</h3>
            <ul className="space-y-2">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Yasal</h3>
            <ul className="space-y-2">
              {footerLinks.yasal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <h3 className="font-semibold text-white mb-4 mt-6">Bizi Takip Edin</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-300">
            © {new Date().getFullYear()} Vizelyio. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-300">TÜRSAB Belge No: XXXXX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

