// app/blog/page.js
import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/posts';

export default function BlogPage() {
    const allPostsData = getSortedPostsData();

    return (
        <>
            <section className="blog-hero">
                <div className="hero-content">
                    <h1>Stories From Our Cities</h1>
                    <p>Insider tips, hidden gems, and travel inspiration from our local guides.</p>
                </div>
            </section>

            <div className="blog-layout">
                <div className="post-list">
                    {allPostsData.map(({ id, date, title, author, excerpt, cover_image }) => (
                        <div className="post-card" key={id}>
                            <Link href={`/blog/${id}`} className="post-card-image-link">
                                <Image 
                                    src={cover_image} 
                                    alt={title} 
                                    width={800} 
                                    height={400} 
                                    style={{ objectFit: 'cover' }}
                                />
                            </Link>
                            <div className="post-card-content">
                                <div className="post-category">Travel Inspiration</div>
                                <h2><Link href={`/blog/${id}`}>{title}</Link></h2>
                                <p className="post-excerpt">{excerpt}</p>
                                <div className="post-meta">
                                    <span>By {author}</span> | <span>{date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Sidebar'ı daha sonra ekleyebiliriz */}
            </div>
        </>
    );
}