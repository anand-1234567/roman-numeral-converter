'use client';

import { useState } from 'react';
import { Heading, Flex, Button, TextField, Card, Text, Container, Box } from '@radix-ui/themes';
import { ThemeSwitcher } from '../components/theme-switcher';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ input: string; output: string; } | null>(null);
  const [error, setError] = useState<{ input?: string; error: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRomanConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch(`/api/roman?query=${encodeURIComponent(number.trim())}`);
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setError(data);
      }
    } catch (error) {
      console.error('Error converting number:', error);
      setError({ error: 'Error converting number' });
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
        
        <Heading as="h1" size="6">Roman numeral converter</Heading>
 
        <Box width="100%" maxWidth="320px">
          <Card>
            <Flex direction="column" gap="1" p="1">
              <form onSubmit={handleRomanConversion}>
                <Flex direction="column" gap="4">
                  <Text as="label" size="2" htmlFor="number-input">Enter a number</Text>
                  <TextField.Root
                    id="number-input"
                    type="text"
                    value={number}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
                    aria-describedby={
                      (result && result.input === number) ? 'result-message' :
                      error ? 'error-message' : undefined
                    }
                    aria-invalid={error ? 'true' : 'false'}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Converting...' : 'Convert to roman numeral'}
                  </Button>
                </Flex>
              </form>
              
              {result && result.input === number && (
                <Text 
                  id="result-message" 
                  aria-live="polite" 
                  className="message-box"
                >
                  <strong>Roman numeral:</strong> {result.output}
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