import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65 },
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.2,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.35,
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.75 },
          0.15,
        )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className={styles.hero} ref={sectionRef}>
      <div className={styles.content}>
        <h1 className={styles.title} ref={titleRef}>
          Você não precisa enfrentar isso sozinho(a).
        </h1>
        <p className={styles.subtitle} ref={descRef}>
          A Clínica Volpi é um espaço seguro, acolhedor e especializado em saúde mental. Sob a direção da Dra. Camila Volpi, nossa equipe está pronta para te ajudar a reencontrar o equilíbrio, a leveza e o sentido, um passo de cada vez.
        </p>
        <div className={styles.ctaWrap} ref={ctaRef}>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Quero agendar minha consulta →
          </a>
        </div>
        <p className={styles.badge} aria-hidden>Atendimento presencial e online</p>
      </div>
      <div className={styles.imageWrap} ref={imageRef}>
        <img
          src="/hero-dra-volpi.jpeg"
          alt="Dra. Camila Volpi — atendimento humanizado em saúde mental"
          className={styles.heroImage}
        />
      </div>
    </section>
  )
}
