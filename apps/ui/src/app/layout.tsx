import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 