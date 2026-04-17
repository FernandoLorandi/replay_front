import { DM_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${dmSans.variable} h-screen w-screen overflow-y-auto overflow-x-hidden`}
    >
      <body className="antialiased h-full w-full overflow-y-auto overflow-x-hidden">
        <main className="h-full w-full bg-zinc-950">{children}</main>
      </body>
    </html>
  );
}
