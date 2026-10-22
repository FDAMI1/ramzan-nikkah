import { motion, useScroll, useTransform } from 'framer-motion'

// The watercolour corner spray from the printed card. `corner` picks which
// corner it grows from; the art itself grows from the top-left and is cropped
// hard on those two edges, so the flip must stay on the wrapper: the floaty
// keyframes own the <img>'s transform and would cancel it there.
const flips = {
  tl: {},
  tr: { scaleX: -1 },
  bl: { scaleY: -1 },
  br: { rotate: 180 }
}

export default function Floral({ corner = 'tl', className = '', drift = 60, sway = true }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, corner.startsWith('t') ? -drift : drift])

  return (
    <motion.div style={{ y, ...flips[corner] }} className={`pointer-events-none absolute select-none ${className}`} aria-hidden="true">
      <img src="/img/floral.webp" alt="" draggable="false" className={`h-auto w-full ${sway ? 'animate-floaty' : ''}`} />
    </motion.div>
  )
}
