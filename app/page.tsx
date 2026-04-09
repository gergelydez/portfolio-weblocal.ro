"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const demos = [
    {
      href: "/salon",
      label: "01 — Beauty & Wellness",
      title: "Lumina Beauty Studio",
      desc: "Salon de înfrumusețare premium. Dark luxury, glassmorphism, animații fluide.",
      tags: ["Dark Luxury", "Glassmorphism", "Booking Online"],
      accent: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.3)",
      bg: "from-[#0d0010] via-[#1a0020] to-[#0d0010]",
    },
    {
      href: "/pensiune",
      title: "Pensiunea Bradu Argintiu",
      label: "02 — Hospitality & Tourism",
      desc: "Pensiune de munte cu rezervări directe. Organic, cald, fără comision Booking.",
      tags: ["Rezervări Directe", "Galerie Foto", "Fără Comision"],
      accent: "from-emerald-400 to-teal-500",
      glow: "rgba(52,211,153,0.3)",
      bg: "from-[#001a0d] via-[#002010] to-[#001a0d]",
    },
    {
      href: "/service",
      title: "ProTech Auto Service",
      label: "03 — Automotive & Services",
      desc: "Service auto modern. Industrial-tech, CRO optimizat, conversii maxime.",
      tags: ["Industrial Tech", "CRO Optimizat", "Google Maps"],
      accent: "from-amber-400 to-orange-500",
      glow: "rgba(251,191,36,0.3)",
      bg: "from-[#0d0800] via-[#1a1000] to-[#0d0800]",
    },
  ];

  return (
    <main style={{ background: "#050508", minHeight: "100vh", fontFamily: "'Syne', sans-serif", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none", zIndex: 0 }} />

      {/* Gradient orbs */}
      <div style={{ position: "fixed", top: "10%", left: "15%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "10%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 80, animation: "fadeUp 0.8s ease forwards" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, letterSpacing: "0.1em" }}>PORTOFOLIU DEMO · 2024</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px, 7vw, 90px)", fontWeight: 800, lineHeight: 1.05, color: "#fff", letterSpacing: "-0.03em", marginBottom: 24 }}>
            Site-uri care<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              vând.
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 18, maxWidth: 520, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
            3 site-uri demo pentru afaceri locale din România — fiecare cu identitate vizuală unică, animații moderne și optimizat pentru conversii.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gap: 24 }}>
          {demos.map((demo, i) => (
            <Link key={demo.href} href={demo.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 24,
                  padding: "40px 48px",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                  animation: `fadeUp 0.8s ease ${i * 0.15}s both`,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
                }}
              >
                {/* Glow */}
                <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${demo.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
                  <div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, letterSpacing: "0.15em", marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>{demo.label}</div>
                    <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>{demo.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 480, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{demo.desc}</p>
                    <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                      {demo.tags.map(tag => (
                        <span key={tag} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "4px 12px", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Vezi demo</span>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${demo.accent.replace("from-","").replace(" to-","")})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>→</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Fiecare site se construiește în 3-5 zile · Preț fix · Domeniu + hosting inclus</p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>© 2024 · Toate drepturile rezervate</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </main>
  );
}
