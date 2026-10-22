import { motion } from 'framer-motion'

// Fade-up the first time something scrolls into view.
export default function Reveal({ children, delay = 0, className = '', y = 24, as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </M>
  )
}
