// 五座目的地城市数据：文案集中在这里管理，组件只负责渲染
// photo：换照片机制——把照片命名为 tianjin.jpg 等放进 public/photos/ 即自动替换，无需改代码
export const cities = [
  {
    id: 'tianjin',
    name: '天津 · 云端夜色',
    slogan: '云端俯瞰津门灯火，飞机舷窗外的万家灯火与机翼交织，那是抵达这座海河之城最浪漫的夜航记忆。',
    desc: '云端俯瞰津门灯火，飞机舷窗外的万家灯火与机翼交织，那是抵达这座海河之城最浪漫的夜航记忆。',
    color: 'var(--city-tianjin)',
    gradient: ['#2E7CF6', '#6FB1FF'],
    photo: '/photos/tianjin.jpg',
  },
  {
    id: 'leshan',
    name: '乐山 · 街头随记',
    slogan: '没去赶着看大佛，只是在乐山的街头随意漫步。路过那块亮着“我在乐山没空想你”的巨幅大屏，烟火气里满是独属于川南的浪漫告白。',
    desc: '没去赶着看大佛，只是在乐山的街头随意漫步。路过那块亮着“我在乐山没空想你”的巨幅大屏，烟火气里满是独属于川南的浪漫告白。',
    color: 'var(--city-leshan)',
    gradient: ['#E8A33D', '#F6C875'],
    photo: '/photos/leshan.jpg',
  },
  {
    id: 'harbin',
    name: '哈尔滨 · 雪国童话',
    slogan: '站在哈尔滨万达广场前，仰望当时全网最大的巨型雪王。四周冰雪环绕，连空气里都是冰糖葫芦的甜味。',
    desc: '站在哈尔滨万达广场前，仰望当时全网最大的巨型雪王。四周冰雪环绕，连空气里都是冰糖葫芦的甜味。',
    color: 'var(--city-harbin)',
    gradient: ['#22B8CF', '#7FE0EC'],
    photo: '/photos/harbin.jpg',
  },
  {
    id: 'hunan',
    name: '湖南 · 橘子洲头',
    slogan: '站在伟人雕塑下望湘江北去，秋风飒爽。橘子洲头的江风，吹过了属于三湘大地的热烈与激昂。',
    desc: '站在伟人雕塑下望湘江北去，秋风飒爽。橘子洲头的江风，吹过了属于三湘大地的热烈与激昂。',
    color: 'var(--city-hunan)',
    gradient: ['#2FA36B', '#6BCB9A'],
    photo: '/photos/hunan.jpg',
  },
  {
    id: 'hubei',
    name: '湖北 · 三峡回响',
    slogan: '三峡大坝的宏伟江风前，两本鲜红的证件定格了这一刻。大江东去，岁月温柔，这里有属于我们的峡江记忆。',
    desc: '三峡大坝的宏伟江风前，两本鲜红的证件定格了这一刻。大江东去，岁月温柔，这里有属于我们的峡江记忆。',
    color: 'var(--city-hubei)',
    gradient: ['#7C5CFF', '#A78BFF'],
    photo: '/photos/hubei.jpg',
  },
]
