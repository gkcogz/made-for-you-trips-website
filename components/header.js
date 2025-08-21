import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo-link">
                    <Image
                        src="/images/m4u-logo-1.png"
                        alt="M4U Logo"
                        width={130}  // Logonuzun doğal genişliğine yakın bir değer
                        height={50} // Logonuzun doğal yüksekliğine yakın bir değer
                        priority
                    />
                </Link>
                
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/contact" className="contact-button">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}