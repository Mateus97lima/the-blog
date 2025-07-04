import type { Metadata } from 'next';

import './globals.css';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';



export const metadata: Metadata = {
  title: {
    default:'the blog - este e um blog com next.js',
    template:'%s | The Blog'
  },
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body

      >
        <Container>
          <Header />
          {children}

       <Footer/>
        </Container>
      </body>
    </html>
  );
}
