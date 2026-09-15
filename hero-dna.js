(function () {
  const canvas = document.getElementById("heroDna");
  if (!canvas) return;

  const hero = canvas.closest(".hero");
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HIT_DIST = 12;
  const NICK_GAP = 9;
  const ANNEAL_MS = 750;

  let width = 0;
  let height = 0;
  let helices = [];
  let nodes = [];
  let edges = [];
  let running = false;
  let resizeTimer = null;
  let startTime = performance.now();

  const activeDrags = new Map();
  const annealing = new Map();

  function edgeKey(i, j) {
    return i < j ? i + "-" + j : j + "-" + i;
  }

  function makeColor() {
    const accent = Math.random();
    return accent > 0.93 ? "255, 107, 92" : accent > 0.84 ? "31, 182, 164" : "255, 255, 255";
  }

  function seedHelices() {
    const area = width * height;
    const count = Math.max(6, Math.min(22, Math.round(area / 26000)));

    // Stratified placement: split the canvas into a grid with roughly one
    // helix per cell (jittered within the cell) so segments spread across
    // the whole hero instead of clumping/leaving gaps under pure randomness.
    const cols = Math.max(1, Math.round(Math.sqrt((count * width) / height)));
    const rows = Math.max(1, Math.ceil(count / cols));
    const cellW = width / cols;
    const cellH = height / rows;
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ r: r, c: c });
      }
    }
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = cells[i];
      cells[i] = cells[j];
      cells[j] = tmp;
    }

    helices = new Array(count).fill(null).map((_, idx) => {
      const cell = cells[idx % cells.length];
      const sizeFactor = 0.55 + Math.random() * 1.25;
      const steps = Math.max(5, Math.min(16, Math.round(6 + Math.random() * 9)));
      const stepSpacing = (20 + Math.random() * 18) * sizeFactor;
      const amplitude = (8 + Math.random() * 15) * sizeFactor;
      const angle = Math.random() * Math.PI * 2;
      const cx = (cell.c + 0.5 + (Math.random() - 0.5) * 0.8) * cellW;
      const cy = (cell.r + 0.5 + (Math.random() - 0.5) * 0.8) * cellH;
      return {
        cx: cx,
        cy: cy,
        angle: angle,
        cosA: Math.cos(angle),
        sinA: Math.sin(angle),
        steps: steps,
        stepSpacing: stepSpacing,
        amplitude: amplitude,
        wavelength: 2.3 + Math.random() * 2.4,
        phase: Math.random() * Math.PI * 2,
        twistSpeed: 0.4 + Math.random() * 0.5,
        direction: Math.random() < 0.5 ? 1 : -1,
        baseR: 1.2 + sizeFactor * 0.55
      };
    });

    nodes = [];
    edges = [];

    helices.forEach((hx, h) => {
      const startIdx = nodes.length;
      const totalLen = (hx.steps - 1) * hx.stepSpacing;
      for (let s = 0; s < hx.steps; s++) {
        const along = s * hx.stepSpacing - totalLen / 2 + (Math.random() - 0.5) * hx.stepSpacing * 0.3;
        const jitterA = (Math.random() - 0.5) * hx.amplitude * 0.45;
        const jitterB = (Math.random() - 0.5) * hx.amplitude * 0.45;
        nodes.push({ helix: h, along: along, jitter: jitterA, x: 0, y: 0, r: hx.baseR, alpha: 0.6, color: makeColor() });
        nodes.push({ helix: h, along: along, jitter: jitterB, x: 0, y: 0, r: hx.baseR, alpha: 0.6, color: makeColor() });
      }
      for (let s = 0; s < hx.steps; s++) {
        const a = startIdx + s * 2;
        const b = startIdx + s * 2 + 1;
        edges.push([a, b]);
        if (s < hx.steps - 1) {
          edges.push([a, a + 2]);
          edges.push([b, b + 2]);
        }
      }
    });

    activeDrags.clear();
    annealing.clear();
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedHelices();
  }

  function step(t) {
    for (let idx = 0; idx < nodes.length; idx++) {
      const n = nodes[idx];
      const hx = helices[n.helix];
      const strandSign = idx % 2 === 0 ? 1 : -1;
      const phase = (n.along / (hx.stepSpacing * hx.wavelength)) * Math.PI * 2 * hx.direction + hx.phase + t * hx.twistSpeed;
      const sinP = Math.sin(phase);
      const cosP = Math.cos(phase) * strandSign;
      const across = strandSign * hx.amplitude * sinP + n.jitter;
      const localX = n.along;
      const localY = across;
      n.x = hx.cx + localX * hx.cosA - localY * hx.sinA;
      n.y = hx.cy + localX * hx.sinA + localY * hx.cosA;
      n.r = Math.max(0.9, hx.baseR + cosP * 0.7);
      n.alpha = 0.5 + cosP * 0.25;
    }
  }

  function pointOnSegment(ax, ay, bx, by, t) {
    return { x: ax + (bx - ax) * t, y: ay + (by - ay) * t };
  }

  function drawEdge(key, ax, ay, bx, by, alpha) {
    const drag = activeDrags.get(key);
    const heal = annealing.get(key);

    ctx.lineWidth = 1;

    if (drag) {
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      ctx.strokeStyle = "rgba(255, 255, 255, " + Math.min(alpha + 0.25, 0.75) + ")";
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(drag.x - ux * NICK_GAP, drag.y - uy * NICK_GAP);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(drag.x + ux * NICK_GAP, drag.y + uy * NICK_GAP);
      ctx.lineTo(bx, by);
      ctx.stroke();
      return;
    }

    if (heal) {
      const t = Math.min((performance.now() - heal.start) / ANNEAL_MS, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const target = pointOnSegment(ax, ay, bx, by, heal.grabT);
      const cx = heal.from.x + (target.x - heal.from.x) * ease;
      const cy = heal.from.y + (target.y - heal.from.y) * ease;
      const gap = NICK_GAP * (1 - ease);
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      ctx.strokeStyle = "rgba(255, 255, 255, " + Math.min(alpha + 0.25, 0.75) + ")";
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(cx - ux * gap, cy - uy * gap);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + ux * gap, cy + uy * gap);
      ctx.lineTo(bx, by);
      ctx.stroke();
      if (t >= 1) annealing.delete(key);
      return;
    }

    ctx.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let e = 0; e < edges.length; e++) {
      const i = edges[e][0];
      const j = edges[e][1];
      const a = nodes[i];
      const b = nodes[j];
      const key = edgeKey(i, j);
      const depth = (a.alpha + b.alpha) / 2;
      const alpha = Math.max(0.16, Math.min(0.62, depth * 0.58));
      drawEdge(key, a.x, a.y, b.x, b.y, alpha);
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + n.color + ", " + Math.max(0.28, Math.min(0.92, n.alpha)) + ")";
      ctx.arc(n.x, n.y, Math.max(1, n.r), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    const t = (performance.now() - startTime) / 1000;
    step(t);
    render();
    requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    running = true;
    canvas.style.pointerEvents = "auto";
    if (prefersReducedMotion) {
      step(0);
      render();
    } else {
      requestAnimationFrame(loop);
    }
  }

  function pointerPos(evt) {
    const rect = canvas.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  }

  function findNearestEdge(pos) {
    let best = null;
    let bestDist = HIT_DIST;
    for (let e = 0; e < edges.length; e++) {
      const i = edges[e][0];
      const j = edges[e][1];
      const key = edgeKey(i, j);
      if (activeDrags.has(key)) continue;
      const a = nodes[i];
      const b = nodes[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const lenSq = dx * dx + dy * dy;
      let t = lenSq === 0 ? 0 : ((pos.x - a.x) * dx + (pos.y - a.y) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const px = a.x + dx * t;
      const py = a.y + dy * t;
      const d = Math.hypot(pos.x - px, pos.y - py);
      if (d < bestDist) {
        bestDist = d;
        best = { key: key, t: t };
      }
    }
    return best;
  }

  function onPointerDown(evt) {
    const pos = pointerPos(evt);
    const edge = findNearestEdge(pos);
    if (!edge) return;
    annealing.delete(edge.key);
    activeDrags.set(edge.key, { pointerId: evt.pointerId, grabT: edge.t, x: pos.x, y: pos.y });
    canvas.setPointerCapture(evt.pointerId);
  }

  function onPointerMove(evt) {
    for (const drag of activeDrags.values()) {
      if (drag.pointerId !== evt.pointerId) continue;
      const pos = pointerPos(evt);
      drag.x = pos.x;
      drag.y = pos.y;
    }
  }

  function releaseDrag(evt) {
    for (const [key, drag] of activeDrags) {
      if (drag.pointerId !== evt.pointerId) continue;
      activeDrags.delete(key);
      annealing.set(key, { start: performance.now(), from: { x: drag.x, y: drag.y }, grabT: drag.grabT });
    }
  }

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", releaseDrag);
  canvas.addEventListener("pointercancel", releaseDrag);

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();

  if (prefersReducedMotion) {
    canvas.style.opacity = "1";
    start();
  } else {
    canvas.addEventListener("animationstart", start, { once: true });
  }
})();
