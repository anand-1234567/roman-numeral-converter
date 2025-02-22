import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '**/?(*.)+(test).ts?(x)',
  timeout: 30000,
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
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 16'] },
    }
  ],
  webServer: {
    command: 'docker-compose up --build --wait && docker-compose down',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 60000,
    gracefulShutdown: {
      signal: 'SIGTERM',
      timeout: 5000,
    },
  },
}); 