# Test Directory

This directory contains all test files for the e-commerce dashboard application.

## Structure

Tests are organized to mirror the source code structure:

```
__tests__/
├── actions/
│   └── products.test.ts          # Tests for product server actions
├── components/
│   └── datatable/
│       └── index.test.tsx        # Tests for DataTable component
└── README.md                     # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Files

### Bug 1: Category Deselection Issue
**File**: `components/datatable/index.test.tsx`
- Bug condition exploration tests (3 tests)
- Preservation property tests (8 tests)
- Total: 11 tests

### Bug 2: Main Image Not Attached on Edit
**File**: `actions/products.test.ts`
- Bug condition exploration tests (5 tests)
- Preservation property tests (6 tests)
- Total: 11 tests

## Test Methodology

Tests follow a property-based testing approach using `fast-check`:

1. **Bug Condition Tests**: Verify the bug is fixed by testing the specific conditions that triggered the bug
2. **Preservation Tests**: Ensure existing functionality remains unchanged (no regressions)

## Total Coverage

- **22 tests** across 2 test files
- All tests passing ✅
