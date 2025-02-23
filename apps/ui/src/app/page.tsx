'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

import { Heading, Flex, Button, TextField, Card, Text, Container, Box } from '@radix-ui/themes';
import { MESSAGES } from '@roman-numeral-converter/messages';
import { ThemeSwitcher } from '../components/theme-switcher';
import { useMetrics } from '../hooks/use-metrics';

export default function Home() {
  const { track } = useMetrics();
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ input: string; output: string; } | null>(null);
  const [error, setError] = useState<{ input?: string; error: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRomanConversion = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);
    track('app', 'roman_conversion_request');
    try {
      const startTime = Date.now();
      const response = await fetch(`/api/roman?query=${encodeURIComponent(number.trim())}`);
      const data = await response.json();
      const duration = Date.now() - startTime;
      track('request', 'request_duration_ms', { value: duration });
      
      if (response.ok) {
        track('request', 'response_status', { value: 'success' });
        setResult(data);
      } else {
        track('request', 'response_status', { value: 'error', type: 'api_error', status: response.status });
        setError(data);
      }
    } catch (error) {
      track('request', 'response_status', { value: 'error', type: 'unknown', error: JSON.stringify(error) });
      console.error('Error converting number:', JSON.stringify(error));
      setError({ error: MESSAGES.ERROR_MESSAGE_UNKNOWN });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="2">
      <Flex direction="column" gap="4" p="4" align="center">
        <div className="theme-switcher">
          <ThemeSwitcher />
        </div>
        
        <Heading as="h1" size="6" weight="bold">{MESSAGES.TITLE}</Heading>
 
        <Box width="100%" maxWidth="320px">
          <Card>
            <Flex direction="column" gap="1" p="1">
              <form onSubmit={handleRomanConversion}>
                <Flex direction="column" gap="4">
                  <Text as="label" size="2" htmlFor="number-input">{MESSAGES.INPUT_LABEL}</Text>
                  <TextField.Root
                    id="number-input"
                    type="text"
                    value={number}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                    aria-describedby={
                      (result && result.input === number) ? 'result-message' :
                      error ? 'error-message' : undefined
                    }
                    aria-invalid={error ? 'true' : 'false'}
                  />
                  <Button type="submit" disabled={isLoading} onClick={() => track('convert_btn', 'click', { source: 'convert_to_roman_numeral_btn' })}>
                    {isLoading ? MESSAGES.CONVERT_BUTTON_LOADING : MESSAGES.CONVERT_BUTTON}
                  </Button>
                </Flex>
              </form>
              
              {result && result.input === number && (
                <Text 
                  id="result-message" 
                  aria-live="polite" 
                  className="message-box"
                >
                  <strong>{MESSAGES.RESULT_LABEL}</strong> {result.output}
                </Text>
              )}

              {error && (
                <Text 
                  className="message-box"
                  color="crimson"
                  role="alert"
                  id="error-message"
                  aria-live="assertive"
                  size="1"
                >
                  {error.error}
                </Text>
              )}
            </Flex>
          </Card>
        </Box>
      </Flex>
    </Container>
  );
} 