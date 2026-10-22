# 区块链工坊 Blockchain Workshop

东莞职业技术学院 · 人工智能学院 · 区块链技术应用专业的工作室宣传主页。

开屏是「流金绘影」全屏动画——150 根发丝级金色丝线从屏幕右缘汇入校名墙，线稿显影后溶入宣纸留白首页；向下是工坊简介、主力成员、资源与平台、成果荣誉与加入我们。

## 项目亮点

- **开机动画「流金绘影」**：对主视觉图做离屏 Canvas 亮度梯度扫描提取鎏金线稿，150 根极细流光丝线（最大半径 0.85px、头部唯一星点）从屏幕右缘汇入建筑——每帧整屏强制清屏 + 纯函数曲线求值，零 history、零多步循环、零过曝
- **零跳变移交**：开机动画与首页 Hero 的渲染盒逐像素重合（同一 68vw 右锁容器 + 同一 mask + 同一对齐映射）；全站只有**一个文字 DOM**（`color-mix` 随 `--bootReveal` 由浅宣纸白过渡到深黛墨），手机与桌面都不跳变
- **鎏金线稿提取**：逐像素亮度梯度 + 深色墨线双判据，生成暖金/青铜/汉白玉三色线稿；靶点按 24×16 网格分桶均匀采样并全局洗牌，建筑全覆盖
- **换图只改一处**：图片路径、对齐、暖金分区、靶点采样区、文字保护线全部集中在 `src/data/bootConfig.js`
- **三种风格融合**：杂志风骨架（超大衬线标题、1px 细线、大留白）+ 玻璃拟态卡片 + 新拟态点睛
- **纯 CSS + 原生 JS**：无 UI 库、无动画库、无 Tailwind
- **响应式**：移动优先，640px / 1024px 两断点

## 技术栈

- React 19.2
- Vite 8
- 纯 CSS（CSS 变量设计令牌、Grid / Flex、`clamp()`、`color-mix()`、媒体查询）

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
├── index.html
├── DESIGN_SYSTEM.md        # 设计规范（颜色/间距/圆角/阴影/字体/动效）
├── docs/                   # 原始课程计划与分阶段提示词（历史资料）
├── public/
│   ├── gate-dgpt.jpg       # 主视觉：东职校名墙（开机动画 + Hero 共用）
│   └── photos/             # 成员照片放这里（内附替换说明）
└── src/
    ├── data/
    │   ├── studio.js       # 工坊全部内容：简介/成员/资源/成果/联系方式
    │   └── bootConfig.js   # 开机动画配置：图片/对齐/阈值/时间轴
    ├── styles/
    │   ├── tokens.css      # 设计令牌（CSS 变量）
    │   └── global.css      # 全局重置与页面光斑背景
    ├── components/
    │   ├── BootAnimation/  # 开机动画遮罩（边缘扫描 + 极细丝线 + 溶解移交）
    │   ├── Hero/           # 主视觉（左文右画 · 单一文字 DOM）
    │   ├── About/          # 关于工坊
    │   ├── Members/        # 主力成员卡片（缺图回退为首字图章）
    │   ├── Resources/      # 资源与平台
    │   ├── Achievements/   # 成果荣誉（时间线）
    │   ├── Join/           # 加入我们
    │   ├── Footer/         # 页脚
    │   └── Reveal.jsx      # 滚动淡入通用组件（IntersectionObserver）
    └── main.jsx
```

## 改内容

所有文案集中在 **`src/data/studio.js`**，改文字不用碰组件：

| 字段 | 用途 |
| --- | --- |
| `studio` | 工坊名称、学院、指导老师、简介、GitHub、邮箱 |
| `members` | 主力成员；`photo` 留空时显示姓氏图章 |
| `resources` | 资源与平台分组 |
| `achievements` | 成果荣誉时间线（倒序） |
| `stack` | 技术栈标签 |

## 换主视觉图

换图后先用预检脚本跑一遍，避免改完代码才发现线稿糊成一片：

```bash
python edge_preview.py 新图.jpg
```

线稿密度 0.30~0.55 为正常区间，超过 0.85 说明噪点过多（夜景、天空渐变、画面带文字的图都会翻车）。
构图要求：建筑主体偏左、右侧留干净天空/留白，比例接近 1.05~1.15 可避免 cover 裁切主体。

## 部署

Cloudflare Pages：构建命令 `npm run build`，输出目录 `dist`，环境变量 `NODE_VERSION=22`。

## 版权

© 2026 区块链工坊 Blockchain Workshop · 东莞职业技术学院人工智能学院
