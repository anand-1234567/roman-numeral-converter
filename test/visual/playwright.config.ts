import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '**/?(*.)+(test).ts?(x)',
  timeout: 600000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        contextOptions: { viewport: { width: 1280, height: 720 } } 
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'], 
        contextOptions: { viewport: { width: 1280, height: 720 } } 
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 16'],
        contextOptions: { viewport: { width: 390, height: 844 } }
      },
    }
  ],
}); 