// One-off extractor: parses the public-domain Wikimedia "Brain diagram
// without text" SVG (scripts/source/brain-diagram-wikimedia.svg), strips
// its original colors/labels, and buckets the paths into our region model
// (prefrontal / parietal+occipital / temporal / cerebellum) plus decorative
// gyri/sulci linework. Run with `node scripts/extract-brain-wiki.js` and
// paste the JSON output into components/brain/brain-wiki-paths.json.
// Not part of the app runtime.

const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "source/brain-diagram-wikimedia.svg"),
  "utf8"
);

const pathTagRe = /<path\b([^>]*?)\/>/g;
const attrRe = /([a-zA-Z-]+)="([^"]*)"/g;

function parseAttrs(attrStr) {
  const attrs = {};
  let m;
  while ((m = attrRe.exec(attrStr))) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

const paths = [];
let match;
while ((match = pathTagRe.exec(src))) {
  paths.push(parseAttrs(match[1]));
}

// Original fills, identified by inspecting the source file:
//   #b4d8ec (pale blue)   -> frontal lobe            -> prefrontal
//   #fcfb98 (pale yellow) -> parietal lobe            -> parietal+occipital
//   #f7a6b6 (pale pink)   -> occipital lobe           -> parietal+occipital
//   #b6cf9d (pale green)  -> temporal lobe            -> temporal
//   #9487f4 (pale purple) -> cerebellum               -> cerebellum
//   #8a686e (mauve, 60% opacity) -> small shading accent near the brainstem
const FILL_TO_BUCKET = {
  "#b4d8ec": "prefrontal",
  "#fcfb98": "parietalOccipital",
  "#f7a6b6": "parietalOccipital",
  "#b6cf9d": "temporal",
  "#9487f4": "cerebellum",
};

const buckets = {
  prefrontal: [],
  parietalOccipital: [],
  temporal: [],
  cerebellum: [],
};
const shadowAccents = []; // small decorative mauve shading
const blackAccents = []; // solid fil6 shadow shapes
const outline = []; // fill:none, stroke-width 4, the master silhouette
const detailLines = []; // fine gyri/sulci stroke-only linework

for (const attrs of paths) {
  const d = attrs.d;
  if (!d) continue;
  const fill = attrs.fill;
  const cls = attrs.class || "";

  if (fill && FILL_TO_BUCKET[fill]) {
    buckets[FILL_TO_BUCKET[fill]].push(d);
    continue;
  }
  if (fill === "#8a686e") {
    shadowAccents.push(d);
    continue;
  }
  if (cls.includes("fil6") || fill === "#000" || fill === "#000000") {
    // solid black shadow/fold accent shapes (no stroke, filled)
    if (!attrs.stroke) {
      blackAccents.push(d);
      continue;
    }
  }
  if (fill === "none" && attrs["stroke-width"] === "4") {
    outline.push(d);
    continue;
  }
  if (fill === "none" || cls.includes("fil5")) {
    detailLines.push(d);
    continue;
  }
}

const out = {
  viewBox: "0 0 1024 732",
  regions: buckets,
  shadowAccents,
  blackAccents,
  outline,
  detailLines,
};

console.log(JSON.stringify(out, null, 2));
