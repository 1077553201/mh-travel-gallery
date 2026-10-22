import './About.css'
import Reveal from '../Reveal'
import { studio } from '../../data/studio'

function About() {
  return (
    <section className="about" id="about">
      <Reveal className="about__head">
        <p className="about__label">01 — ABOUT</p>
        <h2 className="about__title">关于工坊</h2>
      </Reveal>
      <div className="about__body">
        <Reveal className="about__text">
          {studio.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 12)}>{paragraph}</p>
          ))}
        </Reveal>
        {/* 事实清单：交错淡入，delay 80ms 递增 */}
        <ul className="about__facts">
          {studio.facts.map((fact, index) => (
            <Reveal as="li" key={fact.k} delay={index * 80}>
              <span className="about__facts-k">{fact.k}</span>
              <span className="about__facts-v">{fact.v}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
