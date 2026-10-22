import { createContext, useContext, useEffect, useState } from 'react'
import { useMotionValue, useMotionValueEvent } from 'framer-motion'
import { parseHM } from './sky.js'

// Scrolling the page walks through the evening of 22 November. Any element
// with data-time="HH:MM" pins that moment to its position on the page; the
// clock time in between is interpolated from the scroll position.
const Ctx = createContext(null)
const START = 16 * 60

export function EveningProvider({ children }) {
  const minutes = useMotionValue(START)

  useEffect(() => {
    let anchors = []
    let raf = 0

    const measure = () => {
      anchors = [...document.querySelectorAll('[data-time]')]
        .map((el) => ({ y: el.getBoundingClientRect().top + window.scrollY, m: parseHM(el.dataset.time) }))
        .sort((a, b) => a.y - b.y)
      update()
    }
    const update = () => {
      if (!anchors.length) return
      const probe = window.scrollY + window.innerHeight * 0.55
      let m = anchors[0].m
      if (probe >= anchors[anchors.length - 1].y) m = anchors[anchors.length - 1].m
      else {
        for (let i = 0; i < anchors.length - 1; i++) {
          const a = anchors[i], b = anchors[i + 1]
          if (probe >= a.y && probe < b.y) {
            m = a.m + ((probe - a.y) / (b.y - a.y)) * (b.m - a.m)
            break
          }
        }
      }
      minutes.set(m)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [minutes])

  return <Ctx.Provider value={minutes}>{children}</Ctx.Provider>
}

export const useEvening = () => useContext(Ctx)

// True once the sky is dark enough for light text and dark glass.
export function useIsNight(after = 18 * 60 + 12) {
  const minutes = useEvening()
  const [night, setNight] = useState(false)
  useMotionValueEvent(minutes, 'change', (m) => setNight(m >= after))
  return night
}
