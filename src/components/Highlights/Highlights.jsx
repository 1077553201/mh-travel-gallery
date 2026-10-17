import { useEffect, useState } from 'react'
import './Highlights.css'
import Reveal from '../Reveal'
import CityArt from '../CityArt/CityArt'
import { cities } from '../../data/cities'

function Highlights() {
  // 换照片机制：探测 public/photos/ 下的照片是否存在
  // 存在 → 显示 <img>；不存在（或断网）→ 显示渐变 + SVG 图案，页面永远完整
  const [hasPhoto, setHasPhoto] = useState({})

  useEffect(() => {
    cities.forEach((city) => {
      const probe = new Image()
      probe.onload = () => setHasPhoto((prev) => ({ ...prev, [city.id]: true }))
      probe.src = city.photo
    })
  }, [])

  return (
    <section className="highlights" id="destinations">
      <Reveal className="highlights__head">
        <p className="highlights__label">01 — DESTINATIONS</p>
        <h2 className="highlights__title">目的地</h2>
      </Reveal>
      {/* 作业要求 3 张卡片，这里放 5 张更饱满；第 4、5 张做杂志错落排版 */}
      <ul className="highlights__list">
        {cities.map((city, index) => (
          <li
            key={city.id}
            className="city-card"
            tabIndex={0}
            style={{ '--card-color': city.color }}
          >
            {/* delay 错开 80ms 递增：0/80/160/240/320 */}
            <Reveal delay={index * 80}>
              {/* 城市图区：渐变打底 + SVG 图案，有照片时照片盖在最上层。
                  图片严格约束在容器内（overflow:hidden + object-fit:cover），绝不溢出遮字 */}
              <div className="city-card__image">
                <div
                  className="city-card__image-fill"
                  style={{
                    background: `linear-gradient(135deg, ${city.gradient.join(', ')})`,
                  }}
                />
                {!hasPhoto[city.id] && <CityArt id={city.id} />}
                {hasPhoto[city.id] && (
                  <img className="city-card__photo" src={city.photo} alt={city.name} />
                )}
              </div>
              <h3 className="city-card__name">{city.name}</h3>
              <p className="city-card__slogan">{city.slogan}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Highlights
