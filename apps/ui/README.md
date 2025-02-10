# Roman Numeral Converter UI

A simple Next.js application that provides a UI for the user to interact with the Roman Numeral Converter API service.

The app uses Radix UI for the components. It is something I'm familiar with and it lets me focus on the functionality.

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

### Using Docker

Run the application using Docker:

```bash
docker build -t roman-numeral-converter-ui .
docker run -p 3000:3000 roman-numeral-converter-ui
```

Visit the application at http://localhost:3000


## Testing

Run the tests:

```bash
pnpm test
```

## Monitoring

The application uses OpenTelemetry for monitoring and tracing. The metrics can be viewed at http://localhost:9465/metrics
You can see the metrics instrumented for the UI backend at `src/lib/metrics.ts`. There is a `MetricsProvider` component that is used to instrument the metrics for the UI frontend, you can see the metrics emitted in the browser console by inspecting the `window.dataLayer` object.

