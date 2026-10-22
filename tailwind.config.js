/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Taken from the printed card: the Bismillah blue, its lighter shadow,
        // the watercolour wash, the blush peonies and the gold leaf.
        ink: { DEFAULT: '#1B2A55', soft: '#3A4A75', mute: '#6B7697' },
        lapis: { DEFAULT: '#1B3279', deep: '#111D47', night: '#0C1533' },
        sky: '#668FD9',
        mist: '#DCE6F2',
        paper: { DEFAULT: '#F8F4EC', warm: '#F1E8D8' },
        blush: { DEFAULT: '#E9C6C3', deep: '#C98E8B' },
        gold: { DEFAULT: '#B08A4F', light: '#D9BF8C', pale: '#EEDFC0' }
      },
      fontFamily: {
        // Latin first; Devanagari and Nastaliq faces pick up Hindi and Urdu
        // glyphs by fallback, so one class works in every language.
        display: ['"Cormorant Garamond"', '"Tiro Devanagari Hindi"', '"Noto Nastaliq Urdu"', 'Georgia', 'serif'],
        script: ['"Pinyon Script"', '"Cormorant Garamond"', 'cursive'],
        arabic: ['Amiri', '"Traditional Arabic"', 'serif'],
        sans: ['Jost', 'Hind', '"Noto Nastaliq Urdu"', 'system-ui', 'sans-serif']
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        breathe: 'breathe 3.2s ease-in-out infinite',
        cue: 'cue 2.2s ease-in-out infinite'
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        breathe: { '0%,100%': { boxShadow: '0 0 0 0 rgb(217 191 140 / .45)' }, '50%': { boxShadow: '0 0 0 18px rgb(217 191 140 / 0)' } },
        cue: { '0%': { transform: 'translateY(-100%)' }, '60%,100%': { transform: 'translateY(220%)' } }
      }
    }
  },
  plugins: []
}
