import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

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
          <p className={styles.eyebrow}>Orientação para sua jornada de bem-estar</p>
          <h2 className={styles.title}>Conheça a NatLeaf — Especialistas em saúde mental</h2>
          <div className={styles.text}>
            <p>
              A NatLeaf é uma clínica psiquiátrica com foco em atendimento humanizado e baseado em evidências. Nossa equipe é formada por psiquiatras e psicólogos em constante atualização.
            </p>
            <p>
              Oferecemos ambiente reservado, sigilo absoluto e um primeiro contato acolhedor. Aqui você pode falar abertamente sobre o que sente e receber um plano de cuidado feito para você.
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.cta}>
              Agende uma consulta
            </a>
          </div>
        </div>
        <div className={styles.imageBlock} ref={imageRef}>
          <div className={styles.imagePlaceholder}>
            Imagem (placeholder)
          </div>
        </div>
      </div>
    </section>
  )
}
