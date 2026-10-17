# 旅游画廊 · 设计系统（DESIGN SYSTEM)

> 所有数值与代码完全一致，定义见 [src/styles/tokens.css](./src/styles/tokens.css)。
> 组件样式只允许引用这些令牌（`var(--xxx)`），禁止硬编码色值。

## 1. 颜色

| 令牌 | 值 | 用在哪 |
|---|---|---|
| `--color-primary` | `#FF5C35` 珊瑚橙 | 主按钮文字、罗盘指北针、强调元素 |
| `--color-primary-hover` | `#E8482A` | 按钮 hover 时的文字色 |
| `--color-title` | `#1B2A4E` 墨蓝 | H1/H2/H3 标题、卡片城市名 |
| `--color-text` | `#4A5568` | 正文段落、卡片 slogan |
| `--color-text-muted` | `#8A93A6` | 栏目标签、辅助小字、页脚文字 |
| `--color-bg` | `#F4F2EE` 暖米灰 | 页面背景底色 |
| `--color-glass` | `rgba(255,255,255,0.6)` | 玻璃卡片底（配合 blur(16px)） |
| `--color-neu` | `#E9E7E2` | 新拟态：按钮凸起底、足迹面板/页脚凹陷底 |
| `--color-line` | `rgba(27,42,78,0.14)` | 1px 细线分隔（区块分隔线、列表分线） |
| `--color-success` | `#22C55E` | 成功状态提示（预留） |
| `--color-warning` | `#F59E0B` | 警告状态提示（预留） |
| `--color-error` | `#EF4444` | 错误状态提示（预留） |

五城专属色（卡片小标签底色、hover 发光、渐变图案底）：

| 令牌 | 值 | 城市 | 用在哪 |
|---|---|---|---|
| `--city-tianjin` | `#2E7CF6` 海河蓝 | 天津 | 标签底、hover 发光 |
| `--city-leshan` | `#E8A33D` 佛光金 | 乐山 | 标签底、hover 发光 |
| `--city-harbin` | `#22B8CF` 冰晶青 | 哈尔滨 | 标签底、hover 发光 |
| `--city-hunan` | `#2FA36B` 湘西翠 | 湖南 | 标签底、hover 发光 |
| `--city-hubei` | `#7C5CFF` 武当紫 | 湖北 | 标签底、hover 发光 |

约定例外（不计入"禁止硬编码"）：玻璃卡描边 `1px solid rgba(255,255,255,0.8)`；页面背景光斑为五城色的低透明度 `rgba()`；按钮高光条 `rgba(255,255,255,0.55)`。

## 2. 间距

基数 **8px**，最小单位 **4px**。全部走 tokens：

| 令牌 | 值 | 用在哪 |
|---|---|---|
| `--space-1` | 4px | 小标签上下内边距 |
| `--space-2` | 8px | 标签与标题间距、足迹列表项上下内边距 |
| `--space-3` | 12px | 按钮上下内边距 |
| `--space-4` | 16px | 小标签距图区边、按钮与小字间距 |
| `--space-6` | 24px | 卡片内边距（城市名/slogan 四周）、卡片列间距（手机/平板）、联系方式项间距 |
| `--space-8` | 32px | 标题下间距、卡片列间距（桌面）、页脚内边距 |
| `--space-12` | 48px | Hero 两栏间距、About 两栏间距（桌面） |
| `--space-16` | 64px | 区块垂直间距（手机/平板） |
| `--space-24` | 96px | Hero 上下留白 |
| `--space-32` | 128px | 区块垂直间距（桌面） |

- 页面左右边距 `--page-pad`：**20px**（< 640px）/ **32px**（640–1023px）/ **48px**（≥ 1024px）
- 卡片内边距：城市名与 slogan 四周 **24px**（`--space-6`）；小标签内边距 **4px 12px**（`--space-1` `--space-3`）
- 足迹清单面板内边距 **24px**（`--space-6`）

## 3. 圆角

| 令牌 | 值 | 使用场景 |
|---|---|---|
| `--radius-btn` | 14px | 「开始漫游」按钮 |
| `--radius-pill` | 999px | 胶囊形元素（预留：页码、胶囊标签） |
| `--radius-card` | 20px | 城市卡片、足迹清单面板；卡片图区上两角 20px |
| `--radius-image` | 24px | 大幅图片圆角（预留大图场景） |
| `--radius-tag` | 8px | 城市专属色小标签 |

## 4. 阴影

四条阴影的完整 CSS 值（与 tokens.css 逐字一致）：

| 令牌 | 完整值 | 用在哪 |
|---|---|---|
| `--shadow-glass` | `0 8px 32px rgba(27,42,78,0.10)` | 玻璃城市卡片 |
| `--shadow-neu-out` | `8px 8px 20px rgba(174,174,192,0.35), -8px -8px 20px rgba(255,255,255,0.95)` | 新拟态凸起：Hero 按钮 |
| `--shadow-neu-in` | `inset 6px 6px 12px rgba(174,174,192,0.40), inset -6px -6px 12px rgba(255,255,255,0.90)` | 新拟态凹陷：足迹清单面板、页脚条 |
| `--shadow-hover` | `0 20px 44px rgba(255,92,53,0.22)` | hover/focus 抬升：卡片、按钮 |

补充：卡片 hover/focus 发光叠加 `0 0 36px color-mix(in srgb, var(--card-color) 35%, transparent)`（城市专属色 35% 透明度外发光）。

## 5. 字体

字族（标题一律衬线，正文一律无衬线）：

```css
--font-serif: "Noto Serif SC", "Songti SC", "SimSun", serif;
--font-sans: "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
```

字号 / 字重 / 行高：

| 层级 | 字号 | 字重 | 行高 | 其他 | 字族 |
|---|---|---|---|---|---|
| H1 主标题 | `clamp(44px, 8vw, 96px)` | 700 | 1.1 | 字距 -0.02em | 衬线 |
| H2 区块标题 | `clamp(28px, 4vw, 52px)` | 700 | 1.2 | — | 衬线 |
| H3 卡片标题 | 24px | 600 | 继承 1.8 | — | 衬线 |
| 正文 | 17px | 400 | 1.8 | — | 无衬线 |
| 副标题 | 16px（< 640px）/ 18px（≥ 640px） | 400 | 1.8 | — | 无衬线 |
| 辅助文字 | 14px | 400 | 1.8 | — | 无衬线 |
| 栏目标签 | 12px | 500 | 1.8 | 字距 0.12em、大写 | 无衬线 |

## 6. 动效规范（补充项）

| 动效 | 时长 | 缓动 | 参数 |
|---|---|---|---|
| 卡片悬停抬升 | 280ms（`--dur-hover`） | `--ease-smooth` = `cubic-bezier(0.22, 1, 0.36, 1)` | 卡片 `translateY(-8px)`、图区/照片 `scale(1.06)`、阴影换 `--shadow-hover` + 发光 |
| 滚动淡入 | 500ms（`--dur-reveal`） | `ease-out` | `opacity 0→1`、`translateY(24px)→0`；IntersectionObserver 阈值 0.15；同组 delay 80ms 递增；只触发一次 |
| 按钮光效扫过 | 700ms（`--dur-sweep`） | `ease-in-out` | 高光条 `translateX(-120%)→120%`，渐变 `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)`；按钮同时 `translateY(-2px)` |

降级：`@media (prefers-reduced-motion: reduce)` 下所有 `transition/animation` 时长 0.01ms、delay 0ms，取消位移/放大/扫光，只保留极短淡入。hover 动效仅在 `@media (hover: hover)` 的指针设备启用。
