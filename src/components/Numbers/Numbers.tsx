import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Numbers.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { dado: '300 milhões de pessoas sofrem com depressão no mundo', fonte: 'OMS' },
  { dado: '9,3% da população brasileira tem ansiedade — somos o país mais ansioso do mundo', fonte: 'OMS' },
  { dado: '86% das pessoas com transtornos mentais no Brasil não recebem tratamento', fonte: 'OPAS' },
  { dado: '70% dos casos melhoram significativamente com tratamento adequado', fonte: 'APA' },
]

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        closingRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: closingRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="numeros" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <h2 className={styles.title} ref={titleRef}>
          Saúde mental em números: você não está sozinho(a).
        </h2>
        <div className={styles.grid} ref={gridRef}>
          {stats.map((s) => (
            <div key={s.fonte} className={styles.card}>
              <p className={styles.dado}>{s.dado}</p>
              <p className={styles.fonte}>{s.fonte}</p>
            </div>
          ))}
        </div>
        <p className={styles.closing} ref={closingRef}>
          Buscar ajuda funciona. E nunca é tarde para começar.
        </p>
      </div>
    </section>
  )
}
