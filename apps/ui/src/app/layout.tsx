import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { WebVitals } from '../components/web-vitals';
import { MetricsProvider } from '../components/metrics-provider';

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