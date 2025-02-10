import { NextResponse, type NextRequest } from 'next/server';
import { convertToRoman} from '../../lib/romanNumerals';
import { InvalidInputError } from '../../lib/errors/InvalidInputError';
import { InvalidRangeError } from '../../lib/errors/InvalidRangeError';
import { 
  romanNumeralConversionRequestsCounter, 
  romanNumeralConversionRequestDurationHistogram, 
  romanNumeralConverterRequestErrorsCounter 
} from "../../lib/metrics";
import { logger } from '../../lib/logger';

const log = logger.child({
  module: 'route',
  path: '/romannumeral',
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const numberStr = searchParams.get('query');

  romanNumeralConversionRequestsCounter.add(1);
  log.info(`Received request to convert ${numberStr}`);

  if (!numberStr || !numberStr.trim()) {
    // note: Record error to an error counter metric with error type, status
    log.error(`Missing query parameter`);
    romanNumeralConverterRequestErrorsCounter.add(1, {
      httpStatusCode: 400,
      type: 'MissingInput',
    });
    return NextResponse.json({ input: numberStr, error: 'Please enter a number' }, { status: 400 });
  }

  try {
    const conversionStartTime = performance.now();
    const romanNumeral = convertToRoman(numberStr);
    const conversionDuration = performance.now() - conversionStartTime;
    romanNumeralConversionRequestDurationHistogram.record(conversionDuration);
    log.info(`Converted ${numberStr} to ${romanNumeral} in ${conversionDuration} ms`);
    
    return NextResponse.json({
      input: numberStr,
      output: romanNumeral,
    });
    
  } catch (error) {
    log.error(`Error converting ${numberStr} to roman numeral`, error);
    if (error instanceof InvalidRangeError || error instanceof InvalidInputError) {
      romanNumeralConverterRequestErrorsCounter.add(1, {
        httpStatusCode: 400,
        type: error.name,
      });
      return NextResponse.json({ input: numberStr, error: error.message }, { status: 400 });
    }

    romanNumeralConverterRequestErrorsCounter.add(1, {
      httpStatusCode: 500,
      type: 'UnknownError',
    });
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
    return NextResponse.json({ input: numberStr, error: errorMessage }, { status: 500 });
  }
}
