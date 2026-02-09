import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Testimonials.module.css'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'Encontrei um espaço onde pude me abrir sem julgamento. O tratamento mudou minha relação com a ansiedade.',
    author: 'Maria S.',
    role: 'Paciente',
  },
  {
    quote: 'Minha filha passou a ser acompanhada na infância. A equipe soube acolher ela e a nós, pais.',
    author: 'Ana L.',
    role: 'Responsável',
  },
  {
    quote: 'Profissionais sérios e ao mesmo tempo muito humanos. Recomendo a quem busca cuidado com a saúde mental.',
    author: 'Carlos R.',
    role: 'Paciente',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
      const items = itemRefs.current.filter(Boolean)
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <h2 className={styles.heading} ref={headingRef}>
          O que dizem as pessoas que confiaram na Clínica Volpi
        </h2>
        <div className={styles.list} ref={listRef}>
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={styles.card}
              ref={(el) => { itemRefs.current[i] = el }}
            >
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.author}>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
