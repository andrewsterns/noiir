/**
 * Size-related utilities and merging functions
 */

/**
 * Merges size properties into the provided props object with special handling for typography
 * @param mergedProps - The props object to merge size into
 * @returns The merged autoLayout from size
 */
export function mergeSizeProps(mergedProps: Record<string, any>): any {
  // Extract finalSize and sizeKey
  const finalSize = mergedProps.size;
  const sizeKey = mergedProps.sizeKey;

  // If size is a map and sizeKey is provided, select the specific size
  const effectiveSize = (typeof finalSize === 'object' && sizeKey && finalSize[sizeKey]) ? finalSize[sizeKey] : finalSize;

  // Merge size properties (excluding autoLayout) into mergedProps
  if (effectiveSize && typeof effectiveSize === 'object') {
    const sizeProps = { ...effectiveSize };
    delete sizeProps.autoLayout;

    // Special handling for typography - merge instead of replace
    if (sizeProps.typography && mergedProps.typography) {
      sizeProps.typography = { ...mergedProps.typography, ...sizeProps.typography };
    }

    Object.assign(mergedProps, sizeProps);
  }

  // Return the size's autoLayout for separate merging
  return effectiveSize?.autoLayout;
}
