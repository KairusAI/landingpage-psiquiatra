import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './CallToAction.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
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
        textRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 88%',
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
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <h2 className={styles.title} ref={titleRef}>
          Buscar ajuda funciona. E nunca é tarde para começar.
        </h2>
        <p className={styles.text} ref={textRef}>
          Agende uma avaliação inicial. É confidencial, acolhedora e pode ser o início de uma nova fase.
        </p>
        <a
          ref={btnRef}
          href={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Quero agendar minha consulta →
        </a>
      </div>
    </section>
  )
}
