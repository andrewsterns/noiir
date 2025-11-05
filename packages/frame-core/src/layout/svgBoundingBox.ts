import { samplePathPoints } from './svgPathUtils';

export function getPathBoundingBox(d: string): { width: number; height: number; minX: number; minY: number; maxX: number; maxY: number } {
  const points = samplePathPoints(d, 100);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  points.forEach(pt => {
    if (pt.x < minX) minX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y > maxY) maxY = pt.y;
  });
  if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
    console.error('[svgBoundingBox] Invalid bounding box for path:', d, { minX, minY, maxX, maxY });
    // Fallback for arc paths: try to parse and estimate from arc params
    const arcMatch = d.match(/A\s*([\d.]+)[, ]([\d.]+)[^A]*([\d.]+)[^A]*([01])[ ,]*([01])[ ,]*([\d.]+)[, ]([\d.]+)/);
    if (!arcMatch) {
      // Try a more permissive regex for arc paths
      const arcMatchLoose = d.match(/A\s*([\d.]+)[, ]([\d.]+)[^A]*([\d.]+)[^A]*([\d.]+)[^A]*([\d.]+)[^A]*([\d.]+)[, ]([\d.]+)/);
      if (arcMatchLoose) {
        const rx = parseFloat(arcMatchLoose[1]);
        const ry = parseFloat(arcMatchLoose[2]);
        const mMatch = d.match(/M\s*([\d.]+)[, ]([\d.]+)/);
        const x0 = mMatch ? parseFloat(mMatch[1]) : 0;
        const y0 = mMatch ? parseFloat(mMatch[2]) : 0;
        const x1 = parseFloat(arcMatchLoose[6]);
        const y1 = parseFloat(arcMatchLoose[7]);
        minX = Math.min(x0, x1) - rx;
        maxX = Math.max(x0, x1) + rx;
        minY = Math.min(y0, y1) - ry;
        maxY = Math.max(y0, y1) + ry;
  // ...removed old debug logs...
        return {
          width: maxX - minX,
          height: maxY - minY,
          minX,
          minY,
          maxX,
          maxY
        };
      }
    }
    if (arcMatch) {
      const rx = parseFloat(arcMatch[1]);
      const ry = parseFloat(arcMatch[2]);
      const mMatch = d.match(/M\s*([\d.]+)[, ]([\d.]+)/);
      const x0 = mMatch ? parseFloat(mMatch[1]) : 0;
      const y0 = mMatch ? parseFloat(mMatch[2]) : 0;
      const x1 = parseFloat(arcMatch[6]);
      const y1 = parseFloat(arcMatch[7]);
      minX = Math.min(x0, x1) - rx;
      maxX = Math.max(x0, x1) + rx;
      minY = Math.min(y0, y1) - ry;
      maxY = Math.max(y0, y1) + ry;
  // ...removed old debug logs...
      return {
        width: maxX - minX,
        height: maxY - minY,
        minX,
        minY,
        maxX,
        maxY
      };
    }
    // Final fallback
    return { width: 200, height: 100, minX: 0, minY: 0, maxX: 200, maxY: 100 };
  }
  return {
    width: maxX - minX,
    height: maxY - minY,
    minX,
    minY,
    maxX,
    maxY
  };
}