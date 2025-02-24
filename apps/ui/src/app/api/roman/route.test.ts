import { NextRequest } from 'next/server';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GET } from './route';
import { 
  romanNumeralConversionRequestDurationHistogram, 
  romanNumeralConversionRequestsCounter, 
  romanNumeralConverterRequestErrorsCounter 
} from '@/lib/metrics';

vi.mock('@/lib/metrics', () => ({
  romanNumeralConversionRequestDurationHistogram: {
    record: vi.fn(),
  },
  romanNumeralConversionRequestsCounter: {
    add: vi.fn(),
  },
  romanNumeralConverterRequestErrorsCounter: {
    add: vi.fn(),
  },
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('/romannumeral route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockReset();
  });

  it('should successfully convert a number to roman numeral', async () => {
    const mockResponse = { input: '42', output: 'XLII' };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      status: 200,
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/roman?query=42')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/romannumeral?query=42'
    );
    expect(romanNumeralConversionRequestsCounter.add).toHaveBeenCalledWith(1, { status: 200 });
    expect(romanNumeralConversionRequestDurationHistogram.record).toHaveBeenCalled();
  });

  it('should pass response errors back to the client', async () => {
    const mockResponse = { input: 'abc', error: 'Some error message' };
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      status: 400,
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/roman?query=abc')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual(mockResponse);
    expect(romanNumeralConversionRequestsCounter.add).toHaveBeenCalledWith(1, { status: 400 });
  });

  it('should handle API errors', async () => {
    mockFetch.mockRejectedValueOnce(new Error('API Error'));

    const request = new NextRequest(
      new URL('http://localhost:3000/api/roman?query=42')
    );

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Something went wrong. Please try again later.' });
    expect(romanNumeralConverterRequestErrorsCounter.add).toHaveBeenCalledWith(1, { status: '500' });
  });
});