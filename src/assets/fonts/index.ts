import { Inter as FontSans, Fraunces } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const fontSerif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
})

// Aliases for backward compatibility with existing component classNames
export const fontUrban = fontSans
export const fontHeading = fontSerif
