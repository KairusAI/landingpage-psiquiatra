import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

const menuLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Por que a Volpi', href: '#beneficios' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Dra. Camila', href: '#sobre' },
  { label: 'A Clínica', href: '#clinica' },
  { label: 'Números', href: '#numeros' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer id="footer" className={styles.footer} ref={sectionRef}>
      <div className={styles.wrap} ref={contentRef}>
        <div className={styles.brand}>
          <p className={styles.tagline}>
            Clínica Volpi — saúde mental com acolhimento. Atendimento presencial e online sob a direção da Dra. Camila Volpi.
          </p>
          <div className={styles.social} aria-label="Redes sociais">
            <a href="#" className={styles.socialLink} aria-label="Instagram">Instagram</a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">YouTube</a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">Facebook</a>
          </div>
        </div>
        <div className={styles.menu}>
          <h3 className={styles.colTitle}>Menu</h3>
          <nav aria-label="Footer">
            <ul className={styles.linkList}>
              {menuLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.contact}>
          <h3 className={styles.colTitle}>Contatos</h3>
          <ul className={styles.contactList}>
            <li>Endereço — São Paulo, SP</li>
            <li><a href="mailto:contato@clinicavolpi.com.br">contato@clinicavolpi.com.br</a></li>
            <li>
              <a href={CTA_URL} target="_blank" rel="noopener noreferrer">+55 (11) 99999-9999</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.copy}>
        <p>Copyright © Clínica Volpi | Todos os Direitos Reservados</p>
      </div>
    </footer>
  )
}
