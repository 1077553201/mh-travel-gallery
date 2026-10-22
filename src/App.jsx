import BootAnimationOverlay from './components/BootAnimation/BootAnimationOverlay'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Members from './components/Members/Members'
import Resources from './components/Resources/Resources'
import Achievements from './components/Achievements/Achievements'
import Join from './components/Join/Join'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="app">
      <BootAnimationOverlay />
      <Hero />
      <About />
      <Members />
      <Resources />
      <Achievements />
      <Join />
      <Footer />
    </div>
  )
}

export default App
