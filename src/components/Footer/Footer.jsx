import './Footer.css'
import Reveal from '../Reveal'
import { studio } from '../../data/studio'

function Footer() {
  return (
    <Reveal as="footer" className="footer">
      <ul className="footer__contact">
        <li>
          <a href={studio.github} target="_blank" rel="noreferrer noopener">
            GitHub · 1077553201
          </a>
        </li>
        <li>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
        </li>
        <li>{studio.college}</li>
      </ul>
      <p className="footer__copy">
        © {new Date().getFullYear()} {studio.name} Blockchain Workshop · 把链上技术做成能跑起来的东西
      </p>
    </Reveal>
  )
}

export default Footer
