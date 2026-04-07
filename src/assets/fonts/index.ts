/**
 * Font configuration.
 *
 * Inter and Sen are loaded via the CSS @import in globals.css (Google Fonts
 * or self-hosted CDN) which runs at browser time and does not block the build.
 *
 * We export NextFont-compatible stub objects so the rest of the app can
 * continue using fontSans.variable / fontSerif.variable as className strings.
 * The corresponding CSS rules live in globals.css under .font-sans-var and
 * .font-display-var.
 */
import type { NextFont } from 'next/dist/compiled/@next/font'

export const fontSans: NextFont & { variable: string } = {
  className: 'font-sans-var',
  variable: 'font-sans-var',
  style: { fontFamily: 'Inter, system-ui, -apple-system, sans-serif' },
}

export const fontSerif: NextFont & { variable: string } = {
  className: 'font-display-var',
  variable: 'font-display-var',
  style: { fontFamily: 'Sen, Georgia, serif' },
}

// Aliases for backward compatibility with existing component classNames
export const fontUrban = fontSans
export const fontHeading = fontSerif
