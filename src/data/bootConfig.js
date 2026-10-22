/* 开机动画「流金绘影 · 半座太和殿」配置 —— 数据与渲染分离
   换图 / 调时间轴 / 调粒子规模，只改这里，不碰组件 */

export const BOOT = {
  imageSrc: '/gate-dgpt.jpg', // 东职校门校名墙实景（位于 public/ 下，断网可运行；可替换为任意精细描边建筑图）
  particleCount: 150,           // 精选流光数量（150 根发丝级丝线：单次清屏 + source-over，绝无过曝或圆点疙瘩）
  edgeMaxDim: 1568,           // 线稿提取的最大边长（px，性能保护：原图等比缩到此尺寸内扫描）
  edgeThreshold: 26,          // 边缘梯度阈值（0~255；越小线稿越细密）
  inkLum: 72,                 // 低于此亮度视为深色墨线（无需梯度即入稿）
  marbleLum: 196,             // 高于此亮度视为汉白玉/留白高光（线稿转冷白）
  warmZoneRatio: 0.42,        // 画面顶部此比例内、且偏红的像素判为飞檐暖金

  /* —— 图片对齐 ——
     唯一事实来源：Hero 的 <img>、遮罩的 <img>/线稿 canvas、粒子靶点
     全部由这里推导，禁止在 CSS 里另写 object-position，否则溶解时必跳变。
     0 = 左 / 0.5 = 居中 / 1 = 右 */
  imageAlign: { x: 0, y: 0.5 }, // 等价 object-position: left center

  /* —— 靶点采样区（归一化坐标）——
     只在这些区域内取粒子靶点，避免金线飞到空白天空里。
     换图后若主体位置不同，改这里即可，不用动组件。 */
  targetRegion: { uMin: 0.18, uMax: 0.96, vMin: 0.08, vMax: 0.96 },
  targetGrid: { cols: 24, rows: 16, perCell: 4, cellKeep: 48 }, // 网格分桶均匀采样
  textZoneRight: 0.42,        // 丝线终点不得越过这条线（左侧文字区保护）

  // —— 四阶段时间轴（秒） ——
  lockStart: 1.05,            // 阶段二开始：弹簧吸附（粒子先收敛到位）
  edgeStart: 1.2,             // 金色线稿开始显影（必须在粒子基本锁定之后，先粒子后线稿）
  unlockStart: 2.5,           // 阶段三末：粒子原地化作微弱星尘渐隐（线稿显影完成时）
  paperFadeStart: 2.0,        // 阶段三开始：径向画卷显影 + 背景转宣纸白
  paperFadeEnd: 3.8,
  dissolveStart: 3.8,         // 阶段四开始：恒定尺寸交叉溶解（取消推镜，与首页零像素对齐）
  hint: '「 轻触画卷 · 步入太和 」',
}
