# Roman Numeral Converter Visual Tests

Visual tests for the Roman Numeral Converter application. 
The tests are run using Playwright in Docker. Docker is used to ensure a consistent environment for the tests, so the snapshots look the same on all machines.

## Running the tests

```bash
pnpm test
```

## Debugging the tests
You can run the tests without docker if there are any errors that you are trying to debug using the `test:internal` commands.

```bash
pnpm test:internal
pnpm test:internal:ui
pnpm test:internal:debug
```

## Updating the snapshots

You can update the snapshots by running the following command:

```bash
pnpm test:update-snapshots
```
