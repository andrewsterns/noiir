// Minimal SVG path sampling utility for Frame curved auto layout
// Supports M, L, Q, C, T commands (no arc or close)
// Returns array of {x, y, angle} for N points or for a given gap spaced along the path

export interface PathPoint {
  x: number;
  y: number;
  angle: number;
}

// Parse SVG path string into segments
function parsePath(d: string): Array<{ cmd: string; args: number[] }> {
  const regex = /([MLQCTAmlqcta])([^MLQCTAmlqcta]*)/g;
  const segments: Array<{ cmd: string; args: number[] }> = [];
  let match;
  while ((match = regex.exec(d))) {
    const cmd = match[1];
    const args = match[2].trim().split(/[ ,]+/).map(Number).filter((n) => !isNaN(n));
    segments.push({ cmd, args });
  }
  return segments;
}

// Sample points along the path (linear, quadratic, cubic)
// If gap is provided, returns as many points as fit with that gap
export function samplePathPoints(d: string, N: number, gap?: number): PathPoint[] {
  // DEBUG: Log parsed segments and curves for diagnostics
  if (typeof window !== 'undefined' && window.console) {
    console.log('[samplePathPoints] d:', d);
  }
  const segments = parsePath(d);
  if (typeof window !== 'undefined' && window.console) {
    console.log('[samplePathPoints] segments:', segments);
  }
  if (!segments.length) return [];
  // Only support absolute commands for now
  let points: PathPoint[] = [];
  let last = { x: 0, y: 0 };
  let prev = { x: 0, y: 0 };
  let t = 0;
  // Flatten path into a list of curves
  let curves: Array<{ type: string; pts: number[] }> = [];
  // DEBUG: Log curves after parsing
  setTimeout(() => {
    if (typeof window !== 'undefined' && window.console) {
      console.log('[samplePathPoints] curves:', curves);
    }
  }, 0);
  for (const seg of segments) {
    if (!seg || typeof seg.cmd !== 'string' || !Array.isArray(seg.args)) continue;
    switch (seg.cmd) {
      case 'M':
        last = { x: seg.args[0], y: seg.args[1] };
        prev = { ...last };
        break;
      case 'L':
        if (typeof prev.x === 'number' && typeof prev.y === 'number' && typeof seg.args[0] === 'number' && typeof seg.args[1] === 'number') {
          curves.push({ type: 'L', pts: [prev.x, prev.y, seg.args[0], seg.args[1]] });
          prev = { x: seg.args[0], y: seg.args[1] };
        }
        break;
      case 'Q':
        if (
          typeof prev.x === 'number' && typeof prev.y === 'number' &&
          typeof seg.args[0] === 'number' && typeof seg.args[1] === 'number' &&
          typeof seg.args[2] === 'number' && typeof seg.args[3] === 'number'
        ) {
          curves.push({ type: 'Q', pts: [prev.x, prev.y, seg.args[0], seg.args[1], seg.args[2], seg.args[3]] });
          prev = { x: seg.args[2], y: seg.args[3] };
        }
        break;
      case 'C':
        if (
          typeof prev.x === 'number' && typeof prev.y === 'number' &&
          typeof seg.args[0] === 'number' && typeof seg.args[1] === 'number' &&
          typeof seg.args[2] === 'number' && typeof seg.args[3] === 'number' &&
          typeof seg.args[4] === 'number' && typeof seg.args[5] === 'number'
        ) {
          curves.push({ type: 'C', pts: [prev.x, prev.y, seg.args[0], seg.args[1], seg.args[2], seg.args[3], seg.args[4], seg.args[5]] });
          prev = { x: seg.args[4], y: seg.args[5] };
        }
        break;
      case 'A':
        // Arc: [rx, ry, xAxisRot, largeArcFlag, sweepFlag, x, y]
        if (
          typeof prev.x === 'number' && typeof prev.y === 'number' &&
          seg.args.length === 7 &&
          typeof seg.args[0] === 'number' && typeof seg.args[1] === 'number' &&
          typeof seg.args[2] === 'number' && typeof seg.args[3] === 'number' &&
          typeof seg.args[4] === 'number' && typeof seg.args[5] === 'number' && typeof seg.args[6] === 'number'
        ) {
          // Approximate arc as many small lines (sufficient for tick layout)
          const [rx, ry, xAxisRot, largeArcFlag, sweepFlag, x1, y1] = seg.args;
          const x0 = prev.x, y0 = prev.y;
          // Only support rx == ry (circle/ellipse), xAxisRot == 0 for now
          if (rx === ry && xAxisRot === 0) {
            // Special case: if the arc is a semicircle (as in the Gauge), always go from x0,y0 to x1,y1 counterclockwise
            // regardless of sweepFlag/largeArcFlag, to ensure left-to-right semicircle for the Gauge
            const r = rx;
            // Center is midway between x0,y0 and x1,y1 (for semicircle)
            const cx = (x0 + x1) / 2;
            const cy = (y0 + y1) / 2;
            // Start/end angles
            let startAngle = Math.atan2(y0 - cy, x0 - cx);
            let endAngle = Math.atan2(y1 - cy, x1 - cx);
            // For a semicircle, ensure we always sweep pi radians (180deg) left-to-right
            // If the angle difference is negative, add 2pi
            let sweep = endAngle - startAngle;
            if (sweep < 0) sweep += 2 * Math.PI;
            // Clamp to exactly pi for semicircle
            sweep = Math.PI;
            // Always sweep from left to right (upwards)
            if (x0 < x1) {
              startAngle = Math.PI;
              endAngle = 0;
            } else {
              startAngle = 0;
              endAngle = Math.PI;
            }
            // Subdivide arc into N segments
            const steps = Math.max(N, 8);
            let prevPt = { x: x0, y: y0 };
            for (let i = 1; i <= steps; i++) {
              const t = i / steps;
              const angle = startAngle + t * (endAngle - startAngle);
              const px = cx + r * Math.cos(angle);
              const py = cy + r * Math.sin(angle);
              curves.push({ type: 'L', pts: [prevPt.x, prevPt.y, px, py] });
              prevPt = { x: px, y: py };
            }
            prev = { x: x1, y: y1 };
          }
        }
        break;
      case 'T':
        // Treat T as L for simplicity
        if (typeof prev.x === 'number' && typeof prev.y === 'number' && typeof seg.args[0] === 'number' && typeof seg.args[1] === 'number') {
          curves.push({ type: 'L', pts: [prev.x, prev.y, seg.args[0], seg.args[1]] });
          prev = { x: seg.args[0], y: seg.args[1] };
        }
        break;
    }
  }
  // Sample points along each curve
  let totalLen = 0;
  let curveLens: number[] = [];
  for (const curve of curves) {
    if (!curve || typeof curve.type !== 'string' || !Array.isArray(curve.pts)) {
      curveLens.push(0);
      continue;
    }
    let len = 0;
    if (curve.type === 'L') {
      const [x0, y0, x1, y1] = curve.pts;
      len = Math.hypot(x1 - x0, y1 - y0);
    } else if (curve.type === 'Q') {
      // Approximate quadratic length
      const [x0, y0, cx, cy, x1, y1] = curve.pts;
      len = Math.hypot(cx - x0, cy - y0) + Math.hypot(x1 - cx, y1 - cy);
    } else if (curve.type === 'C') {
      // Approximate cubic length
      const [x0, y0, c1x, c1y, c2x, c2y, x1, y1] = curve.pts;
      len = Math.hypot(c1x - x0, c1y - y0) + Math.hypot(c2x - c1x, c2y - c1y) + Math.hypot(x1 - c2x, y1 - c2y);
    }
    curveLens.push(len);
    totalLen += len;
  }
  let dists: number[];
  if (gap && gap > 0) {
    const count = Math.max(1, Math.floor(totalLen / gap) + 1);
    dists = Array.from({ length: count }, (_, i) => i * gap);
  } else {
    // Distribute N points at t = i/(N-1) for i in [0, N-1]
    dists = Array.from({ length: N }, (_, i) => (N === 1 ? 0 : (i * totalLen) / (N - 1)));
  }
  let curveIdx = 0, curvePos = 0, curveStart = 0;
  for (let i = 0; i < dists.length; i++) {
    let dist = dists[i];
    while (curveIdx < curves.length && dist > curveStart + curveLens[curveIdx]) {
      curveStart += curveLens[curveIdx];
      curveIdx++;
    }
    if (curveIdx >= curves.length) curveIdx = curves.length - 1;
    const curve = curves[curveIdx];
    // Defensive: skip if curve is undefined or malformed
    if (!curve || typeof curve.type !== 'string' || !Array.isArray(curve.pts)) {
      continue;
    }
    const localT = curveLens[curveIdx] ? (dist - curveStart) / curveLens[curveIdx] : 0;
    let x = 0, y = 0, angle = 0;
    if (curve.type === 'L') {
      const [x0, y0, x1, y1] = curve.pts;
      x = x0 + (x1 - x0) * localT;
      y = y0 + (y1 - y0) * localT;
      angle = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
    } else if (curve.type === 'Q') {
      const [x0, y0, cx, cy, x1, y1] = curve.pts;
      // Quadratic Bezier
      const t = localT;
      x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
      y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1;
      // Tangent angle
      const dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx);
      const dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy);
      angle = Math.atan2(dy, dx) * 180 / Math.PI;
    } else if (curve.type === 'C') {
      const [x0, y0, c1x, c1y, c2x, c2y, x1, y1] = curve.pts;
      // Cubic Bezier
      const t = localT;
      x = Math.pow(1 - t, 3) * x0 + 3 * Math.pow(1 - t, 2) * t * c1x + 3 * (1 - t) * t * t * c2x + Math.pow(t, 3) * x1;
      y = Math.pow(1 - t, 3) * y0 + 3 * Math.pow(1 - t, 2) * t * c1y + 3 * (1 - t) * t * t * c2y + Math.pow(t, 3) * y1;
      // Tangent angle
      const dx = 3 * Math.pow(1 - t, 2) * (c1x - x0) + 6 * (1 - t) * t * (c2x - c1x) + 3 * t * t * (x1 - c2x);
      const dy = 3 * Math.pow(1 - t, 2) * (c1y - y0) + 6 * (1 - t) * t * (c2y - c1y) + 3 * t * t * (y1 - c2y);
      angle = Math.atan2(dy, dx) * 180 / Math.PI;
    }
    points.push({ x, y, angle });
  }
  return points;
}

// DEBUG: Log sampled points for visual debugging
if (typeof window !== 'undefined' && window.console) {
  (window as any).DEBUG_samplePathPoints = samplePathPoints;
}
