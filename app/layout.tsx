import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shivam Kumar — Cinematic Portfolio',
  description: 'A premium, cinematic developer portfolio showcasing elite software and web engineering solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}