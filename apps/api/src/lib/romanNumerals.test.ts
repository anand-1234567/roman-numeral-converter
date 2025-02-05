import { describe, it, expect } from 'vitest';
import { convertToRoman } from './romanNumerals';
import { InvalidRangeError } from './errors/InvalidRangeError';
import { InvalidInputError } from './errors/InvalidInputError';

describe('convertToRoman', () => {
  it('converts basic numbers correctly', () => {
    expect(convertToRoman(1)).toBe('I');
    expect(convertToRoman(4)).toBe('IV');
    expect(convertToRoman(5)).toBe('V');
    expect(convertToRoman(9)).toBe('IX');
    expect(convertToRoman(10)).toBe('X');
    expect(convertToRoman(49)).toBe('XLIX');
    expect(convertToRoman(50)).toBe('L');
    expect(convertToRoman(99)).toBe('XCIX');
    expect(convertToRoman(100)).toBe('C');
    expect(convertToRoman(499)).toBe('CDXCIX');
    expect(convertToRoman(500)).toBe('D');
    expect(convertToRoman(999)).toBe('CMXCIX');
    expect(convertToRoman(1000)).toBe('M');
    expect(convertToRoman(39)).toBe('XXXIX');
    expect(convertToRoman(246)).toBe('CCXLVI');
    expect(convertToRoman(789)).toBe('DCCLXXXIX');
    expect(convertToRoman(2421)).toBe('MMCDXXI');
    expect(convertToRoman(160)).toBe('CLX');
    expect(convertToRoman(207)).toBe('CCVII');
    expect(convertToRoman(1009)).toBe('MIX');
    expect(convertToRoman(1009)).toBe('MIX');
    expect(convertToRoman(1066)).toBe('MLXVI');
    expect(convertToRoman(1776)).toBe('MDCCLXXVI');
    expect(convertToRoman(1918)).toBe('MCMXVIII');
    expect(convertToRoman(1944)).toBe('MCMXLIV');
    expect(convertToRoman(2025)).toBe('MMXXV');
    expect(convertToRoman(3999)).toBe('MMMCMXCIX');
  });

  it('accepts string input', () => {
    expect(convertToRoman('42')).toBe('XLII');
  });

  it('accepts numbers with leading zeroes', () => {
    expect(convertToRoman('00042')).toBe('XLII');
  });

  it('throws InvalidRangeError for numbers below 1', () => {
    expect(() => convertToRoman(0)).toThrow(InvalidRangeError);
    expect(() => convertToRoman(-1)).toThrow(InvalidRangeError);
    expect(() => convertToRoman('-1')).toThrow(InvalidRangeError);
  });

  it('throws InvalidRangeError for numbers above 3999', () => {
    expect(() => convertToRoman(4000)).toThrow(InvalidRangeError);
    expect(() => convertToRoman('4000')).toThrow(InvalidRangeError);
  });

  it('throws InvalidInputError for invalid input', () => {
    expect(() => convertToRoman('abc')).toThrow(InvalidInputError);
    expect(() => convertToRoman(.3)).toThrow(InvalidInputError);
    expect(() => convertToRoman(0.3)).toThrow(InvalidInputError);
    expect(() => convertToRoman('0.3')).toThrow(InvalidInputError);
    expect(() => convertToRoman('.3')).toThrow(InvalidInputError);
    expect(() => convertToRoman('2,34')).toThrow(InvalidInputError);
    expect(() => convertToRoman('2.34')).toThrow(InvalidInputError);
    expect(() => convertToRoman('abc')).toThrow(InvalidInputError);
    expect(() => convertToRoman('2+3')).toThrow(InvalidInputError);
    expect(() => convertToRoman('4-2')).toThrow(InvalidInputError);
    expect(() => convertToRoman('2*2')).toThrow(InvalidInputError);
    expect(() => convertToRoman(NaN)).toThrow(InvalidInputError);
  });
});
