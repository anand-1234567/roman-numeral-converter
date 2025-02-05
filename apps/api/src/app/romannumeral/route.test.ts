import { describe, it, expect } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('/romannumeral route', () => {
  function createRequest(query?: string) {
    const url = query
      ? `http://localhost:8080/romannumeral?query=${query}`
      : 'http://localhost:8080/romannumeral';
    return new NextRequest(new Request(url));
  }

  it('converts valid number to roman numeral', async () => {
    const request = createRequest('42');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      input: '42',
      output: 'XLII',
    });
  });

  it('returns 400 when number parameter is missing', async () => {
    const request = createRequest();
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      input: null,
      error: 'Please enter a number',
    });
  });

  it('returns 400 when number parameter is empty string with spaces', async () => {
    const request = createRequest('   ');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      input: '',
      error: 'Please enter a number',
    });
  });

  it('returns 400 when number has decimal', async () => {
    const request = createRequest('1.23');
    const response = await GET(request);
    await response.json();

    expect(response.status).toBe(400);
  });

  it('returns 400 when number has comma', async () => {
    const request = createRequest('1,23');
    const response = await GET(request);
    await response.json();

    expect(response.status).toBe(400);
  });

  it('returns 400 for number greater than 3999', async () => {
    const request = createRequest('4000');
    const response = await GET(request);
    await response.json();

    expect(response.status).toBe(400);
  });

  it('returns 400 for number less than 1', async () => {
    const request = createRequest('0');
    const response = await GET(request);
    await response.json();

    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid number format', async () => {
    const request = createRequest('abc');
    const response = await GET(request);
    await response.json();

    expect(response.status).toBe(400);
  });
});
