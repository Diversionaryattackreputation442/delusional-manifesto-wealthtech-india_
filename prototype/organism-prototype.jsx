import { useState, useEffect, useRef, useCallback } from "react";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const Ic = {
  Pillar: ({ size = 24, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V13h6v8M9 9h.01M15 9h.01"/></svg>),
  Shield: ({ size = 24, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25 5.25-1.1 9-6 9-11.25V7l-9-5z"/><path d="M9 12l2 2 4-4"/></svg>),
  Leaf: ({ size = 24, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21c3-5 7-8 14-11-3 7-6 11-11 14-1.3-1.3-2.4-2-3-3z"/><path d="M12 13c-2 2-3.5 4-4 8"/></svg>),
  Graph: ({ size = 24, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-6 4 3 5-7"/></svg>),
  Flame: ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c1 4-2 7-2 10a4 4 0 008 0c0-3-1.5-4-2-6-1 2-3 3-4 3s-2-2 0-7z"/></svg>),
  Briefcase: ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>),
  Cal: ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>),
  Car: ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-4h8l2 4h1a2 2 0 012 2v6a2 2 0 01-2 2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/></svg>),
  Watch: ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="16" rx="4"/><path d="M12 8v4l2 2M9 1h6M9 23h6"/></svg>),
  Nucleus: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2"><circle cx="12" cy="12" r="2.5" fill={color} fillOpacity="0.4"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>),
  Hexagon: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/><circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.3"/></svg>),
  Dialogue: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>),
  Rings: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>),
  Layers: ({ size = 20, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>),
  Crescent: ({ size = 48, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.2"><path d="M36 24c0 8-6 14-14 14-4 0-7.5-1.7-10-4.5A14 14 0 0036 24z" fill={color} fillOpacity="0.1"/><circle cx="24" cy="24" r="14"/><path d="M30 14a10 10 0 00-6 18"/></svg>),
};

function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 1400 }) {
  const [disp, setDisp] = useState(0);
  const ref = useRef(null);
  const start = useRef(null);
  useEffect(() => {
    const target = parseFloat(value);
    start.current = null;
    const tick = (ts) => {
      if (!start.current) start.current = ts;
      const p = clamp((ts - start.current) / duration, 0, 1);
      setDisp((1 - Math.pow(1 - p, 4)) * target);
      if (p < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);
  return <span>{prefix}{disp.toFixed(decimals)}{suffix}</span>;
}

function Grain() {
  const c = useRef(null);
  useEffect(() => {
    const ctx = c.current?.getContext("2d");
    if (!ctx) return;
    c.current.width = 256; c.current.height = 256;
    const d = ctx.createImageData(256, 256);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = v; d.data[i+1] = v; d.data[i+2] = v; d.data[i+3] = 11; }
    ctx.putImageData(d, 0, 0);
  }, []);
  return <canvas ref={c} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "overlay", opacity: 0.45 }} />;
}

function ScreenWrap({ children, k }) {
  const [v, setV] = useState(false);
  useEffect(() => { setV(false); const t = requestAnimationFrame(() => requestAnimationFrame(() => setV(true))); return () => cancelAnimationFrame(t); }, [k]);
  return <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(6px) scale(0.995)", transition: "opacity 0.4s cubic-bezier(0.23,1,0.32,1), transform 0.4s cubic-bezier(0.23,1,0.32,1)", height: "100%" }}>{children}</div>;
}

function Press({ children, onClick, style = {} }) {
  const [p, setP] = useState(false);
  return <div onPointerDown={() => setP(true)} onPointerUp={() => { setP(false); onClick?.(); }} onPointerLeave={() => setP(false)} style={{ ...style, transform: p ? "scale(0.96)" : "scale(1)", transition: "transform 0.12s cubic-bezier(0.23,1,0.32,1)", cursor: "pointer" }}>{children}</div>;
}

function LivingOrganism({ health = 0.87, activeConnections = [] }) {
  const canvasRef = useRef(null); const frameRef = useRef(0); const timeRef = useRef(0);
  const particlesRef = useRef([]); const dustRef = useRef([]);
  const domains = [
    { id: "career", label: "Career", angle: -90, color: "#7EC8E3" }, { id: "health", label: "Health", angle: -38, color: "#FF8A80" },
    { id: "family", label: "Family", angle: 14, color: "#CE93D8" }, { id: "lifestyle", label: "Lifestyle", angle: 65, color: "#FFD54F" },
    { id: "tax", label: "Tax", angle: 117, color: "#81C784" }, { id: "realestate", label: "Home", angle: 168, color: "#90CAF9" },
    { id: "aspirations", label: "Aspirations", angle: 220, color: "#FFAB91" },
  ];
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    if (!particlesRef.current.length) {
      for (let i = 0; i < 80; i++) particlesRef.current.push({ x: w/2+(Math.random()-0.5)*240, y: h/2+(Math.random()-0.5)*240, vx: (Math.random()-0.5)*0.2, vy: (Math.random()-0.5)*0.2, size: Math.random()*1.8+0.3, alpha: Math.random()*0.3+0.05, life: Math.random()*200 });
      for (let i = 0; i < 30; i++) dustRef.current.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*0.08, vy: -Math.random()*0.12-0.02, size: Math.random()*0.8+0.2, alpha: Math.random()*0.06+0.02 });
    }
    const hx = (hex) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `${r},${g},${b}`; };
    const draw = () => {
      timeRef.current += 0.007; const t = timeRef.current;
      ctx.clearRect(0, 0, w, h); const cx = w/2, cy = h/2 - 20;
      const g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      g0.addColorStop(0, `rgba(124,154,130,${0.08+Math.sin(t*0.5)*0.02})`); g0.addColorStop(0.4, `rgba(124,154,130,${0.03+Math.sin(t*0.3)*0.01})`); g0.addColorStop(1, "rgba(124,154,130,0)");
      ctx.fillStyle = g0; ctx.fillRect(0, 0, w, h);
      dustRef.current.forEach(d => { d.x += d.vx; d.y += d.vy; if (d.y < -5) { d.y = h+5; d.x = Math.random()*w; } ctx.beginPath(); ctx.arc(d.x, d.y, d.size, 0, Math.PI*2); ctx.fillStyle = `rgba(200,220,210,${d.alpha})`; ctx.fill(); });
      for (let ring = 4; ring >= 0; ring--) {
        const baseR = 35+ring*16; ctx.beginPath();
        for (let a = 0; a <= Math.PI*2; a += 0.015) { const n = Math.sin(a*3+t*1.1+ring*0.7)*(7+ring)+Math.sin(a*5-t*0.7+ring*1.5)*(4+ring*0.5)+Math.cos(a*2+t*1.3+ring)*3*health; const r = baseR+n; const x = cx+Math.cos(a)*r; const y = cy+Math.sin(a)*r; a === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y); }
        ctx.closePath(); ctx.fillStyle = `rgba(130,210,160,${(0.05-ring*0.008)*(0.7+health*0.3)})`; ctx.fill();
      }
      const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,40); cg.addColorStop(0, `rgba(170,230,190,${0.28+Math.sin(t*1.2)*0.06})`); cg.addColorStop(0.5, `rgba(150,210,170,${0.07+Math.sin(t*0.8)*0.03})`); cg.addColorStop(1, "rgba(150,210,170,0)");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx,cy,45,0,Math.PI*2); ctx.fill();
      const orbitR = 130; ctx.beginPath(); ctx.arc(cx,cy,orbitR,0,Math.PI*2); ctx.strokeStyle = "rgba(124,154,130,0.04)"; ctx.lineWidth = 0.5; ctx.setLineDash([2,6]); ctx.stroke(); ctx.setLineDash([]);
      domains.forEach((d,i) => {
        const angle = ((d.angle+t*2.5)*Math.PI)/180; const bob = Math.sin(t*1.5+i*1.2)*3;
        const nx = cx+Math.cos(angle)*(orbitR+bob); const ny = cy+Math.sin(angle)*(orbitR+bob);
        const isA = activeConnections.includes(d.id); const la = isA ? 0.25+Math.sin(t*2.5+i)*0.1 : 0.03;
        ctx.beginPath(); ctx.moveTo(cx,cy); const mx = (cx+nx)/2+Math.sin(t*0.8+i)*12; const my = (cy+ny)/2+Math.cos(t*0.8+i)*12;
        ctx.quadraticCurveTo(mx,my,nx,ny); ctx.strokeStyle = isA ? `rgba(${hx(d.color)},${la})` : `rgba(124,154,130,${la})`; ctx.lineWidth = isA ? 1.5 : 0.4; ctx.stroke();
        if (isA) { for (let p = 0; p < 2; p++) { const pt = ((t*0.4+i*0.25+p*0.5)%1); const px = lerp(lerp(cx,mx,pt),lerp(mx,nx,pt),pt); const py = lerp(lerp(cy,my,pt),lerp(my,ny,pt),pt); const pg = ctx.createRadialGradient(px,py,0,px,py,6); pg.addColorStop(0, `rgba(${hx(d.color)},${0.5-p*0.2})`); pg.addColorStop(1, `rgba(${hx(d.color)},0)`); ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px,py,6,0,Math.PI*2); ctx.fill(); } }
        const ng = ctx.createRadialGradient(nx,ny,0,nx,ny,isA?22:14); ng.addColorStop(0, `rgba(${hx(d.color)},${isA?0.3:0.1})`); ng.addColorStop(1, `rgba(${hx(d.color)},0)`);
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(nx,ny,isA?22:14,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(nx,ny,isA?4.5:3,0,Math.PI*2); ctx.fillStyle = `rgba(${hx(d.color)},${isA?0.9:0.4})`; ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${isA?0.55:0.18})`; ctx.font = `${isA?"500":"400"} 9px 'DM Sans', sans-serif`; ctx.textAlign = "center"; ctx.fillText(d.label, nx, ny+16);
      });
      particlesRef.current.forEach(p => { p.life += 0.3; p.x += p.vx+Math.sin(t*0.5+p.life*0.008)*0.15; p.y += p.vy+Math.cos(t*0.3+p.life*0.01)*0.1; const dx = p.x-cx, dy = p.y-cy, dist = Math.sqrt(dx*dx+dy*dy); if (dist > 200) { p.x = cx+(Math.random()-0.5)*120; p.y = cy+(Math.random()-0.5)*120; } const a = p.alpha*(1-dist/220); if (a > 0.005) { ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle = `rgba(180,225,195,${a})`; ctx.fill(); } });
      frameRef.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(frameRef.current);
  }, [health, activeConnections]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function InsightStream({ insights, visible }) {
  if (!visible) return null;
  return (<div style={{ position: "absolute", bottom: 100, left: 16, right: 16 }}>
    {insights.map((ins, i) => { const I = Ic[ins.icon]; return (
      <div key={i} style={{ animation: `streamIn 0.55s cubic-bezier(0.23,1,0.32,1) ${i*0.12}s both`, background: "rgba(255,255,255,0.025)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "14px 16px", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ display: "flex", opacity: 0.9 }}><I size={15} color={ins.color} /></span>
          <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: ins.color }}>{ins.source}</span>
          <svg width="12" height="6" viewBox="0 0 12 6"><path d="M0 3h10M7.5 0.5l2.5 2.5-2.5 2.5" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none"/></svg>
          <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{ins.target}</span>
        </div>
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, fontWeight: 300 }}>{ins.text}</div>
        <div style={{ fontSize: 11.5, color: "#7C9A82", fontWeight: 500, marginTop: 8 }}>{ins.action}</div>
      </div>); })}
  </div>);
}

function CouncilVis() {
  const [aa, setAa] = useState(null);
  const agents = [
    { id: 0, icon: "Pillar", name: "Wealth Maximizer", stance: "Don't Buy", color: "#7EC8E3", x: 50, y: 12, detail: "Renting + investing the ₹17L down payment yields ₹30-60L more over 15 years. Your investment history suggests you won't actually invest the surplus — but the math says rent." },
    { id: 1, icon: "Shield", name: "Risk Guardian", stance: "Not Yet", color: "#FF8A80", x: 88, y: 50, detail: "Your emergency fund drops to 1.2 months post-purchase. One medical emergency and you're liquidating at a loss. Build to 6 months first." },
    { id: 2, icon: "Leaf", name: "Life Optimizer", stance: "Buy", color: "#CE93D8", x: 50, y: 88, detail: "You've searched for 3 months. Your partner shares listings weekly. This isn't a spreadsheet decision. Stability, identity, roots — these have value no spreadsheet computes." },
    { id: 3, icon: "Graph", name: "Tax Strategist", stance: "Improves Case", color: "#81C784", x: 12, y: 50, detail: "Section 24 interest deduction saves ₹60K/year at your bracket. Stamp duty ₹5-6L sunk cost. Don't buy unless staying 5+ years." },
  ];
  return (<div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "0 20px" }}>
    <div style={{ marginBottom: 20, animation: "fadeUp 0.7s ease both" }}>
      <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>The Council is deliberating</div>
      <div style={{ fontSize: 16.5, fontWeight: 400, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, fontFamily: "'Lora', serif" }}>"Should I buy a 2BHK in Whitefield for ₹85L?"</div>
    </div>
    <div style={{ position: "relative", width: "100%", height: 260, flexShrink: 0 }}>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "rgba(255,255,255,0.12)", fontFamily: "'Lora', serif" }}>?</div>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {agents.map(a => <line key={a.id} x1="50%" y1="50%" x2={`${a.x}%`} y2={`${a.y}%`} stroke={aa===a.id?a.color:"rgba(255,255,255,0.04)"} strokeWidth={aa===a.id?1:0.5} strokeDasharray={aa===a.id?"none":"3 5"} style={{ transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)" }}/>)}
      </svg>
      {agents.map(a => { const I = Ic[a.icon]; const on = aa===a.id; return (
        <Press key={a.id} onClick={() => setAa(on?null:a.id)} style={{ position: "absolute", left: `${a.x}%`, top: `${a.y}%`, transform: "translate(-50%,-50%)", textAlign: "center", animation: `fadeUp 0.6s ease ${a.id*0.08}s both` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: on?72:44, height: on?72:44, borderRadius: "50%", background: `radial-gradient(circle, ${a.color}${on?"20":"08"} 0%, transparent 70%)`, transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)" }}/>
          <div style={{ position: "relative", marginBottom: 6, opacity: on?1:0.5, transition: "opacity 0.3s ease" }}><I size={26} color={a.color}/></div>
          <div style={{ fontSize: 9.5, fontWeight: 600, color: on?a.color:"rgba(255,255,255,0.35)", transition: "color 0.3s ease", whiteSpace: "nowrap" }}>{a.name}</div>
          <div style={{ fontSize: 8.5, fontWeight: 600, marginTop: 3, color: on?"rgba(255,255,255,0.65)":"rgba(255,255,255,0.2)", background: on?`${a.color}18`:"transparent", padding: "2px 8px", borderRadius: 4, transition: "all 0.3s ease" }}>{a.stance}</div>
        </Press>); })}
    </div>
    <div style={{ flex: 1, overflow: "auto" }}>
      {aa !== null ? (<div style={{ animation: "streamIn 0.4s cubic-bezier(0.23,1,0.32,1) both", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)", border: `1px solid ${agents[aa].color}15`, borderRadius: 14, padding: 20 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontWeight: 300 }}>{agents[aa].detail}</div>
      </div>) : (<div style={{ textAlign: "center", padding: 24 }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontWeight: 300 }}>Tap an agent to hear their perspective</div></div>)}
      <div style={{ marginTop: 16, padding: 18, borderRadius: 14, background: "rgba(124,154,130,0.04)", border: "1px solid rgba(124,154,130,0.1)", backdropFilter: "blur(20px)", animation: "fadeUp 0.8s ease 0.4s both" }}>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#7C9A82", textTransform: "uppercase" }}>Verdict</div>
        <div style={{ fontSize: 15.5, fontWeight: 500, color: "rgba(255,255,255,0.85)", marginTop: 5, fontFamily: "'Lora', serif" }}>Conditional Buy</div>
        <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginTop: 6, lineHeight: 1.65, fontWeight: 300 }}>Build 6-month emergency fund first. Then proceed with confidence.</div>
      </div>
    </div>
  </div>);
}

function ConverseVoid() {
  const [msgs, setMsgs] = useState([{ role: "ai", text: "Your finances are breathing normally. All goals on track. What's on your mind?" }]);
  const [input, setInput] = useState(""); const [typing, setTyping] = useState(false); const endRef = useRef(null);
  const R = { sabbatical: "Three months costs ₹1.74L. Runway drops from 6.4 to 3.4 months — below safe. I need 2.5 months to build you a buffer. Say the word and I'll start preparing.", job: "A 40% headline raise. But the real number — after tax regime change, benefits gap, commute cost — is closer to ₹1.2L/year. Want me to model the full picture?", invest: "₹45K sitting idle in savings. I can move ₹40K into your liquid fund in 30 seconds — ₹3,100/year extra for zero risk. Approve?", default: "Let me pull your data and think across all seven domains of your financial life." };
  const send = useCallback(() => { if (!input.trim()) return; const m = input.trim(); setMsgs(p => [...p, { role: "user", text: m }]); setInput(""); setTyping(true); const l = m.toLowerCase(); let r = R.default; if (l.includes("sabbatical")||l.includes("break")||l.includes("quit")) r = R.sabbatical; else if (l.includes("job")||l.includes("offer")) r = R.job; else if (l.includes("invest")||l.includes("money")||l.includes("idle")) r = R.invest; setTimeout(() => { setTyping(false); setMsgs(p => [...p, { role: "ai", text: r }]); }, 1800); }, [input]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);
  return (<div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "0 20px", position: "relative" }}>
    <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(124,154,130,0.05) 0%, transparent 70%)", animation: "breathe 6s ease-in-out infinite" }}/>
    <div style={{ flex: 1, overflowY: "auto", paddingTop: 8, position: "relative", zIndex: 1 }}>
      {msgs.map((m, i) => (<div key={i} style={{ animation: `streamIn 0.5s cubic-bezier(0.23,1,0.32,1) ${i*0.04}s both`, marginBottom: 20, maxWidth: "88%", marginLeft: m.role==="user"?"auto":0 }}>
        {m.role==="ai" && <div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(124,154,130,0.5)", marginBottom: 5, textTransform: "uppercase" }}>Ghost</div>}
        <div style={{ fontSize: 13.5, lineHeight: 1.75, color: m.role==="user"?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)", fontWeight: m.role==="user"?400:300 }}>{m.text}</div>
      </div>))}
      {typing && <div style={{ animation: "streamIn 0.3s ease both", marginBottom: 20 }}><div style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: "0.12em", color: "rgba(124,154,130,0.5)", marginBottom: 5, textTransform: "uppercase" }}>Ghost</div><div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(124,154,130,0.5)", animation: `breathe 1.2s ease ${i*0.2}s infinite` }}/>)}</div></div>}
      <div ref={endRef}/>
    </div>
    {msgs.length < 3 && <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
      {["What if I take a sabbatical?", "I got a job offer", "Any idle money?"].map((s,i) => <Press key={i} onClick={() => setInput(s)} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.35)", fontSize: 11, backdropFilter: "blur(10px)" }}>{s}</Press>)}
    </div>}
    <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.025)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.05)", marginBottom: 8, backdropFilter: "blur(20px)", position: "relative", zIndex: 1 }}>
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} placeholder="Talk to your money..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: "rgba(255,255,255,0.8)", fontSize: 13.5, fontFamily: "inherit", fontWeight: 300 }}/>
      <Press onClick={send} style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: input.trim()?"rgba(124,154,130,0.9)":"rgba(255,255,255,0.04)", transition: "background 0.3s ease" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={input.trim()?"#fff":"rgba(255,255,255,0.15)"}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </Press>
    </div>
  </div>);
}

function WrapImmersive() {
  const [slide, setSlide] = useState(0);
  const slides = [
    () => (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 48, fontWeight: 500 }}>2027 in Review</div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 48, fontWeight: 300, color: "#fff", letterSpacing: "-0.03em", animation: "fadeUp 0.8s ease both" }}><Counter value={28.42} prefix="₹" suffix="L" decimals={2} duration={2000}/></div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 20, textAlign: "center", lineHeight: 1.7, fontWeight: 300, maxWidth: 240 }}>passed through your life this year</div>
    </div>),
    () => (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 32, fontWeight: 500, animation: "fadeUp 0.6s ease both" }}>For Every ₹100 You Earned</div>
      <div style={{ width: "100%", maxWidth: 260, animation: "fadeUp 0.6s ease 0.1s both" }}>
        {[{ l: "Rent", v: 31, c: "#FF8A80" },{ l: "Food", v: 18, c: "#FFD54F" },{ l: "EMIs", v: 12, c: "#90CAF9" },{ l: "Investments", v: 9, c: "#81C784" },{ l: "Shopping", v: 8, c: "#CE93D8" },{ l: "Transport", v: 7, c: "#7EC8E3" },{ l: "Subscriptions", v: 6, c: "#FFAB91" },{ l: "Everything else", v: 9, c: "rgba(255,255,255,0.3)" }].map((s,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, animation: `streamIn 0.5s ease ${i*0.06}s both` }}>
            <span style={{ width: 28, fontSize: 13, fontWeight: 500, color: "#fff", textAlign: "right", fontFamily: "'Lora', serif" }}>₹{s.v}</span>
            <div style={{ flex: 1, height: 14, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: s.c, width: `${s.v*3}%`, opacity: 0.7 }}/>
            </div>
            <span style={{ width: 80, fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{s.l}</span>
          </div>))}
      </div>
    </div>),
    () => (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 24, fontWeight: 500, animation: "fadeUp 0.6s ease both" }}>The Hidden Number</div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 44, fontWeight: 300, color: "#fff", animation: "fadeUp 0.6s ease 0.1s both" }}><Counter value={38} prefix="₹" suffix="K" decimals={0} duration={1500}/></div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 12, textAlign: "center", fontWeight: 300, animation: "fadeUp 0.6s ease 0.2s both" }}>spent on 8 subscriptions you never used</div>
      <div style={{ marginTop: 28, width: "100%", maxWidth: 240, animation: "fadeUp 0.6s ease 0.3s both" }}>
        {["Apple Music — 0 plays","Headspace — last opened Feb","Coursera — no course started","Cult.fit — 2 visits in 12 months"].map((s,i) => (
          <div key={i} style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontWeight: 300 }}>{s}</div>))}
      </div>
    </div>),
    () => (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ marginBottom: 16, animation: "fadeUp 0.6s ease both", opacity: 0.6 }}><Ic.Crescent size={52} color="rgba(255,255,255,0.7)"/></div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 10, animation: "fadeUp 0.6s ease 0.1s both" }}>The Stress Spender</div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", textAlign: "center", lineHeight: 1.7, maxWidth: 250, animation: "fadeUp 0.6s ease 0.2s both", fontWeight: 300 }}>Your 2 AM Swiggy orders cost you ₹47,000 this year. That's a round trip to Bali.</div>
      <div style={{ marginTop: 36, animation: "fadeUp 0.6s ease 0.3s both", display: "flex", gap: 32 }}>
        <div style={{ textAlign: "center" }}><div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 400, color: "#FF8A80" }}>127</div><div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>late night orders</div></div>
        <div style={{ textAlign: "center" }}><div style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 400, color: "#FFD54F" }}>₹47K</div><div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)", marginTop: 3 }}>total cost</div></div>
      </div>
    </div>),
    () => (<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 32 }}>
      <div style={{ fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 24, fontWeight: 500, animation: "fadeUp 0.6s ease both" }}>Financial Health Score</div>
      <div style={{ fontFamily: "'Lora', serif", fontSize: 72, fontWeight: 300, color: "#fff", lineHeight: 1, animation: "fadeUp 0.6s ease 0.1s both" }}><Counter value={62} decimals={0} duration={1800}/></div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 6, fontWeight: 300, animation: "fadeUp 0.6s ease 0.15s both" }}>out of 100</div>
      <div style={{ marginTop: 36, width: "100%", maxWidth: 220, animation: "fadeUp 0.6s ease 0.2s both" }}>
        {[{ l: "Runway", v: "4.1mo", c: "#FFD54F" },{ l: "Protection", v: "34%", c: "#FF8A80" },{ l: "Tax Efficiency", v: "78%", c: "#81C784" },{ l: "Cash Velocity", v: "89%", c: "#81C784" }].map((s,i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 11.5 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>{s.l}</span><span style={{ color: s.c, fontWeight: 500 }}>{s.v}</span>
          </div>))}
      </div>
    </div>),
  ];
  return (<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <Press onClick={() => setSlide((slide+1)%slides.length)} style={{ flex: 1, position: "relative" }}><ScreenWrap k={slide}>{slides[slide]()}</ScreenWrap></Press>
    <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: 16 }}>
      {slides.map((_,i) => <Press key={i} onClick={() => setSlide(i)} style={{ width: slide===i?20:6, height: 5, borderRadius: 3, background: slide===i?"#7C9A82":"rgba(255,255,255,0.08)", transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)" }}/>)}
    </div>
  </div>);
}

function SourcesVis() {
  const [activeTier, setActiveTier] = useState(null);
  const tiers = [
    { id: 1, label: "AA Native", radius: 35, color: "#7C9A82", opacity: 0.9,
      sources: ["SBI", "HDFC Bank", "ICICI", "Axis", "CAMS", "KFintech", "NPS"],
      desc: "Live today. Standardized consent. Full bank + MF + pension data.",
      coverage: "85%" },
    { id: 2, label: "AA Emerging", radius: 65, color: "#81C784", opacity: 0.6,
      sources: ["LIC", "HDFC Life", "Star Health", "CDSL", "NSDL", "IT Dept"],
      desc: "Standards exist. Institutions onboarding. Insurance + demat + tax coming.",
      coverage: "55%" },
    { id: 3, label: "Platform APIs", radius: 95, color: "#7EC8E3", opacity: 0.45,
      sources: ["Zerodha Kite", "BSE Star MF", "Google Fit", "Apple Health", "Google Cal", "CIBIL"],
      desc: "Direct APIs. Per-platform integration. Execution + health + calendar.",
      coverage: "40%" },
    { id: 4, label: "Transaction Inference", radius: 125, color: "#FFD54F", opacity: 0.35,
      sources: ["Swiggy", "Zomato", "Uber", "Amazon", "Netflix", "Spotify", "Rent", "EMIs"],
      desc: "No API needed. Parsed from UPI transaction descriptions. This is the real moat.",
      coverage: "80%" },
    { id: 5, label: "User-Volunteered", radius: 155, color: "#CE93D8", opacity: 0.25,
      sources: ["Goals", "Career", "Family", "Health History", "Salary Slip", "Form 16"],
      desc: "Conversation + document upload. No automated path. The human layer.",
      coverage: "30%" },
  ];

  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth; const h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
    const hx = (hex) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `${r},${g},${b}`; };

    const draw = () => {
      timeRef.current += 0.005; const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      tiers.forEach((tier, ti) => {
        const isActive = activeTier === tier.id;
        const r = tier.radius;

        // Ring
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hx(tier.color)},${isActive ? 0.4 : tier.opacity * 0.3})`;
        ctx.lineWidth = isActive ? 1.5 : 0.6;
        ctx.setLineDash(ti > 2 ? [3, 5] : []); ctx.stroke(); ctx.setLineDash([]);

        // Ring glow when active
        if (isActive) {
          const rg = ctx.createRadialGradient(cx, cy, r - 8, cx, cy, r + 8);
          rg.addColorStop(0, `rgba(${hx(tier.color)},0)`);
          rg.addColorStop(0.5, `rgba(${hx(tier.color)},0.06)`);
          rg.addColorStop(1, `rgba(${hx(tier.color)},0)`);
          ctx.fillStyle = rg;
          ctx.beginPath(); ctx.arc(cx, cy, r + 8, 0, Math.PI * 2); ctx.fill();
        }

        // Source dots on ring
        tier.sources.forEach((src, si) => {
          const angle = (si / tier.sources.length) * Math.PI * 2 + t * (0.3 - ti * 0.05);
          const sx = cx + Math.cos(angle) * r;
          const sy = cy + Math.sin(angle) * r;
          const dotR = isActive ? 3 : 2;

          // Dot glow
          if (isActive) {
            const dg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
            dg.addColorStop(0, `rgba(${hx(tier.color)},0.3)`);
            dg.addColorStop(1, `rgba(${hx(tier.color)},0)`);
            ctx.fillStyle = dg;
            ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
          }

          // Dot
          ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hx(tier.color)},${isActive ? 0.9 : 0.4})`;
          ctx.fill();

          // Label (only when active)
          if (isActive) {
            ctx.fillStyle = `rgba(255,255,255,0.6)`;
            ctx.font = "500 8px 'DM Sans', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(src, sx, sy - 8);
          }
        });
      });

      // Center core
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25);
      cg.addColorStop(0, `rgba(124,154,130,${0.25 + Math.sin(t * 1.5) * 0.05})`);
      cg.addColorStop(1, "rgba(124,154,130,0)");
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "500 8px 'DM Sans', sans-serif"; ctx.textAlign = "center";
      ctx.fillText("YOU", cx, cy + 3);

      frameRef.current = requestAnimationFrame(draw);
    };
    draw(); return () => cancelAnimationFrame(frameRef.current);
  }, [activeTier]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "0 20px" }}>
      <div style={{ marginBottom: 12, animation: "fadeUp 0.6s ease both" }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>Data Sources</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontWeight: 300 }}>Five tiers of awareness. Tap a ring to see what feeds the organism.</div>
      </div>

      <div style={{ position: "relative", width: "100%", height: 340, flexShrink: 0 }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const dist = Math.sqrt(x * x + y * y);
          const hit = tiers.find(t => Math.abs(dist - t.radius) < 18);
          setActiveTier(hit ? (activeTier === hit.id ? null : hit.id) : null);
        }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>

      {/* Tier labels */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, animation: "fadeUp 0.6s ease 0.1s both" }}>
        {tiers.map(t => (
          <Press key={t.id} onClick={() => setActiveTier(activeTier === t.id ? null : t.id)} style={{
            padding: "5px 10px", borderRadius: 8, fontSize: 9.5, fontWeight: 600,
            border: `1px solid ${activeTier === t.id ? t.color + "50" : "rgba(255,255,255,0.06)"}`,
            background: activeTier === t.id ? t.color + "12" : "rgba(255,255,255,0.02)",
            color: activeTier === t.id ? t.color : "rgba(255,255,255,0.3)",
            letterSpacing: "0.04em", transition: "all 0.3s ease",
          }}>T{t.id}: {t.label}</Press>
        ))}
      </div>

      {/* Detail panel */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {activeTier !== null ? (() => {
          const t = tiers.find(x => x.id === activeTier);
          return (
            <div style={{
              animation: "streamIn 0.4s cubic-bezier(0.23,1,0.32,1) both",
              background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)",
              border: `1px solid ${t.color}15`, borderRadius: 14, padding: 18,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.color }}>{t.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Coverage: <span style={{ color: t.color, fontWeight: 600 }}>{t.coverage}</span></div>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, fontWeight: 300, marginBottom: 12 }}>{t.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {t.sources.map((s, i) => (
                  <span key={i} style={{
                    padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 500,
                    background: `${t.color}10`, color: `${t.color}cc`, border: `1px solid ${t.color}20`,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          );
        })() : (
          <div style={{ textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", fontWeight: 300 }}>Tap a ring or label to explore data sources</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home"); const [showIns, setShowIns] = useState(false); const [ac, setAc] = useState([]);
  useEffect(() => { const c = () => { const d = ["career","health","family","lifestyle","tax","realestate","aspirations"]; const s = []; for (let i = 0; i < Math.floor(Math.random()*3)+1; i++) { const x = d[Math.floor(Math.random()*d.length)]; if (!s.includes(x)) s.push(x); } setAc(s); }; c(); const iv = setInterval(c, 4500); return () => clearInterval(iv); }, []);
  const insights = [
    { icon: "Flame", source: "Swiggy", target: "Insurance", color: "#FF8A80", text: "47 deliveries last month. Correlates with 12-hour work days. Flagging cardiovascular risk.", action: "Adjusting insurance coverage recommendation" },
    { icon: "Briefcase", source: "LinkedIn", target: "Investments", color: "#7EC8E3", text: "Profile update detected. Pre-building career transition buffer.", action: "₹15K/month redirected to liquid funds" },
    { icon: "Car", source: "Uber", target: "Real Estate", color: "#276EF1", text: "55-min avg commute. ₹14,400/month in rides. Relocating saves ₹7,200/year + 440 hours.", action: "Running rent comparison near your new office" },
    { icon: "Watch", source: "Apple Watch", target: "Financial Plan", color: "#FF375F", text: "Declining sleep quality, elevated resting heart rate. Health insurance has 2-year waiting period for lifestyle diseases.", action: "Recommending critical illness cover: ₹4,200/year for ₹25L" },
    { icon: "Cal", source: "Calendar", target: "Cash Flow", color: "#CE93D8", text: "Family wedding in November. Building ₹50K buffer automatically.", action: "₹12,500/month from discretionary for 4 months" },
  ];
  const tabs = [{ id: "home", label: "Organism", icon: "Nucleus" },{ id: "council", label: "Council", icon: "Hexagon" },{ id: "converse", label: "Converse", icon: "Dialogue" },{ id: "wrap", label: "Wrap", icon: "Rings" },{ id: "sources", label: "Sources", icon: "Layers" }];
  return (<div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: "#080808", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflow: "hidden", color: "#fff" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}body{background:#080808;overflow-x:hidden}::-webkit-scrollbar{width:0}input::placeholder{color:rgba(255,255,255,0.2)}button{font-family:inherit}@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes streamIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes breathe{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}`}</style>
    <Grain/>
    <div style={{ padding: "14px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
      <span style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.25)" }}>9:41</span>
      <div style={{ width: 14, height: 9, borderRadius: 2, border: "1px solid rgba(255,255,255,0.25)", position: "relative" }}><div style={{ position: "absolute", top: 1.5, left: 1.5, right: 3, bottom: 1.5, borderRadius: 0.5, background: "#7C9A82" }}/></div>
    </div>
    <div style={{ height: "calc(100vh - 104px)", position: "relative", zIndex: 1 }}>
      <ScreenWrap k={screen}>
        {screen === "home" && (<div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 24px 0", animation: "fadeUp 0.6s ease both", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ position: "relative", width: 8, height: 8 }}><div style={{ position: "absolute", inset: -3, borderRadius: "50%", background: "rgba(124,154,130,0.2)", animation: "breathe 3s ease-in-out infinite" }}/><div style={{ width: 8, height: 8, borderRadius: "50%", position: "relative", background: "#7C9A82", boxShadow: "0 0 8px rgba(124,154,130,0.4)" }}/></div>
              <span style={{ fontSize: 10.5, fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>Ghost is active</span>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", fontWeight: 300 }}>6.4mo runway</span>
          </div>
          <div style={{ flex: 1, position: "relative" }} onClick={() => setShowIns(!showIns)}>
            <LivingOrganism health={0.87} activeConnections={ac}/>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
              <div style={{ fontSize: 8.5, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>Net Worth</div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 30, fontWeight: 400, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}><Counter value={34.2} prefix="₹" suffix="L" decimals={1}/></div>
              <div style={{ fontSize: 10.5, color: "rgba(124,154,130,0.7)", fontWeight: 500, marginTop: 5 }}>+₹1.8L this month</div>
            </div>
            {!showIns && <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}><div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.1)", fontWeight: 300, animation: "breathe 4s ease infinite" }}>tap to see what Ghost is thinking</div></div>}
            <InsightStream insights={insights} visible={showIns}/>
          </div>
          <div style={{ margin: "0 16px 8px", padding: "14px 20px", borderRadius: 16, background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-around", animation: "fadeUp 0.6s ease 0.3s both" }}>
            {[{ l: "Protection", v: "87%", c: "#81C784" },{ l: "Tax", v: "96%", c: "#81C784" },{ l: "Velocity", v: "94%", c: "#7EC8E3" },{ l: "Goals", v: "On Track", c: "#7C9A82" }].map((v,i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 13, fontWeight: 400, color: v.c }}>{v.v}</div><div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.2)", marginTop: 3, letterSpacing: "0.06em" }}>{v.l}</div></div>))}
          </div>
        </div>)}
        {screen === "council" && <CouncilVis/>}
        {screen === "converse" && <ConverseVoid/>}
        {screen === "wrap" && <WrapImmersive/>}
        {screen === "sources" && <SourcesVis/>}
      </ScreenWrap>
    </div>
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "8px 16px 30px", background: "rgba(8,8,8,0.7)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-around", zIndex: 100 }}>
      {tabs.map(t => { const T = Ic[t.icon]; const on = screen===t.id; return (
        <Press key={t.id} onClick={() => { setScreen(t.id); setShowIns(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "6px 14px" }}>
          <div style={{ transition: "transform 0.2s ease", transform: on?"scale(1.1)":"scale(1)" }}><T size={19} color={on?"#7C9A82":"rgba(255,255,255,0.18)"}/></div>
          <span style={{ fontSize: 8.5, fontWeight: on?600:400, color: on?"rgba(124,154,130,0.8)":"rgba(255,255,255,0.15)", letterSpacing: "0.06em", transition: "color 0.3s ease" }}>{t.label}</span>
        </Press>); })}
    </div>
  </div>);
}
