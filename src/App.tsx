import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import About from './components/About'
import Approach from './components/Approach'
import Benefits from './components/Benefits'
import Services from './components/Services'
import Numbers from './components/Numbers'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <Intro />
        <About />
        <Approach />
        <Services />
        <Numbers />
        <Testimonials />
        <Benefits />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default App
