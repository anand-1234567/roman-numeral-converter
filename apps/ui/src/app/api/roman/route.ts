import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { romanNumeralConversionRequestDurationHistogram, romanNumeralConversionRequestsCounter, romanNumeralConverterRequestErrorsCounter } from '@/lib/metrics';

const API_URL = process.env.API_URL || 'http://localhost:8080';

const log = logger.child({
  module: 'route',
  path: '/api/roman',
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  try {
    const url = `${API_URL}/romannumeral?query=${encodeURIComponent(query || '')}`
    log.info(`Proxying request for ${query} to ${url}`);
    const startTime = performance.now();
    // note: Add some retry logic if it is unable to connect to the API
    const response = await fetch(url);
    const data = await response.json();

    // note: For a more computationally expensive operation, we could use a cache and capture metrics for cache hits and misses
    const duration = performance.now() - startTime;
    romanNumeralConversionRequestDurationHistogram.record(duration);
    log.info(`Received response ${JSON.stringify(data)} for ${query} in ${duration} ms`);
    romanNumeralConversionRequestsCounter.add(1, { status: response.status });

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    romanNumeralConverterRequestErrorsCounter.add(1, { status: '500' });
    log.error(`Error proxying request for ${query}:`, error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}