import React from "react";

function SikkimMonasteryHelpline() {
  return (
    <div className="helpline-page">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h2>Need Immediate Assistance?</h2>
            <p>
              Our helpline provides quick access to monastery contacts, cultural
              resources, and local emergency services across Sikkim.
            </p>
            <a href="tel:+911234567890" className="call-btn">
              📞 Call Now
            </a>
          </div>
          <div className="hero-image">
            <img
              src="/images/helpline/monastery-help.jpg"
              alt="Helpline support"
            />
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="grid">
          <div className="card">
            <h3>Emergency Contacts</h3>
            <ul>
              <li>🚑 Ambulance: 102</li>
              <li>🚓 Police: 100</li>
              <li>🔥 Fire Service: 101</li>
              <li>🕉️ Monastery Helpline: +91-1234567890</li>
            </ul>
          </div>

          <div className="card">
            <h3>Resources</h3>
            <p>
              Get details of local monasteries, cultural event schedules, and
              helpline support available 24/7.
            </p>
          </div>

          <div className="card">
            <h3>Popular Monasteries</h3>
            <p>
              Quick access to Rumtek, Pemayangtse, Enchey, Tashiding & Phodong
              Monastery details.
            </p>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <h3>24x7 Sikkim Monastery Helpline</h3>
          <p>We are here to assist you anytime, anywhere.</p>
        </footer>
      </div>

      {/* Styles */}
      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          background: linear-gradient(to bottom, #f0f9ff, #ffffff);
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
          align-items: center;
        }

        .hero-text h2 {
          font-size: 2rem;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }

        .hero-text p {
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        .call-btn {
          display: inline-block;
          background: #1e40af;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: bold;
          text-decoration: none;
          transition: background 0.3s;
        }
        .call-btn:hover {
          background: #2563eb;
        }

        .hero-image img {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .grid {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
        }

        .footer {
          margin-top: 4rem;
          text-align: center;
          background: #1e40af;
          color: white;
          padding: 2rem;
          border-radius: 12px;
        }

        .footer h3 {
          margin-bottom: 0.5rem;
          color: #facc15;
        }
      `}</style>
    </div>
  );
}

export default SikkimMonasteryHelpline;
