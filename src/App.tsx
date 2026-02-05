import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import Approach from './components/Approach'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Approach />
        <Services />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
