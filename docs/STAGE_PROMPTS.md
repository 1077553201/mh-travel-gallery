# 旅游画廊 · 分阶段 Agent 提示词（按顺序复制使用）

> 用法：每完成一个阶段、自检通过后，再复制下一阶段的提示词。
> 每条提示词都包含"讲解要求"，Agent 会边做边教你 React——看懂比跑通更重要。
> 提示词中若出现命令，直接让 Agent 执行即可；若你自己执行，请在项目根目录运行。

---

## 阶段 0 · React 速成 + 环境准备

```
【复制起点】

你是一位耐心的前端导师 + 工程师。我有一些 HTML/CSS/JS 基础，但 React 是新手，我要做一个叫「旅游画廊」的 React 练习项目（Vite + React，纯前端静态页面）。这一阶段你先不写项目代码，只做两件事：

一、环境准备（帮我检查/指导安装）：
1. 检查 Node.js 是否安装：运行 node -v 和 npm -v（建议 Node 18+）。没装就告诉我去 https://nodejs.org 下载 LTS 版并安装，装完再验证。
2. 检查 Git：运行 git -v，没装就给出安装方法。
3. 告诉我之后所有命令都在 d:\Desktop\ClassMaterials\tzy\03travel-gallery 目录下执行。

二、用 ≤800 字给我讲清下面 8 个 React 核心概念，每个概念都要配一个"和旅游画廊项目相关"的迷你例子（伪代码即可）：
1. 组件：返回 JSX 的函数（比如 Hero 组件、CityCard 组件）
2. JSX：长得像 HTML 的 JS，为什么 className 而不是 class
3. props：父组件向子组件传数据（比如把城市名传给卡片）
4. useState：组件内部的状态（比如记录哪张卡片被点击）
5. useEffect：副作用与生命周期（后面滚动动画会用到它）
6. 列表渲染：用 map 渲染 5 张城市卡片，key 为什么必须写
7. 事件处理：onClick、onMouseEnter 怎么写
8. 样式组织：每个组件一个 .css 文件 import 进来，和全局 CSS 的区别

另外再讲清楚：Vite 是什么、npm run dev / build / preview 分别做什么、ES Module 的 import/export 在项目里怎么用。

最后给我 3 道 1 分钟自测题（口头答），我答完你告诉我对不对。

【复制终点】
```

---

## 阶段 1 · 项目初始化 + 设计令牌

```
【复制起点】

继续「旅游画廊」项目。我在 d:\Desktop\ClassMaterials\tzy\03travel-gallery 目录（当前目录已有 docs/ 文件夹，这是正常的，创建脚手架时如果提示目录非空，选忽略并继续）。这一阶段做：Vite + React 项目初始化 + 设计令牌。

一、脚手架：
1. 在当前目录创建 Vite + React 项目（模板 react，不要 react-ts，我要 JS 版）。如果工具询问"当前目录非空是否继续"，选择忽略文件并继续。
2. 安装依赖后运行 npm run dev 确认能启动，告诉我本地地址（一般是 http://localhost:5173）。
3. 清理模板自带的 App.css / index.css 内容、删掉默认 logo 与示例代码，让页面先显示一行"旅游画廊 · 准备中"。

二、建立设计令牌文件 src/styles/tokens.css，用 CSS 变量严格写入以下数值（一个都不要改）：

:root {
  /* 颜色 */
  --color-primary: #FF5C35;        /* 主色·珊瑚橙 */
  --color-primary-hover: #E8482A;  /* 主色悬停 */
  --color-title: #1B2A4E;          /* 标题·墨蓝 */
  --color-text: #4A5568;           /* 正文 */
  --color-text-muted: #8A93A6;     /* 次要文字 */
  --color-bg: #F4F2EE;             /* 页面背景·暖米灰 */
  --color-glass: rgba(255,255,255,0.6);   /* 玻璃卡底 */
  --color-neu: #E9E7E2;            /* 新拟态底 */
  --color-line: rgba(27,42,78,0.14);      /* 细线 */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  /* 五城专属色 */
  --city-tianjin: #2E7CF6;   /* 天津·海河蓝 */
  --city-leshan: #E8A33D;    /* 乐山·佛光金 */
  --city-harbin: #22B8CF;    /* 哈尔滨·冰晶青 */
  --city-hunan: #2FA36B;     /* 湖南·湘西翠 */
  --city-hubei: #7C5CFF;     /* 湖北·武当紫 */
  /* 间距（基数 8px） */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-32: 128px;
  /* 圆角 */
  --radius-btn: 14px;
  --radius-pill: 999px;
  --radius-card: 20px;
  --radius-image: 24px;
  --radius-tag: 8px;
  /* 阴影 */
  --shadow-glass: 0 8px 32px rgba(27,42,78,0.10);
  --shadow-neu-out: 8px 8px 20px rgba(174,174,192,0.35), -8px -8px 20px rgba(255,255,255,0.95);
  --shadow-neu-in: inset 6px 6px 12px rgba(174,174,192,0.40), inset -6px -6px 12px rgba(255,255,255,0.90);
  --shadow-hover: 0 20px 44px rgba(255,92,53,0.22);
  /* 字体 */
  --font-serif: "Noto Serif SC", "Songti SC", "SimSun", serif;
  --font-sans: "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
  /* 动效 */
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-hover: 280ms;
  --dur-reveal: 500ms;
  --dur-sweep: 700ms;
}

三、建立 src/styles/global.css 并在 main.jsx 里引入 tokens.css 和 global.css：
1. * { box-sizing: border-box; margin: 0; padding: 0; }
2. body 用 --color-bg 背景、--font-sans 字体、--color-text 文字色、line-height 1.8。
3. 图片 max-width: 100%; display: block;
4. a 继承文字色、去掉下划线（hover 时给主色）。
5. 加 @media (prefers-reduced-motion: reduce) 的全局降级规则：* { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }。

四、讲解要求（边做边教）：完成后用 ≤200 字解释：① tokens.css 这种"设计令牌"做法的好处；② main.jsx 里 import './styles/tokens.css' 的执行顺序；③ :root 是什么、var(--xxx) 怎么取值。

验收自查后报告：dev 服务器地址、文件清单、任何报错。

【复制终点】
```

---

## 阶段 2 · 组件拆分 + 静态内容

```
【复制起点】

继续「旅游画廊」项目（Vite + React，设计令牌已在 src/styles/tokens.css）。这一阶段只做：内容数据 + 四个组件的静态结构，先不做复杂样式（简单排版即可）。

一、新建 src/data/cities.js，导出 5 个目的地数据（数组），字段固定为：id、name、slogan（一句话）、desc（卡片背面可省）、color（引用对应 CSS 变量名字符串）、gradient（一组渐变色数组用于背景）：

1. 天津 —— slogan："海河边的风，吹过万国建筑的夜。"
2. 乐山 —— slogan："三江汇流处，坐看大佛千年。"
3. 哈尔滨 —— slogan："零下二十度的中央大街，冰灯把夜点亮。"
4. 湖南 —— slogan："张家界三千奇峰，云雾里走一遭。"
5. 湖北 —— slogan："长江穿城而过，黄鹤楼上望楚天。"

二、新建四个组件（每个组件一个文件夹，里面 .jsx + .css，样式这阶段只写最基本的字号与间距，全部引用 tokens.css 的变量）：

1. src/components/Hero/Hero.jsx —— 主视觉：
   - 栏目标签："TRAVEL GALLERY · 旅行画廊"
   - 主标题（H1）："旅游画廊"
   - 副标题："五座城，五段路，收藏我走过的风景。"
   - 一个按钮："开始漫游 →"（按钮先只放结构，动效后面阶段做）

2. src/components/Highlights/Highlights.jsx —— 亮点卡片：
   - 区块标题（H2）："目的地" + 小标签 "01 — DESTINATIONS"
   - 用 cities.js 的 map 渲染 5 张卡片（这就是列表渲染，key 用城市 id）
   - 每张卡片结构：城市图区（这阶段先放一个渐变色块 div）+ 城市名（H3）+ 一句话 slogan
   - 注释写清楚：这里作业要求 3 张，我们放 5 张更饱满

3. src/components/About/About.jsx —— 介绍段落（严格 150 字以内，用这段原文）：
   "旅游画廊记录我走过的五座城：天津的海河夜风、乐山的江雾大佛、哈尔滨的冰雪长街、湖南的湘西奇峰、湖北的长江烟波。从严冬到盛夏，从北方的爽利到南方的温润，每一程都有自己的颜色。这里没有攻略，只有照片和心情。愿这些画面也能提醒你：世界很大，出发永远不晚。"
   - 区块标题（H2）："关于这本画廊" + 小标签 "02 — ABOUT"
   - 介绍段落旁边放一个小的"足迹清单"列表：天津 / 乐山 / 哈尔滨 / 湖南 / 湖北（列表项交错动画在阶段 4 做）

4. src/components/Footer/Footer.jsx —— 页脚：
   - 联系方式（虚拟的）：邮箱 hello@travel-gallery.example；微信 travel_gallery；小红书 @旅游画廊
   - 版权行："© 2026 旅游画廊 Travel Gallery · 用脚步丈量世界"
   - 细线分隔 + 小字排版

三、在 App.jsx 里按顺序组装：Hero → Highlights → About → Footer。

四、讲解要求（≤250 字）：① 为什么把文案抽到 data/cities.js 而不是写死在 JSX 里；② 组件文件夹里 .jsx 和 .css 是怎么配合的（import 顺序）；③ map 渲染列表时 key 的作用。

验收自查后报告：页面从上到下四部分内容是否都渲染出来了、有无控制台报错。

【复制终点】
```

---

## 阶段 3 · 视觉样式（玻璃拟态 + 新拟态 + 杂志风 + 多彩）

```
【复制起点】

继续「旅游画廊」项目。这一阶段只做视觉样式，不加动效（动效是下一阶段）。风格是三种融合 + 多彩气质，全部数值用 tokens.css 里的变量：

【风格基准】
- E 编辑/杂志风（骨架）：超大衬线标题、大留白、1px 细线分隔（用 --color-line）、12px 大写字距 0.12em 的栏目标签
- A 玻璃拟态（层叠）：卡片背景 var(--color-glass) + backdrop-filter: blur(16px) + 1px 白色描边（border: 1px solid rgba(255,255,255,0.8)）+ var(--shadow-glass)，叠在彩色渐变背景上
- B 新拟态（点睛）：按钮/标签/页码用 var(--color-neu) 底 + var(--shadow-neu-out) 凸起；标签选中态、输入框类元素用 var(--shadow-neu-in) 凹陷
- d 多彩活力（灵魂）：每个城市用自己的专属色做卡片顶部色块/渐变，页面背景放 2-3 个大面积柔和彩色渐变光斑（radial-gradient，模糊、低透明度）

【逐块要求】
1. 页面整体：背景 var(--color-bg)，其上叠两三个大尺寸 radial-gradient 光斑（颜色取五城专属色的低透明度版本），位置错落，营造多彩氛围但不能影响文字可读。
2. Hero（杂志封面感）：H1 用 --font-serif、clamp(44px, 8vw, 96px)、700、--color-title，字距略收紧（-0.02em）；副标题 17-20px --color-text；栏目标签小字大写；标题上方或右侧放竖排小字装饰（如 "NO.01 / 2026"）；按钮用新拟态凸起样式、圆角 var(--radius-btn)、文字 --color-primary，按钮旁可放一行 14px 次要文字。Hero 整体上下留白要大（≥96px）。
3. Highlights：卡片背景玻璃 + blur + 白描边 + --shadow-glass，圆角 --radius-card，图片区圆角上 20px、高度约 200px，用各城市专属色的渐变填充；卡片里 H3 24px 衬线；slogan 15px --color-text；卡片顶部或角落放一个 8px 圆角的小标签（城市专属色底、白字，如 "海河蓝"）。桌面 3 列网格（gap 32px），第 4、5 张做成杂志错落（比如 span 不同宽度或轻微上下偏移），具体你决定但要有节奏感。
4. About：两栏（左大段介绍 17px/1.8 衬线或无衬线均可但正文用无衬线；右侧"足迹清单"用新拟态凹陷面板），区块之间用 1px --color-line 细线分隔。
5. Footer：顶部细线分隔，内容分两行：联系方式一行（间隔 24px）、版权行 14px --color-text-muted；页脚背景可略微压深或用新拟态凹陷条。

【硬性约束】
- 所有颜色/间距/圆角/阴影/字号一律用 tokens.css 的 var()，禁止硬编码十六进制色值（光斑渐变的半透明色除外）
- 不引入任何 UI 库 / 不引入 Tailwind，全部手写 CSS
- 标题必须衬线、正文必须无衬线
- 不要动阶段 4 才做的动画代码（现在不写 transition/animation，hover 的视觉样式可以先写好静态版本）

【讲解要求 ≤200 字】：① backdrop-filter 和普通 filter 的区别；② 玻璃拟态为什么需要"背景有颜色"才好看；③ clamp() 三个参数分别是什么。

验收自查后报告：对照下面 5 项逐条确认——颜色用了变量、间距 8px 基数、按钮 14px/卡片 20px 圆角、四种阴影按值使用、标题衬线正文无衬线。附一句你自己觉得哪里还想再调。

【复制终点】
```

---

## 阶段 4 · 三个动效（悬停抬升 + 滚动淡入 + 按钮光扫）

```
【复制起点】

继续「旅游画廊」项目。这一阶段只做动效，共 3 个，要求全部用纯 CSS transition/@keyframes + 原生 JS（IntersectionObserver），禁止引入任何动画库（不要 framer-motion、不要 AOS）。时长全部用 tokens.css 的 --dur-* 变量。

【动效 1 · 卡片悬停抬升/发光/图片放大】（用户触发，可以明显）
- 目标：Highlights 的每张城市卡片
- hover 时：transform: translateY(-8px)；卡片阴影换成 var(--shadow-hover)；图片区（渐变色块）transform: scale(1.06)；再加一圈柔和"发光"（可用 box-shadow 叠加城市专属色的低透明度外发光，或 outline/边框颜色过渡）
- 过渡：transition: 280ms cubic-bezier(0.22, 1, 0.36, 1)（用 var(--ease-smooth) 和 var(--dur-hover)）
- 图片区需要 overflow: hidden，放大才不会溢出
- 要照顾鼠标和键盘：卡片可加 tabindex="0"，focus-visible 时同样效果（无障碍细节）

【动效 2 · 滚动到视口淡入】（自动触发，要含蓄）
- 新建 src/components/Reveal.jsx：封装 IntersectionObserver 的通用组件（或自定义 hook，你选更好理解的一种）
- 用法：用 <Reveal> 包住需要淡入的区块/卡片，支持 delay 属性（同组卡片错开 80ms 递增，比如 5 张卡片 delay 分别是 0/80/160/240/320ms）
- 效果：初始 opacity: 0; transform: translateY(24px)，进入视口（阈值 0.15）后 opacity: 1; translateY(0)，时长 var(--dur-reveal)=500ms ease-out
- 每个元素只触发一次（出现后不再重复动画）
- 注意：IntersectionObserver 要在 useEffect 里创建、return 里 disconnect 清理；讲解时重点解释这个清理为什么必须写
- 应用到：Hero 之外的各区块标题、5 张卡片、About 段落与足迹清单、Footer

【动效 3 · 按钮光效扫过】（用户触发，可以明显）
- 目标：Hero 的"开始漫游"按钮
- 做法：按钮 position: relative; overflow: hidden，::after 伪元素放一条斜向高光条：linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)，默认 transform: translateX(-120%)，hover 时 translateX(120%)，时长 var(--dur-sweep)=700ms ease-in-out
- hover 同时按钮微微上浮 2px 并换 --shadow-hover
- 高光条用 pointer-events: none，不影响点击

【全局要求】
- 尊重系统设置：@media (prefers-reduced-motion: reduce) 下，三个动效全部降级——不做位移/放大，只保留 opacity 瞬时或极短淡入
- 动效实现完逐个手动测试并描述测试结果

【讲解要求 ≤250 字】：① IntersectionObserver 的 threshold 和 rootMargin 怎么理解；② useEffect 里为什么要做清理（memory leak 例子）；③ transition 和 @keyframes 各适合什么场景；④ 为什么自动触发的动效要"含蓄"（从用户体验角度说）。

验收自查后报告：3 个动效各自的触发方式、时长、测试结论。

【复制终点】
```

---

## 阶段 5 · 响应式适配

```
【复制起点】

继续「旅游画廊」项目，动效已完成。这一阶段只做响应式，三个断点，全部用 CSS 媒体查询 + clamp/flex/grid 自适应，不引入任何响应式框架。

【断点与布局】
1. < 640px（手机）：
   - 单列布局；卡片纵向排列、图片区高度约 180px
   - H1 用 clamp 的最小值档；副标题 16px
   - Hero 按钮全宽（或至少 200px 以上、居中）
   - 页面左右边距 20px；区块垂直间距 64px（--space-16）
   - 足迹清单从右侧栏挪到介绍段落下方
   - 栏目标签、小字不小于 12px，正文不小于 15px
2. 640px–1023px（平板）：
   - 卡片 2 列（gap 24px）；About 两栏但右侧足迹清单变窄
   - 页面左右边距 32px
3. ≥ 1024px（桌面）：
   - 卡片 3 列（gap 32px），第 4、5 张保持杂志错落感
   - 内容最大宽度 1200px 居中；左右边距 48px；区块垂直间距 128px
   - Hero 可以做两栏：左标题区、右装饰区

【硬性要求】
- 任何尺寸下都不允许出现横向滚动条、文字溢出、卡片挤压变形
- 图片/渐变色块一律随容器缩放
- 断点值只写 640px 和 1024px 两个（配合 clamp 做流式）
- 保留阶段 4 的全部动效，确认手机端滚动淡入正常、触摸时 hover 行为不卡顿（touch 设备不做强 hover）

【讲解要求 ≤150 字】：① 移动优先（min-width）和桌面优先（max-width）写媒体查询的区别，你选了哪种；② 为什么用 clamp 比写死断点字号更好。

验收自查：请用浏览器设备模拟分别测 375px、768px、1280px 三档，逐档报告布局表现与是否发现横向滚动。

【复制终点】
```

---

## 阶段 6 · 图片素材机制（先 CSS/SVG，后换真照片）

```
【复制起点】

继续「旅游画廊」项目。这一阶段处理图片素材，要求：项目默认完全不依赖外链图片（不能用 Unsplash 等外部图床，断网也要完整好看），同时给我留好"以后换成自己照片"的机制。

一、默认视觉（方案 a：CSS 渐变 + SVG 自绘）：
1. 每张城市卡片的图区，用该城市专属色 + 渐变做出有辨识度的图案，五张要各有性格，比如：
   - 天津：海河蓝的波浪线 SVG 或渐变水面
   - 乐山：佛光金的山形剪影 / 日晕圆
   - 哈尔滨：冰晶青的雪花几何图案（SVG）
   - 湖南：湘西翠的层叠峰林剪影
   - 湖北：武当紫的云海曲线 / 圆形楼阁剪影
2. 实现方式建议：写成可复用的 SVG 图案组件或纯 CSS 渐变组合（linear-gradient/radial-gradient + background-size 网格图案），由你选更好维护的方案，但要讲清楚怎么换。
3. Hero 的装饰区也可以放一个大的 SVG 旅行元素（如罗盘、山峰、路线虚线），风格统一。

二、换照片机制（方案 c 预留）：
1. 建 public/photos/ 目录，里面放一个说明文件或 README 片段：把照片命名为 tianjin.jpg / leshan.jpg / harbin.jpg / hunan.jpg / hubei.jpg 放进来即可。
2. 在 src/data/cities.js 里给每个城市加 photo 字段（默认值指向 /photos/xxx.jpg）。
3. 卡片图区做"回退"逻辑：如果 photo 指定的照片存在就显示 <img>，否则显示渐变/SVG 图案。实现方式你决定（比如 onerror 回退，或加一个 useImageExists 判断），重点是：没有照片时页面必须完整好看，有照片时替换只需放文件、不改代码。
4. 现在没有照片，所以最终效果必须是渐变/SVG 版本。

三、讲解要求 ≤200 字：① 为什么练习项目最好不依赖外链图片；② onerror 或等价回退方案的原理；③ public/ 目录和 src/assets 的区别、路径怎么写。

验收自查后报告：断网（或禁用网络）刷新页面是否完整、五张卡的图案差异描述、换照片的操作步骤（写成 3 步以内）。

【复制终点】
```

---

## 阶段 7 · 文档撰写（DESIGN_SYSTEM.md + README.md）

```
【复制起点】

继续「旅游画廊」项目，代码已完成。这一阶段只写两个文档，放在项目根目录。写之前请先读一遍 src/styles/tokens.css 和各组件的 CSS，确保文档里的数值和代码里实际使用的完全一致（不许写"约""柔和""较大"这类模糊词，全部要具体数值）。

一、DESIGN_SYSTEM.md，必须包含以下五项，每项都要表格或代码块列出具体值：

1. 颜色：主色 HEX（#FF5C35 珊瑚橙 + 悬停 #E8482A）、标题色 #1B2A4E、正文 #4A5568、背景 #F4F2EE、五城专属色（天津 #2E7CF6 / 乐山 #E8A33D / 哈尔滨 #22B8CF / 湖南 #2FA36B / 湖北 #7C5CFF）、成功 #22C55E、警告 #F59E0B、错误 #EF4444，各配一句"用在哪"。
2. 间距：基数 8px（最小 4px），阶梯 4/8/12/16/24/32/48/64/96/128px，说明区块间距（移动 64px / 桌面 128px）与卡片内边距。
3. 圆角：按钮 14px（胶囊 999px）、卡片 20px、大图 24px、小标签 8px，各配使用场景。
4. 阴影：四条阴影的完整 CSS 值——玻璃卡 0 8px 32px rgba(27,42,78,0.10)；新拟态凸起 8px 8px 20px rgba(174,174,192,0.35), -8px -8px 20px rgba(255,255,255,0.95)；新拟态凹陷 inset 6px 6px 12px rgba(174,174,192,0.40), inset -6px -6px 12px rgba(255,255,255,0.90)；悬停 0 20px 44px rgba(255,92,53,0.22)。
5. 字体：标题衬线族（"Noto Serif SC", "Songti SC", "SimSun", serif）与正文无衬线族（"Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif）；H1 clamp(44px, 8vw, 96px)/700/1.1、H2 clamp(28px, 4vw, 52px)/700/1.2、卡片标题 24px/600、正文 17px/400/1.8、辅助 14px/400、标签 12px/500 字距 0.12em。

另外可以加一节"动效规范"（三个动效的时长与缓动），但五项是必须项。

二、README.md，包含：
1. 项目名「旅游画廊 Travel Gallery」+ 一句话简介
2. 项目亮点（三种风格融合、三个动效、响应式）
3. 技术栈：React 18+、Vite、纯 CSS（无 UI 库、无动画库）
4. 本地运行步骤：npm install → npm run dev → npm run build
5. 目录结构（简版）
6. 截图占位：screenshots/ 目录下的图片（先写好引用，图片我之后自己截图放进去）
7. 设计说明：指向 DESIGN_SYSTEM.md
8. 学习笔记：2-3 句我学 React 的收获（你替我写一版，我再改）
9. 版权行："© 2026 旅游画廊"

【讲解要求 ≤100 字】：设计系统文档对团队协作的价值，一两句即可。

验收自查后报告：五项数值是否与代码一致（逐项核对）、README 是否可直接给同学看懂并跑起来。

【复制终点】
```

---

## 阶段 8 · 自测清单（你和 Agent 一起过）

> 本阶段截图由我自己完成，但自测可以请 Agent 帮忙复核代码。

```
【复制起点】

继续「旅游画廊」项目。这一阶段请帮我做一次完整自测（不加新功能），按下面清单逐条检查代码并给出结论，有问题就修：

1. 内容完整性：主视觉（标题+副标题+按钮）、5 张亮点卡片、150 字以内介绍段落、页脚（联系方式+版权行）四部分都在，文案无错别字。
2. 文字数：介绍段落是否 ≤150 字（数一下）。
3. 动效：3 个动效的代码都在且参数符合规范（悬停 280ms、淡入 500ms 错开 80ms、光扫 700ms）；prefers-reduced-motion 降级是否覆盖三个动效。
4. 响应式：媒体查询断点只有 640px/1024px 两档，配合 clamp；检查有没有容易在 375px 出横向滚动的写法（超宽元素、固定宽度、大 gap）。
5. 代码质量：控制台无警告（React key、未使用变量、重复 CSS）；CSS 变量使用率（不该有硬编码颜色）；组件拆分是否清晰。
6. 依赖检查：package.json 里不应该有 UI 库/动画库/多余依赖。
7. 告诉我截图建议：我准备截 4 张图——桌面 Hero 全屏、卡片 hover 状态、375px 手机整页、介绍+页脚。请告诉我每张图最好在什么状态/尺寸下截、怎么触发那个状态（比如 hover 哪里）。

最后输出一份"自测报告"表格：检查项 / 结果 / 问题（若有）。

【复制终点】
```

---

## 阶段 9 · Git 提交 + Gitee 推送

```
【复制起点】

继续「旅游画廊」项目，代码和文档已全部完成、截图我已放到 screenshots/ 目录。这一阶段帮我把项目推送到 Gitee 新仓库（与我之前的项目分开）。我用的是 Windows，请给出可直接执行的命令（PowerShell）：

1. 在项目根目录 git init，注意默认分支名（我 Gitee 习惯用 master，就用 master）。
2. 写 .gitignore：至少排除 node_modules/、dist/、.vscode/、*.log、.DS_Store；但 docs/、screenshots/、README.md、DESIGN_SYSTEM.md 都要提交。
3. 提交策略：不要一个巨型 commit，按 3-4 个有意义的提交（如：初始化项目+设计令牌 / 页面结构+样式 / 动效+响应式 / 文档+截图），commit message 用英文或中文均可但风格统一、带 feat/docs/chore 前缀。
4. 我会在 Gitee 网页上手动新建空仓库 travel-gallery（不勾选 README），建好后把远程地址给你：https://gitee.com/<我的用户名>/travel-gallery.git。你给出 git remote add origin ... 和 git push -u origin master 的完整命令。
5. 如果 push 要求输入账号密码/凭据，告诉我 Windows 下会弹凭据窗口或需要怎么配置（git config user.name/user.email 如果没配置也一并给出命令）。
6. 推送成功后，告诉我怎么验证（git log、git status、Gitee 网页看文件列表），并提醒我把 Gitee 项目链接写回 README.md。

只要命令和步骤说明，push 前的每个 git 命令先解释一句它做什么。

【复制终点】
```

---

## 附 · 卡住时的通用求助提示词

```
我在做「旅游画廊」React 练习项目（Vite + React，纯前端）。现在卡在 <写清楚阶段和现象>。报错原文如下：
<粘贴完整报错>
请先判断原因，再给最小改动的修复方案，并解释为什么错（我正在学 React，要能听懂）。
```

---

# ⭐ 进阶阶段（后加 · 非课程主线）

> **以下阶段 10~13 均为课程主线（阶段 0~9）全部完成、项目交付之后，在实际迭代中追加的进阶内容**，不属于原始课程要求。
> 它们按时间顺序记录了「开机动画」从立项到 13 轮验收修复的完整演化，每轮都附最终采用的方案要点，供复盘使用。

---

## 阶段 10（后加）· 开机动画「流金绘影」立项 + v1 初版

```
【复制起点】

继续「旅游画廊」项目。阶段 0~9 的全部内容（Hero/卡片/About/Footer/动效/响应式/文档）已完成并保持稳定。
现在我要加一个全屏开机动画遮罩层（BootAnimationOverlay），主题「流金绘影 · 半座太和殿」，要求纯前端实时渲染、无动画库：
1. 把高清太和殿大图放 public/taihedian.jpg，首页 Hero 改为「左侧文案 + 右侧半座太和殿画卷（object-fit: cover、右缘 mask 渐隐融入宣纸背景）」。
2. 开机动画四阶段：① 虚空墨黛背景上金色流光粒子游走汇聚；② 粒子吸附锁定、在右侧太和殿位置拼出金色建筑骨架；③ 原图径向晕染浮现、背景转宣纸白；④ 与首页零像素对齐地交叉溶解移交。
3. 技术方案：对 taihedian.jpg 做离屏 Canvas 逐像素亮度梯度边缘扫描，生成鎏金配色线稿 Canvas（与 <img> 同容器同 object-fit 严格对齐）；粒子靶点按网格采样；时间轴/粒子规模等全部参数抽到 src/data/bootConfig.js。
4. 交互：点击/回车随时跳过；?boott=秒数 冻结单帧调试；?noboot 直接跳过；prefers-reduced-motion 自动跳过。
5. 调试技巧：?boott=1.0 / 2.2 / 4.0 冻结关键帧检查构图。

【复制终点】
```

---

## 阶段 11（后加）· 零跳变架构重构（v7~v10）

```
【复制起点】

继续「旅游画廊」项目。开机动画已能跑通，但验收发现多处跳变/错位/过曝，请按下述方案重构（每轮修改后 freeze 帧自检）：
1. 【零跳变】开机动画与首页 Hero 的太和殿渲染盒必须 100% 重合：统一 right:0; top:0; width:68vw; height:100% + 同一 mask（to right, transparent 0%, black 8%, black 100%）+ 同一 object-position；取消阶段四推镜（scale 恒 1）。
2. 【单一文字 DOM】遮罩层不再渲染任何文字 DOM；真实 Hero 文字经 body.booting 类提升到遮罩之上，颜色用 color-mix 绑定 --bootReveal（JS 每帧写到 <html>）由浅宣纸白过渡到深黛墨——从第 0 秒到结束只有一个文字 DOM，绝无位置跳变。
3. 【统一坐标映射】编写 getCoverRect(iw, ih, cw, ch)（等价 object-fit: cover + left center），<img>、EdgeCanvas（按容器 rect × DPR 重采样 + imageSmoothingQuality high）、粒子靶点三套坐标共用；靶点存归一化 u,v ∈ [0,1]。
4. 【靶点质量】24列×16行网格分桶 + 每桶随机抽 4 点 + 总数组全局 Fisher-Yates 洗牌（防按行 push 后全挤顶部）；只采 u∈[0.18,0.96]、v∈[0.08,0.96] 且梯度 > 阈值×1.8 的建筑墨线，绝不落在空白天空。
5. 【纯净渲染】粒子绘制禁止 history 队列/多步累积循环：每帧 setTransform(1,0,0,1,0,0)+clearRect(整个位图) 强制清屏，位置用纯函数 getPointOnCurve(s, pt) 按当前时间直接求值；source-over 合成；发丝级锥形丝线（最大半径 0.85px）+ 头部唯一 3.2px 柔光星点；起点 x0 ∈ 102%~110%W、终点钳制 tx ≥ 42%W（左半屏文字区零穿越）。

【复制终点】
```

---

## 阶段 12（后加）· 内容精修与版式收官（v11~v13.1）

```
【复制起点】

继续「旅游画廊」项目。开机动画已验收通过，请做最后的页面细节精修：
1. 交互红线：任何时候都允许页面滚动（严禁 body overflow:hidden）；「开始漫游 →」按钮动画期间必须可点击（严禁 pointer-events:none）；遮罩 window 级 click/wheel/touchmove 触发跳过 + 6s failsafe 强制卸载 + 结束后 return null 彻底移除 DOM。
2. 卡片规范：.city-card__image 必须 position:relative（防 absolute 图片以整张卡片为包含块盖住文字）+ overflow:hidden + object-fit:cover；永久删除右上角色标标签；Hover 图片 scale(1.08)，过渡 0.4s cubic-bezier(0.25,1,0.5,1)。
3. 网格对齐：桌面 3 列 align-items:stretch + .city-card flex 列布局 height:100% + slogan flex-grow:1（右下卡与宽卡底边对齐）；删除 nth-child(5) 的 margin-top（错位元凶）；湖南宽卡（span 2）图片高度 260px。
4. 真实文案：五城卡片与「关于本画廊」替换为真实旅行回忆（天津·云端夜色/乐山·街头随记/哈尔滨·雪国童话/湖南·橘子洲头/湖北·三峡回响）。
5. 页脚：更新邮箱/微信，background 改 transparent（消除白框），与页面底色无缝融合。

【复制终点】
```

---

## 进阶阶段速查表（后加内容一览）

| 版本 | 关键决策 | 一句话总结 |
| --- | --- | --- |
| v7 | 离屏边缘扫描 + 四阶段遮罩 | 开机动画立项，粒子汇聚成殿 |
| v8 | 68vw 右锁 + 取消推镜 + 网格采样 | 解决太和殿位置跳变与粒子乱飞 |
| v9 | 单一文字 DOM + color-mix + getCoverRect + DPR 重采样 | 零跳变、线稿 0 像素对齐、高清锐利 |
| v10 | u,v 归一化 + 右半屏钳制 + source-over | 根治 (0,0) 收束与过曝 |
| v11 | 滚动/点击解锁 + ?bootdebug 校验 | 交互红线与白屏事故排查（dev server 陈旧 transform） |
| v12 | 全局洗牌 + 锥形彗星 → 极细丝线纯函数化 | 靶点全殿均匀、单星点发丝级金丝 |
| v13.1 | 150 根 + 1.2s 错峰 | 银河星尘包裹全殿 |
