import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Approach.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.colLeft} ref={leftRef}>
          <p className={styles.eyebrow}>Explorando nossa abordagem</p>
          <h2 className={styles.heading}>Descubra uma abordagem humanizada para sua saúde mental</h2>
          <div className={styles.text}>
            <p>Conheça um espaço de acolhimento e tratamento baseado em evidências.</p>
            <p>
              A avaliação psiquiátrica e o acompanhamento são eficazes para quadros como: ansiedade, depressão, transtorno bipolar, TDAH, insônia, pânico, fobias, TOC e outros. Trabalhamos em conjunto com psicoterapia quando indicado, trazendo mais qualidade de vida para você e sua família.
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Entre em contato
            </a>
          </div>
        </div>
        <div className={styles.colRight} ref={rightRef}>
          <p className={styles.eyebrow}>Atendimento</p>
          <h2 className={styles.heading}>Praticidade em seu atendimento</h2>
          <div className={styles.text}>
            <p>Atendemos por telemedicina em todo o Brasil e também presencialmente, quando for o caso.</p>
            <p><strong>Diferenciais:</strong> Para o sucesso do tratamento, o acompanhamento e o ajuste da conduta são fundamentais. Nossas consultas têm duração adequada e incluem retornos para acompanhamento.</p>
            <p><strong>Apoio ao paciente:</strong> Acompanhamos desde o acolhimento e agendamento até a consulta, o direcionamento e o follow-up.</p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Entre em contato
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
