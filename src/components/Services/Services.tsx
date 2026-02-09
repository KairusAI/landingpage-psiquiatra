import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const CTA_BASE = 'https://wa.me/5511930192825?text='

const areas = [
  {
    title: 'Depressão',
    subtitle: 'Quando viver pesa mais do que deveria.',
    description: 'Não é frescura. Não é falta de gratidão. A depressão é uma doença real. O tratamento existe, funciona, e pode devolver a cor que o mundo perdeu.',
    cta: 'Quero buscar ajuda para depressão',
  },
  {
    title: 'Ansiedade e Transtorno de Ansiedade Generalizada (TAG)',
    subtitle: 'Quando a sua mente não desliga — nunca.',
    description: 'O coração dispara sem motivo. O pensamento antecipa catástrofes. Ansiedade tem tratamento e significa reconquistar o controle da sua própria vida.',
    cta: 'Quero tratar minha ansiedade',
  },
  {
    title: 'Síndrome do Pânico',
    subtitle: 'Quando o corpo grita o que a mente não aguenta.',
    description: 'Crises súbitas de medo intenso com taquicardia, falta de ar, tontura. A Síndrome do Pânico é tratável. Você pode voltar a viver sem medo de viver.',
    cta: 'Quero me libertar do pânico',
  },
  {
    title: 'Burnout (Esgotamento Profissional)',
    subtitle: 'Quando o trabalho consome quem você é.',
    description: 'Burnout não é preguiça. É o resultado de um sistema que exigiu demais. Você não é uma máquina. Pedir ajuda não é desistir — é se salvar.',
    cta: 'Preciso de ajuda com burnout',
  },
  {
    title: 'TOC – Transtorno Obsessivo-Compulsivo',
    subtitle: 'Quando a mente cria prisões invisíveis.',
    description: 'Pensamentos intrusivos que não param. Rituais que você precisa fazer. O TOC não define quem você é. Com tratamento adequado, é possível recuperar a liberdade.',
    cta: 'Quero tratar o TOC',
  },
  {
    title: 'Transtorno Bipolar',
    subtitle: 'Quando as emoções vivem nos extremos.',
    description: 'Momentos de euforia intensa e depois a queda. O Transtorno Bipolar tem tratamento. É possível encontrar estabilidade e viver com mais previsibilidade e paz.',
    cta: 'Quero entender meu diagnóstico',
  },
  {
    title: 'Dependência Química e Comportamental',
    subtitle: 'Quando o alívio de hoje vira a prisão de amanhã.',
    description: 'Álcool, drogas, medicamentos, jogos, internet. Dependência é uma doença, não uma falha de caráter. O primeiro passo é aceitar a mão estendida.',
    cta: 'Quero começar minha recuperação',
  },
  {
    title: 'Luto e Perdas',
    subtitle: 'Quando a ausência pesa mais que qualquer presença.',
    description: 'Não existe prazo para superar. Quando o luto paralisa, é hora de ter alguém ao seu lado. Você não precisa passar por isso sozinho(a).',
    cta: 'Preciso de apoio para meu luto',
  },
  {
    title: 'TDAH – Transtorno do Déficit de Atenção e Hiperatividade',
    subtitle: 'Quando o mundo exige foco, mas o seu cérebro funciona diferente.',
    description: 'Não é preguiça. O TDAH é uma condição neurobiológica real. Diagnosticado e tratado, é possível trabalhar com o seu cérebro, e não contra ele.',
    cta: 'Quero investigar o TDAH',
  },
  {
    title: 'Fobias e Medos Específicos',
    subtitle: 'Quando o medo ultrapassa o limite do racional.',
    description: 'Fobia social, agorafobia, fobias específicas. A fobia não precisa ser a dona da sua vida. O tratamento pode devolver a liberdade que o medo tirou.',
    cta: 'Quero vencer meus medos',
  },
  {
    title: 'Transtornos Alimentares',
    subtitle: 'Quando a relação com a comida se torna uma guerra.',
    description: 'Anorexia, bulimia, compulsão alimentar. Transtornos alimentares são doenças sérias — e têm tratamento. Você merece fazer as pazes com o seu corpo.',
    cta: 'Quero ajuda com minha relação com a comida',
  },
  {
    title: 'Insônia e Distúrbios do Sono',
    subtitle: 'Quando a noite vira inimiga.',
    description: 'Dificuldade para iniciar ou manter o sono. O sono é um pilar fundamental da saúde mental. Tratar a insônia é tratar a sua qualidade de vida inteira.',
    cta: 'Quero voltar a dormir bem',
  },
  {
    title: 'Estresse Pós-Traumático (TEPT)',
    subtitle: 'Quando o passado se recusa a passar.',
    description: 'Flashbacks, pesadelos, hipervigilância. O trauma não precisa definir o resto da sua história. É possível processar a dor e retomar a sua vida.',
    cta: 'Quero tratar meu trauma',
  },
  {
    title: 'Saúde Mental na Terceira Idade',
    subtitle: 'Porque cuidar da mente não tem idade.',
    description: 'Depressão, ansiedade, declínio cognitivo, isolamento. Todo ser humano merece cuidado, acolhimento e dignidade — em qualquer fase da vida.',
    cta: 'Quero cuidar de quem eu amo',
  },
  {
    title: 'Dificuldades nos Relacionamentos',
    subtitle: 'Quando amar (ou se deixar amar) dói.',
    description: 'Relações tóxicas, medo de abandono, dependência emocional. Relacionamentos saudáveis começam com uma mente saudável.',
    cta: 'Quero relações mais saudáveis',
  },
]

function encodeMessage(text: string) {
  return encodeURIComponent(text + ' →')
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
      const cards = cardRefs.current.filter(Boolean)
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tratamentos" className={styles.section} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.heading} ref={headingRef}>
          <p className={styles.eyebrow}>Como podemos te ajudar</p>
          <h2 className={styles.title}>Áreas de atuação: cada luta tem o seu caminho de saída</h2>
          <p className={styles.subtitle}>
            Na Clínica Volpi, tratamos uma ampla variedade de condições de saúde mental com seriedade, empatia e evidência científica. Conheça as principais áreas em que podemos te ajudar:
          </p>
        </div>
        <div className={styles.grid} ref={gridRef}>
          {areas.map((item, i) => (
            <div
              key={item.title}
              className={styles.card}
              ref={(el) => { cardRefs.current[i] = el }}
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardSubtitle}>{item.subtitle}</p>
              <p className={styles.cardDesc}>{item.description}</p>
              <a
                href={`${CTA_BASE}${encodeMessage(item.cta)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                {item.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
