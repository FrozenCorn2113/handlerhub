import { DM_Sans, Inter as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

// Aliases for backward compatibility with existing component classNames
export const fontUrban = fontSans
export const fontHeading = fontSerif
