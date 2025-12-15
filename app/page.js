import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Hotel Operations. Simplified.</h1>
          <p>
            We are validating a new <strong>AI-powered hotel automation platform</strong>
            for small and mid-sized hotels in Germany and Italy.
          </p>
          <p style={{ opacity: 0.9 }}>
            This page is part of a <strong>product research & MVP validation</strong>.
            No sales, no commitments.
          </p>
          <Link href="/questionnaire" className="cta-button">
            Share Your Feedback (1 min)
          </Link>
        </div>
      </section>

      {/* WHY */}
      <section className="how-it-works">
        <h2>Why Are We Doing This?</h2>
        <div className="steps-container">
          <div className="step">
            <h3>Hotel operations are becoming complex</h3>
            <p>
              Digital check-in, invoicing regulations, OTA management and guest
              communication require multiple disconnected tools.
            </p>
          </div>
          <div className="step">
            <h3>Most solutions are expensive or hard to use</h3>
            <p>
              Small and mid-sized hotels often lack the budget or technical staff
              to implement complex systems.
            </p>
          </div>
          <div className="step">
            <h3>We want to build only what matters</h3>
            <p>
              Instead of assumptions, we validate real needs directly with hotel
              professionals before building the product.
            </p>
          </div>
        </div>
      </section>

      {/* MVP FEATURES */}
      <section className="how-it-works">
        <h2>Features We Are Validating</h2>
        <div className="steps-container">
          <div className="step">
            <h3>GDPR-Compliant Online Check-In</h3>
            <p>
              Digital guest check-in with optional identity verification and
              automated document generation.
            </p>
          </div>
          <div className="step">
            <h3>Easy-to-Use PMS</h3>
            <p>
              A simple hotel management system designed for reception teams with
              minimal training.
            </p>
          </div>
          <div className="step">
            <h3>AI-Based Digital Invoicing</h3>
            <p>
              Automated, compliant invoice generation tailored to European
              regulations.
            </p>
          </div>
          <div className="step">
            <h3>OTA Integrations</h3>
            <p>
              Two-way synchronization with Booking.com, Airbnb, Hotels.com and
              similar platforms.
            </p>
          </div>
          <div className="step">
            <h3>AI Chatbot & Voice Agent</h3>
            <p>
              24/7 guest communication via chat and voice to reduce reception
              workload.
            </p>
          </div>
          <div className="step">
            <h3>Cancellation Prediction</h3>
            <p>
              AI-based analysis to identify high-risk reservations and reduce
              revenue loss.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero">
        <div className="hero-content">
          <h2>Help Us Build the Right Product</h2>
          <p>
            Tell us which features are relevant for your hotel and what problems
            you face today.
          </p>
          <Link href="/questionnaire" className="cta-button">
            Start Short Survey
          </Link>
        </div>
      </section>
    </>
  );
}
