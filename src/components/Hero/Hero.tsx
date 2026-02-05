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
          Descubra como a <span className={styles.accent}>saúde mental</span> pode <span className={styles.accent}>ajudar você</span>
        </h1>
        <p className={styles.subtitle} ref={descRef}>
          Explore os benefícios do acompanhamento psiquiátrico e descubra uma abordagem humanizada e eficiente para melhorar sua qualidade de vida.
        </p>
        <div className={styles.ctaWrap} ref={ctaRef}>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            Agende uma consulta
          </a>
        </div>
      </div>
      <div className={styles.imageWrap} ref={imageRef}>
        <div className={styles.imagePlaceholder} aria-hidden>
          Imagem (placeholder)
        </div>
      </div>
    </section>
  )
}
