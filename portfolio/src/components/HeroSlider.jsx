import { useRef, useState } from 'react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const INTERVAL_MS = 4500

export default function HeroSlider({ slides }) {
  const swiperRef = useRef(null)
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const canSlide = slides.length > 1

  return (
    <Swiper
      className="hero-slider"
      modules={[A11y, Autoplay, Navigation, Pagination]}
      slidesPerView={1}
      rewind={canSlide}
      speed={reduceMotion ? 0 : 750}
      autoplay={
        canSlide && !reduceMotion
          ? {
              delay: INTERVAL_MS,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      navigation={canSlide}
      pagination={canSlide ? { clickable: true } : false}
      a11y={{
        containerMessage: 'メイン画像',
        containerRoleDescriptionMessage: 'カルーセル',
        prevSlideMessage: '前の画像',
        nextSlideMessage: '次の画像',
        paginationBulletMessage: '{{index}}枚目を表示',
      }}
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      onFocus={() => swiperRef.current?.autoplay?.pause()}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          swiperRef.current?.autoplay?.resume()
        }
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.alt}>
          <img
            src={slide.src}
            alt={slide.alt}
            width={1920}
            height={1080}
            style={{ objectPosition: slide.position }}
            draggable="false"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
