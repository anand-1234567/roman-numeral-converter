import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MESSAGES } from '@roman-numeral-converter/messages';
import Home from './page';
import { MetricsProvider } from '../hooks/use-metrics';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

function renderWithMetrics(ui: React.ReactNode) {
  return render(<MetricsProvider>{ui}</MetricsProvider>);
}

describe('Home Page', () => {
  beforeEach(() => {

    mockFetch.mockReset();
  });

  it('renders roman numeral converter form', () => {
    renderWithMetrics(<Home />);
    
    expect(screen.getByLabelText(MESSAGES.INPUT_LABEL)).toBeInTheDocument();
    expect(screen.getByText(MESSAGES.CONVERT_BUTTON)).toBeInTheDocument();
  });

  it('handles roman numeral conversion', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ input: '234', output: 'CCXXXIV' }),
    });

    renderWithMetrics(<Home />);
    
    const input = screen.getByLabelText(MESSAGES.INPUT_LABEL);
    const button = screen.getByText(MESSAGES.CONVERT_BUTTON);

    await userEvent.type(input, '234');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(MESSAGES.RESULT_LABEL)).toBeInTheDocument();
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

    renderWithMetrics(<Home />);
    
    const input = screen.getByLabelText(MESSAGES.INPUT_LABEL);
    const button = screen.getByText(MESSAGES.CONVERT_BUTTON);

    await userEvent.type(input, '4000');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Number must be between 1 and 3999')).toBeInTheDocument();
    });
  });
}); 