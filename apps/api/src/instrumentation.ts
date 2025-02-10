import { registerOTel } from '@vercel/otel';
 
export async function register() {
  registerOTel({ serviceName: process.env.APP_NAME || 'roman-numeral-converter-api' });
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }
}
