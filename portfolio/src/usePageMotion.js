import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function fadeUp(targets, vars = {}) {
  const list = targets?.length === undefined ? [targets] : Array.from(targets)
  if (!list.length || !list[0]) return

  gsap.set(list, { transition: 'none' })
  gsap.from(list, {
    y: 28,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    ...vars,
    onComplete: () => {
      gsap.set(list, { clearProps: 'transform,opacity,transition' })
    },
  })
}

const sectionItemSelector = [
  ':scope > h2',
  ':scope > p',
  ':scope > .actions',
  ':scope > .skill-list > li',
  ':scope > .card-grid > *',
  ':scope > .photo-grid > *',
  ':scope > .yamap-grid > *',
  ':scope > .link-list > li',
  ':scope > .weather-status',
  ':scope > .trip-list > .trip',
].join(', ')

export function usePageMotion(scopeRef, pathname) {
  useGSAP(
    () => {
      const root = scopeRef.current
      if (!root || prefersReducedMotion()) return

      fadeUp(root.querySelectorAll('.topbar > *'), {
        y: -12,
        duration: 0.7,
        stagger: 0.08,
      })
    },
    { scope: scopeRef },
  )

  useGSAP(
    () => {
      const root = scopeRef.current
      if (!root || prefersReducedMotion()) return

      fadeUp(root.querySelector('.hero-banner'), {
        y: 20,
        duration: 1.05,
      })

      const heroFoot = root.querySelector('.hero-foot')
      fadeUp(heroFoot?.querySelectorAll(':scope > *'), {
        y: 24,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.08,
        scrollTrigger: {
          trigger: heroFoot,
          start: 'top 92%',
          once: true,
        },
      })

      root.querySelectorAll('main > .section').forEach((section) => {
        const items = section.querySelectorAll(sectionItemSelector)
        if (!items.length) return

        fadeUp(items, {
          stagger: 0.07,
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        })
      })

      const footer = root.querySelector('.footer')
      if (footer) {
        fadeUp(footer, {
          y: 16,
          duration: 0.7,
          scrollTrigger: {
            trigger: footer,
            start: 'top 96%',
            once: true,
          },
        })
      }

      const main = root.querySelector('main')
      if (!main) return

      let frame = 0
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          if (window.scrollY > 8) return
          ScrollTrigger.refresh()
        })
      })
      observer.observe(main)

      return () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
      }
    },
    { scope: scopeRef, dependencies: [pathname], revertOnUpdate: true },
  )
}

export function useRevealOnEnter(targetRef, active) {
  useGSAP(
    () => {
      const element = targetRef.current
      if (!element || !active || prefersReducedMotion()) return

      fadeUp(element, {
        y: 22,
        duration: 0.75,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
      })
    },
    { dependencies: [active], scope: targetRef },
  )
}
