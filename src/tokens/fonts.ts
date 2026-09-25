/** Charis SIL for headings, Space Mono for body text: 400, 700 and italics. */
export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Charis+SIL:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'

/**
 * Add the theme's web fonts to the page once. <Screen> calls this unless `fonts={false}`
 * (pass false to self-host the fonts, or to avoid requests to Google Fonts).
 */
export function loadFonts(href: string = FONTS_HREF): void {
  if (typeof document === 'undefined' || document.querySelector(`link[href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}
