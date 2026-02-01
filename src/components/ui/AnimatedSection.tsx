'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useGSAP'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
}

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
}: AnimatedSectionProps) {
  const ref = useScrollAnimation<HTMLDivElement>({
    direction,
    delay,
    duration,
    distance,
  })

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
