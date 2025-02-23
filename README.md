# Roman Numeral Converter

An application for converting numbers into roman numerals. See [References](#references) for the Roman numerals specification source.

![Roman Numeral Converter App Screenshot](./screenshot.png)

## Project Structure

- `apps/api`: Backend API
- `apps/ui`: Frontend
- `test/e2e`: End-to-end tests
- `test/visual`: Visual tests
- `packages/*`: Shared packages

You can see additional details about the individual packages in the README files in the respective directories.

## Prerequisites

- Node.js (v18+)
- pnpm (v9+)

## Developer setup

The project uses pnpm for development due to its speed and efficiency.

### Using pnpm
Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
``` 

Visit the application at http://localhost:3000
The API service will be available at http://localhost:8080. For example, http://localhost:8080/romannumeral?query=42

### Running with Docker

Run the application using Docker Compose:

```bash
docker compose up
```

## Testing

The project has unit, end-to-end, and visual tests.

### Unit tests
Each package has its own unit tests. There is a convenient script at the root of the project to run all the tests for the API and UI services.

```bash
pnpm test
```

### End-to-end tests
The end to end tests are located in the `test/e2e` directory. 

```bash
pnpm test:e2e
```

### Visual tests
The visual tests are located in the `test/visual` directory. The visual tests require docker to run.

```bash
pnpm test:visual
```

## Monitoring

The application uses OpenTelemetry for monitoring and tracing. See the [API README](./apps/api/README.md) for more details and the [UI README](./apps/ui/README.md) for the frontend monitoring details.

There is a docker container for testing the OpenTelemetry setup. It is configured to collect metrics from the API and UI services.
Run `docker compose up` in the `dev/telemetry-docker` directory to start the environment.

You can view the following:
- Traces on Jaeger at http://localhost:16686/
- Metrics on Prometheus at http://localhost:9090

Some sample metric queries you can try on Prometheus
- `rate(roman_numeral_conversion_ui_requests_total{job="roman-numeral-converter-ui"}[5m])`
- `histogram_quantile(0.90, rate(roman_numeral_conversion_api_request_duration_ms_bucket[5m]))`

## References
- [Roman Numerals Wikipedia](https://en.wikipedia.org/wiki/Roman_numerals)
