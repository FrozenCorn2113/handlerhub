import { Inter as FontSans, Sen } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = Sen({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

// Aliases for backward compatibility with existing component classNames
export const fontUrban = fontSans
export const fontHeading = fontSerif
