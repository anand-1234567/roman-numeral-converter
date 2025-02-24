import { NextResponse } from 'next/server';

/**
 * Health check endpoint. This can be used by the CI pipeline or by infrastructure services
 * to check if the API is running and healthy.
 *
 * @returns A JSON response if the status is ok
 */
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}