/**
 * Setup the OpenTelemetry SDK 
 * This also sets up the Prometheus exporter
 * 
 * References: 
 * - https://vercel.com/docs/observability/otel-overview
 * - https://github.com/vercel/next.js/discussions/16205#discussioncomment-9360516
 */

import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { metrics } from '@opentelemetry/api';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import {
    Resource,
    detectResourcesSync,
    envDetector,
} from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import {
    ATTR_SERVICE_NAME,
} from '@opentelemetry/semantic-conventions';

const exporter = new PrometheusExporter({
    port: parseInt(process.env.METRICS_PORT || '9465'),
});
const detectedResources = detectResourcesSync({
    detectors: [envDetector],
});

const customResources = new Resource({
    [ATTR_SERVICE_NAME]: process.env.APP_NAME || 'roman-numeral-converter-ui',
});

const resources = detectedResources.merge(customResources);

const meterProvider = new MeterProvider({
    readers: [exporter],
    resource: resources,
});

metrics.setGlobalMeterProvider(meterProvider);

registerInstrumentations({
    meterProvider,
});
