import React, { useState, useEffect } from 'react';
import StickyHeader from './Stickyheader';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Subcomponents
const FeatureCard = ({ icon, title }) => (
  <div
    className="bg-white p-8 text-center shadow-md hover:-translate-y-1 transition-transform duration-200 flex flex-col items-center border border-[#7C6CF6]/20 hover:border-[#24E37A] hover:ring-2 hover:ring-[#24E37A] hover:ring-opacity-30"
  >
    <img
      loading="lazy"
      src={icon}
      alt={title}
      className="w-12 h-12 mb-4"
      style={{ filter: 'drop-shadow(0 2px 8px #7C6CF6)' }}
    />
    <h3 className="text-lg font-semibold text-[#7C6CF6] leading-tight">{title}</h3>
  </div>
);

const FooterSection = ({ title, links }) => (
  <div>
    <h4 className="text-white font-bold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="text-white/80 cursor-pointer hover:text-[#24E37A] transition-colors">
          {link}
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcons = () => {
  const platforms = [
    { name: 'WhatsApp', src: '/social/whatsapp.svg' },
    { name: 'YouTube', src: '/social/youtube.svg' },
    { name: 'Instagram', src: '/social/instagram.svg' },
    { name: 'Twitter', src: '/social/twitter.svg' },
    { name: 'Facebook', src: '/social/facebook.svg' },
  ];

  return (
    <div className="flex gap-4 flex-wrap justify-center mt-2">
      {platforms.map(({ name, src }) => (
        <a
          key={name}
          href="#"
          aria-label={name}
          className="hover:scale-110 transition"
          onClick={e => e.preventDefault()}
        >
          <img
            loading="lazy"
            src={src}
            alt={name}
            className="w-6 h-6"
            style={{ filter: 'drop-shadow(0 2px 8px #7C6CF6)' }}
          />
        </a>
      ))}
    </div>
  );
};

const ContactCard = ({
  email,
  phone,
  feedbackEmail,
  setFeedbackEmail,
  feedbackMessage,
  setFeedbackMessage,
  submitted,
  handleSubmitFeedback
}) => (
  <section className="max-w-2xl mx-auto mt-8 bg-white/90 shadow-2xl p-10 border border-[#7C6CF6]/20 flex flex-col items-center relative overflow-hidden">
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] w-20 h-20 flex items-center justify-center shadow-lg">
      <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 12.713l11.985-9.713A1 1 0 0 0 22.985 2H1.015a1 1 0 0 0-.999 1.001c0 .31.144.602.39.792L12 12.713zm11.985 1.287l-5.197-4.217-6.788 5.5a1 1 0 0 1-1.2 0l-6.788-5.5L.015 14a1 1 0 0 0 .999 1.001h21.972a1 1 0 0 0 .999-1.001z"/></svg>
    </div>
    <h2 className="text-2xl font-bold text-[#7C6CF6] mb-2 mt-12">Contact Us</h2>
    <p className="text-[#7C6CF6] mb-1">
      <span className="font-semibold">Gmail:</span> <span className="text-[#24E37A]">{email}</span>
    </p>
    <p className="text-[#7C6CF6] mb-4">
      <span className="font-semibold">Phone:</span> <span className="text-[#24E37A]">{phone}</span>
    </p>
    <form onSubmit={handleSubmitFeedback} className="flex flex-col gap-4 mt-4 w-full max-w-md" role="form">
      <h3 className="text-lg font-semibold text-[#7C6CF6] mb-2">Share Your Experience</h3>
      <input
        type="email"
        placeholder="Your email"
        value={feedbackEmail}
        onChange={(e) => setFeedbackEmail(e.target.value)}
        required
        className="border border-[#7C6CF6] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C6CF6] text-[#7C6CF6] bg-white"
      />
      <textarea
        placeholder="Your message"
        value={feedbackMessage}
        onChange={(e) => setFeedbackMessage(e.target.value)}
        required
        className="border border-[#7C6CF6] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C6CF6] min-h-[100px] text-[#7C6CF6] bg-white"
      ></textarea>
      <button
        type="submit"
        className="bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] text-white px-6 py-2 hover:from-[#7C6CF6] hover:to-[#24E37A] hover:ring-4 hover:ring-[#24E37A] hover:ring-opacity-30 font-semibold transition rounded-full"
      >
        Send Feedback
      </button>
      {submitted && (
        <p className="text-[#24E37A] mt-2">Thank you for your feedback!</p>
      )}
    </form>
  </section>
);

// Main Component
const Features = () => {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedbackEmail || !feedbackMessage) return;

    // Simulate submission
    setSubmitted(true);
    setFeedbackEmail('');
    setFeedbackMessage('');

    setTimeout(() => setSubmitted(false), 2500);
  };

  const features = [
    { icon: '/Brain.svg', title: 'Real-Time Deep Fake Detection' },
    { icon: '/features/media-analysis.svg', title: 'Comprehensive Media Analysis' },
    { icon: '/features/Multi-format.svg', title: 'Multi-Format Support' },
    { icon: '/features/user-friendly.svg', title: 'User-Friendly Interface' },
    { icon: '/features/batch.svg', title: 'Batch Processing' },
    { icon: '/features/privacy.svg', title: 'Privacy and Data Security' },
    { icon: '/features/alerts.svg', title: 'Customizable Alerts and Notifications' },
    { icon: '/features/report.svg', title: 'Detailed Reporting and Insights' },
    { icon: '/features/api.svg', title: 'API Integration' },
    { icon: '/features/mobile.svg', title: 'Mobile Compatibility' },
    { icon: '/features/ethical.svg', title: 'Ethical and Legal Guidance' },
    { icon: '/features/supports-language.svg', title: 'Support for Multiple Languages' },
  ];

  const footerLinks = {
    Features: ['Detect videos', 'Detect audio', 'Detect pictures'],
    Information: ['Impact of deep fake', 'Research and development', 'Accuracy and Reliability', 'Overview of deep fakes'],
    Support: ['FAQ', 'Contact', 'Technical Support', 'Troubleshooting Tips', 'Updates and Release Notes'],
    Download: ['iOS', 'Android', 'Windows', 'MAC'],
  };

  return (
    <div className="min-h-screen bg-white max-w-[1440px] font-sans mx-auto">
      <StickyHeader />

      <main>
        <h1
          className="text-center text-4xl md:text-5xl font-bold text-[#7C6CF6] mb-12 mt-10"
          data-aos="zoom-out"
          data-aos-duration="500"
        >
          Fantastic Features
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16 min-h-[724px]">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} />
          ))}
        </section>

        <ContactCard
          email="rv1175544@gmail.com"
          phone="+91 (xxx) 603-8758"
          feedbackEmail={feedbackEmail}
          setFeedbackEmail={setFeedbackEmail}
          feedbackMessage={feedbackMessage}
          setFeedbackMessage={setFeedbackMessage}
          submitted={submitted}
          handleSubmitFeedback={handleSubmitFeedback}
        />
      </main>

      <footer
        className="w-full bg-gradient-to-r from-[#24E37A] to-[#7C6CF6] py-12 mt-16 border-t border-[#7C6CF6]/20 shadow-inner text-white"
        data-aos="zoom-out"
        data-aos-duration="500"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {Object.entries(footerLinks).map(([sectionTitle, links], index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-4 text-white/90">{sectionTitle}</h4>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx} className="text-white/80 cursor-pointer hover:text-[#F9A825] transition-colors">
                    {link}
                  </li>
        ))}
              </ul>
            </div>
          ))}
        </div>
      <div className="flex flex-col items-center my-8">
          <h2 className="text-white font-bold mb-2">Follow us on :</h2>
        <SocialIcons />
      </div>
        <div className="text-center py-4 bg-white/10 border-t border-white/20 shadow-inner mt-8 text-white/70">
        <p className="text-sm">
          ©2024 All Rights Reserved. This site is protected by the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
      </footer>
    </div>
  );
};

export default Features;
