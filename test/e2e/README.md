# Roman Numeral Converter End-to-End Tests

End to end tests for the Roman Numeral Converter application.

## Running the tests

```bash
pnpm test
```

## Running the tests in UI mode

```bash
pnpm test:ui
```

## Running the tests in debug mode

```bash
pnpm test:debug
```

## Troubleshooting

If chromium is not installed automatically, you can install it with the following command:

```bash
pnpm test:setup
```

If the test is failing with a timeout, you can build the docker image first with the following command and run again

```bash
pnpm test:build
```
