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
  webServer: {
    command: 'docker compose -f ../../docker-compose.yml up',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 1200000,
    gracefulShutdown: {
      signal: 'SIGTERM',
      timeout: 5000,
    },
  },
}); 