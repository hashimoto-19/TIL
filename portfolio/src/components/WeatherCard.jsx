import { useEffect, useRef, useState } from 'react'
import { useRevealOnEnter } from '../usePageMotion.js'

const CITY_ID = '260010'
const API_URL = `https://weather.tsukumijima.net/api/forecast?city=${CITY_ID}`
const API_SITE = 'https://weather.tsukumijima.net/'
const JMA_SITE = 'https://www.jma.go.jp/jma/'

function formatTemp(celsius) {
  return celsius == null || celsius === '' ? '—' : `${celsius}°`
}

function DayForecast({ forecast }) {
  if (!forecast) return null

  const max = forecast.temperature?.max?.celsius
  const min = forecast.temperature?.min?.celsius

  return (
    <article className="weather-day">
      <p className="weather-day-label">{forecast.dateLabel}</p>
      {forecast.image?.url && (
        <img
          className="weather-icon"
          src={forecast.image.url}
          alt={forecast.image.title || forecast.telop}
          width={80}
          height={60}
        />
      )}
      <p className="weather-telop">{forecast.telop}</p>
      <p className="weather-temp">
        <span>{formatTemp(max)}</span>
        <span className="weather-temp-sep">/</span>
        <span>{formatTemp(min)}</span>
      </p>
    </article>
  )
}

export default function WeatherCard() {
  const cardRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [weather, setWeather] = useState(null)
  useRevealOnEnter(cardRef, status === 'ready')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (cancelled) return
        setWeather(data)
        setStatus('ready')
      } catch {
        if (cancelled) return
        setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section weather-section" id="weather">
      <h2>天気</h2>
      <p>登山の参考に、京都の天気予報を表示しています。</p>

      {status === 'loading' && <p className="weather-status">読み込み中…</p>}

      {status === 'error' && (
        <p className="weather-status">天気を取得できませんでした。</p>
      )}

      {status === 'ready' && weather && (
        <div className="weather-card" ref={cardRef}>
          <p className="weather-place">
            {weather.location?.prefecture} {weather.location?.city}
          </p>
          <div className="weather-days">
            <DayForecast forecast={weather.forecasts?.[0]} />
            <DayForecast forecast={weather.forecasts?.[1]} />
            <DayForecast forecast={weather.forecasts?.[2]} />
   
          </div>
          <p className="weather-credit">
            データ: <a href={JMA_SITE} target="_blank" rel="noreferrer">気象庁</a>
            {' / '}
            <a href={API_SITE} target="_blank" rel="noreferrer">
              天気予報 API（livedoor 天気互換）
            </a>
          </p>
        </div>
      )}
    </section>
  )
}
