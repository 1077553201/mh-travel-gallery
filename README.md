# 旅游画廊 Travel Gallery

五座城市的旅行画廊——一个纯前端 React 练习项目，把走过的风景做成一页会呼吸的杂志：开屏是「流金绘影 · 半座太和殿」金色丝线汇入宫殿的全屏动画，落版为左文右画的宣纸留白首页。

## 项目亮点

- **开机动画「流金绘影」**：150 根发丝级极细流光丝线（最大半径仅 0.85px、头部唯一星点），从屏幕右缘外汇入右侧太和殿——每帧整屏强制清屏 + 纯函数曲线求值，零 history、零多步循环、零过曝；粒子靶点按 24×16 网格分桶均匀采样并全局洗牌，飞檐到台阶全殿覆盖
- **零跳变移交**：开机动画与首页 Hero 的太和殿渲染盒逐像素重合（同一 68vw 右锁容器 + 同一 mask + 同一 cover 映射）；全站只有**一个文字 DOM**（`color-mix` 随 `--bootReveal` 由浅宣纸白过渡到深黛墨），绝无位置跳变
- **鎏金线稿提取**：对 `taihedian.jpg` 离屏 Canvas 逐像素亮度梯度扫描，生成暖金/青铜/汉白玉三色线稿，与 `<img>` 共用 `getCoverRect` cover 映射 + DPR 高清重采样，0 像素误差
- **三种风格融合**：杂志风骨架（超大衬线标题、1px 细线、大留白）+ 玻璃拟态卡片（`backdrop-filter: blur(16px)` + 白描边）+ 新拟态点睛，页面背景叠五城色柔光斑
- **动效全家桶**（纯 CSS + 原生 JS，无动画库）：悬停抬升/发光/图片放大 1.08（0.4s）、滚动淡入（500ms 错开 80ms）、按钮高光扫过（700ms）
- **响应式**：移动优先，640px / 1024px 两断点；桌面 3 列网格 `align-items: stretch` + flex 列等高对齐，湖南宽卡（span 2）图片 260px
- **零外链素材**：太和殿大图 + CSS 渐变/SVG 兜底，断网完整；照片丢进 `public/photos/` 即自动替换

## 技术栈

- React 18+（本项目 19.2）
- Vite
- 纯 CSS（CSS 变量设计令牌、Grid / Flex、`clamp()`、`color-mix()`、媒体查询；**无 UI 库、无动画库、无 Tailwind**）

## 本地运行

```bash
npm install     # 安装依赖
npm run dev     # 开发模式 → http://localhost:5173
npm run build   # 构建产物输出到 dist/
npm run preview # 本地预览构建产物
```

调试参数：`?boott=2.2` 冻结开机动画单帧 · `?bootdebug` 打印靶点分布 · `?noboot` 跳过开机动画

## 目录结构

```
03travel-gallery/
├── index.html
├── README.md               # 本文件
├── DESIGN_SYSTEM.md        # 设计规范（颜色/间距/圆角/阴影/字体/动效）
├── docs/
│   └── STAGE_PROMPTS.md    # 分阶段提示词（阶段0~9课程主线 + 阶段10~13后加进阶）
├── public/
│   ├── taihedian.jpg       # 太和殿大图（开机动画 + Hero 右侧画卷）
│   └── photos/             # 自己的照片放这里（内附说明）
└── src/
    ├── data/
    │   ├── cities.js       # 五城真实旅行文案与数据
    │   └── bootConfig.js   # 开机动画配置（时间轴/粒子规模/边缘阈值）
    ├── styles/
    │   ├── tokens.css      # 设计令牌（CSS 变量）
    │   └── global.css      # 全局重置与页面光斑背景
    ├── components/
    │   ├── BootAnimation/  # 开机动画遮罩（边缘扫描 + 极细丝线 + 溶解移交）
    │   ├── Hero/           # 主视觉（左文右殿 · 单一文字 DOM）
    │   ├── Highlights/     # 目的地卡片列表（等高网格 + Hover 放大）
    │   ├── About/          # 介绍与足迹清单
    │   ├── Footer/         # 页脚（透明背景无缝融合）
    │   ├── CityArt/        # 五城 SVG 图案（无照片时的默认视觉）
    │   └── Reveal.jsx      # 滚动淡入通用组件（IntersectionObserver）
    ├── App.jsx
    └── main.jsx
```

## 截图

> 📁 **把所有截图放进项目根目录的 `screenshots/` 文件夹**（没有就新建一个），文件名必须与下面完全一致，README 才能自动显示：

| 放这个文件 | 截什么 | 怎么截 |
| --- | --- | --- |
| `screenshots/boot-animation.gif` | 开机动画过程 | 录屏 5 秒（动画全程约 4.7s），转成 gif；嫌麻烦可换成 `boot-particles.png` 冻帧 |
| `screenshots/boot-particles.png` | 金色丝线汇入太和殿 | 访问 `http://localhost:5173/?boott=2.2`，等冻结帧渲染后截图（桌面 1280px+ 宽度） |
| `screenshots/hero.png` | 首页 Hero 最终态 | 动画播完（或 `?noboot`），显示「旅游画廊」标题 + 右侧太和殿 + 底部页脚以上的首屏 |
| `screenshots/highlights.png` | 五城卡片桌面全景 | 滚到「目的地」区块，3 列卡片 + 湖南宽卡完整入镜 |
| `screenshots/card-hover.png` | 卡片 Hover 放大 | 鼠标悬停任意卡片（如「哈尔滨 · 雪国童话」），图片放大 1.08 时截图 |
| `screenshots/about-footer.png` | 关于画廊 + 页脚 | 滚到页面底部，About 段落与透明页脚（联系方式 + 版权行）一起截 |
| `screenshots/mobile.png` | 移动端整页 | 浏览器 DevTools 设备模拟 375px，整页截长图 |

![开机动画 · 金丝入殿](screenshots/boot-animation.gif)

![首页 Hero · 左文右殿](screenshots/hero.png)

![目的地卡片](screenshots/highlights.png)

![关于画廊与页脚](screenshots/about-footer.png)

![移动端 375px](screenshots/mobile.png)

## 设计说明

颜色、间距、圆角、阴影、字体与动效的具体数值见 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)；组件样式统一引用 `src/styles/tokens.css` 中的 CSS 变量；开机动画的渲染管线与配置说明见 [docs/STAGE_PROMPTS.md](./docs/STAGE_PROMPTS.md) 进阶阶段。

## 学习笔记

第一次把一个页面从头拆成组件：数据放 `data/`、结构放 JSX、样式跟着组件文件走，改哪一块一目了然。React 的状态与 `key` 让我明白"界面是数据的映射"，列表变了 UI 自己跟着变。封装 `Reveal` 时踩过监听器泄漏的坑，才真正理解 `useEffect` 的清理函数为什么必须写。后来给画廊加开机动画，又学会了用 Canvas 纯函数渲染代替状态累积——每帧从零算出一整帧，比维护一堆历史状态干净得多。

## 版权

© 2026 旅游画廊 Travel Gallery · 用脚步丈量世界
