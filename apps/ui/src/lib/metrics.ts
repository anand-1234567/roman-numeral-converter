import { metrics } from '@opentelemetry/api';

export const meter = metrics.getMeter(process.env.APP_NAME || 'roman-numeral-converter-ui');

export const romanNumeralConversionRequestsCounter = meter.createCounter("roman_numeral_conversion_ui_requests_total", {
  description: "Total number of roman numeral conversion requests",
});

export const romanNumeralConversionRequestDurationHistogram = meter.createHistogram("roman_numeral_conversion_ui_request_duration_ms", {
  description: "Histogram of roman numeral conversion request duration",
  unit: "ms",
});

export const romanNumeralConverterRequestErrorsCounter = meter.createCounter("roman_numeral_converter_ui_request_errors_total", {
  description: "Total number of roman numeral converter errors",
});