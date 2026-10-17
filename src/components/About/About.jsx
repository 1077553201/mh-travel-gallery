import './About.css'
import Reveal from '../Reveal'

const footprints = ['天津', '乐山', '哈尔滨', '湖南', '湖北']

function About() {
  return (
    <section className="about">
      <Reveal className="about__head">
        <p className="about__label">02 — ABOUT</p>
        <h2 className="about__title">关于这本画廊</h2>
      </Reveal>
      <div className="about__body">
        <Reveal className="about__text">
          <p>
            旅游画廊记录我走过的五座城：天津云端的夜航灯火、乐山街头浪漫的“没空想你”、哈尔滨雪国最大的巨型雪王、湖南橘子洲头的浩荡湘江、湖北三峡大坝前的峡江风光。从北国冰雪到南国烟火，每一程都有自己的颜色。这里没有攻略，只有照片和心情。愿这些画面也能提醒你：世界很大，出发永远不晚。
          </p>
        </Reveal>
        {/* 足迹清单：列表项交错淡入，delay 80ms 递增 */}
        <ul className="about__footprints">
          {footprints.map((city, index) => (
            <Reveal as="li" key={city} delay={index * 80}>
              {city}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
