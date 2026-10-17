import './Hero.css'
import { BOOT } from '../../data/bootConfig'

function Hero() {
  // 开始漫游 → 平滑滚动到下一章节（目的地）
  const scrollToDestinations = () => {
    const target = document.getElementById('destinations')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="hero">
      {/* 右侧半座太和殿画卷：右缘融入宣纸白背景 */}
      <div className="hero__art">
        <img src={BOOT.imageSrc} alt="太和殿 · 鎏金宫殿插画" draggable="false" />
      </div>
      <div className="hero__main">
        <p className="hero__label">TRAVEL GALLERY · 旅行画廊</p>
        <h1 className="hero__title">旅游画廊</h1>
        <p className="hero__subtitle">五座城，五段路，收藏我走过的风景。</p>
        <div className="hero__actions">
          <button type="button" className="hero__btn" onClick={scrollToDestinations}>
            开始漫游 →
          </button>
          <span className="hero__note">共 5 座城 · 持续更新中</span>
        </div>
      </div>
    </header>
  )
}

export default Hero
