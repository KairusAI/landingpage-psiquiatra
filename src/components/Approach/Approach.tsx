import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Approach.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="clinica" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.colLeft} ref={contentRef}>
          <p className={styles.eyebrow}>A clínica</p>
          <h2 className={styles.heading}>Um espaço pensado para o seu bem-estar</h2>
          <div className={styles.text}>
            <p>
              A Clínica Volpi foi projetada para que, desde o momento em que você cruza a porta, já comece a se sentir melhor.
            </p>
            <ul className={styles.list}>
              <li><strong>Ambiente acolhedor e discreto</strong> — sua privacidade é sagrada.</li>
              <li><strong>Tratamento personalizado</strong> — porque você não é um protocolo, é uma pessoa.</li>
              <li><strong>Atendimento online</strong> — cuidado de qualidade onde você estiver.</li>
              <li><strong>Horários flexíveis</strong> — porque a sua rotina também importa.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
