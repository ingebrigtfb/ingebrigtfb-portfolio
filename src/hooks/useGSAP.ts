'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface ScrollAnimationOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  start?: string
  end?: string
  scrub?: boolean | number
  once?: boolean
}

/**
 * Hook for scroll-triggered fade/slide animations
 */
export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)

  const {
    direction = 'up',
    delay = 0,
    duration = 0.8,
    distance = 50,
    start = 'top 85%',
    end = 'top 20%',
    scrub = false,
    once = true,
  } = options

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current

    // Set initial state
    const initialProps: gsap.TweenVars = { opacity: 0 }

    switch (direction) {
      case 'up':
        initialProps.y = distance
        break
      case 'down':
        initialProps.y = -distance
        break
      case 'left':
        initialProps.x = distance
        break
      case 'right':
        initialProps.x = -distance
        break
    }

    gsap.set(element, initialProps)

    // Animate to final state
    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        once,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === element) t.kill()
      })
    }
  }, [direction, delay, duration, distance, start, end, scrub, once])

  return ref
}

interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
}

/**
 * Hook for parallax scrolling effect
 */
export function useParallax<T extends HTMLElement>(
  options: ParallaxOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)

  const { speed = 0.5, direction = 'vertical' } = options

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current

    const animation = gsap.to(element, {
      [direction === 'vertical' ? 'yPercent' : 'xPercent']: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      animation.kill()
    }
  }, [speed, direction])

  return ref
}

interface StaggerAnimationOptions {
  stagger?: number
  direction?: 'up' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
}

/**
 * Hook for staggered children animations
 */
export function useStaggerAnimation<T extends HTMLElement>(
  selector: string,
  options: StaggerAnimationOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)

  const {
    stagger = 0.1,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 30,
  } = options

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const container = ref.current
    const children = container.querySelectorAll(selector)

    if (children.length === 0) return

    // Set initial state
    const initialProps: gsap.TweenVars = { opacity: 0 }

    switch (direction) {
      case 'up':
        initialProps.y = distance
        break
      case 'left':
        initialProps.x = distance
        break
      case 'right':
        initialProps.x = -distance
        break
    }

    gsap.set(children, initialProps)

    // Animate with stagger
    const animation = gsap.to(children, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    })

    return () => {
      animation.kill()
    }
  }, [selector, stagger, direction, delay, duration, distance])

  return ref
}

interface CounterOptions {
  start?: number
  duration?: number
  delay?: number
}

/**
 * Hook for number counter animation
 */
export function useCounterAnimation(
  endValue: number,
  options: CounterOptions = {}
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null)

  const { start = 0, duration = 2, delay = 0 } = options

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current
    const counter = { value: start }

    const animation = gsap.to(counter, {
      value: endValue,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        element.textContent = Math.round(counter.value).toString()
      },
    })

    return () => {
      animation.kill()
    }
  }, [endValue, start, duration, delay])

  return ref
}

/**
 * Hook for reveal animation with clip-path
 */
export function useRevealAnimation<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const element = ref.current

    gsap.set(element, {
      clipPath: 'inset(100% 0 0 0)',
    })

    const animation = gsap.to(element, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true,
      },
    })

    return () => {
      animation.kill()
    }
  }, [])

  return ref
}

/**
 * Utility to kill all ScrollTriggers on unmount
 */
export function useCleanupScrollTriggers() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}
