import React from 'react';
import { samplePathPoints } from './svgPathUtils';
import { AutoLayoutProps } from './layout.props';
import { getPathBoundingBox } from './svgBoundingBox';

/**
 * Returns children positioned along a curved SVG path, with gap-based spacing.
 * Handles normalization and centering to fit the parent Frame.
 */
export function getCurvedLayoutChildren(
  children: React.ReactNode[],
  autoLayout: AutoLayoutProps
): React.ReactNode[] {
  if (typeof window !== 'undefined' && window.console && autoLayout?.path?.d) {
    console.log('[curvedLayout][debug] path:', autoLayout.path.d);
  }
  if (!autoLayout?.path?.d || !Array.isArray(children)) return children;
  let points: { x: number; y: number; angle: number }[] = [];
  const gap = autoLayout.gap ?? 0;
  // Support 'hug' for width/height: auto-size to fit curve bounding box
  let w: number;
  let h: number;
  if (autoLayout.width === 'hug' || autoLayout.height === 'hug') {
    // Compute bounding box of path
    try {
      const bbox = getPathBoundingBox(autoLayout.path.d);
      if (typeof window !== 'undefined' && window.console) {
        console.log('[curvedLayout][debug] bbox:', bbox);
      }
      // For semicircle, force aspect ratio: width = 2 * height
      if (Math.abs(bbox.width - 2 * bbox.height) < 2) {
        w = autoLayout.width === 'hug' ? bbox.width : (typeof autoLayout.width === 'number' ? autoLayout.width : 2 * bbox.height);
        h = autoLayout.height === 'hug' ? bbox.height : (typeof autoLayout.height === 'number' ? autoLayout.height : bbox.height);
      } else {
        w = autoLayout.width === 'hug' ? bbox.width : (typeof autoLayout.width === 'number' ? autoLayout.width : 200);
        h = autoLayout.height === 'hug' ? bbox.height : (typeof autoLayout.height === 'number' ? autoLayout.height : 200);
      }
      // ...existing code...
      if (typeof window !== 'undefined' && window.console) {
        points.forEach((pt, idx) => {
          console.log(`[curvedLayout][debug] tick${idx}:`, pt);
        });
      }
    } catch (e) {
  console.error('[curvedLayout] Error computing bounding box:', e);
      w = typeof autoLayout.width === 'number' ? autoLayout.width : 200;
      h = typeof autoLayout.height === 'number' ? autoLayout.height : 200;
    }
  } else {
    w = typeof autoLayout.width === 'number' ? autoLayout.width : 200;
    h = typeof autoLayout.height === 'number' ? autoLayout.height : 200;
  }
  {
    // Calculate path length
  const bboxPoints = samplePathPoints(autoLayout.path.d, 100);
    let pathLen = 0;
    for (let i = 1; i < bboxPoints.length; i++) {
      const dx = bboxPoints[i].x - bboxPoints[i - 1].x;
      const dy = bboxPoints[i].y - bboxPoints[i - 1].y;
      pathLen += Math.hypot(dx, dy);
    }
    // If gap is 'full', maximize spacing along the curve
    let effectiveGap: number = typeof gap === 'number' ? gap : 0;
    if (autoLayout.gap === 'full' && children.length > 1) {
      effectiveGap = pathLen / (children.length - 1);
    }
    // If gap is set and all children fit, use gap-based sampling
    if (effectiveGap > 0 && effectiveGap * (children.length - 1) <= pathLen) {
      points = samplePathPoints(autoLayout.path.d, children.length, effectiveGap);
    } else {
      // Otherwise, distribute all children evenly along the path
      points = samplePathPoints(autoLayout.path.d, children.length);
    }
    // Compute bounding box of points
    const w = typeof autoLayout.width === 'number' ? autoLayout.width : 400;
    const h = typeof autoLayout.height === 'number' ? autoLayout.height : 240;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    points.forEach(pt => {
      if (pt.x < minX) minX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y > maxY) maxY = pt.y;
    });
    const pathWidth = maxX - minX;
    const pathHeight = maxY - minY;
    // If the path is already sized for the Frame (within 5px tolerance), skip normalization/scaling
    const tolerance = 5;
    if (Math.abs(pathWidth - w) < tolerance && Math.abs(pathHeight - h) < tolerance && Math.abs(minX) < tolerance && Math.abs(minY) < tolerance) {
      // Path is already sized and positioned for the Frame, use as-is
      // (e.g., Gauge arc path)
    } else {
      // Normalize and center points to fit Frame
      const scale = Math.min(w / (pathWidth || 1), h / (pathHeight || 1));
      if (typeof window !== 'undefined' && window.console) {
        console.log('[curvedLayout][debug] scale:', scale, 'w:', w, 'h:', h, 'pathWidth:', pathWidth, 'pathHeight:', pathHeight);
      }
      const centerX = minX + pathWidth / 2;
      const centerY = minY + pathHeight / 2;
      const frameCenterX = w / 2;
      const frameCenterY = h / 2;
      // Flip Y axis so arc always faces upwards in Frame
      points = points.map(pt => ({
        x: (pt.x - centerX) * scale + frameCenterX,
        y: frameCenterY - ((pt.y - centerY) * scale),
        angle: pt.angle
      }));
    }
  }
  // Compute bounding box of all positioned children and the path (for 'hug')
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const childSizes: { width: number; height: number }[] = children.map(child => {
    if (React.isValidElement(child)) {
      const props = child.props?.autoLayout || {};
      return {
        width: typeof props.width === 'number' ? props.width : 32,
        height: typeof props.height === 'number' ? props.height : 32
      };
    }
    return { width: 32, height: 32 };
  });
  points.forEach((pt, i) => {
    const size = childSizes[i] || { width: 32, height: 32 };
    const left = pt.x - size.width / 2;
    const right = pt.x + size.width / 2;
    const top = pt.y - size.height / 2;
    const bottom = pt.y + size.height / 2;
    if (left < minX) minX = left;
    if (right > maxX) maxX = right;
    if (top < minY) minY = top;
    if (bottom > maxY) maxY = bottom;
  });
  // Log both path and union bounding boxes
  let pathBBox;
  try {
    pathBBox = getPathBoundingBox(autoLayout.path.d);
  } catch (e) {
    pathBBox = { minX: minX, minY: minY, maxX: maxX, maxY: maxY, width: maxX - minX, height: maxY - minY };
  }
  const unionBBox = { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
  if (typeof window !== 'undefined' && window.console) {
    console.log('[curvedLayout][debug] path bbox:', pathBBox);
    console.log('[curvedLayout][debug] union bbox:', unionBBox);
  }
  // If 'hug', set parent Frame size to union bounding box so parent wraps all content
  if (autoLayout.width === 'hug') {
    autoLayout.width = Math.ceil(unionBBox.width);
  }
  if (autoLayout.height === 'hug') {
    autoLayout.height = Math.ceil(unionBBox.height);
  }
  if (typeof window !== 'undefined' && window.console) {
    console.log('[curvedLayout][debug] final Frame size:', { width: autoLayout.width, height: autoLayout.height });
  }
  // Shift all child positions so minX/minY is at (0,0)
  const shiftX = minX;
  const shiftY = minY;
  // DEBUG: Log bounding box and shift values
  // ...removed old debug logs...
  // Only render as many children as points, shifted so top-left is (0,0)
  return points.map((pt, i) => {
    const child = children[i];
    if (!child) return undefined;
    const style = {
      position: 'absolute',
      left: pt.x - shiftX,
      top: pt.y - shiftY,
      transform: `rotate(${pt.angle}deg)`
    };
    return React.createElement('div', { style, key: i }, child);
  });
}
