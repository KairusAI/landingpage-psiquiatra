import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Benefits.module.css'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { title: 'Bem-estar emocional', icon: '🧠' },
  { title: 'Redução da ansiedade', icon: '🌿' },
  { title: 'Qualidade do sono', icon: '🌙' },
  { title: 'Acompanhamento especializado', icon: '🫂' },
  { title: 'Sigilo e acolhimento', icon: '🔒' },
]

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const els = itemRefs.current.filter(Boolean)
      gsap.fromTo(
        els,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="beneficios" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        {items.map((item, i) => (
          <div
            key={item.title}
            className={styles.item}
            ref={(el) => { itemRefs.current[i] = el }}
          >
            <span className={styles.icon} aria-hidden>{item.icon}</span>
            <h3 className={styles.title}>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
