import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Card from "../components/Card";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  CreditCardIcon,
  EyeIcon,
  ArchiveBoxIcon,
  PhoneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (email.trim()) {
      navigate("/signup", { state: { email } });
    } else {
      navigate("/signup");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Navigation — dark sticky, matching design system MarketingNav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(15, 18, 48, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 48px",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                background:
                  "linear-gradient(135deg, var(--navy-600) 0%, var(--indigo-600) 100%)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(74,92,245,0.28)",
                flexShrink: 0,
              }}
            >
              <ShieldCheckIcon
                style={{ width: 20, height: 20, color: "white" }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--w-bold)",
                fontSize: 20,
                color: "white",
                letterSpacing: "-0.01em",
              }}
            >
              SecureX
            </span>
          </div>

          {/* Links (hidden on small screens via media query) */}
          <div
            className="landing-nav-links"
            style={{ display: "flex", gap: 32 }}
          >
            {["How it works", "Benefits", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  color: "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: "var(--w-medium)",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--mint-500)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.78)")
                }
              >
                {label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: "var(--w-semibold)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background .15s",
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                background: "var(--mint-500)",
                border: "none",
                color: "white",
                padding: "10px 22px",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: "var(--w-semibold)",
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 6px 18px rgba(0,217,163,0.25)",
                transition: "background .15s, transform .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--mint-600)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--mint-500)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          background: "var(--grad-hero)",
          color: "var(--white)",
          padding: "var(--space-20) var(--space-8)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: "var(--w-semibold)",
              fontSize: "var(--text-xs)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color: "var(--mint-500)",
              marginBottom: "var(--space-4)",
            }}
          >
            SECURED ESCROW
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--w-bold)",
              fontSize: "var(--text-6xl)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--white)",
              margin: "0 0 var(--space-4) 0",
            }}
          >
            Secure Every Transaction
            <br />
            with Trust
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-xl)",
              lineHeight: "var(--lh-relaxed)",
              color: "rgba(255, 255, 255, 0.9)",
              margin: "0 auto var(--space-8)",
              maxWidth: "600px",
            }}
          >
            SecureX is your trusted escrow partner, ensuring safe, hassle-free
            online transactions for buyers and sellers.
          </p>

          {/* Email capture */}
          <div style={{ maxWidth: "500px", margin: "0 auto var(--space-6)" }}>
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                flexWrap: "wrap",
              }}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "var(--white)",
                  color: "var(--ink-700)",
                }}
              />
              <Button
                variant="mint"
                onClick={handleGetStarted}
                trailing={
                  <ArrowRightIcon
                    style={{ width: "16px", height: "16px" }}
                  />
                }
              >
                Get Started
              </Button>
            </div>
          </div>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "var(--text-sm)",
              margin: 0,
            }}
          >
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* How It Works — 4 steps */}
      <section
        id="how-it-works"
        style={{ padding: "88px 48px", background: "var(--white)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: "var(--w-semibold)",
                fontSize: "var(--text-xs)",
                letterSpacing: "var(--tracking-wide)",
                textTransform: "uppercase",
                color: "var(--mint-500)",
                marginBottom: "var(--space-3)",
              }}
            >
              HOW IT WORKS
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--w-bold)",
                fontSize: "var(--text-4xl)",
                lineHeight: "var(--lh-tight)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--ink-900)",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              A single, calm flow — for buyer and seller.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--ink-600)",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              The same four steps, every time. No surprises, no edge cases that
              stop a sale dead in its tracks.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {[
              {
                icon: (
                  <DocumentTextIcon
                    style={{ width: 32, height: 32, color: "var(--mint-600)" }}
                  />
                ),
                title: "Start a transaction",
                desc: "Seller creates a SafePay link with item, price, and terms.",
              },
              {
                icon: (
                  <CreditCardIcon
                    style={{ width: 32, height: 32, color: "var(--mint-600)" }}
                  />
                ),
                title: "Pay as agreed",
                desc: "Buyer deposits into the escrow vault. Funds locked.",
              },
              {
                icon: (
                  <EyeIcon
                    style={{ width: 32, height: 32, color: "var(--mint-600)" }}
                  />
                ),
                title: "Track the order",
                desc: "Both sides see status in real time across PWA + SMS.",
              },
              {
                icon: (
                  <ArchiveBoxIcon
                    style={{ width: 32, height: 32, color: "var(--mint-600)" }}
                  />
                ),
                title: "Release the payout",
                desc: "OTP confirmation triggers release. Auto-release in 48h.",
              },
            ].map((step, i) => (
              <div key={i} style={{ textAlign: "center", padding: "8px 12px" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    background: "var(--grad-mint)",
                    borderRadius: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  {step.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: "var(--w-bold)",
                    fontSize: "var(--text-xl)",
                    lineHeight: "var(--lh-snug)",
                    color: "var(--ink-800)",
                    margin: "0 0 var(--space-2) 0",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-base)",
                    lineHeight: "var(--lh-relaxed)",
                    color: "var(--ink-500)",
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits — Why SecureX */}
      <section
        id="benefits"
        style={{
          padding: "88px 48px",
          background: "var(--bg-subtle)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--w-bold)",
                fontSize: "var(--text-4xl)",
                lineHeight: "var(--lh-tight)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--ink-900)",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              Why SecureX
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--lh-relaxed)",
                color: "var(--ink-600)",
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Trust isn't a feature — it's the whole product.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            {[
              {
                icon: (
                  <LockClosedIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: "var(--indigo-600)",
                    }}
                  />
                ),
                title: "Bank-level security",
                desc: "AES-256 at rest, TLS in transit, PCI-DSS-aligned controls. Your money never sits exposed.",
              },
              {
                icon: (
                  <ShieldCheckIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: "var(--indigo-600)",
                    }}
                  />
                ),
                title: "TrustScore™ on every profile",
                desc: "A live 0–100 trust score from completion rate, dispute history and KYC tier. Buyers see it before they pay.",
              },
              {
                icon: (
                  <PhoneIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: "var(--indigo-600)",
                    }}
                  />
                ),
                title: "Works on any phone",
                desc: "PWA on smartphones, USSD on feature phones. No customer left behind on 2G.",
              },
              {
                icon: (
                  <SparklesIcon
                    style={{
                      width: 26,
                      height: 26,
                      color: "var(--indigo-600)",
                    }}
                  />
                ),
                title: "AI inventory & insights",
                desc: "SecureX learns your sales rhythm and recommends what to restock and when.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  border: "1px solid var(--border-200)",
                  borderRadius: "var(--radius-xl)",
                  padding: "28px",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  gap: 18,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "var(--indigo-100)",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: "var(--w-bold)",
                      fontSize: "var(--text-xl)",
                      lineHeight: "var(--lh-snug)",
                      color: "var(--ink-800)",
                      margin: "0 0 var(--space-2) 0",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "var(--text-base)",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--ink-500)",
                      margin: 0,
                    }}
                  >
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "88px 48px",
          background: "var(--grad-cta)",
          color: "var(--white)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--w-bold)",
              fontSize: "var(--text-4xl)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--white)",
              margin: "0 0 var(--space-4) 0",
            }}
          >
            Ready to make your next sale safer?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-lg)",
              lineHeight: "var(--lh-relaxed)",
              color: "rgba(255, 255, 255, 0.85)",
              margin: "0 0 var(--space-8) 0",
            }}
          >
            Join 8,000+ SMEs across Africa using SecureX to settle high-stakes
            transactions in minutes.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              justifyContent: "center",
            }}
          >
            <Button
              variant="mint"
              onClick={() => navigate("/signup")}
              trailing={
                <ArrowRightIcon style={{ width: "16px", height: "16px" }} />
              }
            >
              Create account
            </Button>
            <button
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.25)",
                color: "white",
                padding: "12px 28px",
                borderRadius: "var(--radius-md)",
                fontWeight: "var(--w-semibold)",
                fontSize: "var(--text-base)",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color .15s, background .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        style={{
          background: "var(--navy-950)",
          color: "var(--white)",
          padding: "48px 48px 28px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            marginBottom: "var(--space-8)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--space-8)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: "var(--space-4)",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    background:
                      "linear-gradient(135deg, var(--navy-600) 0%, var(--indigo-600) 100%)",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShieldCheckIcon
                    style={{ width: 17, height: 17, color: "white" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--w-bold)",
                    fontSize: "var(--text-lg)",
                    color: "var(--white)",
                  }}
                >
                  SecureX
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "var(--text-sm)",
                  margin: 0,
                  lineHeight: "var(--lh-relaxed)",
                }}
              >
                Secure, trusted escrow for African SMEs.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["How it Works", "Pricing", "Security"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Status"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontWeight: "var(--w-semibold)",
                    fontSize: "var(--text-sm)",
                    color: "var(--white)",
                    margin: "0 0 var(--space-4) 0",
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link} style={{ marginBottom: "var(--space-2)" }}>
                      <a
                        href="#"
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          textDecoration: "none",
                          fontSize: "var(--text-sm)",
                          transition: "color .15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.85)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                        }
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "var(--space-6)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--space-4)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.4)",
              fontSize: "var(--text-xs)",
            }}
          >
            © 2026 SecureX. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "var(--space-6)" }}>
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontSize: "var(--text-xs)",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.4)")
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
