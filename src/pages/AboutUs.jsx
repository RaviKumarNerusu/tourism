import React from "react";
import "./AboutUs.css"; // Import the styles

const AboutUs = () => {
  return (
    <div className="aboutus-bg">
      <div className="aboutus-container">
        <h1 className="aboutus-heading">About Monastery360</h1>

        <section>
          <h2>🕍 What is a Monastery?</h2>
          <p>
            A <strong>monastery</strong> is a sacred spiritual institution where monks or nuns dedicate their lives to religious study, prayer, meditation, and service. Derived from the Greek word <em>monastērion</em> (meaning "to live alone"), monasteries represent a way of life focused on detachment from materialism and devotion to spiritual growth.
          </p>
          <p>
            In the Buddhist context, especially in the Himalayas, monasteries—also called <em>Gompas</em>—are more than religious centers. They are seats of learning, community healing, art preservation, and cultural storytelling.
          </p>
        </section>

        <section>
          <h2>📜 History of Monasteries in Sikkim</h2>
          <p>
            Buddhism was first introduced to Sikkim in the 8th century by <strong>Guru Padmasambhava</strong>. The institutional foundation began in 1642 with <strong>Phuntsog Namgyal</strong>, the first Chogyal of Sikkim.
          </p>
          <p>
            This led to the building of <strong>Dubdi Monastery</strong> in 1701, followed by others like <strong>Tashiding</strong>, <strong>Rumtek</strong>, <strong>Phodong</strong>, and <strong>Enchey</strong>.
          </p>
        </section>

        <section>
          <h2>🏯 Cultural and Spiritual Importance</h2>
          <p>
            Monasteries are cultural and spiritual hubs. Many belong to the <strong>Nyingma</strong> or <strong>Kagyu</strong> schools of Tibetan Buddhism. They preserve art, mantras, and oral teachings passed through generations.
          </p>
          <p>
            Festivals like <strong>Pang Lhabsol</strong> and <strong>Losar</strong> are celebrated with <em>Cham</em> dances, prayers, and feasts.
          </p>
        </section>

        <section>
          <h2>🌏 Why We Built Monastery360</h2>
          <p>
            <strong>Monastery360</strong> offers a digital window into Sikkim’s monasteries through immersive <strong>360° virtual tours</strong>, audio guides, and historical insights.
          </p>
          <p>
            We also support <strong>local storytelling</strong> and <strong>oral histories</strong> to keep these sacred sites alive for future generations.
          </p>
        </section>

        <section>
          <h2>🏞 Featured Monasteries</h2>
          <ul>
            <li><strong>Rumtek Monastery</strong> – Seat of the Karmapa, known for its grandeur and relics.</li>
            <li><strong>Tashiding Monastery</strong> – Purifies sins upon visiting.</li>
            <li><strong>Dubdi Monastery</strong> – The oldest in Sikkim.</li>
            <li><strong>Enchey Monastery</strong> – Famous for Cham dance and tranquility.</li>
            <li><strong>Phodong Monastery</strong> – Celebrated for murals and festivals.</li>
          </ul>
        </section>

        <section>
          <h2>📑 Research Insights</h2>
          <p>
            For more detailed information about our research on Sikkim's monasteries, please explore our comprehensive PDF report:
            <a href="https://drive.google.com/file/d/1GZGtLZF_t7H5WE03j4-B3KQ2wUITdVe4/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
              View Research PDF
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;