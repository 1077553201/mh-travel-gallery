import './CityArt.css'

// 五座城市的默认视觉图案：白色低透明度线条，叠在各自的城市渐变色块上
// 纯本地 SVG，断网可用；想换风格只需改对应分支里的图形
function CityArt({ id }) {
  if (id === 'tianjin') {
    // 天津·海河蓝：河面波浪线
    return (
      <svg
        className="city-art"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <path d="M-10 70 Q 40 50 90 70 T 190 70 T 290 70 T 390 70" strokeOpacity="0.4" />
          <path d="M-10 110 Q 40 90 90 110 T 190 110 T 290 110 T 390 110" strokeOpacity="0.55" />
          <path d="M-10 150 Q 40 130 90 150 T 190 150 T 290 150 T 390 150" strokeOpacity="0.7" />
        </g>
      </svg>
    )
  }

  if (id === 'leshan') {
    // 乐山·佛光金：日晕 + 山形剪影
    return (
      <svg
        className="city-art"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="200" cy="72" r="30" fill="white" fillOpacity="0.5" />
        <circle cx="200" cy="72" r="46" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="3" />
        <circle cx="200" cy="72" r="62" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
        <path d="M0 200 L110 105 L180 165 L250 95 L330 160 L400 200 Z" fill="white" fillOpacity="0.28" />
      </svg>
    )
  }

  if (id === 'harbin') {
    // 哈尔滨·冰晶青：六角雪花
    return (
      <svg
        className="city-art"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="white" fill="none" strokeLinecap="round">
          <g strokeWidth="4" strokeOpacity="0.55">
            <line x1="200" y1="30" x2="200" y2="170" />
            <line x1="140" y1="65" x2="260" y2="135" />
            <line x1="140" y1="135" x2="260" y2="65" />
          </g>
          <g strokeWidth="3" strokeOpacity="0.4">
            <path d="M200 62 L182 44 M200 62 L218 44 M200 138 L182 156 M200 138 L218 156" />
            <path d="M162 84 L146 78 M162 84 L158 68 M238 116 L254 122 M238 116 L242 132" />
            <path d="M162 116 L146 122 M162 116 L158 132 M238 84 L254 78 M238 84 L242 68" />
          </g>
          <circle cx="200" cy="100" r="10" strokeWidth="3" strokeOpacity="0.7" />
        </g>
      </svg>
    )
  }

  if (id === 'hunan') {
    // 湖南·湘西翠：层叠峰林剪影
    return (
      <svg
        className="city-art"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M0 200 L70 118 L140 200 Z" fill="white" fillOpacity="0.18" />
        <path d="M90 200 L185 92 L280 200 Z" fill="white" fillOpacity="0.26" />
        <path d="M215 200 L305 112 L395 200 Z" fill="white" fillOpacity="0.36" />
      </svg>
    )
  }

  if (id === 'hubei') {
    // 湖北·武当紫：圆月 + 云海曲线 + 楼阁剪影
    return (
      <svg
        className="city-art"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <circle cx="115" cy="68" r="34" fill="white" fillOpacity="0.35" />
        <g fill="none" stroke="white" strokeLinecap="round">
          <path d="M20 148 Q 70 122 120 148 T 220 148 T 320 148 T 420 148" strokeWidth="4" strokeOpacity="0.4" />
          <path d="M-10 176 Q 40 152 90 176 T 190 176 T 290 176 T 390 176" strokeWidth="4" strokeOpacity="0.55" />
        </g>
        <g fill="white" fillOpacity="0.32">
          <path d="M282 122 L332 122 L307 100 Z" />
          <rect x="291" y="122" width="6" height="32" />
          <rect x="318" y="122" width="6" height="32" />
          <path d="M284 154 L330 154 L323 147 L291 147 Z" />
        </g>
      </svg>
    )
  }

  return null
}

export default CityArt
