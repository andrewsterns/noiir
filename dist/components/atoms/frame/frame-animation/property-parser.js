/**
 * Comprehensive property parser for Frame animation properties
 * Converts Frame property objects to CSS-animatable values
 */
export class FramePropertyParser {
    /**
     * Convert Frame properties to CSS styles (instance method)
     */
    parse(properties) {
        return FramePropertyParser.parseStatic(properties);
    }
    /**
     * Instance method wrappers for interface compliance
     */
    parsePosition(position) {
        return FramePropertyParser.parsePosition(position);
    }
    parseSize(size) {
        return FramePropertyParser.parseSize(size);
    }
    parseAppearance(appearance) {
        return FramePropertyParser.parseAppearance(appearance);
    }
    parseFill(fill) {
        return FramePropertyParser.parseFill(fill);
    }
    parseStroke(stroke) {
        return FramePropertyParser.parseStroke(stroke);
    }
    parseTypography(typography) {
        return FramePropertyParser.parseTypography(typography);
    }
    parseEffects(effects) {
        return FramePropertyParser.parseEffects(effects);
    }
    /**
     * Convert Frame properties to CSS styles (static method for backwards compatibility)
     */
    static parse(properties) {
        return this.parseStatic(properties);
    }
    /**
     * Internal static parsing method
     */
    static parseStatic(properties) {
        const cssStyles = {};
        // Process each property category
        if (properties.position) {
            Object.assign(cssStyles, this.parsePosition(properties.position));
        }
        if (properties.size) {
            Object.assign(cssStyles, this.parseSize(properties.size));
        }
        if (properties.appearance) {
            Object.assign(cssStyles, this.parseAppearance(properties.appearance));
        }
        if (properties.fill) {
            Object.assign(cssStyles, this.parseFill(properties.fill));
        }
        if (properties.stroke) {
            Object.assign(cssStyles, this.parseStroke(properties.stroke));
        }
        if (properties.typography) {
            Object.assign(cssStyles, this.parseTypography(properties.typography));
        }
        if (properties.effects) {
            Object.assign(cssStyles, this.parseEffects(properties.effects));
        }
        return cssStyles;
    }
    /**
     * Parse position properties
     */
    static parsePosition(position) {
        const styles = {};
        const transforms = [];
        if (position.x !== undefined) {
            transforms.push(`translateX(${this.parseUnit(position.x)})`);
        }
        if (position.y !== undefined) {
            transforms.push(`translateY(${this.parseUnit(position.y)})`);
        }
        if (position.z !== undefined) {
            transforms.push(`translateZ(${this.parseUnit(position.z)})`);
        }
        if (position.rotation !== undefined) {
            transforms.push(`rotate(${position.rotation}deg)`);
        }
        if (transforms.length > 0) {
            styles.transform = transforms.join(' ');
        }
        return styles;
    }
    /**
     * Parse size properties
     */
    static parseSize(size) {
        const styles = {};
        if (size.width !== undefined) {
            styles.width = this.parseUnit(size.width);
        }
        if (size.height !== undefined) {
            styles.height = this.parseUnit(size.height);
        }
        if (size.minWidth !== undefined) {
            styles.minWidth = this.parseUnit(size.minWidth);
        }
        if (size.maxWidth !== undefined) {
            styles.maxWidth = this.parseUnit(size.maxWidth);
        }
        if (size.minHeight !== undefined) {
            styles.minHeight = this.parseUnit(size.minHeight);
        }
        if (size.maxHeight !== undefined) {
            styles.maxHeight = this.parseUnit(size.maxHeight);
        }
        return styles;
    }
    /**
     * Parse appearance properties
     */
    static parseAppearance(appearance) {
        const styles = {};
        const transforms = [];
        if (appearance.radius !== undefined) {
            if (typeof appearance.radius === 'number') {
                styles.borderRadius = `${appearance.radius}px`;
            }
            else if (typeof appearance.radius === 'object') {
                // Handle individual corner radius
                const { topLeft, topRight, bottomRight, bottomLeft } = appearance.radius;
                styles.borderRadius = [
                    this.parseUnit(topLeft || 0),
                    this.parseUnit(topRight || 0),
                    this.parseUnit(bottomRight || 0),
                    this.parseUnit(bottomLeft || 0)
                ].join(' ');
            }
        }
        if (appearance.opacity !== undefined) {
            styles.opacity = appearance.opacity;
        }
        if (appearance.scale !== undefined) {
            transforms.push(`scale(${appearance.scale})`);
        }
        if (appearance.scaleX !== undefined) {
            transforms.push(`scaleX(${appearance.scaleX})`);
        }
        if (appearance.scaleY !== undefined) {
            transforms.push(`scaleY(${appearance.scaleY})`);
        }
        if (appearance.rotate !== undefined) {
            transforms.push(`rotate(${appearance.rotate}deg)`);
        }
        if (appearance.skewX !== undefined) {
            transforms.push(`skewX(${appearance.skewX}deg)`);
        }
        if (appearance.skewY !== undefined) {
            transforms.push(`skewY(${appearance.skewY}deg)`);
        }
        if (transforms.length > 0) {
            // Merge with existing transform if any
            const existingTransform = styles.transform || '';
            styles.transform = `${existingTransform} ${transforms.join(' ')}`.trim();
        }
        return styles;
    }
    /**
     * Parse fill properties
     */
    static parseFill(fill) {
        const styles = {};
        if (Array.isArray(fill)) {
            // Multiple fills - use the first solid fill for now
            const solidFill = fill.find(f => f.type === 'solid');
            if (solidFill) {
                return this.parseFill(solidFill);
            }
        }
        else if (fill.type === 'solid') {
            styles.backgroundColor = fill.color;
            if (fill.opacity !== undefined) {
                // Apply opacity to background color
                styles.backgroundColor = this.applyOpacityToColor(fill.color, fill.opacity);
            }
        }
        else if (fill.type === 'linear-gradient') {
            styles.background = this.createLinearGradient(fill);
        }
        else if (fill.type === 'radial-gradient') {
            styles.background = this.createRadialGradient(fill);
        }
        else if (fill.type === 'image') {
            styles.backgroundImage = `url(${fill.src})`;
            styles.backgroundSize = fill.fit || 'cover';
            styles.backgroundPosition = fill.position || 'center';
            styles.backgroundRepeat = fill.repeat || 'no-repeat';
        }
        return styles;
    }
    /**
     * Parse stroke properties
     */
    static parseStroke(stroke) {
        const styles = {};
        if (stroke.color && stroke.weight) {
            const borderStyle = stroke.style || 'solid';
            const borderWidth = `${stroke.weight}px`;
            const borderColor = stroke.color;
            if (stroke.sides) {
                if (typeof stroke.sides === 'string') {
                    if (stroke.sides === 'all') {
                        styles.border = `${borderWidth} ${borderStyle} ${borderColor}`;
                    }
                    else {
                        // Single side
                        styles[`border${stroke.sides.charAt(0).toUpperCase() + stroke.sides.slice(1)}`] =
                            `${borderWidth} ${borderStyle} ${borderColor}`;
                    }
                }
                else if (Array.isArray(stroke.sides)) {
                    // Multiple sides
                    stroke.sides.forEach((side) => {
                        styles[`border${side.charAt(0).toUpperCase() + side.slice(1)}`] =
                            `${borderWidth} ${borderStyle} ${borderColor}`;
                    });
                }
            }
            else {
                styles.border = `${borderWidth} ${borderStyle} ${borderColor}`;
            }
            if (stroke.opacity !== undefined) {
                styles.borderColor = this.applyOpacityToColor(borderColor, stroke.opacity);
            }
        }
        return styles;
    }
    /**
     * Parse typography properties
     */
    static parseTypography(typography) {
        const styles = {};
        if (typography.fontSize !== undefined) {
            styles.fontSize = this.parseUnit(typography.fontSize);
        }
        if (typography.fontWeight !== undefined) {
            styles.fontWeight = typography.fontWeight;
        }
        if (typography.fontFamily !== undefined) {
            styles.fontFamily = Array.isArray(typography.fontFamily)
                ? typography.fontFamily.join(', ')
                : typography.fontFamily;
        }
        if (typography.color !== undefined) {
            styles.color = typography.color;
        }
        if (typography.lineHeight !== undefined) {
            styles.lineHeight = typography.lineHeight;
        }
        if (typography.letterSpacing !== undefined) {
            styles.letterSpacing = this.parseUnit(typography.letterSpacing);
        }
        if (typography.textAlign !== undefined) {
            styles.textAlign = typography.textAlign;
        }
        if (typography.textDecoration !== undefined) {
            styles.textDecoration = typography.textDecoration;
        }
        if (typography.textTransform !== undefined) {
            styles.textTransform = typography.textTransform;
        }
        return styles;
    }
    /**
     * Parse effects properties (shadows, blurs, etc.)
     */
    static parseEffects(effects) {
        const styles = {};
        // Handle new FrameEffects object format
        if (effects && typeof effects === 'object' && !Array.isArray(effects)) {
            const frameEffects = effects;
            // Handle box shadows
            if (frameEffects.boxShadow && Array.isArray(frameEffects.boxShadow)) {
                const shadows = frameEffects.boxShadow.map(shadow => {
                    const inset = shadow.inset ? 'inset ' : '';
                    const spread = shadow.spread || 0;
                    return `${inset}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${spread}px ${shadow.color}`;
                });
                styles.boxShadow = shadows.join(', ');
            }
            // Handle filters
            if (frameEffects.filter) {
                const filters = [];
                const filter = frameEffects.filter;
                if (typeof filter.blur === 'number')
                    filters.push(`blur(${filter.blur}px)`);
                if (typeof filter.brightness === 'number')
                    filters.push(`brightness(${filter.brightness})`);
                if (typeof filter.contrast === 'number')
                    filters.push(`contrast(${filter.contrast})`);
                if (typeof filter.saturate === 'number')
                    filters.push(`saturate(${filter.saturate})`);
                if (typeof filter.hue === 'number')
                    filters.push(`hue-rotate(${filter.hue}deg)`);
                if (typeof filter.grayscale === 'number')
                    filters.push(`grayscale(${filter.grayscale})`);
                if (typeof filter.sepia === 'number')
                    filters.push(`sepia(${filter.sepia})`);
                if (filters.length > 0) {
                    styles.filter = filters.join(' ');
                }
            }
            // Handle backdrop filters
            if (frameEffects.backdropFilter) {
                const filters = [];
                const backdrop = frameEffects.backdropFilter;
                if (typeof backdrop.blur === 'number')
                    filters.push(`blur(${backdrop.blur}px)`);
                if (typeof backdrop.brightness === 'number')
                    filters.push(`brightness(${backdrop.brightness})`);
                if (typeof backdrop.contrast === 'number')
                    filters.push(`contrast(${backdrop.contrast})`);
                if (typeof backdrop.saturate === 'number')
                    filters.push(`saturate(${backdrop.saturate})`);
                if (filters.length > 0) {
                    styles.backdropFilter = filters.join(' ');
                }
            }
            return styles;
        }
        // Handle legacy array format
        const shadows = [];
        if (Array.isArray(effects)) {
            effects.forEach((effect) => {
                var _a, _b, _c, _d;
                if (effect.type === 'drop-shadow') {
                    const offsetX = ((_a = effect.offset) === null || _a === void 0 ? void 0 : _a.x) || 0;
                    const offsetY = ((_b = effect.offset) === null || _b === void 0 ? void 0 : _b.y) || 0;
                    const blur = effect.blur || 0;
                    const spread = effect.spread || 0;
                    const color = effect.color || 'rgba(0,0,0,0.1)';
                    shadows.push(`${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`);
                }
                else if (effect.type === 'inner-shadow') {
                    const offsetX = ((_c = effect.offset) === null || _c === void 0 ? void 0 : _c.x) || 0;
                    const offsetY = ((_d = effect.offset) === null || _d === void 0 ? void 0 : _d.y) || 0;
                    const blur = effect.blur || 0;
                    const spread = effect.spread || 0;
                    const color = effect.color || 'rgba(0,0,0,0.1)';
                    shadows.push(`inset ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`);
                }
            });
            if (shadows.length > 0) {
                styles.boxShadow = shadows.join(', ');
            }
        }
        return styles;
    }
    /**
     * Parse unit values (number to px, string as-is)
     */
    static parseUnit(value) {
        if (typeof value === 'number') {
            return `${value}px`;
        }
        return value;
    }
    /**
     * Apply opacity to color
     */
    static applyOpacityToColor(color, opacity) {
        // Simple implementation for hex colors
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        // For other color formats, return as-is for now
        return color;
    }
    /**
     * Create linear gradient CSS
     */
    static createLinearGradient(gradient) {
        const angle = gradient.angle || 0;
        const stops = gradient.stops.map((stop) => `${stop.color} ${Math.round(stop.position * 100)}%`).join(', ');
        return `linear-gradient(${angle}deg, ${stops})`;
    }
    /**
     * Create radial gradient CSS
     */
    static createRadialGradient(gradient) {
        var _a, _b;
        const centerX = (((_a = gradient.center) === null || _a === void 0 ? void 0 : _a.x) || 0.5) * 100;
        const centerY = (((_b = gradient.center) === null || _b === void 0 ? void 0 : _b.y) || 0.5) * 100;
        const radius = gradient.radius ? `${gradient.radius * 100}%` : 'farthest-corner';
        const stops = gradient.stops.map((stop) => `${stop.color} ${Math.round(stop.position * 100)}%`).join(', ');
        return `radial-gradient(circle ${radius} at ${centerX}% ${centerY}%, ${stops})`;
    }
}
