// Small drawn pieces shared by every section: the eight-point star, the gold
// rule with a star at its centre, the arch outline and the calligraphy.

export function Star({ className = '', filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <rect x="5.5" y="5.5" width="13" height="13" />
        <rect x="5.5" y="5.5" width="13" height="13" transform="rotate(45 12 12)" />
      </g>
      {!filled && <circle cx="12" cy="12" r="2" fill="currentColor" />}
    </svg>
  )
}

export function Rule({ className = '', dark = false }) {
  const line = dark ? 'from-transparent via-gold-light/60 to-transparent' : 'from-transparent via-gold/60 to-transparent'
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-16 bg-gradient-to-r sm:w-24 ${line}`} />
      <Star className={`h-4 w-4 ${dark ? 'text-gold-light' : 'text-gold'}`} />
      <span className={`h-px w-16 bg-gradient-to-r sm:w-24 ${line}`} />
    </div>
  )
}

// Ogee arch outline that stretches to its box; the stroke keeps its width.
const ARCH = 'M1 200V74C1 38 26 20 50 1C74 20 99 38 99 74V200'

export function ArchOutline({ className = '', inset = true }) {
  return (
    <svg viewBox="0 0 100 200" preserveAspectRatio="none" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <path d={ARCH} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      {inset && (
        <path
          d="M5 200V76C5 42 28 26 50 7C72 26 95 42 95 76V200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeOpacity=".55"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )
}

// clipPathUnits="objectBoundingBox" so any element can take the arch shape.
export function ArchDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="arch" clipPathUnits="objectBoundingBox">
          <path d="M0 1V0.37C0 0.19 0.26 0.1 0.5 0C0.74 0.1 1 0.19 1 0.37V1Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

// Original two-tone calligraphy, or recoloured through a mask.
export function Bismillah({ className = '', tone }) {
  if (!tone) {
    return <img src="/img/bismillah.svg" alt="Bismillah ir-Rahman ir-Raheem" className={className} draggable="false" />
  }
  return <span role="img" aria-label="Bismillah ir-Rahman ir-Raheem" className={`bismillah-mask ${className}`} style={{ background: tone }} />
}
