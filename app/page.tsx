
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

type Site = "index" | "salon" | "pensiune" | "service";

function AuroraCanvas({ colors }: { colors: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const orbs = colors.map((col, i) => ({ x: W*(0.2+i*0.3), y: H*0.5, r: 300+i*80, ox: W*(0.2+i*0.3), oy: H*0.5, t: i*2, col }));
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      orbs.forEach(o => {
        o.t += 0.005;
        o.x = o.ox + Math.sin(o.t)*W*0.25;
        o.y = o.oy + Math.cos(o.t*0.7)*H*0.2;
        const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
        g.addColorStop(0,o.col); g.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, [colors]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}} />;
}

const Noise = () => (
  <div style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.032,
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />
);

/* ══ SALON ══ */
function SalonSite({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<number|null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const s = () => setScrolled(window.scrollY>60); window.addEventListener("scroll",s); return ()=>window.removeEventListener("scroll",s); },[]);
  const services = [
    {title:"Hair Styling",sub:"Tăiere · Colorare · Balyaj",price:"150+",time:"60–120 min",emoji:"✦",wide:true},
    {title:"Facial Ritual",sub:"Hidratare · Anti-aging",price:"220+",time:"75 min",emoji:"◈",wide:false},
    {title:"Nail Art",sub:"Gel · Acryl · 3D Art",price:"90+",time:"60 min",emoji:"◇",wide:false},
    {title:"Masaj Signature",sub:"Suedez · Hot stones",price:"200+",time:"60 min",emoji:"❋",wide:false},
    {title:"Bridal Package",sub:"Makeup · Hair · Nail",price:"800+",time:"4h",emoji:"◉",wide:true},
  ];
  return (
    <div style={{background:"#060409",minHeight:"100vh",color:"#fff",fontFamily:"'DM Sans',sans-serif",overflowX:"hidden",position:"relative"}}>
      <AuroraCanvas colors={["rgba(219,39,119,0.07)","rgba(168,85,247,0.06)","rgba(236,72,153,0.05)"]} />
      <Noise />
      <nav style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?"rgba(6,4,9,0.88)":"rgba(255,255,255,0.04)",backdropFilter:"blur(24px)",
        border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"10px 10px 10px 24px",
        transition:"all 0.4s",width:"min(92vw,780px)"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:600,letterSpacing:"0.08em"}}>
          <span style={{background:"linear-gradient(135deg,#f9a8d4,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>LUMINA</span>
          <span style={{color:"rgba(255,255,255,0.25)",fontSize:10,marginLeft:8,letterSpacing:"0.2em"}}>BEAUTY</span>
        </div>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          {["Servicii","Contact"].map(l=>(
            <a key={l} href={"#"+l.toLowerCase()} style={{color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none"}}>{l}</a>
          ))}
          <a href="#contact" style={{background:"linear-gradient(135deg,#f9a8d4,#c084fc)",borderRadius:100,padding:"9px 22px",color:"#1a0028",fontSize:13,fontWeight:700,textDecoration:"none"}}>Rezervă</a>
        </div>
      </nav>
      <section style={{position:"relative",zIndex:2,minHeight:"100vh",display:"flex",alignItems:"center",padding:"0 clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",width:"100%",paddingTop:100}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:40,animation:"up 0.8s ease both"}}>
            <div style={{width:32,height:1,background:"linear-gradient(90deg,transparent,#f9a8d4)"}} />
            <span style={{color:"#f9a8d4",fontSize:11,letterSpacing:"0.25em",fontWeight:500}}>CLUJ-NAPOCA · EST. 2016</span>
          </div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(56px,8vw,120px)",fontWeight:300,lineHeight:0.95,letterSpacing:"-0.02em",marginBottom:40,animation:"up 0.8s 0.1s ease both",opacity:0}}>
            Arta<br/>
            <span style={{fontStyle:"italic",background:"linear-gradient(135deg,#f9a8d4,#c084fc,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>frumuseții</span><br/>
            <span style={{fontSize:"0.55em",fontWeight:600,color:"rgba(255,255,255,0.9)"}}>redefinite.</span>
          </h1>
          <p style={{color:"rgba(255,255,255,0.38)",fontSize:"clamp(15px,1.8vw,18px)",maxWidth:440,lineHeight:1.85,marginBottom:56,fontWeight:300,animation:"up 0.8s 0.2s ease both",opacity:0}}>
            Studio premium în inima Clujului. Hair styling, facial rituals, nail art și bridal packages — fiecare detaliu, perfectat.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",animation:"up 0.8s 0.3s ease both",opacity:0}}>
            <a href="#contact" style={{background:"linear-gradient(135deg,#f9a8d4,#c084fc)",borderRadius:14,padding:"16px 40px",color:"#1a0028",fontSize:14,fontWeight:700,textDecoration:"none",boxShadow:"0 0 50px rgba(192,132,252,0.35)"}}>Rezervă Acum</a>
            <a href="#servicii" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:14,padding:"16px 40px",color:"rgba(255,255,255,0.65)",fontSize:14,textDecoration:"none"}}>Serviciile ↓</a>
          </div>
          <div style={{display:"flex",gap:40,marginTop:80,paddingTop:48,borderTop:"1px solid rgba(255,255,255,0.05)",animation:"up 0.8s 0.4s ease both",opacity:0}}>
            {[["600+","Clienți"],["8 ani","Experiență"],["4.9 ★","Google"]].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:32,fontWeight:600,background:"linear-gradient(135deg,#f9a8d4,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>{n}</div>
                <div style={{color:"rgba(255,255,255,0.3)",fontSize:11,letterSpacing:"0.12em",marginTop:6}}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="servicii" style={{position:"relative",zIndex:2,padding:"100px clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{marginBottom:56}}>
            <p style={{color:"rgba(249,168,212,0.5)",fontSize:11,letterSpacing:"0.2em",marginBottom:12}}>SERVICII</p>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(36px,5vw,64px)",fontWeight:300,lineHeight:1.05}}>
              Experiențe <em style={{fontStyle:"italic",background:"linear-gradient(135deg,#f9a8d4,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>de neuitat</em>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {services.map((s,i)=>(
              <div key={s.title} style={{gridColumn:s.wide?"span 2":"span 1",background:active===i?"rgba(192,132,252,0.08)":"rgba(255,255,255,0.025)",
                backdropFilter:"blur(20px)",border:`1px solid ${active===i?"rgba(192,132,252,0.3)":"rgba(255,255,255,0.06)"}`,
                borderRadius:24,padding:"32px 28px",cursor:"pointer",transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)",
                transform:active===i?"translateY(-4px)":"none"}}
                onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}>
                <div style={{fontSize:24,opacity:0.5,marginBottom:20}}>{s.emoji}</div>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:500,marginBottom:6}}>{s.title}</h3>
                <p style={{color:"rgba(255,255,255,0.35)",fontSize:13,marginBottom:24,lineHeight:1.6}}>{s.sub}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                  <div>
                    <div style={{color:"#f9a8d4",fontSize:20,fontFamily:"'Cormorant Garamond',serif",fontWeight:600}}>{s.price} RON</div>
                    <div style={{color:"rgba(255,255,255,0.25)",fontSize:11,marginTop:2}}>{s.time}</div>
                  </div>
                  <div style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(192,132,252,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#c084fc",fontSize:16,transition:"all 0.2s",background:active===i?"rgba(192,132,252,0.1)":"transparent"}}>→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" style={{position:"relative",zIndex:2,padding:"80px clamp(20px,5vw,80px) 120px"}}>
        <div style={{maxWidth:800,margin:"0 auto",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:32,padding:"clamp(40px,6vw,80px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(192,132,252,0.08) 0%,transparent 70%)",pointerEvents:"none"}} />
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(32px,5vw,60px)",fontWeight:300,marginBottom:16,lineHeight:1.1}}>
            Transformarea ta <em style={{fontStyle:"italic",background:"linear-gradient(135deg,#f9a8d4,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>începe azi</em>
          </h2>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:16,marginBottom:48,lineHeight:1.7}}>Sună sau scrie pe WhatsApp. Răspundem în câteva minute.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:+40721000000" style={{background:"linear-gradient(135deg,#f9a8d4,#c084fc)",borderRadius:14,padding:"16px 40px",color:"#1a0028",fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 0 50px rgba(192,132,252,0.3)"}}>📞 0721 000 000</a>
            <a href="https://wa.me/40721000000" style={{background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:14,padding:"16px 40px",color:"#25d366",fontSize:15,fontWeight:600,textDecoration:"none"}}>💬 WhatsApp</a>
          </div>
          <p style={{color:"rgba(255,255,255,0.18)",fontSize:13,marginTop:32}}>📍 Str. Dorobanților 15, Cluj-Napoca · L–S 09:00–20:00</p>
        </div>
      </section>
      <button onClick={onBack} style={{position:"fixed",bottom:32,left:32,zIndex:300,background:"rgba(255,255,255,0.06)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:100,padding:"10px 20px",color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer"}}>← Portfolio</button>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}} @media(max-width:640px){div[style*="repeat(4"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}

/* ══ PENSIUNE ══ */
function PensiuneSite({ onBack }: { onBack: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [sel, setSel] = useState(0);
  useEffect(() => { const s = () => setScrolled(window.scrollY>60); window.addEventListener("scroll",s); return ()=>window.removeEventListener("scroll",s); },[]);
  const rooms = [
    {name:"Camera Pădure",price:280,cap:2,beds:"Pat Queen",features:["Vedere pădure","Baie privată","WiFi","Mic dejun"],emoji:"🌲",color:"#1b4332"},
    {name:"Suite Munte",price:450,cap:4,beds:"2 Dormitoare",features:["Balcon panoramic","Living","Mic dejun","Netflix"],emoji:"⛰️",color:"#155e3a"},
    {name:"Căsuța din Curte",price:650,cap:6,beds:"3 Paturi",features:["Independentă","Grădină","Grătar","Foișor"],emoji:"🏡",color:"#0d3321"},
  ];
  const amenities = ["🌿 Grădină 2000m²","🔥 Foișor & Grătar","🥞 Mic dejun inclus","🐴 Plimbări cai","🏔️ Trasee montane","🐶 Pet friendly","🅿️ Parcare gratuită","🌊 Izvor natural"];
  return (
    <div style={{background:"#f7f3ee",minHeight:"100vh",color:"#1a1209",fontFamily:"'DM Sans',sans-serif",overflowX:"hidden"}}>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,padding:"0 clamp(20px,4vw,56px)",height:72,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?"rgba(247,243,238,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",
        borderBottom:scrolled?"1px solid rgba(0,0,0,0.06)":"none",transition:"all 0.4s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,borderRadius:10,background:"#2d6a4f",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌲</div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:scrolled?"#1b4332":"#fff",transition:"color 0.4s"}}>Bradu Argintiu</div>
            <div style={{fontSize:9,color:scrolled?"#74c69d":"rgba(255,255,255,0.6)",letterSpacing:"0.18em",transition:"color 0.4s"}}>PENSIUNE · SINAIA</div>
          </div>
        </div>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          {["Camere","Contact"].map(l=>(
            <a key={l} href={"#"+l.toLowerCase()} style={{color:scrolled?"rgba(0,0,0,0.5)":"rgba(255,255,255,0.8)",fontSize:14,textDecoration:"none",fontWeight:500,transition:"color 0.3s"}}>{l}</a>
          ))}
          <a href="#camere" style={{background:"#2d6a4f",borderRadius:10,padding:"10px 24px",color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 20px rgba(45,106,79,0.4)"}}>Rezervă Direct</a>
        </div>
      </nav>
      <section style={{position:"relative",minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",overflow:"hidden"}}>
        <div style={{background:"linear-gradient(160deg,#0d2818 0%,#1b4332 60%,#2d6a4f 100%)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px clamp(30px,5vw,80px) 80px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",bottom:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(116,198,157,0.12) 0%,transparent 70%)"}} />
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(116,198,157,0.12)",border:"1px solid rgba(116,198,157,0.25)",borderRadius:100,padding:"6px 16px",marginBottom:36}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#74c69d",boxShadow:"0 0 6px #74c69d"}} />
              <span style={{color:"#74c69d",fontSize:11,letterSpacing:"0.18em"}}>FĂRĂ COMISION BOOKING</span>
            </div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(48px,5.5vw,84px)",fontWeight:900,lineHeight:0.95,color:"#fff",letterSpacing:"-0.02em",marginBottom:28}}>
              Liniștea<br/><em style={{fontStyle:"italic",color:"#74c69d"}}>muntelui</em><br/>te cheamă.
            </h1>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:16,lineHeight:1.8,maxWidth:380,marginBottom:48,fontWeight:300}}>
              Pensiune autentică la 800m altitudine. Mic dejun gătit, natură sălbatică, amintiri pentru o viață.
            </p>
            <div style={{display:"flex",gap:12}}>
              <a href="#camere" style={{background:"#74c69d",color:"#0d2818",borderRadius:12,padding:"15px 36px",fontSize:14,fontWeight:800,textDecoration:"none",boxShadow:"0 8px 30px rgba(116,198,157,0.35)"}}>Verifică Disponibilitate</a>
              <a href="tel:+40721000000" style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:12,padding:"15px 28px",color:"#fff",fontSize:14,textDecoration:"none"}}>📞 Sună</a>
            </div>
          </div>
        </div>
        <div style={{background:"#f7f3ee",display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px clamp(30px,5vw,80px) 80px"}}>
          <div style={{background:"#fff",borderRadius:24,padding:40,boxShadow:"0 20px 80px rgba(0,0,0,0.08)"}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:"#1b4332",marginBottom:6}}>Rezervă acum</h3>
            <p style={{color:"rgba(0,0,0,0.4)",fontSize:14,marginBottom:28}}>10% mai ieftin decât Booking.com</p>
            <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:20}}>
              <div><div style={{fontSize:10,letterSpacing:"0.12em",color:"rgba(0,0,0,0.4)",marginBottom:5}}>CHECK-IN</div>
                <input type="date" style={{width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"11px 14px",fontSize:14,color:"#1a1209",outline:"none",fontFamily:"'DM Sans',sans-serif"}} /></div>
              <div><div style={{fontSize:10,letterSpacing:"0.12em",color:"rgba(0,0,0,0.4)",marginBottom:5}}>CHECK-OUT</div>
                <input type="date" style={{width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"11px 14px",fontSize:14,color:"#1a1209",outline:"none",fontFamily:"'DM Sans',sans-serif"}} /></div>
              <div><div style={{fontSize:10,letterSpacing:"0.12em",color:"rgba(0,0,0,0.4)",marginBottom:5}}>PERSOANE</div>
                <select style={{width:"100%",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"11px 14px",fontSize:14,color:"#1a1209",outline:"none",background:"#fff",fontFamily:"'DM Sans',sans-serif"}}>
                  <option>2 adulți</option><option>3 persoane</option><option>4 persoane</option><option>6 persoane</option>
                </select></div>
            </div>
            <a href="tel:+40721000000" style={{display:"block",background:"linear-gradient(135deg,#2d6a4f,#40916c)",borderRadius:12,padding:"15px",textAlign:"center",color:"#fff",fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 8px 30px rgba(45,106,79,0.3)"}}>Verifică Disponibilitate</a>
            <p style={{color:"rgba(0,0,0,0.3)",fontSize:12,textAlign:"center",marginTop:10}}>Fără card · Fără taxe ascunse</p>
          </div>
          <div style={{display:"flex",gap:16,marginTop:20}}>
            {[["4.9★","Google"],["200+","Recenzii"],["2h","București"]].map(([n,l])=>(
              <div key={l} style={{flex:1,background:"#fff",borderRadius:12,padding:"14px",textAlign:"center",boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:900,color:"#2d6a4f"}}>{n}</div>
                <div style={{color:"rgba(0,0,0,0.35)",fontSize:11,marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="camere" style={{padding:"100px clamp(20px,5vw,80px)",maxWidth:1300,margin:"0 auto"}}>
        <div style={{marginBottom:48}}>
          <p style={{color:"#74c69d",fontSize:11,letterSpacing:"0.2em",marginBottom:10}}>CAZARE</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4.5vw,60px)",fontWeight:900,color:"#1b4332",lineHeight:1.05}}>
            Camere cu <em style={{fontStyle:"italic",color:"#2d6a4f"}}>suflet de munte</em>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {rooms.map((r,i)=>(
            <div key={r.name} onClick={()=>setSel(i)} style={{borderRadius:24,overflow:"hidden",cursor:"pointer",background:"#fff",
              boxShadow:sel===i?"0 24px 80px rgba(45,106,79,0.18)":"0 4px 24px rgba(0,0,0,0.06)",
              border:`2px solid ${sel===i?"#74c69d":"transparent"}`,
              transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)",transform:sel===i?"translateY(-6px)":"none"}}>
              <div style={{height:200,background:`linear-gradient(160deg,${r.color},${r.color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:64}}>{r.emoji}</div>
              <div style={{padding:28}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                  <div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#1b4332",marginBottom:3}}>{r.name}</h3>
                    <div style={{color:"#74c69d",fontSize:13}}>👤 {r.cap} · {r.beds}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,color:"#2d6a4f",lineHeight:1}}>{r.price}</div>
                    <div style={{color:"rgba(0,0,0,0.35)",fontSize:11}}>RON/noapte</div>
                  </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:18}}>
                  {r.features.map(f=><span key={f} style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:100,padding:"2px 9px",fontSize:11,color:"#15803d"}}>✓ {f}</span>)}
                </div>
                <a href="tel:+40721000000" style={{display:"block",background:sel===i?"linear-gradient(135deg,#2d6a4f,#40916c)":"#f7f3ee",borderRadius:12,padding:"12px",textAlign:"center",color:sel===i?"#fff":"#6b7280",fontSize:14,fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}>
                  {sel===i?"📞 Rezervă Acum":"Selectează Camera"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{background:"#1b4332",padding:"72px clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <p style={{color:"#74c69d",fontSize:11,letterSpacing:"0.2em",marginBottom:10}}>INCLUSE ÎN PREȚ</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:900,color:"#fff"}}>Facilități premium</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
            {amenities.map(a=>(
              <div key={a} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:"20px 14px",textAlign:"center",transition:"all 0.3s"}}
                onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.background="rgba(116,198,157,0.1)"}
                onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.05)"}>
                <div style={{fontSize:26,marginBottom:8}}>{a.split(" ")[0]}</div>
                <div style={{color:"rgba(255,255,255,0.65)",fontSize:13}}>{a.split(" ").slice(1).join(" ")}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" style={{padding:"100px clamp(20px,5vw,80px)",textAlign:"center"}}>
        <div style={{maxWidth:620,margin:"0 auto"}}>
          <div style={{fontSize:52,marginBottom:20}}>🏔️</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,color:"#1b4332",marginBottom:14,lineHeight:1.05}}>
            Escapada ta <em style={{fontStyle:"italic",color:"#2d6a4f"}}>te așteaptă</em>
          </h2>
          <p style={{color:"rgba(0,0,0,0.4)",fontSize:17,lineHeight:1.8,marginBottom:44}}>Sună direct și primești <strong style={{color:"#2d6a4f"}}>10% reducere</strong> față de Booking.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <a href="tel:+40721000000" style={{background:"#2d6a4f",borderRadius:14,padding:"16px 44px",color:"#fff",fontSize:16,fontWeight:700,textDecoration:"none",boxShadow:"0 8px 40px rgba(45,106,79,0.35)"}}>📞 0721 000 000</a>
            <a href="https://wa.me/40721000000" style={{background:"#25d366",borderRadius:14,padding:"16px 44px",color:"#fff",fontSize:16,fontWeight:700,textDecoration:"none",boxShadow:"0 8px 30px rgba(37,211,102,0.3)"}}>💬 WhatsApp</a>
          </div>
          <p style={{color:"rgba(0,0,0,0.25)",fontSize:13,marginTop:24}}>📍 DN1 km 121, Sinaia · Check-in 14:00 / Check-out 12:00</p>
        </div>
      </section>
      <button onClick={onBack} style={{position:"fixed",bottom:32,left:32,zIndex:300,background:"rgba(255,255,255,0.9)",backdropFilter:"blur(20px)",border:"1px solid rgba(0,0,0,0.1)",borderRadius:100,padding:"10px 20px",color:"rgba(0,0,0,0.5)",fontSize:13,cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>← Portfolio</button>
      <style>{`@media(max-width:768px){section:first-of-type{grid-template-columns:1fr!important}div[style*="repeat(3,1fr)"]{grid-template-columns:1fr!important}nav>div:last-child>a:not(:last-child){display:none}}`}</style>
    </div>
  );
}

/* ══ SERVICE ══ */
function ServiceSite({ onBack }: { onBack: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab] = useState(0);
  const [cnt, setCnt] = useState(0);
  useEffect(() => { const s = () => setScrolled(window.scrollY>60); window.addEventListener("scroll",s); return ()=>window.removeEventListener("scroll",s); },[]);
  useEffect(() => { let n=0; const t=setInterval(()=>{ n+=43; if(n>=2500){setCnt(2500);clearInterval(t);}else setCnt(n);},16); return()=>clearInterval(t); },[]);
  const svcs = [
    {name:"Diagnoză Computerizată",price:"80 RON",time:"30 min",hot:false},
    {name:"Schimb Ulei + Filtre",price:"120 RON",time:"45 min",hot:true},
    {name:"Frâne Complete",price:"200+ RON",time:"2h",hot:false},
    {name:"Geometrie & Echilibrare",price:"150 RON",time:"1h",hot:true},
    {name:"Revizie Completă",price:"350+ RON",time:"4h",hot:false},
    {name:"Climatizare",price:"180 RON",time:"1h",hot:false},
  ];
  const brands = ["BMW","Audi","Mercedes","VW","Skoda","Toyota","Ford","Dacia","Renault","Opel","Peugeot","Hyundai"];
  return (
    <div style={{background:"#080808",minHeight:"100vh",color:"#fff",fontFamily:"'Space Grotesk',sans-serif",overflowX:"hidden",position:"relative"}}>
      <AuroraCanvas colors={["rgba(234,88,12,0.06)","rgba(251,191,36,0.05)","rgba(239,68,68,0.04)"]} />
      <Noise />
      <div style={{position:"fixed",inset:0,zIndex:0,opacity:0.025,backgroundImage:"linear-gradient(rgba(255,255,255,0.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.7) 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none"}} />
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:68,padding:"0 clamp(20px,4vw,56px)",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:scrolled?"rgba(8,8,8,0.92)":"transparent",backdropFilter:scrolled?"blur(24px)":"none",
        borderBottom:scrolled?"1px solid rgba(255,255,255,0.05)":"none",transition:"all 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:14,color:"#000"}}>PT</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,letterSpacing:"-0.02em"}}>
            PROTECH <span style={{color:"#f97316"}}>AUTO</span>
            <span style={{fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.2em",display:"block",fontWeight:400,marginTop:1}}>TIMIȘOARA</span>
          </div>
        </div>
        <div style={{display:"flex",gap:24,alignItems:"center"}}>
          {["Servicii","Prețuri"].map(l=>(
            <a key={l} href={"#"+l.toLowerCase()} style={{color:"rgba(255,255,255,0.4)",fontSize:13,textDecoration:"none",letterSpacing:"0.06em"}}>{l}</a>
          ))}
          <a href="tel:+40721000000" style={{background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:8,padding:"10px 22px",color:"#000",fontSize:13,fontWeight:700,textDecoration:"none",boxShadow:"0 0 28px rgba(249,115,22,0.4)"}}>📞 Programează</a>
        </div>
      </nav>
      <section style={{position:"relative",zIndex:2,minHeight:"100vh",display:"flex",alignItems:"center",padding:"0 clamp(20px,5vw,80px)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",width:"100%",paddingTop:100}}>
          <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:72,alignItems:"center"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(249,115,22,0.07)",border:"1px solid rgba(249,115,22,0.2)",borderRadius:6,padding:"6px 14px",marginBottom:36}}>
                <div style={{width:6,height:6,background:"#22c55e",borderRadius:"50%",boxShadow:"0 0 6px #22c55e"}} />
                <span style={{color:"#f97316",fontSize:11,letterSpacing:"0.15em",fontWeight:600}}>DESCHIS AZI · 08–20</span>
              </div>
              <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(48px,6.5vw,92px)",fontWeight:800,lineHeight:0.92,letterSpacing:"-0.03em",marginBottom:32}}>
                Mașina ta,<br/>
                <span style={{WebkitTextStroke:"2px #f97316",WebkitTextFillColor:"transparent",position:"relative",display:"inline-block"}}>
                  reparată
                  <div style={{position:"absolute",bottom:-2,left:0,width:"100%",height:3,background:"linear-gradient(90deg,#f97316,#fbbf24,transparent)"}} />
                </span><br/>
                <span style={{color:"rgba(255,255,255,0.9)",fontSize:"0.75em"}}>corect.</span>
              </h1>
              <p style={{color:"rgba(255,255,255,0.38)",fontSize:17,lineHeight:1.8,maxWidth:440,marginBottom:48,fontWeight:300}}>
                Service auto modern cu echipamente de ultimă generație. Diagnosticare computerizată, piese originale, garanție scrisă.
              </p>
              <div style={{display:"flex",gap:14,marginBottom:64}}>
                <a href="#prețuri" style={{background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:12,padding:"15px 40px",color:"#000",fontSize:14,fontWeight:700,textDecoration:"none",boxShadow:"0 0 50px rgba(249,115,22,0.35)"}}>Vezi Prețurile</a>
                <a href="https://wa.me/40721000000" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,padding:"15px 32px",color:"rgba(255,255,255,0.6)",fontSize:14,textDecoration:"none"}}>💬 WhatsApp</a>
              </div>
              <div style={{display:"flex",gap:44,paddingTop:32,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                {[[`${cnt}+`,"Mașini"],["12","Ani"],["4.8★","Google"]].map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#fbbf24",lineHeight:1}}>{n}</div>
                    <div style={{color:"rgba(255,255,255,0.25)",fontSize:10,letterSpacing:"0.12em",marginTop:5}}>{l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:"linear-gradient(135deg,rgba(249,115,22,0.1),rgba(251,191,36,0.05))",border:"1px solid rgba(249,115,22,0.25)",borderRadius:20,padding:28}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
                  <div style={{width:44,height:44,background:"rgba(249,115,22,0.12)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🚨</div>
                  <div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700}}>Urgențe Auto</div>
                    <div style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>Pană · Accident · Nu pornește</div>
                  </div>
                </div>
                <a href="tel:+40721000000" style={{display:"block",background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:12,padding:"14px",textAlign:"center",color:"#000",fontSize:16,fontWeight:800,textDecoration:"none",boxShadow:"0 0 30px rgba(249,115,22,0.3)"}}>📞 0721 000 000</a>
              </div>
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:20,padding:22}}>
                <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,0.03)",borderRadius:10,padding:4}}>
                  {["Servicii","Brands","Program"].map((t,i)=>(
                    <button key={t} onClick={()=>setTab(i)} style={{flex:1,padding:"8px",borderRadius:8,border:"none",background:tab===i?"rgba(249,115,22,0.18)":"transparent",color:tab===i?"#f97316":"rgba(255,255,255,0.35)",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>{t}</button>
                  ))}
                </div>
                {tab===0&&svcs.slice(0,4).map(s=>(
                  <div key={s.name} style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",marginBottom:4,background:"rgba(255,255,255,0.02)",borderRadius:8}}>
                    <span style={{fontSize:13,color:"rgba(255,255,255,0.55)"}}>{s.name}</span>
                    <span style={{color:"#fbbf24",fontSize:12,fontWeight:600}}>{s.price}</span>
                  </div>
                ))}
                {tab===1&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>{brands.map(b=><span key={b} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6,padding:"4px 9px",fontSize:11,color:"rgba(255,255,255,0.45)"}}>{b}</span>)}</div>}
                {tab===2&&[["Luni – Vineri","08:00–20:00",true],["Sâmbătă","08:00–16:00",true],["Duminică","ÎNCHIS",false]].map(([z,o,op])=>(
                  <div key={String(z)} style={{display:"flex",justifyContent:"space-between",padding:"8px 10px",marginBottom:4,background:"rgba(255,255,255,0.02)",borderRadius:8}}>
                    <span style={{color:"rgba(255,255,255,0.45)",fontSize:13}}>{z}</span>
                    <span style={{color:op?"#22c55e":"#ef4444",fontSize:13,fontWeight:600}}>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="prețuri" style={{position:"relative",zIndex:2,padding:"100px clamp(20px,5vw,80px)",background:"rgba(255,255,255,0.01)"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:52,flexWrap:"wrap",gap:16}}>
            <div>
              <p style={{color:"#f97316",fontSize:11,letterSpacing:"0.2em",marginBottom:10,fontWeight:600}}>PREȚURI TRANSPARENTE</p>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,52px)",fontWeight:800,letterSpacing:"-0.02em"}}>Servicii & Tarife</h2>
            </div>
            <span style={{color:"rgba(255,255,255,0.25)",fontSize:13}}>Prețurile includ manopera</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
            {svcs.map(s=>(
              <div key={s.name} style={{position:"relative",borderRadius:16,padding:"22px",
                background:s.hot?"linear-gradient(135deg,rgba(249,115,22,0.07),rgba(251,191,36,0.03))":"rgba(255,255,255,0.02)",
                border:`1px solid ${s.hot?"rgba(249,115,22,0.18)":"rgba(255,255,255,0.06)"}`,transition:"all 0.3s"}}
                onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor="rgba(249,115,22,0.3)";(e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=s.hot?"rgba(249,115,22,0.18)":"rgba(255,255,255,0.06)";(e.currentTarget as HTMLDivElement).style.transform="none";}}>
                {s.hot&&<div style={{position:"absolute",top:12,right:12,background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:100,padding:"2px 9px",fontSize:9,color:"#000",fontWeight:800,letterSpacing:"0.1em"}}>POPULAR</div>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,maxWidth:"65%",lineHeight:1.3}}>{s.name}</h3>
                  <div style={{textAlign:"right"}}>
                    <div style={{color:"#fbbf24",fontSize:17,fontWeight:800}}>{s.price}</div>
                    <div style={{color:"rgba(255,255,255,0.25)",fontSize:11}}>⏱ {s.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" style={{position:"relative",zIndex:2,padding:"80px clamp(20px,5vw,80px) 120px"}}>
        <div style={{maxWidth:900,margin:"0 auto",background:"linear-gradient(135deg,rgba(249,115,22,0.07),rgba(251,191,36,0.03))",border:"1px solid rgba(249,115,22,0.18)",borderRadius:28,padding:"clamp(40px,5vw,64px)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:40,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 70%)",pointerEvents:"none"}} />
          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,48px)",fontWeight:800,letterSpacing:"-0.02em",marginBottom:10}}>
              Programează-te <span style={{color:"#f97316"}}>acum</span>
            </h2>
            <p style={{color:"rgba(255,255,255,0.35)",fontSize:15,lineHeight:1.7}}>Locuri disponibile azi · Estimare gratuită</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:12,minWidth:250}}>
            <a href="tel:+40721000000" style={{background:"linear-gradient(135deg,#f97316,#fbbf24)",borderRadius:12,padding:"15px 32px",color:"#000",fontSize:16,fontWeight:800,textDecoration:"none",textAlign:"center",boxShadow:"0 0 40px rgba(249,115,22,0.4)"}}>📞 0721 000 000</a>
            <a href="https://wa.me/40721000000" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"14px",color:"rgba(255,255,255,0.6)",fontSize:14,textDecoration:"none",textAlign:"center"}}>💬 WhatsApp</a>
            <p style={{color:"rgba(255,255,255,0.2)",fontSize:12,textAlign:"center"}}>📍 Str. Industriilor 44, Timișoara</p>
          </div>
        </div>
      </section>
      <button onClick={onBack} style={{position:"fixed",bottom:32,left:32,zIndex:300,background:"rgba(255,255,255,0.05)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"10px 20px",color:"rgba(255,255,255,0.4)",fontSize:13,cursor:"pointer"}}>← Portfolio</button>
      <style>{`@media(max-width:768px){section:first-of-type>div>div{grid-template-columns:1fr!important}nav>div:last-child>a:not(:last-child){display:none}}`}</style>
    </div>
  );
}

/* ══ INDEX ══ */
function PortfolioIndex({ onSelect }: { onSelect: (s: Site) => void }) {
  const cRef = useRef<HTMLCanvasElement>(null);
  const [hov, setHov] = useState<number|null>(null);
  useEffect(() => {
    const c = cRef.current; if(!c) return;
    const ctx = c.getContext("2d")!;
    let W = (c.width=window.innerWidth), H = (c.height=window.innerHeight);
    const resize = () => { W=c.width=window.innerWidth; H=c.height=window.innerHeight; };
    window.addEventListener("resize",resize);
    const pts = Array.from({length:100},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.3,o:Math.random()*.35+.05}));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${p.o})`; ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[]);

  const demos = [
    {id:"salon" as Site,num:"01",cat:"Beauty & Wellness",title:"Lumina Beauty Studio",desc:"Dark luxury · Glassmorphism · Bento grid · Rezervări online",tags:["Dark Luxury","Glassmorphism","Booking"],accent:"#f9a8d4",glow:"rgba(244,63,94,0.18)",border:"rgba(249,168,212,0.2)"},
    {id:"pensiune" as Site,num:"02",cat:"Hospitality & Tourism",title:"Bradu Argintiu",desc:"Editorial split · Organic warm · Rezervări directe fără comision",tags:["Organic","Editorial","Direct Booking"],accent:"#74c69d",glow:"rgba(52,211,153,0.18)",border:"rgba(116,198,157,0.2)"},
    {id:"service" as Site,num:"03",cat:"Automotive & Services",title:"ProTech Auto Service",desc:"Brutalist industrial · Neon amber · CRO optimizat · Urgențe",tags:["Industrial","CRO","Urgențe"],accent:"#fbbf24",glow:"rgba(251,191,36,0.18)",border:"rgba(251,191,36,0.2)"},
  ];

  return (
    <div style={{background:"#04040a",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#fff",position:"relative",overflowX:"hidden"}}>
      <canvas ref={cRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:0.5}} />
      <Noise />
      <div style={{position:"fixed",top:"5%",left:"5%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)",zIndex:0,pointerEvents:"none"}} />
      <div style={{position:"fixed",bottom:"5%",right:"5%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)",zIndex:0,pointerEvents:"none"}} />
      <div style={{position:"relative",zIndex:2,maxWidth:1200,margin:"0 auto",padding:"clamp(60px,8vw,120px) clamp(20px,5vw,80px)"}}>
        <div style={{marginBottom:100}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"7px 18px",marginBottom:36}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e",animation:"pulse 2s infinite"}} />
            <span style={{color:"rgba(255,255,255,0.5)",fontSize:12,letterSpacing:"0.1em"}}>PORTOFOLIU · 3 DEMO-URI LIVE</span>
          </div>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(48px,8vw,110px)",fontWeight:800,lineHeight:0.92,letterSpacing:"-0.03em",marginBottom:28}}>
            Site-uri care<br/>
            <span style={{background:"linear-gradient(135deg,#a78bfa,#60a5fa,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>convertesc.</span>
          </h1>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:"clamp(15px,1.8vw,19px)",maxWidth:560,lineHeight:1.8,fontWeight:300}}>
            3 demo-uri complete pentru afaceri din România. Fiecare cu identitate vizuală distinctă, animații și optimizat pentru conversii.
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          {demos.map((d,i)=>(
            <button key={d.id} onClick={()=>onSelect(d.id)}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{all:"unset",display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"clamp(24px,3.5vw,44px) clamp(20px,4vw,52px)",
                background:hov===i?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",
                border:`1px solid ${hov===i?d.border:"rgba(255,255,255,0.06)"}`,
                borderRadius:24,cursor:"pointer",transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)",
                transform:hov===i?"translateY(-3px)":"none",
                boxShadow:hov===i?`0 20px 60px ${d.glow}`:"none",
                position:"relative",overflow:"hidden",flexWrap:"wrap",gap:20,width:"100%",textAlign:"left"}}>
              <div style={{position:"absolute",top:-60,right:-60,width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle,${d.glow} 0%,transparent 70%)`,opacity:hov===i?1:0,transition:"opacity 0.4s",pointerEvents:"none"}} />
              <div style={{display:"flex",alignItems:"center",gap:"clamp(16px,3vw,48px)"}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(28px,4vw,56px)",fontWeight:800,color:"rgba(255,255,255,0.05)",lineHeight:1,minWidth:60,letterSpacing:"-0.04em"}}>{d.num}</div>
                <div>
                  <div style={{color:"rgba(255,255,255,0.22)",fontSize:11,letterSpacing:"0.18em",marginBottom:7}}>{d.cat.toUpperCase()}</div>
                  <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(18px,2.5vw,32px)",fontWeight:700,letterSpacing:"-0.02em",marginBottom:7,color:"#fff"}}>{d.title}</h2>
                  <p style={{color:"rgba(255,255,255,0.38)",fontSize:14,marginBottom:14}}>{d.desc}</p>
                  <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                    {d.tags.map(t=><span key={t} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:100,padding:"3px 11px",fontSize:11,color:"rgba(255,255,255,0.4)"}}>{t}</span>)}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
                <span style={{color:hov===i?d.accent:"rgba(255,255,255,0.3)",fontSize:14,transition:"color 0.3s"}}>Vezi demo</span>
                <div style={{width:50,height:50,borderRadius:"50%",background:hov===i?`linear-gradient(135deg,${d.accent},${d.accent}88)`:"rgba(255,255,255,0.05)",
                  border:`1px solid ${hov===i?d.accent:"rgba(255,255,255,0.08)"}`,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,transition:"all 0.35s",transform:hov===i?"rotate(-45deg)":"none",
                  boxShadow:hov===i?`0 0 30px ${d.glow}`:"none",color:hov===i?"#000":"rgba(255,255,255,0.4)"}}>→</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{marginTop:72,paddingTop:36,borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <p style={{color:"rgba(255,255,255,0.18)",fontSize:13}}>3–5 zile livrare · Preț fix · Domeniu + hosting inclus</p>
          <p style={{color:"rgba(255,255,255,0.18)",fontSize:13}}>Next.js 15 · Vercel · 2026</p>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

export default function App() {
  const [site, setSite] = useState<Site>("index");
  const go = useCallback((s: Site) => { setSite(s); window.scrollTo({top:0,behavior:"instant" as ScrollBehavior}); }, []);
  if (site === "salon") return <SalonSite onBack={() => go("index")} />;
  if (site === "pensiune") return <PensiuneSite onBack={() => go("index")} />;
  if (site === "service") return <ServiceSite onBack={() => go("index")} />;
  return <PortfolioIndex onSelect={go} />;
}
