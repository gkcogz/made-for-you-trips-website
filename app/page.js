import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Travel Like You Live There.</h1>
          <p>Design your perfect trip with the people who know it best: the locals.</p>
          <Link href="/questionnaire" className="cta-button">Design Your Journey</Link>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Tell Us Your Dream</h3>
            <p>Share your interests, travel style, and budget through a simple form.</p>
          </div>
          <div className="step">
            <h3>2. Meet Your Local Insider</h3>
            <p>We`ll connect you with a handpicked local guide who shares your passions.</p>
          </div>
          <div className="step">
            <h3>3. Enjoy Your Custom Journey</h3>
            <p>Experience the city through a unique itinerary designed just for you.</p>
          </div>
        </div>
      </section>
    </>
  );
}