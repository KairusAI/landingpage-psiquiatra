import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Benefits.module.css'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { title: 'Expertise clínica', desc: 'Equipe liderada por médicos com formação rigorosa e atualização constante nas melhores práticas baseadas em evidência.', icon: '🩺' },
  { title: 'Humanização real', desc: 'Aqui, você não é um número de prontuário. É uma pessoa com uma história que merece ser ouvida com tempo e atenção.', icon: '❤️' },
  { title: 'Tratamento baseado em evidência', desc: 'Utilizamos protocolos reconhecidos internacionalmente, combinando farmacoterapia, psicoterapia e abordagens integrativas quando indicado.', icon: '🔬' },
  { title: 'Abordagem multidisciplinar', desc: 'Psiquiatria, psicologia e outras especialidades trabalhando em conjunto para um cuidado completo.', icon: '🤝' },
  { title: 'Sigilo absoluto', desc: 'Tudo o que acontece aqui, fica aqui. Sua privacidade é inegociável.', icon: '🔒' },
  { title: 'Atendimento presencial e online', desc: 'Flexibilidade para que o cuidado chegue até você, onde quer que esteja.', icon: '📱' },
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
        <h2 className={styles.sectionTitle}>Por que escolher a Clínica Volpi?</h2>
        {items.map((item, i) => (
          <div
            key={item.title}
            className={styles.item}
            ref={(el) => { itemRefs.current[i] = el }}
          >
            <span className={styles.icon} aria-hidden>{item.icon}</span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
