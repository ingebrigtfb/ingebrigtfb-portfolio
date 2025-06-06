'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Hide navigation on studio routes
  if (pathname?.startsWith('/studio')) {
    return null
  }
  
  return <Navigation />
} 