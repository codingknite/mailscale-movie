import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';
import Nav from '@/components/Nav';

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
        <body className={inter.className}>
          <Nav />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
