// app/about/page.js
import Image from 'next/image';

export default function AboutPage() {
    return (
        <>
            <section className="about-hero">
                <div className="hero-content">
                    <h1>The Team Behind Your Journey</h1>
                    <p>We are a trio of passionate travelers who believe the best experiences come from genuine human connections. M4U was born from a simple idea: to transform tourism into a true cultural exchange, one personalized trip at a time.</p>
                </div>
            </section>

            <section className="team-section">
                <h2>Meet the Founders</h2>
                <div className="team-grid">
                    {/* Oğuz Can Gökçe Kartı */}
                    <div className="team-card">
                        <div className="team-image-container">
                            <Image
                                src="/team/oguz.jpg"
                                alt="Photo of Oğuz Can Gökçe"
                                width={200}
                                height={200}
                                className="team-photo"
                            />
                        </div>
                        <h3>Oğuz Can Gökçe</h3>
                        <h4>Co-Founder & Visionary</h4>
                        {/* DÜZELTME: M4U's -> M4U&apos;s ve he's -> he&apos;s olarak değiştirildi */}
                        <p>Oğuz is the driving force behind M4U&apos;s mission. With a background in technology and a love for authentic stories, he&apos;s dedicated to building a platform that truly connects people.</p>
                    </div>

                    {/* Aras Toksoy Kartı */}
                    <div className="team-card">
                        <div className="team-image-container">
                             <Image
                                src="/team/aras.jpg"
                                alt="Photo of Aras Toksoy"
                                width={200}
                                height={200}
                                className="team-photo"
                            />
                        </div>
                        <h3>Aras Toksoy</h3>
                        <h4>Co-Founder & Experience Curator</h4>
                        <p>Aras has an unmatched talent for discovering hidden gems. He meticulously vets our local guides and helps curate the unique experiences that make M4U special.</p>
                    </div>

                    {/* Taylan Özkan Kartı */}
                    <div className="team-card">
                        <div className="team-image-container">
                             <Image
                                src="/team/taylan.jpg"
                                alt="Photo of Taylan Özkan"
                                width={200}
                                height={200}
                                className="team-photo"
                            />
                        </div>
                        <h3>Taylan Özkan</h3>
                        <h4>Co-Founder & Community Lead</h4>
                        <p>Taylan builds the bridges between our travelers and local communities. He ensures every journey is not just a trip, but a respectful and enriching cultural dialogue.</p>
                    </div>
                </div>
            </section>
        </>
    );
}