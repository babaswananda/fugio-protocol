import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'FUGIO Protocol - Operator-native AI Agent Ecosystem',
  description: 'The world\'s first Operator-native AI Agent ecosystem. Born from the convergence of Bitcoin\'s economic rebellion, AI\'s sovereign cognition, and memetic identity infrastructure.',
  keywords: ['AI', 'blockchain', 'protocol', 'agent', 'bitcoin', 'operator', 'fugio', 'worldmodel'],
  authors: [{ name: 'FUGIO Protocol Team' }],
  openGraph: {
    title: 'FUGIO Protocol',
    description: 'Operator-native AI Agent ecosystem',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FUGIO Protocol',
    description: 'Operator-native AI Agent ecosystem',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
