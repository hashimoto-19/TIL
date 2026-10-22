import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider.jsx'
import WeatherCard from '../components/WeatherCard.jsx'

const yamapUrl = 'https://yamap.com/users/2269519'

const skills = [
  'HTML / CSS',
  'JavaScript',
  'React',
  'Git / GitHub',
  'SQL',
]

const heroSlides = [
  {
    src: '/images/taiwan-hero.jpg',
    alt: '象山から見た台北101',
    position: '12% center',
  },
  {
    src: '/images/taiwan-hero.jpg',
    alt: '象山から見た台北の街並み',
    position: '50% center',
  },
  {
    src: '/images/taiwan-hero.jpg',
    alt: '象山から見た台北の高層ビル群',
    position: '88% center',
  },
]

const works = [
  {
    title: 'TIL',
    description: '日々の学びを記録するリポジトリ',
    href: 'https://github.com/hashimoto-19/TIL',
  },
]

const yamapActivities = [
  {
    id: '50095996',
    title: '愛宕山　千日詣',
    mountainHtml:
      '<a href="https://yamap.com/mountains/69">愛宕山</a>の',
  },
  {
    id: '45466623',
    title: '台北　象山　（台湾）🇹🇼',
    mountainHtml: '',
  },
  {
    id: '28449915',
    title: '鞍寺馬・貴船神社・沢の池　京都トレイル北山西部コース',
    mountainHtml:
      '<a href="https://yamap.com/mountains/9379">向山</a>・<a href="https://yamap.com/mountains/7455">城山</a>の',
  },
]

const books = [
  {
    title: '最近読んだ本',
    note: '敗れてもまた走れ:アシックス創業者 鬼塚喜八郎の情熱「オニツカタイガー」を創った「靴の鬼才」はなぜ世界と戦い続けたか',
  },
]

const games = [
  {
    title: '好きなゲーム',
    note: 'バイオハザードre4',
  },
]

const gourmets = [
  {
    title: '台湾グルメ',
    note: '旅先で食べたもの・お気に入りを少しずつ載せていきます',
  },
  {
    title: '登山後のごほうび',
    note: '山頂や下山後に楽しむご飯・カフェなど',
  },
]

const movies = [
  {
    title: '好きな映画',
    note: 'あとからタイトルを差し替えます',
  },
  {
    title: '最近見た映画',
    note: '感想メモを少しずつ残していきます',
  },
]

function YamapWidget({ activity }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || container.dataset.ready === 'true') return

    const fitIframe = () => {
      const iframe = container.querySelector('iframe[data-widget="yamap-widget"]')
      if (!iframe) return
      iframe.removeAttribute('width')
      iframe.style.width = '100%'
      iframe.style.maxWidth = '100%'
    }

    const observer = new MutationObserver(fitIframe)
    observer.observe(container, { childList: true })

    container.innerHTML = `
      <blockquote
        data-yamap-widget
        data-source="activities/${activity.id}"
        data-mode="photo"
        data-width="100%"
      >
        <a href="https://yamap.com/activities/${activity.id}">${activity.title}</a>
        / <a href="${yamapUrl}">はしもと</a>さんの${activity.mountainHtml}活動データ
        | <a href="https://yamap.com">YAMAP / ヤマップ</a>
      </blockquote>
    `
    container.dataset.ready = 'true'
    fitIframe()

    return () => observer.disconnect()
  }, [activity])

  return <div ref={containerRef} className="yamap-widget" />
}

export default function Home() {
  useEffect(() => {
    document.title = 'hashimoto-19 | Portfolio'
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-banner">
          <HeroSlider slides={heroSlides} />
        </div>

        <div className="hero-foot">
          <h1>Hashimoto</h1>
          <p className="lead">
            React を学びながら、山登り・グルメ・映画・読書・ゲーム・台湾華語・旅行も大切にしている開発者です。
            名刺代わりに、仕事と趣味の両方を伝えられるサイトを目指しています。
          </p>
        </div>
      </section>

      <section className="section" id="about">
        <h2>About</h2>
        <p>
          社内ディレクション・運用・保守の経験を活かしつつ、いまは React と
          JavaScript を中心に学習中です。アプリ開発をしていきます。
        </p>
        <p>
          休日は山に登ったり、おいしいものを食べたり、映画を見たり、本を読んだり、ゲームをしたり、旅行の写真を撮ったり、台湾華語の勉強を続けています。
        </p>
      </section>

      <WeatherCard />

      <section className="section" id="hiking">
        <h2>山登り</h2>
        <p>休日は山へ。活動記録は YAMAP に残しています。</p>
        <div className="actions section-actions">
          <a
            className="button primary"
            href={yamapUrl}
            target="_blank"
            rel="noreferrer"
          >
            YAMAP プロフィール
          </a>
        </div>
        <div className="yamap-grid">
          {yamapActivities.map((activity) => (
            <YamapWidget key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="section" id="skills">
        <h2>Skills</h2>
        <ul className="skill-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="works">
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

      <section className="section" id="books">
        <h2>読書</h2>
        <p>本を読むのも好きです。気に入った本を少しずつ載せていきます。</p>
        <div className="card-grid">
          {books.map((book) => (
            <div key={book.title} className="card static-card">
              <h3>{book.title}</h3>
              <p>{book.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="games">
        <h2>好きなゲーム</h2>
        <p>ゲームも趣味のひとつです。好きなタイトルをまとめていきます。</p>
        <div className="card-grid">
          {games.map((game) => (
            <div key={game.title} className="card static-card">
              <h3>{game.title}</h3>
              <p>{game.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="gourmet">
        <h2>グルメ</h2>
        <p>
          食べることも好きです。旅先や登山のあとに出会ったおいしいものを、少しずつ残していきます。
        </p>
        <div className="card-grid">
          {gourmets.map((item) => (
            <div key={item.title} className="card static-card">
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="movies">
        <h2>映画</h2>
        <p>映画を見るのも好きです。印象に残った作品を少しずつ載せていきます。</p>
        <div className="card-grid">
          {movies.map((movie) => (
            <div key={movie.title} className="card static-card">
              <h3>{movie.title}</h3>
              <p>{movie.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="taiwanese">
        <h2>台湾華語</h2>
        <p>
          台湾華語を学習中です。日常会話や旅行で使えるフレーズから少しずつ積み上げています。
          このサイトにも、学習メモを少しずつ載せていく予定です。
        </p>
        <p className="phrase">你好！我是 Hashimoto。</p>
      </section>

      <section className="section" id="travel">
        <h2>旅行</h2>
        <p>行った場所の写真とメモは、旅行のページにまとめています。</p>
        <div className="actions section-actions">
          <Link className="button primary" to="/travel/">
            旅行の記録
          </Link>
        </div>
      </section>

      <section className="section" id="links">
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
          <li>
            <a href={yamapUrl} target="_blank" rel="noreferrer">
              YAMAP
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}
