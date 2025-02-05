import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Home Page', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders roman numeral converter form', () => {
    render(<Home />);
    
    expect(screen.getByLabelText('Enter a number')).toBeInTheDocument();
    expect(screen.getByText('Convert to roman numeral')).toBeInTheDocument();
  });

  it('handles roman numeral conversion', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ input: '234', output: 'CCXXXIV' }),
    });

    render(<Home />);
    
    const input = screen.getByLabelText('Enter a number');
    const button = screen.getByText('Convert to roman numeral');

    await userEvent.type(input, '234');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Roman numeral:")).toBeInTheDocument();
      expect(screen.getByText("CCXXXIV")).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/roman?query=234`
    );
  });

  it('handles error in roman numeral conversion', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ input: '4000', error: 'Number must be between 1 and 3999' }),
    });

    render(<Home />);
    
    const input = screen.getByLabelText('Enter a number');
    const button = screen.getByText('Convert to roman numeral');

    await userEvent.type(input, '4000');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Number must be between 1 and 3999')).toBeInTheDocument();
    });
  });
}); 