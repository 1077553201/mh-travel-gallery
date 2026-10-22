// 区块链工坊 · 站点内容数据
// 所有文案集中在此，组件只负责渲染；改内容不用碰 JSX

export const studio = {
  name: '区块链工坊',
  nameEn: 'BLOCKCHAIN WORKSHOP',
  college: '东莞职业技术学院 · 人工智能学院',
  advisor: '李光程',
  advisorTitle: '区块链专业主任',
  slogan: '把链上技术做成能跑起来的东西。',
  intro: [
    '区块链工坊依托东莞职业技术学院人工智能学院区块链技术应用专业，在专业主任李光程老师的指导下开展教学与项目训练。工坊以真实项目为载体，让学生把智能合约、链端部署、后端接口和前端业务真正联调跑通，而不是停留在课堂作业层面。',
    '在老师的指导下，学生围绕三条主线推进：一是竞赛训练，围绕 FISCO BCOS、WeBASE 与全栈应用开发打磨完整交付能力；二是算力与平台运维，维护专业的多台 AI 计算终端与区块链在线实训平台；三是跨方向探索，把链上能力与 Agent 开发、软硬件结合、大模型应用缝合到一起。学生在这一过程中逐步积累实战经验，并在国家级、省级竞赛中取得成绩。',
  ],
  // 一句话标签
  facts: [
    { k: '所属学院', v: '人工智能学院' },
    { k: '专业', v: '区块链技术应用' },
    { k: '指导老师', v: '李光程（区块链专业主任）' },
    { k: '成员构成', v: '24 级在校生' },
  ],
  github: 'https://github.com/1077553201',
  email: 'mh111514@outlook.com',
}

// 主力成员：照片后续补，photo 留空则显示首字母图章
export const members = [
  {
    id: 'muhetaer',
    name: '木合塔尔',
    nameEn: 'MUHETAER',
    role: '负责人',
    grade: '24 级',
    lead: true,
    tags: ['Agent 开发', '全栈开发', '软硬件结合研发', '区块链部署与运维'],
    note: '新疆喀什 · 维吾尔族 · 专业排名前 1%',
    photo: '/photos/muhetaer.jpg',
  },
  {
    id: 'liangyuying',
    name: '梁玉莹',
    nameEn: 'LIANG YUYING',
    role: '技术 / 运营',
    grade: '24 级',
    lead: false,
    tags: ['全栈开发'],
    note: '24 级区块链班长 · 专业排名前 1%',
    photo: '',
  },
  {
    id: 'zhengyilun',
    name: '郑益伦',
    nameEn: 'ZHENG YILUN',
    role: '技术 / 运营',
    grade: '24 级',
    lead: false,
    tags: ['全栈开发'],
    note: '24 级区块链副班长 · 专业排名前 1%',
    photo: '',
  },
]

// 资源与平台
export const resources = [
  {
    id: 'space',
    title: '实验实训场地',
    summary: '三间高配置电脑实训室 + 两间学生专属工作室，日常训练与项目开发都有固定工位。',
    items: ['3 间高配置电脑实训室', '2 间学生工作室'],
  },
  {
    id: 'compute',
    title: 'AI 算力集群',
    summary: '多台超级 AI 计算终端串成集群，本地即可稳定跑起开源大模型、图片与视频生成模型。',
    items: ['4 台超级 AI 超级计算机', '本地部署开源大模型 / 生图 / 生视频工作流'],
  },
  {
    id: 'chain',
    title: '区块链实训平台',
    summary: '两台高性能服务器承载区块链全栈在线实训平台，链端部署、合约调试、前后端联调一站完成。',
    items: ['2 台高性能服务器', '区块链全栈在线实训平台'],
  },
  {
    id: 'hardware',
    title: '硬件与制造',
    summary: '从数据存储到实体演示平台，软硬件结合的项目在这里落地。',
    items: ['1 台大容量存储服务器', '仿真无人船演示平台', '3D 打印机'],
  },
]

// 成果荣誉：按时间线倒序（最新的在前）
// 目前只保留四个代表性奖项，其余赛事记录待补
export const achievements = [
  {
    date: '2026.07',
    type: 'award',
    title: '睿抗机器人开发者大赛（RAICOM）广东赛区',
    track: '大模型及智能体应用竞赛项目',
    award: '一等奖',
    level: '省级',
    note: '团队赛，大模型与智能体应用方向',
  },
  {
    date: '2026.07',
    type: 'award',
    title: '第十一届海峡两岸暨港澳地区大学生计算机创新作品赛',
    track: '总决赛（国赛）· 高职组',
    award: '三等奖',
    level: '国家级',
    note: '作品《双智臂——多模态双机械臂交互系统》，项目负责人',
  },
  {
    date: '2026.04',
    type: 'award',
    title: '2025-2026 学年广东省职业院校学生专业技能大赛',
    track: '区块链技术应用赛项',
    award: '三等奖',
    level: '省级',
    note: '组长带队，覆盖智能合约、链端部署、后端接口与前端业务联调',
  },
  {
    date: '2025.10',
    type: 'award',
    title: '一带一路暨金砖国家技能发展与技术创新大赛',
    track: '第四届区块链应用开发与运维赛项 · 决赛',
    award: '一等奖',
    level: '国家级',
    note: '组长 / 领队，完整走通 FISCO BCOS、WeBASE、Spring Boot、Vue 与 MySQL 全链路',
  },
]

// 技术栈关键词：用于成果区下方的能力标签
export const stack = [
  'FISCO BCOS',
  'WeBASE',
  '智能合约',
  'Spring Boot',
  'Vue',
  'MySQL',
  'ZMQ',
  '树莓派',
  'LeRobot',
  '大模型应用',
  'Agent 开发',
]
