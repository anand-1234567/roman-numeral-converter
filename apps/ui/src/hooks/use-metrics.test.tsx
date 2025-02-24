import { render, act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MetricsProvider, useMetrics } from './use-metrics';

describe('MetricsProvider and useMetrics', () => {
  beforeEach(() => {
    // Clear window.dataLayer before each test
    if (typeof window !== 'undefined') {
      window.dataLayer = [];
    }
  });

  it('should initialize dataLayer', () => {
    render(<MetricsProvider>test</MetricsProvider>);
    expect(window.dataLayer).toBeDefined();
    expect(Array.isArray(window.dataLayer)).toBe(true);
  });

  it('should throw error when useMetrics is used outside provider', () => {
    expect(() => renderHook(() => useMetrics())).toThrowError(
        'useMetrics must be used within a MetricsProvider'
      );
  });

  it('should track events correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MetricsProvider>{children}</MetricsProvider>
    );

    const { result } = renderHook(() => useMetrics(), { wrapper });

    act(() => {
      result.current.track('some-resource', 'some-action', { someKey: 'someValue' });
    });

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({
      resource: 'some-resource',
      action: 'some-action',
      attributes: { someKey: 'someValue' }
    });
    expect(window.dataLayer[0].timestamp).toBeDefined();
  });

  it('should handle undefined action and attributes', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MetricsProvider>{children}</MetricsProvider>
    );

    const { result } = renderHook(() => useMetrics(), { wrapper });

    act(() => {
      result.current.track('test-resource');
    });

    expect(window.dataLayer).toHaveLength(1);
    expect(window.dataLayer[0]).toMatchObject({
      resource: 'test-resource',
      action: undefined,
      attributes: {}
    });
  });
});