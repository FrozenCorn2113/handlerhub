import localFont from 'next/font/local'

export const fontSans = localFont({
  src: [
    { path: './Inter-Regular.ttf', weight: '400', style: 'normal' },
    { path: './Inter-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
})

export const fontSerif = localFont({
  src: [{ path: './CalSans-SemiBold.woff2', weight: '600', style: 'normal' }],
  variable: '--font-display',
})

// Aliases for backward compatibility with existing component classNames
export const fontUrban = fontSans
export const fontHeading = fontSerif
