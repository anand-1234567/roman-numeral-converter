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
    throw new InvalidInputError('Input must be a number');
  }

  if (!Number.isInteger(num)) {
    throw new InvalidInputError('Number must be an integer');
  }

  if (typeof input === 'string' && !/^[-.]?\d+$/.test(input)) {
    throw new InvalidInputError('Number must contain only digits');
  }

  if (num < 1 || num > 3999) {
    throw new InvalidRangeError('Number must be between 1 and 3999');
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
