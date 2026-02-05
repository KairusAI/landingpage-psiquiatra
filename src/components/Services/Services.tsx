import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

const treatments = [
  {
    title: 'Ansiedade e estresse',
    description: 'Avaliação e tratamento para transtornos de ansiedade, síndrome do pânico e estresse, com plano de cuidado personalizado.',
  },
  {
    title: 'Depressão e humor',
    description: 'Acompanhamento para depressão e transtorno bipolar, com foco em estabilização e qualidade de vida.',
  },
  {
    title: 'TDAH',
    description: 'Diagnóstico e tratamento do TDAH em adultos e em crianças/adolescentes, com orientação à família quando indicado.',
  },
  {
    title: 'Insônia e sono',
    description: 'Avaliação de distúrbios do sono e insônia, com abordagem integrada à saúde mental.',
  },
  {
    title: 'Saúde mental infantojuvenil',
    description: 'Atendimento especializado a crianças e adolescentes, em ambiente acolhedor e com envolvimento dos responsáveis.',
  },
  {
    title: 'Acompanhamento contínuo',
    description: 'Retornos programados para ajuste de conduta, adesão ao tratamento e prevenção de recaídas.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const btnRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
      const cards = cardRefs.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tratamentos" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.heading} ref={headingRef}>
          <p className={styles.eyebrow}>Opções de Tratamento</p>
          <h2 className={styles.title}>Explorando o cuidado em saúde mental</h2>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {treatments.map((item, i) => (
            <div
              key={item.title}
              className={styles.card}
              ref={(el) => { cardRefs.current[i] = el }}
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
        <a
          ref={btnRef}
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Entre em contato para mais informações
        </a>
      </div>
    </section>
  )
}
