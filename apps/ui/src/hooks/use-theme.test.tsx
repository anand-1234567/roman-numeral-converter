import { act, renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './use-theme';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ThemeProvider and useTheme', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset document root classes
    document.documentElement.classList.remove('light', 'dark');
    
    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('should use default theme (system)', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('system');
  });

  it('should use provided default theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      ),
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should update theme when setTheme is called', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should handle system theme correctly', () => {
    // Mock system dark theme
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('system');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should get the theme from localStorage', () => {
    localStorage.setItem('theme', 'light');

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe('light');
  });

  it('should throw error when useTheme is used outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrowError(
      'useTheme must be used within a ThemeProvider'
    );
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage.setItem to throw error
    const mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    mockSetItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      // Should not throw error
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
  });
});