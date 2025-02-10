'use client';

import React, { createContext, useContext, useCallback } from 'react';

interface MetricsContextType {
  track: (name: string, metadata?: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

interface MetricsProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    dataLayer: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export function MetricsProvider({ children }: MetricsProviderProps) {
  // Initialize dataLayer if it doesn't exist
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = [];
  }

  const track = useCallback((name: string, metadata?: Record<string, any>) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (typeof window === 'undefined') return;

    window.dataLayer.push({
      event: name,
      ...metadata,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <MetricsContext.Provider value={{ track }}>
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetrics() {
  const context = useContext(MetricsContext);
  
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  
  return context;
}
