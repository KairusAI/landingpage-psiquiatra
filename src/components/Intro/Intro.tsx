import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Intro.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef} aria-labelledby="intro-title">
      <div className={styles.wrap}>
        <h2 id="intro-title" className={styles.title} ref={titleRef}>
          Existe algo que você tem carregado em silêncio?
        </h2>
        <div className={styles.text} ref={textRef}>
          <ul className={styles.list}>
            <li>Talvez seja uma angústia que aparece sem avisar.</li>
            <li>Talvez seja o cansaço que o fim de semana não resolve.</li>
            <li>Talvez seja a sensação de que &quot;todo mundo consegue, menos eu.&quot;</li>
            <li>Talvez seja um medo que cresceu demais.</li>
            <li>Talvez seja o vazio, mesmo quando tudo parece estar &quot;bem.&quot;</li>
          </ul>
          <p className={styles.closing}>
            Você não está exagerando. O que você sente importa. E reconhecer que precisa de ajuda não é fraqueza. É, na verdade, o ato mais corajoso que você pode ter.
          </p>
        </div>
      </div>
    </section>
  )
}
