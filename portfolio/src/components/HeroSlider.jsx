import { useEffect, useRef, useState } from 'react'

const INTERVAL_MS = 4500

function Chevron({ direction }) {
  const isPrev = direction === 'prev'

  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d={isPrev ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function HeroSlider({ slides, caption }) {
  const count = slides.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragStart = useRef(null)

  const go = (step) => {
    setIndex((current) => (current + step + count) % count)
  }

  useEffect(() => {
    if (count < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [count, paused])

  const onPointerDown = (event) => {
    if (event.target.closest('button')) return
    dragStart.current = event.clientX
  }

  const onPointerUp = (event) => {
    if (dragStart.current == null) return
    const delta = event.clientX - dragStart.current
    dragStart.current = null
    if (delta > 48) go(-1)
    else if (delta < -48) go(1)
  }

  return (
    <figure
      className="hero-visual"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }}
    >
      <div
        className="hero-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="メイン画像"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null
        }}
      >
        <div
          className="hero-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div className="hero-slide" key={`${slide.alt}-${slideIndex}`}>
              <img
                src={slide.src}
                alt={slide.alt}
                width={1920}
                height={1080}
                style={{ objectPosition: slide.position }}
                draggable="false"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              className="hero-nav prev"
              aria-label="前の画像"
              onClick={() => go(-1)}
            >
              <Chevron direction="prev" />
            </button>
            <button
              type="button"
              className="hero-nav next"
              aria-label="次の画像"
              onClick={() => go(1)}
            >
              <Chevron direction="next" />
            </button>
            <div className="hero-dots">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.alt}
                  type="button"
                  className={slideIndex === index ? 'is-active' : undefined}
                  aria-label={`${slideIndex + 1}枚目を表示`}
                  aria-current={slideIndex === index ? 'true' : undefined}
                  onClick={() => setIndex(slideIndex)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
