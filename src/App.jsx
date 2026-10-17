import BootAnimationOverlay from './components/BootAnimation/BootAnimationOverlay'
import Hero from './components/Hero/Hero'
import Highlights from './components/Highlights/Highlights'
import About from './components/About/About'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <BootAnimationOverlay />
      <Hero />
      <Highlights />
      <About />
      <Footer />
    </div>
  )
}

export default App
