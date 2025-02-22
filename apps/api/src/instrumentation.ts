import { registerOTel } from '@vercel/otel';
 
export async function register() {
  registerOTel({ serviceName: process.env.APP_NAME || 'roman-numeral-converter-api' });
  // Only load the instrumentation for the nodejs runtime
  // to prevent throwing an error that it is not supported for the edge runtime
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-node')
  }
}
