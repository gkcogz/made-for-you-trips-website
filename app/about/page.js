// app/about/page.js

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Autelify</h1>
          <p>
            Autelify is an early-stage product initiative focused on simplifying
            hotel operations through automation and AI.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="team-section">
        <div className="team-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="team-card">
            <h3>Why Autelify Exists</h3>
            <p>
              Small and mid-sized hotels are under increasing pressure to manage
              digital check-in, guest communication, invoicing regulations and
              OTA platforms — often with limited staff and budget.
            </p>
            <p>
              Existing solutions are frequently complex, expensive or built for
              large hotel chains.
            </p>
          </div>

          <div className="team-card">
            <h3>Our Approach</h3>
            <p>
              Autelify is currently in a <strong>research and MVP validation phase</strong>.
              Instead of assumptions, we work directly with hotel professionals
              to understand real operational pain points.
            </p>
            <p>
              Only features that demonstrate clear demand will be built.
            </p>
          </div>

          <div className="team-card">
            <h3>What This Page Is — and Is Not</h3>
            <p>
              This website does not present a finished product or a commercial
              offer.
            </p>
            <p>
              It is part of a product research initiative to evaluate interest in
              selected hotel automation features such as online check-in,
              invoicing automation and AI-assisted guest communication.
            </p>
          </div>

          <div className="team-card">
            <h3>Data & Privacy</h3>
            <p>
              Any information shared through our forms is used solely for
              research purposes and handled in accordance with GDPR principles.
            </p>
            <p>
              No data is sold, shared or used for unsolicited sales activities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
