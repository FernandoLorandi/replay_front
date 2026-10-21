import { DM_Sans, Geist } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Produtora Replay',
  description: 'Produtora audiovisual Replay'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={cn("dark", "w-screen", "overflow-x-hidden", "overflow-y-auto", dmSans.variable, "font-sans", geist.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="w-full overflow-x-hidden overflow-y-auto antialiased">
        <main className="flex w-full flex-col gap-20 bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
