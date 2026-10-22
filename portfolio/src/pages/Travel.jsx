import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const trips = [
  {
    title: '台北・象山',
    place: '台湾',
    note: '象山から、台北101と街並みを見下ろしました。',
    src: '/images/taiwan-hero.jpg',
    alt: '象山から見た台北101',
    position: '12% center',
  },
]

export default function Travel() {
  useEffect(() => {
    document.title = '旅行 | hashimoto-19'
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-foot">
          <p className="eyebrow">Travel</p>
          <h1>旅行</h1>
          <p className="lead">
            行った場所の写真とメモを、少しずつ残していきます。
          </p>
        </div>
      </section>

      <section className="section" id="trips">
        <h2>行ったところ</h2>
        <div className="trip-list">
          {trips.map((trip) => (
            <article key={trip.title} className="trip">
              <figure className="trip-photo">
                <img
                  src={trip.src}
                  alt={trip.alt}
                  width={1920}
                  height={1080}
                  style={{ objectPosition: trip.position }}
                />
              </figure>
              <div className="trip-copy">
                <p className="trip-place">{trip.place}</p>
                <h3>{trip.title}</h3>
                <p>{trip.note}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="actions">
          <Link className="button ghost" to="/">
            ホームに戻る
          </Link>
        </div>
      </section>
    </>
  )
}
