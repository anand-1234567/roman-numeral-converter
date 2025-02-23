'use client';

import { useTheme } from '../hooks/use-theme';
import { SegmentedControl } from '@radix-ui/themes';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';
import type { Theme } from '../hooks/use-theme';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <SegmentedControl.Root 
      defaultValue={theme || 'system'} 
      onValueChange={(value: Theme) => setTheme(value)}
      size="2"
      className="theme-switcher"
    >
      <SegmentedControl.Item value="system" className="theme-switcher-item">
        <DesktopIcon width="16" height="16" />
      </SegmentedControl.Item>
      <SegmentedControl.Item value="light" className="theme-switcher-item">
        <SunIcon width="16" height="16" />
      </SegmentedControl.Item>
      <SegmentedControl.Item value="dark" className="theme-switcher-item">
        <MoonIcon width="16" height="16" />
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
} 