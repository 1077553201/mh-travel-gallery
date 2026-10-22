import './Resources.css'
import Reveal from '../Reveal'
import { resources } from '../../data/studio'

function Resources() {
  return (
    <section className="resources" id="resources">
      <Reveal className="resources__head">
        <p className="resources__label">03 — RESOURCES</p>
        <h2 className="resources__title">资源与平台</h2>
        <p className="resources__desc">
          工坊的底气来自可用的算力与场地——从链端到模型，从代码到实体装置，都能在这里跑起来。
        </p>
      </Reveal>

      <ul className="resources__list">
        {resources.map((group, index) => (
          <Reveal as="li" key={group.id} className="resource-card" delay={index * 80}>
            <span className="resource-card__index">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="resource-card__title">{group.title}</h3>
            <p className="resource-card__summary">{group.summary}</p>
            <ul className="resource-card__items">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default Resources
