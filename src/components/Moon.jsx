import { MOON } from '../lib/sky.js'

// The moon exactly as lit on the night: a bright disc with the terminator
// drawn as a half-ellipse. Waxing, so the lit side faces the set sun.
export default function Moon({ className = '', lit = MOON.lit }) {
  const r = 50
  const rx = Math.abs(2 * lit - 1) * r
  const gibbous = lit > 0.5
  // Right half always lit (waxing); the terminator bulges left for gibbous.
  const d = `M50 0 A${r} ${r} 0 0 1 50 100 A${rx} ${r} 0 0 ${gibbous ? 1 : 0} 50 0Z`
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="moon-lit" cx="60%" cy="40%" r="65%">
          <stop offset="0" stopColor="#FFFDF4" />
          <stop offset="1" stopColor="#E9E1C8" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#1A2350" opacity=".55" />
      <path d={d} fill="url(#moon-lit)" />
      <g fill="#CFC6AA" opacity=".45">
        <circle cx="64" cy="34" r="7" />
        <circle cx="72" cy="60" r="5" />
        <circle cx="55" cy="70" r="9" />
        <circle cx="80" cy="44" r="3.5" />
        <circle cx="40" cy="38" r="4" />
      </g>
    </svg>
  )
}
