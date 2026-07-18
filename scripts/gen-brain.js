// One-off generator: produces smooth, bumpy "gyri-like" SVG path data for the
// anatomical brain illustration. Run with `node scripts/gen-brain.js` and paste
// the output into components/brain/brainPaths.ts. Not part of the app runtime.

function catmullRom2bezier(points, closed) {
  const p = points;
  const n = p.length;
  let d = `M ${p[0][0].toFixed(2)} ${p[0][1].toFixed(2)} `;
  const get = (i) => {
    if (closed) return p[((i % n) + n) % n];
    return p[Math.max(0, Math.min(n - 1, i))];
  };
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  if (closed) d += "Z";
  return d.trim();
}

// Generates a bumpy closed blob (gyri-like) around an ellipse, optionally
// warped per-angle by an array of {from,to,factor} angular pinches so blobs
// can be shaped (tapered poles, flattened joins) rather than pure ellipses.
function blob(cx, cy, rx, ry, opts = {}) {
  const {
    points = 64,
    bumps = [
      { freq: 5, amp: 0.045, phase: 0.4 },
      { freq: 9, amp: 0.025, phase: 1.7 },
      { freq: 17, amp: 0.012, phase: 3.1 },
    ],
    warp = () => 1,
    rotate = 0,
  } = opts;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 2;
    let r = 1;
    for (const b of bumps) r += b.amp * Math.sin(t * b.freq + b.phase);
    r *= warp(t);
    const x = cx + Math.cos(t + rotate) * rx * r;
    const y = cy + Math.sin(t + rotate) * ry * r;
    pts.push([x, y]);
  }
  return catmullRom2bezier(pts, true);
}

// A short open wavy stroke (sulcus line) between two points, bowed via a
// perpendicular offset, for texture inside each lobe.
function sulcus(x1, y1, x2, y2, bow, waves = 2, waveAmp = 3) {
  const steps = 10;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len;
  const ny = dx / len;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const bx = x1 + dx * t + nx * bow * Math.sin(Math.PI * t);
    const by = y1 + dy * t + ny * bow * Math.sin(Math.PI * t);
    const wob = Math.sin(t * Math.PI * waves) * waveAmp;
    pts.push([bx + nx * wob * 0.3, by + ny * wob * 0.3]);
  }
  return catmullRom2bezier(pts, false);
}

const out = {};

// ---- Cerebrum lobes (viewBox 520x400, anterior/frontal faces right) ----

// Parietal + occipital lobes — top/back of the brain, occipital pole tapers
// to a point at far left (~x60), joins frontal around x~330 and dips down to
// meet the temporal lobe near x~300,y~175
out.parietalOccipital = blob(195, 108, 140, 70, {
  points: 72,
  bumps: [
    { freq: 5, amp: 0.04, phase: 1.1 },
    { freq: 9, amp: 0.022, phase: 0.3 },
    { freq: 15, amp: 0.011, phase: 2.4 },
  ],
  warp: (t) => 1 + Math.max(0, -Math.cos(t) - 0.5) * 0.35,
});

// Prefrontal / frontal lobe — sits front-right, frontal pole tapers to a
// point at far right (~x495)
out.prefrontal = blob(390, 128, 96, 68, {
  points: 72,
  bumps: [
    { freq: 4, amp: 0.045, phase: 0.2 },
    { freq: 8, amp: 0.026, phase: 2.1 },
    { freq: 13, amp: 0.013, phase: 0.9 },
  ],
  warp: (t) => 1 + Math.max(0, Math.cos(t) - 0.5) * 0.3,
});

// Temporal lobe — hangs below the frontal/parietal junction, temporal pole
// points forward (right) toward the frontal pole, tucked just under it
out.temporal = blob(345, 233, 98, 46, {
  points: 64,
  bumps: [
    { freq: 4, amp: 0.045, phase: 0.6 },
    { freq: 7, amp: 0.026, phase: 2.8 },
  ],
  warp: (t) => 1 + Math.max(0, Math.cos(t + 0.3) - 0.6) * 0.25,
  rotate: 0.08,
});

// Cerebellum — tucked under the occipital pole, tighter "foliation" bumps
out.cerebellum = blob(155, 205, 76, 46, {
  points: 72,
  bumps: [
    { freq: 10, amp: 0.045, phase: 0.5 },
    { freq: 16, amp: 0.03, phase: 2.2 },
    { freq: 24, amp: 0.016, phase: 1.0 },
  ],
});

// Brainstem — small tapered stalk in the notch between cerebellum and
// temporal lobe, descending from the underside of the cerebrum
out.brainstem = catmullRom2bezier(
  [
    [232, 182],
    [258, 192],
    [266, 220],
    [260, 250],
    [246, 264],
    [230, 258],
    [220, 228],
    [220, 200],
  ],
  true
);

// ---- Sulci texture lines per region (open strokes, clipped to region) ----

out.sulciPrefrontal = [
  sulcus(325, 95, 460, 92, -9, 2, 4),
  sulcus(315, 122, 468, 118, 8, 3, 3),
  sulcus(312, 152, 472, 150, -8, 2, 4),
  sulcus(318, 180, 462, 182, 9, 3, 3),
  sulcus(335, 205, 440, 208, -6, 2, 3),
];

out.sulciParietalOccipital = [
  sulcus(90, 68, 305, 62, -8, 3, 3),
  sulcus(75, 92, 315, 88, 10, 4, 3),
  sulcus(78, 116, 310, 120, -9, 3, 3),
  sulcus(95, 140, 285, 144, 8, 3, 3),
  sulcus(120, 55, 200, 155, 6, 2, 3),
];

out.sulciTemporal = [
  sulcus(262, 211, 428, 217, -6, 3, 3),
  sulcus(266, 233, 433, 237, 7, 3, 3),
  sulcus(270, 254, 418, 259, -6, 2, 3),
];

out.sulciCerebellum = [
  sulcus(97, 180, 213, 180, -6, 5, 2.5),
  sulcus(92, 196, 218, 196, 6, 5, 2.5),
  sulcus(92, 212, 219, 212, -6, 5, 2.5),
  sulcus(97, 228, 213, 228, 6, 5, 2.5),
  sulcus(105, 242, 203, 242, -5, 4, 2.5),
];

console.log(JSON.stringify(out, null, 2));
