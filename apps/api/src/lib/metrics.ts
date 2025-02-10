import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter(process.env.APP_NAME || 'roman-numeral-converter-api');

export const romanNumeralConversionRequestsCounter = meter.createCounter("roman_numeral_conversion_api_requests_total", {
  description: "Total number of roman numeral conversion requests",
});

export const romanNumeralConversionRequestDurationHistogram = meter.createHistogram("roman_numeral_conversion_api_request_duration_ms", {
  description: "Histogram of roman numeral conversion request duration",
  unit: "ms",
});

export const romanNumeralConverterRequestErrorsCounter = meter.createCounter("roman_numeral_converter_api_request_errors_total", {
  description: "Total number of roman numeral converter request errors",
});
