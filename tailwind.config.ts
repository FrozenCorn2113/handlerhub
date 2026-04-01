const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './src/**/*.{jsx,tsx}',
    './content/**/*.{md,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',
        'fade-in': 'fade-in 0.4s',
        'fade-out': 'fade-out 0.4s',
        'fade-in-forwards': 'fade-in 0.5s linear forwards',

        marquee: 'marquee var(--marquee-duration) linear infinite',
        'marquee-left': 'marquee-left var(--duration, 40s) linear infinite',
        'marquee-up': 'marquee-up var(--duration, 40s) linear infinite',

        'spin-slow': 'spin 4s linear infinite',
        'spin-slower': 'spin 6s linear infinite',
        'spin-reverse': 'spin-reverse 1s linear infinite',
        'spin-reverse-slow': 'spin-reverse 4s linear infinite',
        'spin-reverse-slower': 'spin-reverse 6s linear infinite',

        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // HandlerHub brand colors
        'ring-cream': '#F8F4EE',
        'light-sand': '#F0EAE0',
        sand: '#E8E0D4',
        tan: '#D4CFC4',
        'ringside-black': '#1C1208',
        'warm-brown': '#4A3E2E',
        'warm-gray': '#7A6E5E',
        'paddock-green': '#1F6B4A',
        forest: '#14472F',
        sage: '#D4EFE0',
        'slate-blue': '#4A6F8A',
        'slate-blue-light': '#E8EFF5',
        'slate-blue-dark': '#3A5A72',
        'pale-peach': '#F5E0CC',
        'pastel-sky': '#C2E4F5',
        'pastel-ribbon': '#F5EFA0',
        'pastel-mint': '#B8EDD0',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', ...fontFamily.sans],
        display: ['var(--font-display)', ...fontFamily.sans],
        serif: ['var(--font-display)', ...fontFamily.sans],
        body: ['var(--font-body)', ...fontFamily.sans],
        urban: ['var(--font-body)', ...fontFamily.sans],
        heading: ['var(--font-display)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-up': {
          '0%': {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          '100%': {
            transform: 'translateY(-50%)',
          },
        },
        'marquee-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'spin-reverse': {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
