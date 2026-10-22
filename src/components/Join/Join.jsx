import './Join.css'
import Reveal from '../Reveal'
import { studio } from '../../data/studio'

function Join() {
  return (
    <section className="join" id="join">
      <Reveal className="join__inner">
        <p className="join__label">05 — JOIN US</p>
        <h2 className="join__title">加入我们</h2>
        <p className="join__desc">
          工坊长期欢迎对链上技术、Agent 开发与软硬件结合感兴趣的同学。
          现阶段优先接收 <strong>AI 作品投稿</strong>——无论是模型应用、智能体工作流还是生成式作品，
          把你的东西发过来，我们先看东西再聊。
        </p>

        <div className="join__contacts">
          <a
            className="join__card"
            href={`mailto:${studio.email}?subject=${encodeURIComponent('区块链工坊 · AI 作品投稿')}`}
          >
            <span className="join__card-k">AI 作品投稿</span>
            <span className="join__card-v">{studio.email}</span>
            <span className="join__card-hint">邮件标题建议注明「投稿 + 作品名」</span>
          </a>

          <a className="join__card" href={studio.github} target="_blank" rel="noreferrer noopener">
            <span className="join__card-k">GitHub</span>
            <span className="join__card-v">github.com/1077553201</span>
            <span className="join__card-hint">项目与代码都在这</span>
          </a>
        </div>
      </Reveal>
    </section>
  )
}

export default Join
