import './globals.css';
import { ThemeProvider } from '../hooks/use-theme';
import { WebVitals } from '../components/web-vitals';
import { MetricsProvider } from '../hooks/use-metrics';

export const metadata = {
  title: 'Roman Numeral Converter',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider defaultTheme="system">
          <MetricsProvider>
            <WebVitals />
            {children}
          </MetricsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}