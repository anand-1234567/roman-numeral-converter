import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@opentelemetry/instrumentation'],
};

export default nextConfig;
