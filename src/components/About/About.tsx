import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511930192825?text=Olá,%20gostaria%20de%20agendar%20com%20a%20Dra.%20Camila.'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.content} ref={contentRef}>
          <p className={styles.eyebrow}>Quem somos / Dra. Camila</p>
          <h2 className={styles.title}>Conheça a Dra. Camila Volpi</h2>
          <div className={styles.text}>
            <p>
              A Dra. Camila Volpi é médica psiquiatra, apaixonada pelo cuidado integral da mente humana. Com formação sólida e um olhar profundamente humano, ela fundou a Clínica Volpi com um propósito claro: criar um espaço onde as pessoas se sintam verdadeiramente ouvidas, sem julgamento, sem pressa, sem rótulos.
            </p>
            <p>
              Sua abordagem combina ciência de ponta com escuta atenta e individualizada, porque ela acredita que cada história é única e merece um cuidado que respeite essa singularidade.
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Agende com a Dra. Camila →
            </a>
          </div>
        </div>
        <div className={styles.imageBlock} ref={imageRef}>
          <img
            src="/dra-camila-volpi.jpeg"
            alt="Dra. Camila Volpi — médica psiquiatra, fundadora da Clínica Volpi"
            className={styles.aboutImage}
          />
        </div>
      </div>
    </section>
  )
}
