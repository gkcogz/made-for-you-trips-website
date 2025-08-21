import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { Poppins, Lato } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'], weight: ['600', '700'], variable: '--font-poppins',
});
const lato = Lato({
  subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato',
});

export const metadata = {
  title: 'M4U Trips',
  description: 'Personalized Journeys, Made For You.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}