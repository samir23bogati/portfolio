import React, { useRef, useEffect } from "react";
import "./products.css";

const GooglePlayBadge = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer" className="storeBadge googleBadge">
    <svg className="badgeIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.18 23.76a2.5 2.5 0 0 1-1.18-2.14V2.38A2.5 2.5 0 0 1 3.18.24L15.85 12 3.18 23.76z" fill="#EA4335"/>
      <path d="M20.52 13.76l-3.24 1.88L13.4 12l3.88-3.64 3.24 1.88a2.5 2.5 0 0 1 0 4.34z" fill="#FBBC04"/>
      <path d="M3.18.24L15.85 12 13.4 14.45 2 8.12A2.5 2.5 0 0 1 3.18.24z" fill="#4285F4"/>
      <path d="M3.18 23.76L13.4 14.45 15.85 12 3.18 23.76z" fill="#34A853"/>
    </svg>
    <span className="badgeText">
      <small>GET IT ON</small>
      <strong>Google Play</strong>
    </span>
  </a>
);

const AppStoreBadge = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer" className="storeBadge appleBadge">
    <svg className="badgeIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.15-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white"/>
    </svg>
    <span className="badgeText">
      <small>Download on the</small>
      <strong>App Store</strong>
    </span>
  </a>
);

const PRODUCTS = [
  {
    id: "nec-mcq",
    name: "NEC MCQs",
    subtitle: "Computer Engineering",
    description:
      "Ace the Nepal Engineering Council licensing exam with topic-wise MCQ banks, timed mock tests, and detailed answer explanations — all offline.",
    accent: "#1a73e8",
    gradient: "linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)",
    emoji: "📖",
    company: "BogatiX",
    companyUrl: null,
    stores: [{ type: "play", url: "https://play.google.com/store/apps/details?id=com.nec_mcq" }],
  },
  {
    id: "byaparhouse",
    name: "ByaparHouse",
    subtitle: "Marketplace & Business",
    description:
      "Nepal's modern business platform — list products, manage inventory, and connect with buyers and sellers in a unified, intuitive mobile app.",
    accent: "#ff512f",
    gradient: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
    emoji: "🛒",
    company: "ManiCorp",
    companyUrl: "https://manicorp.com.np",
    stores: [
      { type: "play",  url: "https://play.google.com/store/apps/details?id=com.byaparhouseapp" },
      { type: "apple", url: "https://apps.apple.com/us/app/byaparhouse/id6760815538" },
    ],
  },
];

const Products = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target;
          card.classList.add("door-open");

          /* After the door swings fully open, restore a clean transform
             so normal :hover works without fighting the animation fill */
          card.addEventListener(
            "animationend",
            () => {
              card.style.opacity   = "1";
              card.style.transform = "none";
              card.style.animation = "none";
              card.classList.add("door-done");
            },
            { once: true }
          );

          observer.unobserve(card);
        });
      },
      { threshold: 0.18 }
    );

    cardRefs.current.forEach((c) => c && observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="productsSection">
      <div className="productsInner">
        <div className="productsHeader">
          <span className="productsBrand">BogatiX</span>
          <h2 className="productsTitle">Our Products</h2>
          <p className="productsSubtitle">
            Apps built to solve real problems — engineered with precision.
          </p>
        </div>

        <div className="productsGrid">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => (cardRefs.current[i] = el)}
              /* even index → left hinge, odd → right hinge */
              className={`productCard ${i % 2 === 0 ? "door-left" : "door-right"}`}
              style={{
                "--card-accent": product.accent,
                "--door-delay": `${i * 0.2}s`,
              }}
            >
              <div className="productCardTop" style={{ background: product.gradient }}>
                <span className="productEmoji">{product.emoji}</span>
                <div className="productBadgeWrap">
                  <span className="productPlatformBadge">Mobile App</span>
                </div>
              </div>

              <div className="productCardBody">
                <div className="productMeta">
                  <h3 className="productName">{product.name}</h3>
                  <p className="productSubtitle">{product.subtitle}</p>
                </div>

                <p className="productDesc">{product.description}</p>

                <div className="productFooter">
                  <span className="productCompany">
                    by{" "}
                    {product.companyUrl ? (
                      <a href={product.companyUrl} target="_blank" rel="noreferrer" className="companyLink">
                        {product.company}
                      </a>
                    ) : (
                      <strong>{product.company}</strong>
                    )}
                  </span>
                  <div className="storeBadges">
                    {product.stores.map((store) =>
                      store.type === "play" ? (
                        <GooglePlayBadge key="play"  url={store.url} />
                      ) : (
                        <AppStoreBadge  key="apple" url={store.url} />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
