import { useNavigate } from "react-router-dom";
import logoGreen from "../assets/logo-green.png";
import "../styles/landin.css";
import CheckIcon from "../assets/icons/check.svg";
import { DocumentIcon, CreditCardIcon, EyeIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="landing-page">
      
      {/* Navigation */}
      <nav className="top-navigation">
        <div className="nav-wrapper">

          <div className="nav-left">
            <img
              src={logoGreen}
              alt="SecureX Logo"
              className="nav-logo-image"
              onClick={() => navigate("/")}
            />
          </div>

          <div className={`nav-menu-links ${isMenuOpen ? "active" : ""}`}>
            <a href="#home">Home</a>
            <a href="#how-it-works">How it works</a>
            <a href="#benefits">Benefits</a>
            <a href="#contact">Contact</a>

            <div className="mobile-actions">
              <button onClick={() => navigate("/login")}>
                Sign In
              </button>
              <button onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </div>
          </div>

          <div className="nav-action-buttons">
            <button
              className="nav-btn-signin"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="nav-btn-signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Hamburger */}
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>

        </div>
      </nav>
      {/* Hero Section with Gradient Background */}
      <section className="hero-section-full">
        <div className="hero-content-wrapper">
          {/* Left Side */}
          <div className="hero-left-content">
            <h1 className="main-heading">
              <span className="text-green">Secure</span> Every Transaction
              <br />
              with Trust
            </h1>

            <p className="hero-description">
              SecureX is your trusted escrow partner, ensuring safe, hassle-free
              online transactions for buyers and sellers.
            </p>

            {/* Email Input Box */}
            <div className="email-input-container">
              <input
                type="email"
                placeholder="Enter your email address"
                className="hero-email-field"
              />
              <button className="get-started-button" onClick={() => navigate("/signup")}>
                Get Started →
              </button>
            </div>

            <p className="no-credit-text">
              No credit card required • Cancel anytime
            </p>
          </div>

          {/* Right Side - Transparent Card */}
 <div className="hero-right-content">
  <div className="glass-card">

    <h3>
      Effortless and Secure<br />
      Transactions Made Easy
    </h3>

    <div className="steps-wrapper">

      <div className="step-pill">
        <img src={CheckIcon} alt="Check Icon" className="check-icon" />
        <span>Buyer and seller get in touch</span>
      </div>

      <div className="step-pill">
        <img src={CheckIcon} alt="Check Icon" className="check-icon" />
        <span>Seller fortifies the asset</span>
      </div>

      <div className="step-pill">
        <img src={CheckIcon} alt="Check Icon" className="check-icon" />
        <span>Buyer approves the asset</span>
      </div>

      <div className="step-pill">
        <img src={CheckIcon} alt="Check Icon" className="check-icon" />
        <span>SecureX pays the seller</span>
      </div>
     </div>
  </div>
 </div>
</div>
</section>

      {/* How It Works Section */}
      <section className="how-works-white-section">
        <h2 className="section-title-dark">How It Works</h2>

        <div className="how-cards-container">
          {/* Card 1 */}
          <div className="how-step-card">
            <div className="icon-box-green">
               <DocumentIcon className="how-icon" />
            </div>
            <h3>Start a transaction</h3>
            <p>
              Follow the process by creating a transaction. Provide the
              necessary details to secure the transaction terms.
            </p>
          </div>

          {/* Card 2 */}
          <div className="how-step-card">
            <div className="icon-box-green">
              <CreditCardIcon className="how-icon" />
            </div>
            <h3>Pay As Agreed</h3>
            <p>
              The buyer deposits the agreed sum in our SecureX's escrow
              account for the transaction.
            </p>
          </div>

          {/* Card 3 */}
          <div className="how-step-card">
            <div className="icon-box-green">
               <div className="icon-box-green">
            <EyeIcon className="how-icon" />
          </div>
            </div>
            <h3>Track the order</h3>
            <p>
              After application, the buyer conducts due diligence to track
              transactions status.
            </p>
          </div>

          {/* Card 4 */}
          <div className="how-step-card">
            <div className="icon-box-green">
              <ArchiveBoxIcon className="how-icon" />
            </div>
            <h3>Securely release the Payout</h3>
            <p>
              Once the buyer confirms the warranty, we'll release the
              secured payment of funds to the seller.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose SecureX Section */}
      <section className="why-section-gray">
        <h2 className="section-title-dark">Why Choose SecureX?</h2>
        <p className="section-subtitle-gray">
          We provide the most secured and reliable escrow services for all your online
         <br /> transactions
        </p>

        <div className="benefits-two-col-grid">
          {/* Benefit 1 */}
          <div className="benefit-white-card">
            <div className="benefit-icon-purple">
             <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                 <rect x="8" y="12" width="12" height="10" rx="2"
                   stroke="#5B5FFF" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round" />
                 <path d="M10 12V9C10 6.8 11.8 5 14 5C16.2 5 18 6.8 18 9V12" stroke="#5B5FFF" strokeWidth="2"
                    strokeLinecap="round" />
               </svg>
            </div>
            <h3>Bank-Level Security</h3>
            <p>
              Your funds are protected with military-grade encryption and secured
              infrastructure that exceeds industry standards.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="benefit-white-card">
            <div className="benefit-icon-purple">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
               <path d="M14 4L7 7V13C7 17.5 10.5 21.5 14 23C17.5 21.5 21 17.5 21 13V7L14 4Z"
                stroke="#5B5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               <path d="M13 10L11 14H14L12 18L17 13H14L16 10Z"
                stroke="#5B5FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Fraud Protection</h3>
            <p>
              Advanced AI-powered systems detect and prevent fraudulent transactions
              before they happen.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="benefit-white-card">
            <div className="benefit-icon-purple">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14C6 9.6 9.6 6 14 6C18.4 6 22 9.6 22 14"
                  stroke="#5B5FFF" strokeWidth="2" strokeLinecap="round" />
                 <rect x="4" y="14" width="4" height="6" rx="2" stroke="#5B5FFF" strokeWidth="2"/>
                  <rect x="20" y="14" width="4" height="6" rx="2"stroke="#5B5FFF" strokeWidth="2" />
               </svg>
            </div>
            <h3>24/7 Support</h3>
            <p>
              Our dedicated team is available around the clock to assist with any
              transaction-related concerns.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="benefit-white-card">
            <div className="benefit-icon-purple">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="11" cy="11" r="3" stroke="#5B5FFF" strokeWidth="2" />
                 <circle cx="18" cy="12" r="2.5" stroke="#5B5FFF" strokeWidth="2" />
                 <path d="M6 20C6 17.8 8.5 16 11 16C13.5 16 16 17.8 16 20" stroke="#5B5FFF" strokeWidth="2"strokeLinecap="round" />
                 <path d="M15 20C15 18.5 16.8 17.5 18.5 17.5C20.2 17.5 22 18.5 22 20"
                  stroke="#5B5FFF"strokeWidth="2"strokeLinecap="round"/>
                </svg>
            </div>
            <h3>Trusted by Thousands</h3>
            <p>
              Join over 8,000+ active buyers and sellers who trust SecureX to secure their
              transactions through SecureX.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-dark">
        <h2>Ready to Secure Your Transactions?</h2>
        <p>
          Join thousands of satisfied users who trust SecureX for safe and
          reliable escrow services
        </p>

        <div className="cta-button-group">
          <button className="btn-create-account" onClick={() => navigate("/signup")}>
            Create New Account
          </button>
          <button className="btn-learn-more">Learn More</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark-footer">
        <div className="footer-grid-container">
          <div className="footer-brand-col">
            <div className="footer-brand-logo">
              <img src={logoGreen} alt="SecureX"></img>
              
            </div>

            <p className="footer-tagline">
              Your most trusted escrow service for safe<br />
              and reliable online transactions.
            </p>

            <div className="footer-social-row">
              <a href="#" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-icon-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="footer-link-col">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
              <a href="#">API</a>
            </div>

            <div className="footer-link-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Press</a>
            </div>

            <div className="footer-link-col">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <p>© 2026 SecureX. All rights reserved. | Securing trust and privacy worldwide</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;