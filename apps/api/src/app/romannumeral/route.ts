import { NextResponse, type NextRequest } from 'next/server';
import { convertToRoman} from '../../lib/romanNumerals';
import { InvalidInputError } from '../../lib/errors/InvalidInputError';
import { InvalidRangeError } from '../../lib/errors/InvalidRangeError';

export async function GET(request: NextRequest) {
  const startTime = performance.now();
  const searchParams = request.nextUrl.searchParams;
  const numberStr = searchParams.get('query');

  console.info(`Received request for ${numberStr}`);

  if (!numberStr || !numberStr.trim()) {
    // Record error to an error counter metric with error type, status
    console.error(`Missing query parameter`);
    return NextResponse.json({ input: numberStr, error: 'Please enter a number' }, { status: 400 });
  }

  try {
    const romanNumeral = convertToRoman(numberStr);
    // Record performance metrics
    console.info(`Converted ${numberStr} to ${romanNumeral} in ${performance.now() - startTime} ms`);
    // Record metrics by number range (1-10, 10-100, 100-1000, 1000-3999) if that is interesting/useful

    return NextResponse.json({
      input: numberStr,
      output: romanNumeral,
    });
  } catch (error) {
    // Record error to an error counter metric with error type, status
    console.error(`Error converting ${numberStr} to roman numeral: ${error}`);
    if (error instanceof InvalidRangeError || error instanceof InvalidInputError) {
      return NextResponse.json({ input: numberStr, error: error.message }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
    return NextResponse.json({ input: numberStr, error: errorMessage }, { status: 500 });
  }
}
