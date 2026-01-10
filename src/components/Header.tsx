'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, User, LogOut, LayoutDashboard, Plane, Stamp } from 'lucide-react';

const navItems = [
  { title: 'Turlar', href: '/turlar' },
  { title: 'Vize', href: '/vize' },
  { title: 'Hakkımızda', href: '/hakkimizda' },
  { title: 'İletişim', href: '/iletisim' },
];

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1a365d] text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Gezi Makinesi"
              width={180}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Talep Oluştur Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Talep Oluştur
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/turlar/kendi-turunu-olustur" className="flex items-center">
                    <Plane className="mr-2 h-4 w-4" />
                    Tur Talebi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/vize/talep-olustur" className="flex items-center">
                    <Stamp className="mr-2 h-4 w-4" />
                    Vize Talebi
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center border-white/30 text-white hover:bg-white/10">
                    <User className="mr-2 h-4 w-4" />
                    {user?.fullName.split(' ')[0]}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/panel" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Panel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/panel/talepler" className="flex items-center">
                      <Plane className="mr-2 h-4 w-4" />
                      Taleplerim
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="border-orange-400 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-500" asChild>
                <Link href="/giris">Giriş Yap</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium py-2 border-b"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <Link
                    href="/turlar/kendi-turunu-olustur"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full" variant="default">
                      <Plane className="mr-2 h-4 w-4" />
                      Tur Talebi Oluştur
                    </Button>
                  </Link>
                  <Link
                    href="/vize/talep-olustur"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full" variant="outline">
                      <Stamp className="mr-2 h-4 w-4" />
                      Vize Talebi Oluştur
                    </Button>
                  </Link>
                </div>
                <div className="pt-4 border-t">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <Link href="/panel" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Panel
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Çıkış Yap
                      </Button>
                    </div>
                  ) : (
                    <Link href="/giris" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Giriş Yap
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

