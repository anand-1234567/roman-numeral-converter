import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://localhost:8080';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  try {
    const url = `${API_URL}/romannumeral?query=${encodeURIComponent(query || '')}`
    console.info(`Fetching ${url}`);
    const startTime = performance.now();
    const response = await fetch(url);
    const data = await response.json();
    // For a more computationally expensive operation, we could use a cache and capture metrics for cache hits and misses

    // Record performance metrics
    console.info(`Received response ${JSON.stringify(data)} in ${performance.now() - startTime} ms`);
    // Record response to a request counter metric with status
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    // Record error to the request counter metric with status
    console.error('Error proxying request:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}