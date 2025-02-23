# Roman Numeral Converter API service

A next.js application that provides a RESTful API that converts numbers into roman numerals. See [spec.yml](./spec.yml) for the API specification.

## Prerequisites

- Node.js (v18+)
- pnpm (v9+)

## Running the application

The project uses pnpm for development due to its speed and efficiency.

### Using pnpm

Install dependencies:

```bash
pnpm install
```

Run the application:

```bash
pnpm dev
``` 

Visit the application at http://localhost:8080/romannumeral?query=42

## Testing

Run the tests:

```bash
pnpm test
```

## Monitoring

The application uses OpenTelemetry for monitoring and tracing. The metrics can be viewed at http://localhost:9464/metrics

You can see the metrics instrumented for the API backend at `src/lib/metrics.ts`