import { useState, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Faq.module.css'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Qual a diferença entre psiquiatra e psicólogo?',
    a: 'O psiquiatra é médico, pode diagnosticar transtornos mentais e prescrever medicamentos. O psicólogo trabalha com psicoterapia (terapia pela fala). Na Clínica Volpi, acreditamos que os dois caminhos se complementam e frequentemente trabalhamos em conjunto.',
  },
  {
    q: 'Vou precisar tomar remédio?',
    a: 'Nem sempre. A necessidade de medicação é avaliada caso a caso. Quando indicada, é sempre discutida com transparência, explicando benefícios, efeitos e alternativas.',
  },
  {
    q: 'Tomar remédio psiquiátrico vicia?',
    a: 'A grande maioria dos medicamentos psiquiátricos não causa dependência quando usados corretamente e com acompanhamento médico. Essa é uma das maiores mitos que afasta pessoas do tratamento.',
  },
  {
    q: 'A consulta é sigilosa?',
    a: 'Absolutamente. O sigilo médico é um direito seu garantido por lei e um compromisso ético inegociável da nossa equipe.',
  },
  {
    q: 'Vocês atendem online?',
    a: 'Sim! Oferecemos atendimento por telemedicina com a mesma qualidade e atenção do atendimento presencial.',
  },
  {
    q: 'Quanto tempo dura o tratamento?',
    a: 'Depende de cada caso. Alguns tratamentos são mais breves, outros requerem acompanhamento prolongado. O mais importante: você nunca estará sozinho(a) nesse processo.',
  },
  {
    q: 'Atendem crianças e adolescentes?',
    a: 'Consulte nossa equipe para verificar a disponibilidade de atendimento para faixas etárias específicas.',
  },
  {
    q: 'Como faço para agendar?',
    a: 'É simples: clique no botão abaixo, ligue para nosso telefone ou envie uma mensagem no WhatsApp. Respondemos rápido porque sabemos que quando alguém pede ajuda, a resposta precisa vir logo.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

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
        listRef.current?.children ?? [],
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="faq" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <h2 className={styles.title} ref={titleRef}>
          Dúvidas frequentes
        </h2>
        <ul className={styles.list} ref={listRef}>
          {faqs.map((faq, index) => (
            <li
              key={faq.q}
              className={`${styles.item} ${openIndex === index ? styles.itemOpen : ''}`}
            >
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className={styles.question}>{faq.q}</span>
                <span className={styles.icon} aria-hidden>›</span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={styles.answerWrap}
              >
                <p className={styles.answer}>{faq.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
