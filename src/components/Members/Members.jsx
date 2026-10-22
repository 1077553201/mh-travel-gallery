import './Members.css'
import Reveal from '../Reveal'
import { members, stack } from '../../data/studio'

function Members() {
  return (
    <section className="members" id="members">
      <Reveal className="members__head">
        <p className="members__label">02 — TEAM</p>
        <h2 className="members__title">主力成员</h2>
        <p className="members__desc">24 级区块链技术应用专业，三名核心成员覆盖开发、运维与运营。</p>
      </Reveal>

      <ul className="members__list">
        {members.map((member, index) => (
          <li
            key={member.id}
            className={`member-card${member.lead ? ' member-card--lead' : ''}`}
            tabIndex={0}
          >
            <Reveal delay={index * 80}>
              {/* 头像区：有照片显示照片，没有则用姓氏字符做图章 */}
              <div className="member-card__avatar">
                {member.photo ? (
                  <img className="member-card__photo" src={member.photo} alt={member.name} />
                ) : (
                  <span className="member-card__monogram" aria-hidden="true">
                    {member.name.slice(0, 1)}
                  </span>
                )}
                {member.lead && <span className="member-card__badge">负责人</span>}
              </div>

              <div className="member-card__body">
                <h3 className="member-card__name">
                  {member.name}
                  <span className="member-card__grade">{member.grade}</span>
                </h3>
                <p className="member-card__role">{member.role}</p>
                <ul className="member-card__tags">
                  {member.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <p className="member-card__note">{member.note}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="members__stack">
        <p className="members__stack-label">技术栈</p>
        <ul className="members__stack-list">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

export default Members
