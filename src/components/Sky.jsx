import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import Moon from './Moon.jsx'
import { useEvening } from '../lib/evening.jsx'
import { SKY, SKY_TIMES, SUNSET } from '../lib/sky.js'

// Seeded so the constellation is the same on every visit.
function rng(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

function Stars({ opacity }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, stars = [], shoot = null, t = 0

    const build = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const r = rng(1122)
      const count = Math.round((w * h) / 5200)
      stars = Array.from({ length: count }, () => ({
        x: r() * w,
        y: Math.pow(r(), 1.5) * h * 0.85,
        s: r() < 0.08 ? 1.6 + r() : 0.5 + r() * 0.9,
        p: r() * Math.PI * 2,
        v: 0.6 + r() * 1.6
      }))
    }
    const frame = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = still ? 0.8 : 0.55 + 0.45 * Math.sin(s.p + t * s.v)
        ctx.globalAlpha = a
        ctx.fillStyle = s.s > 1.5 ? '#FFF6DD' : '#E8EEFF'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
        ctx.fill()
      }
      // A rare shooting star once it is properly night.
      if (!still && opacity.get() > 0.9) {
        if (!shoot && Math.random() < 0.0025) shoot = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.3, l: 0 }
        if (shoot) {
          shoot.l += 0.03
          const len = 120, dx = -shoot.l * 520, dy = shoot.l * 260
          const g = ctx.createLinearGradient(shoot.x + dx, shoot.y + dy, shoot.x + dx + len, shoot.y + dy - len / 2)
          g.addColorStop(0, 'rgba(255,246,221,.9)')
          g.addColorStop(1, 'rgba(255,246,221,0)')
          ctx.globalAlpha = 1 - shoot.l
          ctx.strokeStyle = g
          ctx.lineWidth = 1.4
          ctx.beginPath()
          ctx.moveTo(shoot.x + dx, shoot.y + dy)
          ctx.lineTo(shoot.x + dx + len, shoot.y + dy - len / 2)
          ctx.stroke()
          if (shoot.l >= 1) shoot = null
        }
      }
      ctx.globalAlpha = 1
      if (opacity.get() > 0.01 && !still) raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    build()
    kick()
    const off = opacity.on('change', (v) => v > 0.01 && kick())
    window.addEventListener('resize', build)
    return () => {
      off()
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
    }
  }, [opacity])

  return <motion.canvas ref={ref} style={{ opacity }} className="absolute inset-0 h-full w-full" />
}

// Fixed behind the whole page: the sky of 22 November from 4 PM to 11 PM,
// driven by how far the guest has scrolled.
export default function Sky() {
  const m = useEvening()
  const top = useTransform(m, SKY_TIMES, SKY.top)
  const mid = useTransform(m, SKY_TIMES, SKY.mid)
  const low = useTransform(m, SKY_TIMES, SKY.low)
  const background = useMotionTemplate`linear-gradient(to bottom, ${top} 0%, ${mid} 58%, ${low} 100%)`

  const set = Math.round(SUNSET)
  // Sun sinks toward the west-facing horizon and is gone at Maghrib.
  const sunY = useTransform(m, [960, set + 4], ['14vh', '104vh'])
  const sunX = useTransform(m, [960, set], ['76vw', '70vw'])
  const sunColor = useTransform(m, [960, 1050, set], ['#FFF7E0', '#FFD58A', '#FF8A4C'])
  const sunGlow = useMotionTemplate`radial-gradient(circle, ${sunColor} 0%, transparent 70%)`
  const sunOpacity = useTransform(m, [960, set - 6, set + 4], [0.85, 1, 0])

  // The nearly-full moon is already up in the east and climbs all night. It
  // keeps to the left margin so it never sits behind text.
  const moonY = useTransform(m, [960, set, 1380], ['70vh', '34vh', '15vh'])
  const moonX = useTransform(m, [960, 1380], ['4.5vw', '6vw'])
  const moonOpacity = useTransform(m, [960, set - 30, set + 30], [0.35, 0.55, 1])
  const moonGlow = useTransform(m, [set - 10, set + 60], [0, 1])
  const stars = useTransform(m, [set + 8, set + 75], [0, 1])

  return (
    <motion.div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ background }} aria-hidden="true">
      <Stars opacity={stars} />

      <motion.div style={{ left: sunX, top: sunY, opacity: sunOpacity }} className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ background: sunGlow }} className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-xl" />
        <motion.div style={{ backgroundColor: sunColor }} className="relative h-[9vmin] w-[9vmin] rounded-full shadow-[0_0_60px_10px_rgb(255_200_120/.55)]" />
      </motion.div>

      <motion.div style={{ left: moonX, top: moonY, opacity: moonOpacity }} className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ opacity: moonGlow }} className="absolute left-1/2 top-1/2 h-[24vmin] w-[24vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_248_225/.28),transparent_65%)]" />
        <Moon className="relative h-[6.5vmin] min-h-[38px] w-[6.5vmin] min-w-[38px] drop-shadow-[0_0_14px_rgb(255_248_225/.45)]" />
      </motion.div>
    </motion.div>
  )
}
