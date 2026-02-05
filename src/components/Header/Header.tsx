import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import styles from './Header.module.css'

const CTA_URL = 'https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação.'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Tratamentos', href: '#tratamentos' },
  { label: 'Sobre', href: '#sobre' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLAnchorElement[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (!overlayRef.current || !menuRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, reversed: true })
      tl.fromTo(
        overlayRef.current,
        { autoAlpha: 0 },
        {
          duration: 0.25,
          autoAlpha: 1,
          ease: 'power2.out',
        },
      )
        .fromTo(
          menuRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.35, ease: 'power2.out' },
          0,
        )
        .fromTo(
          linksRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'power2.out' },
          0.15,
        )
      ;(window as unknown as { menuTl: gsap.core.Timeline }).menuTl = tl
    })
    return () => ctx.revert()
  }, [])

  const toggleMenu = () => {
    const tl = (window as unknown as { menuTl?: gsap.core.Timeline }).menuTl
    if (!tl) return
    setMenuOpen((prev) => {
      const next = !prev
      if (next) {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'auto'
        tl.play()
      } else {
        tl.reverse()
        if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none'
      }
      return next
    })
  }

  const closeMenu = () => {
    if (!menuOpen) return
    const tl = (window as unknown as { menuTl?: gsap.core.Timeline }).menuTl
    if (tl) {
      tl.reverse()
      if (overlayRef.current) overlayRef.current.style.pointerEvents = 'none'
    }
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <a href="#hero" className={styles.logo}>
          NatLeaf<span className={styles.logoAccent}> Psiquiatria</span>
        </a>
        <nav className={styles.navDesktop} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.navCta}>
            Contato
          </a>
        </nav>
        <button
          ref={btnRef}
          type="button"
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Abrir ou fechar menu"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Overlay menu mobile */}
      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden={!menuOpen}
        style={{ visibility: 'hidden', pointerEvents: 'none' }}
        onClick={closeMenu}
      >
        <nav
          ref={menuRef}
          className={styles.menuMobile}
          onClick={(e) => e.stopPropagation()}
          aria-label="Menu mobile"
        >
          {navItems.map((item, i) => (
            <a
              key={item.href}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              href={item.href}
              className={styles.menuLink}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={styles.menuCta} onClick={closeMenu}>
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}
