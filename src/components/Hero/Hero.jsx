import './Hero.css'
import { BOOT } from '../../data/bootConfig'
import { studio } from '../../data/studio'

function Hero() {
  // 认识我们 → 平滑滚动到下一章节（主力成员）
  const scrollToNext = () => {
    const target = document.getElementById('members')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="hero">
      {/* 右侧画卷：右缘融入宣纸白背景；对齐方式与开机遮罩同源，改 bootConfig 即可 */}
      <div className="hero__art">
        <img
          src={BOOT.imageSrc}
          alt="东莞职业技术学院校名墙"
          draggable="false"
          style={{ objectPosition: `${BOOT.imageAlign.x * 100}% ${BOOT.imageAlign.y * 100}%` }}
        />
      </div>
      <div className="hero__main">
        <p className="hero__label">
          {studio.nameEn} · {studio.name}
        </p>
        <h1 className="hero__title">{studio.name}</h1>
        <p className="hero__subtitle">{studio.slogan}</p>
        <div className="hero__actions">
          <button type="button" className="hero__btn" onClick={scrollToNext}>
            认识我们 →
          </button>
          <span className="hero__note">{studio.college}</span>
        </div>
      </div>
    </header>
  )
}

export default Hero
