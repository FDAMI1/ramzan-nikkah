import { useEffect, useRef } from 'react'

// Petals drifting down over the hero, in the card's blush and powder blue.
// Pauses off-screen and stays off for people who ask for reduced motion.
const COLORS = [
  ['#F3D9D6', '#D9A3A0'],
  ['#E6EEF8', '#9DB6DD'],
  ['#F7E9DC', '#D9BF8C']
]

export default function Petals({ count = 22, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, raf = 0, visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const spawn = (top) => ({
      x: Math.random() * w,
      y: top ? -20 - Math.random() * h * 0.3 : Math.random() * h,
      r: 5 + Math.random() * 7,
      vy: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      a: Math.random() * Math.PI,
      c: COLORS[Math.floor(Math.random() * COLORS.length)]
    })

    resize()
    const petals = Array.from({ length: count }, () => spawn(false))

    const draw = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.a)
      ctx.scale(1, 0.55 + 0.45 * Math.abs(Math.sin(p.phase)))
      const g = ctx.createLinearGradient(-p.r, 0, p.r, 0)
      g.addColorStop(0, p.c[0])
      g.addColorStop(1, p.c[1])
      ctx.fillStyle = g
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      ctx.moveTo(0, -p.r)
      ctx.bezierCurveTo(p.r, -p.r * 0.6, p.r * 0.8, p.r * 0.8, 0, p.r)
      ctx.bezierCurveTo(-p.r * 0.8, p.r * 0.8, -p.r, -p.r * 0.6, 0, -p.r)
      ctx.fill()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.phase += 0.012
        p.y += p.vy
        p.x += Math.sin(p.phase) * 0.6
        p.a += p.spin
        if (p.y > h + 20) Object.assign(p, spawn(true))
        draw(p)
      }
      if (visible) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
