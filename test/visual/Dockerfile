FROM mcr.microsoft.com/playwright:v1.50.1-noble

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest

RUN corepack enable
