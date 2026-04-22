import { DM_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Produtora Replay',
  description: 'Produtora audiovisual Replay',
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
      className={`${dmSans.variable} w-screen overflow-x-hidden overflow-y-auto`}
    >
      <body className="w-full overflow-x-hidden overflow-y-auto antialiased">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
