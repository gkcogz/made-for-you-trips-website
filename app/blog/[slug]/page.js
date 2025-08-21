// app/blog/[slug]/page.js
import { getPostData, getAllPostIds } from '@/lib/posts';
import Image from 'next/image';

// SEO için dinamik başlık oluşturma
export async function generateMetadata({ params }) {
    const postData = await getPostData(params.slug);
    return {
        title: `${postData.title} - M4U Blog`,
    };
}

export default async function PostPage({ params }) {
    const postData = await getPostData(params.slug);

    return (
        <main>
            <div className="blog-layout single-post-layout">
                <article className="single-post">
                    <header className="post-header">
                        <h1>{postData.title}</h1>
                        <div className="post-meta">
                            <span>By {postData.author}</span> | <span>{postData.date}</span>
                        </div>
                    </header>

                    <figure className="featured-image">
                        <Image src={postData.cover_image} alt={postData.title} width={1200} height={600} style={{ objectFit: 'cover' }} />
                    </figure>

                    <div 
                        className="post-content" 
                        dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
                    />
                </article>
            </div>
        </main>
    );
}