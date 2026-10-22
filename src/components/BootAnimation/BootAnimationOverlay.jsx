import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BOOT } from '../../data/bootConfig'
import './BootAnimationOverlay.css'

/* =============================================================================
   流金绘影 · 半座太和殿 —— 全屏开机动画（纯前端实时渲染，无动画库）

   渲染管线：
   1) 离屏 Canvas 边缘扫描：对 BOOT.imageSrc 逐像素求亮度梯度（右/下邻点），
      梯度超过阈值或深色墨线 → 写入鎏金色像素（顶部暖金飞檐 / 青铜鎏金主体 /
      汉白玉冷白），得到精细发光建筑线稿；粒子靶点按 24列 × 16行 网格分桶
      均匀采样（每个有效网格随机抽 4 点），保证飞檐/匾额/廊柱/石狮全殿
      等密度覆盖，不再全局按强度截断。
   2) 阶段一~二 极细流光丝线（0 ~ 3s）：严格 150 根，零 history 数组、零多步模拟
      循环。每帧唯一一次彻底清屏（setTransform 重置 + clearRect 整个位图），
      source-over 合成（单次清屏 + 锥形渐变填充，150 颗也绝不过曝、绝无圆点）。位置 = 纯函数 getPointOnCurve(s, pt)（线性插值 + 单频
      正弦包络波，freq 1.2~2.2 / amp 25~55），按当前时间直接算出每根丝线唯一
      进度（easeOutCubic）。起点严格在屏幕右缘外 x0 ∈ 102% ~ 110%（y0 = ty±80），
      终点严格在右殿区 tx ≥ 42vw（左半屏文字区零穿越）。身后 0.22 进度窗口
      解析采样 21 点，单次填充「极细头粗尾细丝线」：半径 pow(ratio,1.8)*0.85px
      （尾端 0.05px 发丝级 → 头部 0.85px），渐变尾透明 → 近头亮白金；
      只在最前端画唯一 1 个 1.3px 星点（3.2px 柔光）——绝不允许任何其他位置
      出现圆点。到达后彗尾随窗口收拢，1.15 倍进度内完全消失。
      靶点总数组创建后必须全局 Fisher-Yates 洗牌（杜绝按行 push 后前 N 个
      全挤顶部的 Bug），且只采 u∈[0.18,0.96]、v∈[0.08,0.96] 的高梯度建筑
      墨线区域，绝不落在空白天空。
   3) 线稿显影（1.2 ~ 2.4s）：粒子基本锁定后，EdgeCanvas 才以斜向渐变遮罩
      从左上飞檐向右下阶梯刷出鎏金线稿；2.5s 起粒子原地化作微弱星尘渐隐。
   4) 阶段三 晨光破晓（2.0 ~ 3.8s）：原图 radial 遮罩从 35% 35% 晕染浮现，
      背景由墨黛过渡到宣纸白。
   5) 阶段四 恒定溶解（3.8s~）：scale 恒 1、无模糊滤镜，与首页 Hero 太和殿
      区域零像素对齐；opacity 交叉溶解后卸载。

   文案：开机遮罩不渲染任何文字 DOM！真实首页 Hero 文字层级高于遮罩，
         颜色经 --bootReveal（color-mix）由浅宣纸白平滑过渡到深黛墨，
         从第 0 秒到结束自始至终只有同一个文字 DOM，绝无位置跳变。
   交互：鎏金进度条 + 呼吸提示，点击 / 回车随时进入阶段四。
   调试：?boott=秒数 冻结单帧；?noboot 直接跳过。prefers-reduced-motion 自动跳过。
   对齐：原图 <img>、EdgeCanvas、粒子靶点三套坐标全部走同一 getCoverRect
         （等价 object-fit: cover / object-position: left center 的映射），
         保证线稿与原图每一根瓦片、每一级台阶 0 像素误差、严丝合缝。
   ========================================================================== */

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (v) => { const t = clamp01(v); return t * t * (3 - 2 * t) }

/**
 * 通用 cover 映射：等价 CSS object-fit: cover; object-position: left center;
 * 返回图像在容器中的绘制矩形 —— 线稿重采样、靶点映射共用同一套坐标，严禁各自为政。
 */
function getCoverRect(imgWidth, imgHeight, containerWidth, containerHeight) {
  const sc = Math.max(containerWidth / imgWidth, containerHeight / imgHeight)
  const drawW = imgWidth * sc
  const drawH = imgHeight * sc
  return {
    drawX: 0, // left
    drawY: (containerHeight - drawH) / 2, // center（垂直）
    drawW,
    drawH,
    sc,
  }
}

/** '#RRGGBB' → [r,g,b] */
function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim())
  if (!m) return [255, 215, 130]
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function BootAnimationOverlay() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const paperRef = useRef(null)
  const artRef = useRef(null)
  const edgeRef = useRef(null)
  const fxRef = useRef(null)
  const barRef = useRef(null)
  const [phase, setPhase] = useState('loading') // loading → playing → dissolve → done
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useLayoutEffect(() => {
    let dead = false
    let raf = 0
    let W = 0
    let H = 0
    let imgW = 0
    let imgH = 0
    let particles = []
    let targets = []
    let t0 = performance.now()
    let last = performance.now()

    const root = rootRef.current
    const fx = fxRef.current
    const fctx = fx.getContext('2d')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const params = new URLSearchParams(window.location.search)
    const boott = parseFloat(params.get('boott'))
    const staticMode = reduced || Number.isFinite(boott)
    if (params.has('noboot')) {
      setPhase('done')
      return undefined
    }
    // 降级：无运动偏好且未指定冻结帧 → 完全跳过开机动画
    if (reduced && !Number.isFinite(boott)) {
      setPhase('done')
      return undefined
    }

    // 开机期间：真实首页 Hero 文字置顶显示（单一文字 DOM），并屏蔽其指针事件
    document.body.classList.add('booting')
    document.documentElement.style.setProperty('--bootReveal', '0')

    /* ---------- tokens（颜色/时长一律走 tokens.css） ---------- */
    const cs = getComputedStyle(document.documentElement)
    const tok = (n, f) => (cs.getPropertyValue(n) || '').trim() || f
    const num = (n, f) => { const v = parseFloat(tok(n, String(f))); return Number.isFinite(v) ? v : f }
    const GOLD = hexToRgb(tok('--boot-gold', '#FFD782'))
    const WARM = hexToRgb(tok('--boot-gold-warm', '#FFD700'))
    const JADE = hexToRgb(tok('--boot-jade', '#E2E8F0'))
    const FADE_MS = num('--dur-boot-fade', 850)
    const TOTAL_T = BOOT.dissolveStart + FADE_MS / 1000 // 进度条总时长（含交叉溶解）

    /* ---------- 时间轴常量 ---------- */
    const EDGE_T0 = BOOT.edgeStart
    const DISSOLVE_T = BOOT.dissolveStart

    /* ---------- 画布尺寸（全屏 fx 层） ---------- */
    let frozenT = null // 冻结调试模式的当前时刻（真实 resize 后需按此时刻补绘）
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const nw = Math.max(1, Math.round(window.innerWidth * dpr))
      const nh = Math.max(1, Math.round(window.innerHeight * dpr))
      if (nw === fx.width && nh === fx.height) return // 尺寸未变：避免重赋值清空画布
      W = window.innerWidth
      H = window.innerHeight
      fx.width = nw
      fx.height = nh
      fctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const onResize = () => {
      resize()
      renderEdge() // 容器尺寸变化：按新尺寸 × DPR 重采样线稿，保持锐利对齐
      // 靶点屏幕坐标随容器重算（cover 绘制矩形 + 归一化 u,v），防止 resize 后粒子飞偏
      if (particles.length) {
        computeMap()
        if (map.drawW) {
          for (const p of particles) {
            p.tx = map.left + p.tg.u * map.drawW
            p.ty = map.top + p.tg.v * map.drawH
          }
        }
      }
      // 冻结帧模式：画布若被重置，按当前时刻补绘（RAF 冻结循环也会持续重绘）
      if (frozenT !== null) drawFrame(frozenT)
    }
    resize()
    window.addEventListener('resize', onResize)

    /* ---------- EdgeCanvas DPR 高清重采样：与 <img> 共用同一 cover 映射，0 像素误差 ---------- */
    const renderEdge = () => {
      if (!offCanvas || !imgW || !artRef.current) return
      const edge = edgeRef.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = artRef.current.getBoundingClientRect()
      const ew = Math.max(1, Math.round(rect.width * dpr))
      const eh = Math.max(1, Math.round(rect.height * dpr))
      if (edge.width !== ew || edge.height !== eh) {
        edge.width = ew
        edge.height = eh
      }
      const r = getCoverRect(imgW, imgH, rect.width, rect.height)
      const ectx = edge.getContext('2d')
      ectx.imageSmoothingEnabled = true
      ectx.imageSmoothingQuality = 'high'
      ectx.clearRect(0, 0, ew, eh)
      ectx.drawImage(offCanvas, r.drawX * dpr, r.drawY * dpr, r.drawW * dpr, r.drawH * dpr)
    }

    /* ---------- 归一化靶点(u,v) → 屏幕坐标：与 <img>/EdgeCanvas 共用同一 cover 绘制矩形 ---------- */
    const map = { left: 0, top: 0, drawW: 0, drawH: 0 }
    const computeMap = () => {
      if (!imgW || !imgH || !artRef.current) return
      const art = artRef.current.getBoundingClientRect()
      const r = getCoverRect(imgW, imgH, art.width, art.height)
      // tx = stageLeft(art.left) + drawX + u * drawW；ty = stageTop(art.top) + drawY + v * drawH
      map.left = art.left + r.drawX
      map.top = art.top + r.drawY
      map.drawW = r.drawW
      map.drawH = r.drawH
    }
    /** 校验：tx 应落在 35vw~98vw、ty 应落在 8vh~95vh（?bootdebug 时打印） */
    const debugTargets = (pts) => {
      if (!params.has('bootdebug') || !pts.length) return
      const xs = pts.map((p) => map.left + p.u * map.drawW)
      const ys = pts.map((p) => map.top + p.v * map.drawH)
      console.debug('[boot] targets', {
        n: pts.length,
        txVW: [Math.min(...xs) / W, Math.max(...xs) / W].map((v) => v.toFixed(2)),
        tyVH: [Math.min(...ys) / H, Math.max(...ys) / H].map((v) => v.toFixed(2)),
      })
    }

    /* ================= 图片加载 → 离屏提取线稿 + 靶点 ================= */
    let offCanvas = null // 离屏线稿（图像分辨率），供 DPR 高清重采样
    const img = new Image()
    img.src = BOOT.imageSrc
    img.onload = () => {
      if (dead) return
      const iw0 = img.naturalWidth
      const ih0 = img.naturalHeight
      const cap = Math.min(1, BOOT.edgeMaxDim / Math.max(iw0, ih0))
      imgW = Math.round(iw0 * cap)
      imgH = Math.round(ih0 * cap)

      const off = document.createElement('canvas')
      offCanvas = off
      off.width = imgW
      off.height = imgH
      const octx = off.getContext('2d', { willReadFrequently: true })
      octx.imageSmoothingEnabled = true
      octx.imageSmoothingQuality = 'high'
      octx.drawImage(img, 0, 0, imgW, imgH)
      const src = octx.getImageData(0, 0, imgW, imgH).data

      const lum = new Float32Array(imgW * imgH)
      for (let i = 0; i < lum.length; i++) {
        lum[i] = 0.299 * src[i * 4] + 0.587 * src[i * 4 + 1] + 0.114 * src[i * 4 + 2]
      }

      const outImg = octx.createImageData(imgW, imgH)
      const od = outImg.data
      const thr = BOOT.edgeThreshold
      /* 24列 × 16行 网格分桶：每个有效网格随机抽取固定上限的靶点，
         保证飞檐/匾额/廊柱/石狮全殿等密度均匀覆盖（替代全局强度排序截断） */
      const GW = 24
      const GH = 16
      const cellW = imgW / GW
      const cellH = imgH / GH
      const PER_CELL = 4
      const CELL_KEEP = 48 // 每桶候选上限（控制内存）
      const cells = Array.from({ length: GW * GH }, () => [])

      for (let y = 0; y < imgH - 1; y++) {
        for (let x = 0; x < imgW - 1; x++) {
          const i = y * imgW + x
          const g = Math.abs(lum[i + 1] - lum[i]) + Math.abs(lum[i + imgW] - lum[i])
          const ink = lum[i] < BOOT.inkLum
          if (g <= thr && !ink) continue
          const strength = g + (ink ? 64 : 0)
          const alpha = clamp01((g - thr) / 170 + (ink ? 0.5 : 0.28))
          // 鎏金配色：上部暖色飞檐 → 暖金；亮色汉白玉/留白 → 冷白；其余 → 青铜鎏金
          let col
          if (lum[i] > BOOT.marbleLum) col = JADE
          else if (y < imgH * 0.42 && src[i * 4] > src[i * 4 + 2]) col = WARM
          else col = GOLD
          const p4 = i * 4
          od[p4] = col[0]
          od[p4 + 1] = col[1]
          od[p4 + 2] = col[2]
          od[p4 + 3] = Math.round(alpha * 255)
          // 靶点只采真正的建筑区域：u ∈ [0.18, 0.96]（跳过左侧纯空白）、
          // v ∈ [0.08, 0.96]（飞檐到最底部台阶/香炉/石狮），且提高梯度阈值，
          // 确保靶点 100% 落在太和殿建筑墨线上，绝不落在空白天空里
          const inRegion = x >= imgW * 0.18 && x <= imgW * 0.96
            && y >= imgH * 0.08 && y <= imgH * 0.96
          if (inRegion && (g > thr * 1.8 || ink)) {
            const cx = Math.min(GW - 1, (x / cellW) | 0)
            const cy = Math.min(GH - 1, (y / cellH) | 0)
            const arr = cells[cy * GW + cx]
            if (arr.length < CELL_KEEP) arr.push({ x, y, s: strength, col })
          }
        }
      }
      octx.putImageData(outImg, 0, 0) // off 现持有鎏金线稿
      renderEdge() // 按容器尺寸 × DPR 高清重采样到挂载画布

      // 靶点：逐网格洗牌后均匀抽取（每个有效网格至多 PER_CELL 个）。
      // 关键：直接存归一化相对坐标 u,v ∈ [0,1]（杜绝任何缩放分母用错的风险），
      // 映射到屏幕时统一走 getCoverRect 的绘制矩形。
      targets = []
      for (const arr of cells) {
        if (!arr.length) continue
        for (let i = arr.length - 1; i > 0; i--) {
          const j = (Math.random() * (i + 1)) | 0
          const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
        }
        const n = Math.min(PER_CELL, arr.length)
        for (let i = 0; i < n; i++) {
          const p = arr[i]
          targets.push({
            u: p.x / imgW,
            v: p.y / imgH,
            rgb: `rgb(${p.col[0]},${p.col[1]},${p.col[2]})`,
          })
        }
      }
      // 关键！网格按行 push 会使 targets 顺序自上而下分组，创建 90 个粒子时
      // 直接取前 N 个会全部落在顶部几行 —— 必须对最终 targets 总数组全局洗牌：
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const tmp = targets[i]; targets[i] = targets[j]; targets[j] = tmp
      }

      // 流光丝线：严格 65 根。先显式计算 cover 绘制矩形，靶点用归一化 u,v 直接映射；
      // 起点严格在屏幕最右侧边缘外（102% ~ 110%），终点钳制在右殿区（tx ≥ 42vw），
      // 屏幕左侧 40% 文字区绝不允许任何丝线穿越
      computeMap()
      particles = []
      if (map.drawW && targets.length) {
        debugTargets(targets)
        for (let i = 0; i < BOOT.particleCount; i++) {
          const tg = targets[i % targets.length]
          const tx = Math.max(map.left + tg.u * map.drawW, W * 0.42) // 死守右半屏
          const ty = map.top + tg.v * map.drawH
          const x = W * (1.02 + Math.random() * 0.08) // 出生点：右缘外 102% ~ 110%
          const y = ty + (Math.random() - 0.5) * 160    // 与靶点同高 ±80px
          particles.push({
            tg,                    // 归一化靶点(u,v)，resize 后重算 tx/ty 用
            x0: x, y0: y,          // 出生点（固定）
            tx, ty,                // 靶点真实屏幕坐标
            startAt: 0.05 + Math.random() * 1.15,  // 错峰出发 0.05s~1.2s：源源不断、前赴后继的银河感
            dur: 1.15 + Math.random() * 0.75,      // 飞行时长（duration）
            freq: 1.2 + Math.random() * 1.0,       // 单频舒展柔波 1.2 ~ 2.2
            amp: 25 + Math.random() * 30,          // 振幅 25 ~ 55
            phase: Math.random() * Math.PI * 2,
          })
        }
      }

      setPhase('playing')
      if (staticMode) {
        // 冻结单帧（截图调试）：位置是纯函数，无需预演，直接持续重绘目标时刻
        frozenT = Number.isFinite(boott) ? boott : 4.2
        raf = requestAnimationFrame(frozenFrame)
      } else {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    img.onerror = () => setPhase('done') // 图片缺失：静默跳过开机动画（回退）

    /* ---------- 曲线纯函数：输入进度 s ∈ [0,1]，直接返回该进度下的曲线坐标 ----------
       严禁 history 队列 / 时间步进循环 —— 每帧按当前时间直接求值。 */
    function getPointOnCurve(s, pt) {
      const t = Math.max(0, Math.min(1, s))
      const bx = pt.x0 + (pt.tx - pt.x0) * t
      const by = pt.y0 + (pt.ty - pt.y0) * t
      const env = Math.sin(t * Math.PI) // 起终点为0，中间弯曲
      const waveY = Math.sin(t * Math.PI * pt.freq + pt.phase) * pt.amp * env
      const waveX = Math.cos(t * Math.PI * pt.freq + pt.phase) * (pt.amp * 0.25) * env
      return { x: bx + waveX, y: by + waveY }
    }

    /* ================= 绘制单帧（无副作用，同一时刻可反复重绘） ================= */
    function drawFrame(t) {
      // —— CSS 变量与图层状态 ——
      const reveal = smooth((t - BOOT.paperFadeStart) / (BOOT.paperFadeEnd - BOOT.paperFadeStart))
      root.style.setProperty('--bootReveal', reveal.toFixed(3))
      // 同步到 <html>：真实首页 Hero 文字颜色经 color-mix 平滑过渡（单一文字 DOM）
      document.documentElement.style.setProperty('--bootReveal', reveal.toFixed(3))
      // 线稿显影：1.2s ~ 2.4s（粒子基本锁定之后才开始，先粒子后线稿）
      root.style.setProperty('--bootEdge', smooth((t - EDGE_T0) / 1.2).toFixed(3))
      paperRef.current.style.opacity = reveal.toFixed(3)
      // 阶段四：恒定尺寸（取消推镜缩放，与首页 Hero 太和殿区域零像素对齐）
      stageRef.current.style.transform = 'scale(1)'
      barRef.current.style.transform = `scaleX(${clamp01(t / TOTAL_T).toFixed(3)})`

      /* ============ 粒子绘制：零 history、零多步循环，按当前时间直接求值 ============
         1. 每帧开头必须重置变换矩阵并彻底清空整个画布（绝不允许残留上一帧的任何像素！） */
      fctx.save()
      fctx.setTransform(1, 0, 0, 1, 0, 0)
      fctx.clearRect(0, 0, fx.width, fx.height)
      fctx.restore()

      // 使用正常混合模式 source-over（严禁使用 lighter 导致线条发白变粗！）
      fctx.globalCompositeOperation = 'source-over'

      for (const pt of particles) {
        // 计算当前粒子归一化飞行进度 rawP ∈ [0, 1]
        const rawP = (t - pt.startAt) / pt.dur
        if (rawP <= 0 || rawP >= 1.15) continue

        const pHead = Math.min(1, 1 - Math.pow(1 - Math.min(1, rawP), 3)) // easeOutCubic
        // 尾巴在粒子到达终点(rawP > 1)后迅速收拢消失
        const tailSpan = rawP > 1 ? Math.max(0, 0.22 * (1 - (rawP - 1) / 0.15)) : Math.min(pHead, 0.22)
        const pTail = Math.max(0, pHead - tailSpan)
        if (pHead - pTail < 0.005) continue

        // 2. 在 [pTail, pHead] 区间内实时解析采样 20 个连续曲线点（绝不依赖 history 队列！）
        const N = 20
        const pts = []
        for (let i = 0; i <= N; i++) {
          const s = pTail + (pHead - pTail) * (i / N)
          pts.push(getPointOnCurve(s, pt))
        }

        // 3. 绘制「极细、距头部越近越粗、远离头部慢慢变细淡出消失」的丝线
        // 最大半径仅 0.85px（总直径 1.7px），尾端半径 0.05px（发丝级极细！）
        const head = pts[N]
        const tail = pts[0]
        const grad = fctx.createLinearGradient(tail.x, tail.y, head.x, head.y)
        grad.addColorStop(0.0, 'rgba(245, 200, 105, 0.0)')   // 尾端完全透明消失
        grad.addColorStop(0.4, 'rgba(245, 200, 105, 0.22)')  // 后段极淡细丝
        grad.addColorStop(0.85, 'rgba(255, 225, 145, 0.72)') // 近头部温润亮金
        grad.addColorStop(1.0, 'rgba(255, 248, 220, 0.95)')  // 紧贴头部处最亮

        const leftSide = []
        const rightSide = []
        for (let i = 0; i <= N; i++) {
          const ratio = i / N // 0(最远尾端) -> 1(前端点)
          // 距离前端点越近越粗（最大半径仅 0.85px），越远越细直至 0px！
          const r = Math.pow(ratio, 1.8) * 0.85
          const prev = pts[Math.max(0, i - 1)]
          const next = pts[Math.min(N, i + 1)]
          const dx = next.x - prev.x
          const dy = next.y - prev.y
          const len = Math.hypot(dx, dy) || 1
          const nx = -dy / len
          const ny = dx / len
          leftSide.push({ x: pts[i].x + nx * r, y: pts[i].y + ny * r })
          rightSide.push({ x: pts[i].x - nx * r, y: pts[i].y - ny * r })
        }

        fctx.beginPath()
        fctx.moveTo(tail.x, tail.y)
        for (let i = 1; i <= N; i++) fctx.lineTo(leftSide[i].x, leftSide[i].y)
        for (let i = N; i >= 1; i--) fctx.lineTo(rightSide[i].x, rightSide[i].y)
        fctx.closePath()
        fctx.fillStyle = grad
        fctx.fill()

        // 4. 只在最前端 head 处画「唯一 1 个」精致的小星点（严禁在其他点画圆！）
        // 核心半径仅 1.3px，外围微弱柔光半径仅 3.2px
        const dotGlow = fctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 3.2)
        dotGlow.addColorStop(0.0, 'rgba(255, 255, 240, 1.0)')
        dotGlow.addColorStop(0.45, 'rgba(255, 230, 150, 0.65)')
        dotGlow.addColorStop(1.0, 'rgba(255, 200, 90, 0.0)')
        fctx.fillStyle = dotGlow
        fctx.beginPath()
        fctx.arc(head.x, head.y, 3.2, 0, Math.PI * 2)
        fctx.fill()
      }
    }

    /* ================= 单帧推进（真实播放：绘制；位置是纯函数，无物理积分） ================= */
    function step(t, dtms) {
      drawFrame(t)
      // —— 进入阶段四：交叉溶解 ——
      if (!staticMode && t >= DISSOLVE_T && phaseRef.current === 'playing') {
        setPhase('dissolve')
        window.setTimeout(() => {
          if (!dead) setPhase('done')
        }, FADE_MS + 60)
      }
    }

    /* 冻结帧循环：同一时刻反复重绘，抵御 resize/合成等导致的画布重置 */
    function frozenFrame() {
      if (dead) return
      drawFrame(frozenT)
      raf = requestAnimationFrame(frozenFrame)
    }

    function frame(now) {
      if (dead || phaseRef.current === 'done') return
      const dtms = Math.min(50, now - last)
      last = now
      step((now - t0) / 1000, dtms)
      raf = requestAnimationFrame(frame)
    }

    /* ---------- 交互：随时「步入太和」----------
       window 级监听：Hero 按钮（z-1001 高于遮罩）点击/用户滚轮同样触发跳过，
       绝不拦截页面滚动与「开始漫游 →」点击。 */
    const skip = () => {
      if (staticMode || phaseRef.current !== 'playing') return
      t0 = performance.now() - DISSOLVE_T * 1000 // 时钟跳到阶段四起点
    }
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        skip()
      }
    }
    root.addEventListener('click', skip)
    root.addEventListener('keydown', onKey)
    window.addEventListener('click', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    // 兜底：RAF 异常卡死时最迟 6s 强制卸载遮罩，恢复全部交互
    const failsafe = staticMode ? 0 : window.setTimeout(() => {
      if (!dead && phaseRef.current !== 'done') setPhase('done')
    }, 6000)

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      if (failsafe) window.clearTimeout(failsafe)
      window.removeEventListener('resize', onResize)
      root.removeEventListener('click', skip)
      root.removeEventListener('keydown', onKey)
      window.removeEventListener('click', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      document.body.classList.remove('booting')
      document.documentElement.style.setProperty('--bootReveal', '1')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'done') return null

  /* 文案策略：遮罩层不渲染任何文字 DOM。真实首页 Hero 文字（含「共 5 座城 · 持续更新中」）
     层级高于遮罩，颜色随 --bootReveal 由浅宣纸白过渡到深黛墨 → 自始至终单一文字 DOM。 */
  return (
    <div
      className={`boot ${phase === 'dissolve' ? 'boot--dissolve' : ''}`}
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-label="开机动画：轻触进入"
    >
      <div className="boot__stage" ref={stageRef}>
        <div className="boot__paper" ref={paperRef} />
        <div className="boot__art" ref={artRef}>
          <img className="boot__img" src={BOOT.imageSrc} alt="" draggable="false" />
          <canvas className="boot__edge" ref={edgeRef} aria-hidden="true" />
        </div>
        <canvas className="boot__fx" ref={fxRef} aria-hidden="true" />
      </div>
      <div className="boot__hud">
        <p className="boot__hint">{BOOT.hint}</p>
        <div className="boot__track">
          <div className="boot__bar" ref={barRef} />
        </div>
      </div>
    </div>
  )
}

export default BootAnimationOverlay
