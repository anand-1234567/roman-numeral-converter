# Roman Numeral Converter

An application for converting numbers into roman numerals. See [References](#references) for the Roman numerals specification source.

## Project Structure

- `apps/api`: Backend API
- `apps/ui`: React UI 

You can see additional details about the individual apps in the README files in the respective directories.

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

Run the application using Docker Compose:

```bash
docker compose up
```
Visit the application at http://localhost:3000
The API service will be available at http://localhost:8080. For example, http://localhost:8080/romannumeral?query=42

## Monitoring

The application uses OpenTelemetry for monitoring and tracing. 
The metrics can be viewed at http://localhost:9464/metrics for the API service and http://localhost:9465/metrics for the UI service.

There is a docker container for testing the OpenTelemetry setup. It is configured to collect metrics from the API and UI services.
Run `docker compose up` in the `telemetry-dev` directory to start the environment.

You can view the following:
- Traces on Jaeger at http://localhost:16686/
- Metrics on Prometheus at http://localhost:9090

Some sample metric queries you can try on Prometheus
- `rate(roman_numeral_conversion_ui_requests_total{job="roman-numeral-converter-ui"}[5m])`
- `histogram_quantile(0.90, rate(roman_numeral_conversion_api_request_duration_ms_bucket[5m]))`

## References
- https://en.wikipedia.org/wiki/Roman_numerals
