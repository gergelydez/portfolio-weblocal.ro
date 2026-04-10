"use client";
import { useEffect, useRef, useState } from "react";

const SERVICES = [
  { name: "Hair Styling & Colorare", price: "de la 150 RON", duration: "60–120 min", icon: "✦" },
  { name: "Tratamente Faciale Premium", price: "de la 200 RON", duration: "45–90 min", icon: "◈" },
  { name: "Manichiură & Pedichiură", price: "de la 80 RON", duration: "45–60 min", icon: "◇" },
  { name: "Masaj Relaxant", price: "de la 180 RON", duration: "60 min", icon: "❋" },
  { name: "Extensii Gene", price: "de la 250 RON", duration: "120 min", icon: "◉" },
  { name: "Makeup Profesional", price: "de la 200 RON", duration: "60–90 min", icon: "✧" },
];

const REVIEWS = [
  { name: "Andreea M.", stars: 5, text: "Cel mai bun salon din Cluj. Am venit pentru o colorare și am ieșit transformată complet. Profesioniști adevărați!", service: "Hair Colorare" },
  { name: "Diana P.", stars: 5, text: "Atmosfera este magică. Tratamentul facial m-a întinerit cu 10 ani. Revin cu siguranță lunar.", service: "Facial Premium" },
  { name: "Mihaela R.", stars: 5, text: "Extensiile de gene sunt perfecte. Doamnele sunt extrem de atente și talent pus la treabă.", service: "Extensii Gene" },
];

export default function SalonPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    // Floating orbs animation
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: 150 + Math.random() * 200, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      hue: 280 + i * 20,
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach(orb => {
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, `hsla(${orb.hue},80%,60%,0.08)`);
        g.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const navLinks = ["Servicii", "Galerie", "Recenzii", "Contact"];

  return (
    <div style={{ background: "#08000f", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? "rgba(8,0,15,0.85)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.05em" }}>
          <span style={{ background: "linear-gradient(135deg, #f9a8d4, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LUMINA</span>
          <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 6, fontSize: 12, letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>BEAUTY STUDIO</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{l}</a>
          ))}
        </div>
        <a href="#contact" style={{
          background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))",
          border: "1px solid rgba(249,168,212,0.3)", borderRadius: 100,
          padding: "10px 24px", color: "#f9a8d4", fontSize: 13, textDecoration: "none",
          letterSpacing: "0.05em", transition: "all 0.3s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(249,168,212,0.25), rgba(192,132,252,0.25))"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))"; }}
        >Rezervă acum</a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ animation: "fadeLeft 1s ease forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,168,212,0.08)", border: "1px solid rgba(249,168,212,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#f9a8d4", boxShadow: "0 0 6px #f9a8d4" }} />
              <span style={{ color: "#f9a8d4", fontSize: 12, letterSpacing: "0.12em" }}>CLUJ-NAPOCA · DISPONIBIL AZI</span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(50px, 6vw, 82px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 28 }}>
              Frumusețea ta,<br />
              <em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #f9a8d4, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>redefinită.</em>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, lineHeight: 1.8, maxWidth: 440, marginBottom: 48, fontWeight: 300 }}>
              Studio premium de beauty în inima Clujului. Hair, facial, nail art și masaj — totul sub un singur acoperiș, de echipa care transformă viziunile în realitate.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#contact" style={{
                background: "linear-gradient(135deg, #f9a8d4, #c084fc)", borderRadius: 100,
                padding: "16px 36px", color: "#1a0028", fontSize: 14, fontWeight: 600,
                textDecoration: "none", letterSpacing: "0.05em", transition: "all 0.3s",
                boxShadow: "0 0 40px rgba(192,132,252,0.3)",
              }}>Rezervă Consultație</a>
              <a href="#servicii" style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 100, padding: "16px 36px", color: "rgba(255,255,255,0.7)",
                fontSize: 14, textDecoration: "none", letterSpacing: "0.05em",
              }}>Vezi Serviciile</a>
            </div>

            <div style={{ display: "flex", gap: 48, marginTop: 64 }}>
              {[["500+", "Clienți Fericiți"], ["8", "Ani Experiență"], ["4.9★", "Rating Google"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, background: "linear-gradient(135deg, #f9a8d4, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Glass card right */}
          <div style={{ animation: "fadeRight 1s ease 0.2s forwards", opacity: 0 }}>
            <div style={{
              position: "relative",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 32, padding: 40,
              boxShadow: "0 0 80px rgba(192,132,252,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}>
              <div style={{ position: "absolute", top: -2, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.5), transparent)" }} />

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>REZERVARE RAPIDĂ</div>

              {["Hair & Colorare", "Facial Premium", "Nail Art", "Masaj Relaxant", "Extensii Gene", "Makeup Bridal"].map((s, i) => (
                <div key={s} onClick={() => setActiveSection(i)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", borderRadius: 12, marginBottom: 8, cursor: "pointer",
                  background: activeSection === i ? "rgba(192,132,252,0.12)" : "transparent",
                  border: activeSection === i ? "1px solid rgba(192,132,252,0.25)" : "1px solid transparent",
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 14, color: activeSection === i ? "#f9a8d4" : "rgba(255,255,255,0.5)" }}>{s}</span>
                  {activeSection === i && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f9a8d4", boxShadow: "0 0 8px #f9a8d4" }} />}
                </div>
              ))}

              <a href="tel:+40721000000" style={{
                display: "block", marginTop: 24, background: "linear-gradient(135deg, rgba(249,168,212,0.15), rgba(192,132,252,0.15))",
                border: "1px solid rgba(192,132,252,0.3)", borderRadius: 14, padding: "16px",
                textAlign: "center", color: "#f9a8d4", fontSize: 15, textDecoration: "none", letterSpacing: "0.05em",
              }}>
                📞 Sună acum: 0721 000 000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicii" style={{ position: "relative", zIndex: 1, padding: "100px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ color: "rgba(249,168,212,0.6)", fontSize: 11, letterSpacing: "0.2em", marginBottom: 16 }}>SERVICIILE NOASTRE</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300 }}>
            Experiente<br /><em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #f9a8d4, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>de neuitat</em>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={s.name} style={{
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20, padding: "32px 28px",
              transition: "all 0.3s",
              animation: `fadeUp 0.6s ease ${i * 0.1}s both`,
              cursor: "pointer",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(192,132,252,0.2)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(192,132,252,0.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 16, opacity: 0.7 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 12 }}>{s.name}</h3>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ color: "#f9a8d4", fontSize: 15, fontWeight: 500 }}>{s.price}</span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>·</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{s.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="recenzii" style={{ position: "relative", zIndex: 1, padding: "100px 40px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "rgba(249,168,212,0.6)", fontSize: 11, letterSpacing: "0.2em", marginBottom: 16 }}>CE SPUN CLIENTELE</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300 }}>Povești reale,<br /><em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #f9a8d4, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>transformări reale</em></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <div key={r.name} style={{
                background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 32,
                animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
              }}>
                <div style={{ color: "#f9a8d4", fontSize: 16, marginBottom: 16, letterSpacing: 2 }}>{"★".repeat(r.stars)}</div>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: 15, marginBottom: 24, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{r.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginTop: 2 }}>{r.service}</div>
                  </div>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #f9a8d4, #c084fc)", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a0028", fontWeight: 700, fontSize: 14 }}>
                    {r.name[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "100px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)", backdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 32, padding: "64px 48px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ color: "rgba(249,168,212,0.6)", fontSize: 11, letterSpacing: "0.2em", marginBottom: 16 }}>REZERVĂ-ȚI LOCUL</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 300, marginBottom: 16 }}>
              Transformarea ta<br /><em style={{ fontStyle: "italic", background: "linear-gradient(135deg, #f9a8d4, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>începe azi</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48, lineHeight: 1.7, fontSize: 16 }}>
              Sună-ne sau trimite un mesaj WhatsApp. Răspundem în câteva minute.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+40721000000" style={{
                background: "linear-gradient(135deg, #f9a8d4, #c084fc)", borderRadius: 100,
                padding: "16px 40px", color: "#1a0028", fontSize: 15, fontWeight: 600,
                textDecoration: "none", boxShadow: "0 0 40px rgba(192,132,252,0.3)",
              }}>📞 0721 000 000</a>
              <a href="https://wa.me/40721000000" style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 100, padding: "16px 40px", color: "rgba(255,255,255,0.7)",
                fontSize: 15, textDecoration: "none",
              }}>💬 WhatsApp</a>
            </div>
            <div style={{ marginTop: 40, padding: "20px 0", borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
              📍 Str. Dorobanților 15, Cluj-Napoca · Luni–Sâmbătă 09:00–20:00
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; }
          nav { padding: 16px 20px !important; }
          nav a:not(:last-child) { display: none; }
        }
      `}</style>
    </div>
  );
}
