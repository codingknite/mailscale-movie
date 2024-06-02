import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import { NextAuthProvider } from '@/components/NextAuthProvider';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mailscale Movie',
  description: 'Movie app built for the mailscale take home project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en'>
        <NextAuthProvider>
          <body className={inter.className}>
            <Nav />
            {children}
          </body>
        </NextAuthProvider>
      </html>
    </ReactQueryClientProvider>
  );
}
