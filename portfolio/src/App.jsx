import { useEffect, useState } from 'react'

const skills = [
  'HTML / CSS',
  'JavaScript',
  'React',
  'Git / GitHub',
  'SQL',
]

const works = [
  {
    title: 'TIL',
    description: '日々の学びを記録するリポジトリ',
    href: 'https://github.com/hashimoto-19/TIL',
  },
  {
    title: 'Learning React',
    description: 'React 入門クエストで学習中',
    href: 'https://github.com/hashimoto-19',
  },
]

const photos = [
  {
    label: '山登り',
    caption: '稜線と空',
    tone: 'mountain',
  },
  {
    label: '旅行',
    caption: '街歩きの記録',
    tone: 'travel',
  },
  {
    label: '山登り',
    caption: '森の中の道',
    tone: 'forest',
  },
]

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="page">
      <header className="topbar">
        <p className="logo">hashimoto-19</p>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="テーマを切り替える"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </header>

      <main>
        <section className="hero fade-in">
          <p className="eyebrow">Portfolio</p>
          <h1>Hashimoto</h1>
          <p className="handle">@hashimoto-19</p>
          <p className="lead">
            React を学びながら、台湾華語・旅行・山登りも大切にしている開発者です。
            名刺代わりに、仕事と趣味の両方を伝えられるサイトを目指しています。
          </p>
          <div className="actions">
            <a
              className="button primary"
              href="https://github.com/hashimoto-19"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="button ghost" href="#photos">
              Photos
            </a>
          </div>
        </section>

        <section className="section fade-in" id="about">
          <h2>About</h2>
          <p>
            社内ディレクション・運用・保守の経験を活かしつつ、いまは React と
            JavaScript を中心に学習中です。将来的にはアプリ開発や副業にもつなげたいと考えています。
          </p>
          <p>
            休日は山に登ったり、旅行の写真を撮ったり、台湾華語の勉強を続けています。
          </p>
        </section>

        <section className="section fade-in" id="skills">
          <h2>Skills</h2>
          <ul className="skill-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="section fade-in" id="works">
          <h2>Works</h2>
          <div className="card-grid">
            {works.map((work) => (
              <a
                key={work.title}
                className="card"
                href={work.href}
                target="_blank"
                rel="noreferrer"
              >
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section fade-in" id="taiwanese">
          <h2>台湾華語</h2>
          <p>
            台湾華語を学習中です。日常会話や旅行で使えるフレーズから少しずつ積み上げています。
            このサイトにも、学習メモを少しずつ載せていく予定です。
          </p>
          <p className="phrase">你好！我是 Hashimoto。</p>
        </section>

        <section className="section fade-in" id="photos">
          <h2>旅行・山登り</h2>
          <p className="section-note">
            まずは雰囲気用のプレースホルダーです。あとから実際の写真に差し替えます。
          </p>
          <div className="photo-grid">
            {photos.map((photo) => (
              <figure key={`${photo.label}-${photo.caption}`} className={`photo ${photo.tone}`}>
                <figcaption>
                  <span>{photo.label}</span>
                  <strong>{photo.caption}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section fade-in" id="links">
          <h2>Links</h2>
          <ul className="link-list">
            <li>
              <a href="https://github.com/hashimoto-19" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://github.com/hashimoto-19/TIL" target="_blank" rel="noreferrer">
                TIL
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} hashimoto-19</p>
      </footer>
    </div>
  )
}
