import './Achievements.css'
import Reveal from '../Reveal'
import { achievements } from '../../data/studio'

function Achievements() {
  return (
    <section className="achievements" id="achievements">
      <Reveal className="achievements__head">
        <p className="achievements__label">04 — ACHIEVEMENTS</p>
        <h2 className="achievements__title">成果荣誉</h2>
        <p className="achievements__desc">
          从 2025 年 10 月到 2026 年 7 月，工坊成员在区块链应用开发、大模型应用与智能硬件方向持续拿奖，国家级奖项两项。
        </p>
      </Reveal>

      <ol className="timeline">
        {achievements.map((item, index) => (
          <Reveal as="li" key={`${item.date}-${item.title}`} className="timeline__item" delay={index * 60}>
            <div className="timeline__date">{item.date}</div>
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__top">
                <span className="timeline__level" data-level={item.level}>
                  {item.level}
                </span>
                <h3 className="timeline__title">{item.title}</h3>
                <span className="timeline__award">{item.award}</span>
              </div>
              <p className="timeline__track">{item.track}</p>
              <p className="timeline__note">{item.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default Achievements
