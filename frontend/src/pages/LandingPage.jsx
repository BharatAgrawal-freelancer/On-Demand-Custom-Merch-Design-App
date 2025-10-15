"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import "bootstrap-icons/font/bootstrap-icons.css"


const products = [
  {
    id: 1,
    tag: "Hoodies",
    name: "Badge Hoodie",
    price: "$ 87.95",
    img: "https://us.images.westend61.de/0001719520pw/full-length-of-attractive-woman-in-stylish-clothing-african-female-fashion-model-walking-over-blue-background-jacket-and-shoes-in-hand-JLPSF00764.jpg",
  },
  {
    id: 2,
    tag: "Headwear",
    name: "Mono Beanie",
    price: "$ 23.05",
    img: "https://media.istockphoto.com/id/886639520/photo/laughing-young-women-in-stylish-clothing.jpg?s=612x612&w=0&k=20&c=yTf3bHhCxiu50NuUE5Kqyk0cWPPtqr68txG48Ga9XIM=",
  },
  {
    id: 3,
    tag: "Tees",
    name: "Inverted Tape Tee",
    price: "$ 43.95",
    img: "https://i.pinimg.com/474x/4c/c1/6c/4cc16ccf5ca8b0a1adbc6fb8e9d10ec3.jpg",
  },
  {
    id: 4,
    tag: "Tees",
    name: "Tape Tee",
    price: "$ 43.95",
    img: "https://img.freepik.com/premium-photo/portrait-charming-slim-young-hispanic-brunette-woman-with-fluffy-curly-hair-blue-denim-suit_88135-52150.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 5,
    tag: "Headwear",
    name: "Aged Cap",
    price: "$ 26.50",
    img: "https://media.gettyimages.com/id/2188170683/photo/blue-baseball-cap-on-blue-background-concept-of-fashion-clothing-accessories-hip-hop-baseball.jpg?s=612x612&w=gi&k=20&c=zr-YNXVaoJNggOHrZMrSnUuB_FyzSaiSS-tOc6XBx3A=",
  },
]

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 60,
    })
  }, [])

  return (
    <div
      className="dark min-h-screen bg-background text-foreground"
      // theme tweaks kept local to this component
      style={{
        // brand cyan accent, surface layers, and soft borders
        // Using CSS custom properties allows us to keep styles token-based in this file
        // while matching the reference design's cyan accent.
        ["--brand"]: "#11B8E6",
        ["--surface"]: "#1b1b1b",
        ["--surface-2"]: "#202020",
        ["--muted"]: "#262626",
        ["--soft-border"]: "#2c2c2c",
        ["--radius"]: "12px",
      }}
    >
      {/* Utility styles for marquee and small tweaks */}
      <style>{`
   html, body {
  overflow-x: hidden;
}



        .container {
          max-width: 1120px;
        }
        .pill {
          background: var(--surface);
          border: 1px solid var(--soft-border);
          border-radius: var(--radius);
        }
        .pill-strong {
          background: var(--surface-2);
          border: 1px solid var(--soft-border);
          border-radius: var(--radius);
        }
        .btn-accent {
          background: var(--brand);
          color: #0b0b0b;
          
        }
        .btn-accent:hover { filter: brightness(0.95); }
        .muted { color: #a3a3a3; }
        .marquee {
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
        .marquee__track {
          display: inline-block;
          padding-left: 100%;
          animation: scroll-left 16s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .card {
          background: var(--surface);
          border: 1px solid var(--soft-border);
          border-radius: 10px;
          overflow: hidden;
        }
        .divider {
          height: 1px;
          background: var(--soft-border);
        }
        .footer-col h4 {
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .footer-link {
          color: #cfcfcf;
        }
        .footer-link:hover {
          color: #ffffff;
        }
        .logo-mark {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.no-scrollbar {
  scrollbar-width: none;
}

.marquee-boundary{
width : 85%;}

      `}</style>

      <main className="container mx-auto px-4">
        {/* Hero Brand Wordmark */}
        <section className="py-10 sm:py-14 lg:py-16" data-aos="fade-up">
          <h1 className="text-[14vw] leading-none sm:text-[10vw] lg:text-[8vw] font-extrabold tracking-tight text-balance">
            PRINTBAZAAR<span className="align-top text-[6vw] sm:text-[4vw]">®</span>
          </h1>
        </section>

        {/* Announcement / Banner pill with image tile */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4" data-aos="fade-up">
          <div className="pill p-5 lg:p-7">
            <p className="text-lg sm:text-xl lg:text-2xl max-w-xl">Sustainable printing, limitless design.</p>
            <p className="muted mt-2 max-w-xl">Premium quality apparel and merch, crafted responsibly.</p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="btn-accent px-4 py-2 inline-flex items-center gap-2 text-sm font-medium">
                Shop now <i className="bi bi-arrow-right" aria-hidden="true" />
              </a>
              <a href="#" className="pill-strong px-4 py-2 text-sm">
                Learn more
              </a>
            </div>
          </div>

          <div className="pill overflow-hidden p-0">
            <img
              src={"https://t4.ftcdn.net/jpg/03/13/26/19/360_F_313261968_gabFAgFgBBuxGFhHOgyVgJsUxkDzwsnS.jpg"}
              alt="Editorial"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* Marquee with CTA */}
        <section className="mt-4 grid grid-cols-[1fr_auto] gap-4 items-stretch "  data-aos="fade-up">
          <div className="pill px-0 py-4 marquee-boundary" >
            <div className="marquee text-2xl sm:text-3xl font-semibold">
              <div className="marquee__track">
                <span className="mx-3">New Arrivals</span>
                <span className="mx-3">New Arrivals</span>
                <span className="mx-3">New Arrivals</span>
                <span className="mx-3">New Arrivals</span>
                <span className="mx-3">New Arrivals</span>
                <span className="mx-3">New Arrivals</span>
              </div>
            </div>
          </div>
          
        </section>

        {/* Featured products carousel-like row */}
        <section className="mt-10 lg:mt-14" data-aos="fade-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold">Featured products</h3>
            <div className="hidden sm:flex items-center gap-2">
              <button className="pill-strong p-2" aria-label="Previous">
                <i className="bi bi-chevron-left" aria-hidden="true" />
              </button>
              <button className="pill-strong p-2" aria-label="Next">
                <i className="bi bi-chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[45%] md:auto-cols-[32%] lg:auto-cols-[24%] gap-4 overflow-x-auto pb-2 no-scrollbar">
            {products.map((p) => (
              <article key={p.id} className="card">
                <img
                  src={p.img || "/placeholder.svg"}
                  alt={`${p.name} product image`}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <div className="muted text-xs uppercase tracking-wide">{p.tag}</div>
                  <div className="flex items-center justify-between mt-1">
                    <h4 className="font-semibold">{p.name}</h4>
                    <div className="muted text-sm">{p.price}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About blurb */}
        <section className="mt-16 lg:mt-24 grid md:grid-cols-2 gap-8 items-start" data-aos="fade-up">
          <div className="hidden md:block" />
          <div>
            <p className="max-w-md leading-relaxed text-pretty">
              We are a sustainable printing studio, making premium apparel and merch our way. We blend our love for
              design with ethical and eco‑friendly production.
            </p>
            <a href="#" className="inline-flex items-center gap-2 mt-4 text-sm footer-link">
              About us <i className="bi bi-arrow-up-right" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Huge faint motto */}
        <section className="mt-16 lg:mt-24" aria-hidden="true">
          <div className="text-center text-[10vw] sm:text-[8vw] font-extrabold tracking-tight opacity-10">
            Limitless in nature,
            <br className="hidden sm:block" /> driven to explore™
          </div>
        </section>
      </main>

     
    </div>
  )
}
