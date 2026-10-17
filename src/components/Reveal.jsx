import { useEffect, useRef, useState } from 'react'
import './Reveal.css'

// 通用滚动淡入组件：进入视口（阈值 0.15）后播放一次，之后不再重复
// delay 单位 ms，同组元素可传 0/80/160/... 做错开
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // 只触发一次：出现后不再重复动画
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    // 清理：组件卸载时断开观察，否则 IntersectionObserver 引用已卸载的 DOM 造成内存泄漏
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
