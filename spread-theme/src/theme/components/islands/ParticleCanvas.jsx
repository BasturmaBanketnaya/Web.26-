import React, { useCallback, useEffect, useRef, useState } from 'react';
import './ParticleCanvas.css';

const PARTICLE_COUNT = 180;
const CONNECTION_DIST = 160;
const RESOLVE_DELAY_MS = 2500;
const LINE_ALPHA_FACTOR = 0.17;

const NODE_TYPES = [
  'Component',
  'Function',
  'Requirement',
  'Signal',
  'Error',
  'Module',
  'Test Case',
  'Interface',
  'Parameter',
];

const RELATION_LABELS = [
  'depends on →',
  'triggers →',
  'part of →',
  'tested by →',
  'linked to →',
  'validates →',
];

function parseCssColorToRgb(str) {
  const s = (str || '').trim();
  if (s.startsWith('#')) {
    const h = s.slice(1);
    const hex = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  const m = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return { r: +m[1], g: +m[2], b: +m[3] };
  return { r: 255, g: 111, b: 71 };
}

function labelForPair(i, j) {
  return RELATION_LABELS[Math.abs(i * 17 + j * 31) % RELATION_LABELS.length];
}

function createParticle(i, W, H) {
  const nodeType = NODE_TYPES[Math.floor(Math.random() * NODE_TYPES.length)];
  const isError = nodeType === 'Error';
  const baseSize = Math.random() * 2.5 + 1;
  return {
    i,
    x: Math.random() * W,
    y: Math.random() * H,
    size: isError ? baseSize * 1.45 : baseSize,
    colorKey: ['o1', 'o2', 'w1', 'w2'][Math.floor(Math.random() * 4)],
    vx: (Math.random() - 0.5) * 1.8,
    vy: (Math.random() - 0.5) * 1.8,
    tx: 0,
    ty: 0,
    progress: 0,
    nodeType,
    isError,
  };
}

function assignTargets(particles, W, H) {
  const n = particles.length;
  const cols = Math.ceil(Math.sqrt(n * (W / Math.max(H, 1))));
  const rows = Math.ceil(n / cols);
  const spacingX = Math.min(40, W / (cols + 4));
  const spacingY = Math.min(40, H / (rows + 4));
  const gridW = cols * spacingX;
  const gridH = rows * spacingY;
  const startX = (W - gridW) / 2 + spacingX / 2;
  const startY = (H - gridH) / 2 + spacingY / 2;

  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const offsetX = (row % 2) * (spacingX / 2);
    particles[i].tx = startX + col * spacingX + offsetX;
    particles[i].ty = startY + row * spacingY;
  }
}

function buildPalette(root) {
  const cs = root ? getComputedStyle(root) : null;
  const orangeStr =
    cs?.getPropertyValue('--particle-orange').trim() ||
    cs?.getPropertyValue('--color-orange').trim() ||
    '#ff6f47';
  const rgb = parseCssColorToRgb(orangeStr);
  const { r, g, b } = rgb;
  return {
    orangeRgb: rgb,
    bg: '#0d0d0d',
    o1: `rgba(${r}, ${g}, ${b}, 0.8)`,
    o2: `rgba(${r}, ${g}, ${b}, 0.4)`,
    w1: 'rgba(255, 255, 255, 0.5)',
    w2: 'rgba(255, 255, 255, 0.2)',
    error: `rgba(${r}, ${g}, ${b}, 0.95)`,
  };
}

export default function ParticleCanvas() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const isResolvedRef = useRef(false);
  const pulsesRef = useRef([]);
  const rafRef = useRef(0);
  const colorsRef = useRef(buildPalette(null));

  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });
  const [edgeLabels, setEdgeLabels] = useState([]);

  const readThemeColors = useCallback(() => {
    const root = wrapRef.current;
    colorsRef.current = buildPalette(root);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth || 800;
      H = wrap.clientHeight || 600;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readThemeColors();
      if (particlesRef.current.length) {
        assignTargets(particlesRef.current, W, H);
      }
    };

    resize();
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
      createParticle(i, W, H)
    );
    assignTargets(particlesRef.current, W, H);

    const resolveTimer = window.setTimeout(() => {
      isResolvedRef.current = true;
      for (const p of particlesRef.current) p.progress = 0;
    }, RESOLVE_DELAY_MS);

    const spawnPulse = () => {
      const parts = particlesRef.current;
      const edges = [];
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) edges.push([i, j]);
        }
      }
      if (!edges.length) return;
      const pick = edges[Math.floor(Math.random() * edges.length)];
      pulsesRef.current.push({ i: pick[0], j: pick[1], t: 0 });
    };

    const maybeSpawnPulse = () => {
      if (!isResolvedRef.current) return;
      const all = particlesRef.current;
      const settled = all.length && all.every((p) => p.progress > 0.85);
      if (!settled) return;
      if (pulsesRef.current.length < 8 && Math.random() < 0.04) spawnPulse();
    };

    const drawConnections = () => {
      const parts = particlesRef.current;
      const resolved = isResolvedRef.current;
      const { orangeRgb } = colorsRef.current;
      const { r, g, b } = orangeRgb;

      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x;
          const dy = parts[i].y - parts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= CONNECTION_DIST) continue;

          const alpha = 1 - dist / CONNECTION_DIST;
          if (resolved && parts[i].progress > 0.5) {
            const prog = Math.min(parts[i].progress, parts[j].progress);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * LINE_ALPHA_FACTOR * prog})`;
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.07})`;
          }
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(parts[j].x, parts[j].y);
          ctx.stroke();
        }
      }
    };

    const drawPulses = () => {
      const parts = particlesRef.current;
      const { r, g, b } = colorsRef.current.orangeRgb;
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.t += 0.008;
        const a = parts[pulse.i];
        const bnode = parts[pulse.j];
        if (!a || !bnode) return false;
        const x = a.x + (bnode.x - a.x) * pulse.t;
        const y = a.y + (bnode.y - a.y) * pulse.t;
        const rad = 2.2;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, rad * 2);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.95)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},0.35)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, rad * 2, 0, Math.PI * 2);
        ctx.fill();
        return pulse.t < 1;
      });
    };

    const updateParticles = () => {
      const parts = particlesRef.current;
      const resolved = isResolvedRef.current;

      for (const p of parts) {
        if (resolved) {
          p.progress = Math.min(1, p.progress + 0.025);
          const ease = p.progress * p.progress * (3 - 2 * p.progress);
          p.x += (p.tx - p.x) * 0.04 * (1 + ease);
          p.y += (p.ty - p.y) * 0.04 * (1 + ease);
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx * (1 - ease);
          p.y += p.vy * (1 - ease);
        } else {
          p.progress = Math.max(0, p.progress - 0.02);
          p.x += p.vx;
          p.y += p.vy;
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2) {
            p.vx = (p.vx / speed) * 2;
            p.vy = (p.vy / speed) * 2;
          }
          if (p.x < -20) p.x = W + 20;
          if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20;
          if (p.y > H + 20) p.y = -20;
        }
      }
    };

    const drawParticles = () => {
      const C = colorsRef.current;
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.isError ? C.error : C[p.colorKey] || C.w1;
        ctx.fill();
      }
    };

    const loop = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.3)';
      ctx.fillRect(0, 0, W, H);

      drawConnections();
      updateParticles();
      maybeSpawnPulse();
      drawPulses();
      drawParticles();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resolveTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [readThemeColors]);

  const onMouseMove = useCallback((e) => {
    if (!isResolvedRef.current) {
      setTooltip((t) => ({ ...t, visible: false }));
      setEdgeLabels([]);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const parts = particlesRef.current;
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const dx = mx - p.x;
      const dy = my - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      const hit = p.size + 6;
      if (d < hit && d < bestD) {
        bestD = d;
        best = i;
      }
    }

    if (best < 0) {
      setTooltip((t) => ({ ...t, visible: false }));
      setEdgeLabels([]);
      return;
    }

    const p = parts[best];
    setTooltip({
      visible: true,
      text: p.nodeType,
      x: e.clientX,
      y: e.clientY,
    });

    const labels = [];
    for (let j = 0; j < parts.length; j++) {
      if (j === best) continue;
      const q = parts[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST && p.progress > 0.5 && q.progress > 0.5) {
        labels.push({
          id: `${best}-${j}`,
          text: labelForPair(best, j),
          x: rect.left + (p.x + q.x) / 2,
          y: rect.top + (p.y + q.y) / 2,
        });
      }
    }
    setEdgeLabels(labels);
  }, []);

  const onMouseLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
    setEdgeLabels([]);
  }, []);

  return (
    <div ref={wrapRef} className="particle-canvas">
      <canvas
        ref={canvasRef}
        className="particle-canvas__canvas"
        aria-hidden
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          cursor: tooltip.visible ? 'pointer' : 'default',
        }}
      />
      <div
        className={`particle-canvas__tooltip${tooltip.visible ? ' is-visible' : ''}`}
        style={{ left: tooltip.x, top: tooltip.y }}
        role="tooltip"
      >
        {tooltip.text}
      </div>
      {edgeLabels.map((el) => (
        <div
          key={el.id}
          className="particle-canvas__label is-visible"
          style={{ left: el.x, top: el.y }}
        >
          {el.text}
        </div>
      ))}
    </div>
  );
}
