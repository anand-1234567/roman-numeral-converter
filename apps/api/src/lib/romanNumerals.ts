import { MESSAGES } from '@roman-numeral-converter/messages';
import { InvalidRangeError } from './errors/InvalidRangeError';
import { InvalidInputError } from './errors/InvalidInputError';

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' },
];

/**
 * Converts a number to a roman numeral
 * @param input - The number to convert
 * @returns The roman numeral
 */
export function convertToRoman(input: string | number): string {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  if (isNaN(num)) {
    throw new InvalidInputError(MESSAGES.ERROR_MESSAGE_INPUT_NOT_A_NUMBER);
  }

  if (!Number.isInteger(num)) {
    throw new InvalidInputError(MESSAGES.ERROR_MESSAGE_INPUT_NOT_AN_INTEGER);
  }

  if (typeof input === 'string' && !/^[-.]?\d+$/.test(input)) {
    throw new InvalidInputError(MESSAGES.ERROR_MESSAGE_INPUT_HAS_SYMBOLS);
  }

  if (num < 1 || num > 3999) {
    throw new InvalidRangeError(MESSAGES.ERROR_MESSAGE_INPUT_OUT_OF_RANGE);
  }

  let result = '';
  let remaining = num;

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}
