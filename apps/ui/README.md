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

Visit the application at http://localhost:3000

## Testing

Run the tests:

```bash
pnpm test
```

## Application Monitoring

The application uses OpenTelemetry for monitoring and tracing. The metrics can be viewed at http://localhost:9465/metrics
You can see the metrics instrumented for the UI backend at `src/lib/metrics.ts`. 

## User Analytics

The Browser UI is instrumented following the [data layer approach](https://segment.com/blog/what-is-a-data-layer/). It uses a resource, action, attributes scheme to track the events. 

See the [MetricsProvider](./src/hooks/use-metrics.tsx) component for the metrics instrumentation API.

You can see the metrics emitted in the browser console by inspecting the `window.dataLayer` object. This can be used to send the metrics to a third party service like Adobe Analytics.

## RUM and Error Tracking

TODO: Use a service like Sentry or Datadog to track errors and other RUM metrics.
