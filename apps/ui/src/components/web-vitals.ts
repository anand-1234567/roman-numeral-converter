'use client'
 
import { useMetrics } from './metrics-provider';
import { useReportWebVitals } from 'next/web-vitals'
 
export function WebVitals() {
  const { track } = useMetrics();
  useReportWebVitals((metric: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    track('web_vitals', 'metric', metric);
  })
 
  return null
}