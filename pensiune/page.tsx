"use client";
import { useEffect, useRef, useState } from "react";

const ROOMS = [
  { name: "Camera Pădure", persons: 2, price: "280 RON/noapte", features: ["Pat Queen", "Baie privată", "Vedere pădure", "WiFi gratuit"], icon: "🌲" },
  { name: "Suite Munte", persons: 4, price: "450 RON/noapte", features: ["2 dormitoare", "Living separat", "Balcon panoramic", "Mic dejun inclus"], icon: "⛰️" },
  { name: "Căsuța din Curte", persons: 6, price: "650 RON/noapte", features: ["Independentă", "Grădină privată", "Grătar", "Foișor"], icon: "🏡" },
];

const FACILITIES = [
  { icon: "🌿", label: "Grădină 2000m²" },
  { icon: "🔥", label: "Foișor & Grătar" },
  { icon: "🥞", label: "Mic dejun inclus" },
  { icon: "🐴", label: "Plimbări cai" },
  { icon: "🏔️", label: "Trasee marcate" },
  { icon: "🌊", label: "Izvor natural" },
  { icon: "🅿️", label: "Parcare gratuită" },
  { icon: "🐶", label: "Pet friendly" },
];

export default function PensiunePage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxY = scrollY * 0.4;

  return (
    <div style={{ background: "#f8f5f0", minHeight: "100vh", color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 80 ? "rgba(248,245,240,0.92)" : "transparent",
        backdropFilter: scrollY > 80 ? "blur(20px)" : "none",
        borderBottom: scrollY > 80 ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2d6a4f, #74c69d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🌲</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#1a3a2a", lineHeight: 1 }}>Bradu Argintiu</div>
            <div style={{ fontSize: 10, color: "#74c69d", letterSpacing: "0.15em", marginTop: 2 }}>PENSIUNE · SINAIA</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["Camere", "Facilități", "Galerie", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: scrollY > 80 ? "#2d6a4f" : "rgba(255,255,255,0.9)", fontSize: 14, textDecoration: "none", fontWeight: 500, transition: "color 0.3s" }}>{l}</a>
          ))}
        </div>
        <a href="#rezervare" style={{
          background: "#2d6a4f", borderRadius: 100, padding: "11px 28px",
          color: "#fff", fontSize: 13, textDecoration: "none", fontWeight: 600,
          letterSpacing: "0.03em", boxShadow: "0 4px 20px rgba(45,106,79,0.4)",
          transition: "all 0.3s",
        }}>Rezervă Direct</a>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {/* Background with gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0d2818 0%, #1a4a2e 40%, #2d6a4f 80%, #40916c 100%)",
          transform: `translateY(${parallaxY}px)`,
        }} />

        {/* Tree silhouettes */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {[10, 20, 70, 80, 90].map((left, i) => (
            <div key={i} style={{
              position: "absolute", bottom: 0, left: `${left}%`,
              width: 2 + i, background: "rgba(0,0,0,0.3)",
              height: `${50 + i * 10}%`, transform: `translateY(${parallaxY * 0.3}px)`,
            }} />
          ))}
        </div>

        {/* Noise texture overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "8px 20px", marginBottom: 36, animation: "fadeDown 0.8s ease forwards" }}>
            <span style={{ color: "#74c69d", fontSize: 12, letterSpacing: "0.15em" }}>✦ REZERVARE DIRECTĂ · FĂRĂ COMISION</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 900, lineHeight: 1.0, color: "#fff", letterSpacing: "-0.02em", marginBottom: 24, animation: "fadeUp 0.8s ease 0.1s both" }}>
            Liniștea<br />
            <span style={{ fontStyle: "italic", color: "#74c69d" }}>muntelui</span><br />
            te așteaptă.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 520, lineHeight: 1.8, marginBottom: 52, fontWeight: 300, animation: "fadeUp 0.8s ease 0.2s both" }}>
            Pensiune autentică în Sinaia, la 800m altitudine. Mic dejun inclus, natură sălbatică, amintiri pentru o viață.
          </p>

          <div style={{ display: "flex", gap: 16, animation: "fadeUp 0.8s ease 0.3s both" }}>
            <a href="#camere" style={{
              background: "#74c69d", color: "#1a3a2e", borderRadius: 100,
              padding: "17px 40px", fontSize: 15, fontWeight: 700,
              textDecoration: "none", letterSpacing: "0.03em",
              boxShadow: "0 8px 30px rgba(116,198,157,0.4)",
            }}>Verifică Disponibilitate</a>
            <a href="tel:+40721000000" style={{
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100,
              padding: "17px 40px", color: "#fff", fontSize: 15,
              textDecoration: "none", letterSpacing: "0.03em",
            }}>📞 Sună Acum</a>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
            <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))" }} />
          </div>
        </div>
      </section>

      {/* BOOKING STRIP */}
      <div id="rezervare" style={{ background: "#2d6a4f", padding: "0 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", padding: "24px 0" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", marginBottom: 6 }}>CHECK-IN</div>
            <input type="date" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none" }} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", marginBottom: 6 }}>CHECK-OUT</div>
            <input type="date" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none" }} />
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.15em", marginBottom: 6 }}>PERSOANE</div>
            <select style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 14, width: "100%", outline: "none" }}>
              <option value="2">2 adulți</option>
              <option value="3">3 persoane</option>
              <option value="4">4 persoane</option>
              <option value="6">6 persoane</option>
            </select>
          </div>
          <button style={{
            background: "#74c69d", color: "#1a3a2e", border: "none", borderRadius: 12,
            padding: "14px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer",
            letterSpacing: "0.03em", whiteSpace: "nowrap", alignSelf: "flex-end",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}>Caută Camere</button>
        </div>
      </div>

      {/* ROOMS */}
      <section id="camere" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ color: "#74c69d", fontSize: 11, letterSpacing: "0.2em", marginBottom: 12 }}>CAZARE</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, color: "#1a3a2a", lineHeight: 1.1 }}>
            Camere cu<br /><em style={{ fontStyle: "italic", color: "#2d6a4f" }}>suflet de munte</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {ROOMS.map((room, i) => (
            <div key={room.name} onClick={() => setSelectedRoom(i)} style={{
              background: selectedRoom === i ? "#fff" : "#faf7f3",
              borderRadius: 24, overflow: "hidden", cursor: "pointer",
              boxShadow: selectedRoom === i ? "0 20px 60px rgba(45,106,79,0.15)" : "0 4px 20px rgba(0,0,0,0.05)",
              border: selectedRoom === i ? "2px solid #74c69d" : "2px solid transparent",
              transition: "all 0.3s",
              animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
            }}>
              {/* Placeholder image */}
              <div style={{ height: 200, background: `linear-gradient(135deg, hsl(${140 + i * 20}, 40%, ${30 + i * 5}%), hsl(${155 + i * 20}, 50%, ${40 + i * 5}%))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
                {room.icon}
              </div>
              <div style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1a3a2a", marginBottom: 4 }}>{room.name}</h3>
                    <div style={{ color: "#74c69d", fontSize: 13 }}>👤 {room.persons} persoane</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#2d6a4f" }}>{room.price.split("/")[0]}</div>
                    <div style={{ color: "rgba(0,0,0,0.35)", fontSize: 12 }}>/ noapte</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                  {room.features.map(f => (
                    <span key={f} style={{ background: "#f0f9f4", border: "1px solid #d1fae5", borderRadius: 100, padding: "4px 12px", fontSize: 12, color: "#2d6a4f" }}>✓ {f}</span>
                  ))}
                </div>
                <a href="tel:+40721000000" style={{
                  display: "block", background: selectedRoom === i ? "#2d6a4f" : "transparent",
                  border: `2px solid ${selectedRoom === i ? "#2d6a4f" : "#d1d5db"}`,
                  borderRadius: 12, padding: "12px", textAlign: "center",
                  color: selectedRoom === i ? "#fff" : "#6b7280",
                  fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all 0.3s",
                }}>
                  {selectedRoom === i ? "📞 Rezervă Acum" : "Vezi Detalii"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilități" style={{ background: "#1a3a2a", padding: "80px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: "#74c69d", fontSize: 11, letterSpacing: "0.2em", marginBottom: 12 }}>TOT CE AI NEVOIE</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: "#fff" }}>Facilități incluse</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
            {FACILITIES.map((f, i) => (
              <div key={f.label} style={{
                background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16,
                padding: "24px 16px", textAlign: "center",
                animation: `fadeUp 0.5s ease ${i * 0.07}s both`,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(116,198,157,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500 }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" style={{ padding: "100px 48px", textAlign: "center", background: "#f8f5f0" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 52, marginBottom: 24 }}>🏔️</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, color: "#1a3a2a", marginBottom: 16, lineHeight: 1.1 }}>
            Escapada ta perfectă<br /><em style={{ fontStyle: "italic", color: "#2d6a4f" }}>te așteaptă</em>
          </h2>
          <p style={{ color: "rgba(0,0,0,0.45)", fontSize: 17, lineHeight: 1.8, marginBottom: 48 }}>
            Sună direct și primești <strong style={{ color: "#2d6a4f" }}>10% reducere</strong> față de prețul Booking.com. Fără comisioane, fără surprize.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            <a href="tel:+40721000000" style={{
              background: "#2d6a4f", borderRadius: 100, padding: "18px 44px",
              color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 30px rgba(45,106,79,0.35)",
            }}>📞 0721 000 000</a>
            <a href="https://wa.me/40721000000" style={{
              background: "#25d366", borderRadius: 100, padding: "18px 44px",
              color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 30px rgba(37,211,102,0.3)",
            }}>💬 WhatsApp</a>
          </div>
          <p style={{ color: "rgba(0,0,0,0.3)", fontSize: 14 }}>📍 DN1, km 121, Sinaia · Check-in 14:00 / Check-out 12:00</p>
        </div>
      </section>

      <style>{`
        @keyframes fadeDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(10px); } }
        @media (max-width: 768px) {
          nav { padding: 16px 20px !important; }
          nav > div:nth-child(2) { display: none; }
          section { padding: 60px 20px !important; }
        }
      `}</style>
    </div>
  );
}
