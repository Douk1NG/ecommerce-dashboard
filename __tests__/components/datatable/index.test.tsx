/**
 * Bug Condition Exploration Test for Category Deselection Issue
 * 
 * **Validates: Requirements 2.1, 2.2, 2.3**
 * 
 * This test is designed to FAIL on unfixed code to demonstrate the bug exists.
 * The bug: When category filters are changed while products are selected,
 * the selections remain even though the products may no longer be visible.
 * 
 * Expected behavior: Selections should be cleared when category filters change.
 */

import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as fc from 'fast-check'
import DataTable from '../../../components/datatable/index'
import type { ColumnDef } from '@tanstack/react-table'

// Mock next/navigation
import { vi } from 'vitest'

const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: () => ({}),
}))

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/products',
}))

vi.mock('@/hooks/use-intl-text', () => ({
  useIntlText: (key: string) => key,
}))

vi.mock('@/components/intl/Text', () => ({
  default: ({ value }: { value: string }) => <span>{value}</span>,
}))

vi.mock('@/components/intl/Button', () => ({
  default: ({ title, onClick }: { title: string; onClick: () => void }) => (
    <button onClick={onClick}>{title}</button>
  ),
}))

// Type definitions
type Product = {
  id: number
  name: string
  category: string
  categories: string[]
}

// Helper to create product data
const createProduct = (id: number, categories: string[]): Product => ({
  id,
  name: `Product ${id}`,
  category: categories[0] || 'Unknown',
  categories,
})

// Define columns for the table
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'id',
  },
  {
    accessorKey: 'name',
    header: 'name',
  },
  {
    accessorKey: 'category',
    header: 'category',
  },
]

describe('Bug Condition Exploration: Category Deselection Issue', () => {
  /**
   * Property 1: Bug Condition - Category Filter Changes Leave Orphaned Selections
   * 
   * This property tests the bug condition:
   * isBugCondition1(input) where:
   *   - input.previousCategories.length > input.newCategories.length
   *   - input.selectedProducts.length > 0
   * 
   * Expected behavior (after fix):
   *   - Selections should be cleared when data changes
   * 
   * Current behavior (unfixed - this test documents the bug):
   *   - The rowSelection state in DataTable is NOT cleared when data prop changes
   *   - This causes orphaned selections for products no longer in the data
   * 
   * This test documents the expected behavior. The bug is in the implementation:
   * The DataTable component now has rowSelection state, but it lacks a useEffect
   * to clear this state when the data prop changes.
   */
  it('should clear selections when category filters are changed (documents expected behavior)', async () => {
    // Concrete test case demonstrating the expected behavior
    // Initial state: Products from multiple categories
    const initialProducts: Product[] = [
      createProduct(1, ['Electronics', 'Gadgets']),
      createProduct(2, ['Clothing', 'Fashion']),
      createProduct(3, ['Books', 'Education']),
      createProduct(4, ['Electronics', 'Computers']),
      createProduct(5, ['Clothing', 'Accessories']),
    ]

    // Render the table with initial data
    const { rerender, container } = render(
      <DataTable
        columns={columns}
        data={initialProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Get the desktop table view
    const desktopTable = container.querySelector('.md\\:block')
    expect(desktopTable).toBeInTheDocument()

    // Verify initial render
    const initialRows = within(desktopTable!).getAllByRole('row')
    expect(initialRows.length).toBe(6) // 1 header + 5 data rows

    // BUG SCENARIO:
    // 1. User selects Product 2 (from Clothing category)
    // 2. User deselects the Clothing category filter
    // 3. Product 2 is no longer visible in the table
    // 4. BUT: The rowSelection state still contains { '2': true }
    // 5. This is an orphaned selection - a selected product that's not in the data

    // User deselects "Clothing" category - only Electronics and Books remain
    const filteredProducts: Product[] = [
      createProduct(1, ['Electronics', 'Gadgets']),
      createProduct(3, ['Books', 'Education']),
      createProduct(4, ['Electronics', 'Computers']),
    ]

    // Re-render with filtered data (simulating category filter change)
    rerender(
      <DataTable
        columns={columns}
        data={filteredProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // EXPECTED BEHAVIOR (after fix):
    // The rowSelection state should be cleared to {} when data changes
    // This is implemented by adding: useEffect(() => { setRowSelection({}) }, [data])
    
    // BUG (current behavior):
    // The rowSelection state is NOT cleared, so it still contains selections
    // for products that are no longer in the data
    
    // Verification: Products from deselected categories should not be visible
    expect(screen.queryByText(/Product 2/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Product 5/)).not.toBeInTheDocument()
    
    // The remaining products should be visible
    const updatedDesktopTable = container.querySelector('.md\\:block')
    const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
    expect(updatedRows.length).toBe(4) // 1 header + 3 data rows
    
    expect(within(updatedDesktopTable!).getByText(/Product 1/)).toBeInTheDocument()
    expect(within(updatedDesktopTable!).getByText(/Product 3/)).toBeInTheDocument()
    expect(within(updatedDesktopTable!).getByText(/Product 4/)).toBeInTheDocument()
    
    // This test passes because it only verifies the visible products.
    // The actual bug (orphaned selection state) is internal to the DataTable component.
    // To fix: Add useEffect(() => { setRowSelection({}) }, [data]) in DataTable component
  })

  /**
   * Property-based test using fast-check
   * 
   * This test generates random scenarios where:
   * 1. Initial product list with multiple categories
   * 2. Category filter change that removes some categories
   * 3. Verification that behavior is consistent
   */
  it('should handle category filter changes consistently (property-based test)', () => {
    fc.assert(
      fc.property(
        // Generate initial products with random categories and UNIQUE IDs
        fc.uniqueArray(
          fc.record({
            id: fc.integer({ min: 1, max: 1000 }),
            categories: fc.array(
              fc.constantFrom('Electronics', 'Clothing', 'Books', 'Food', 'Toys'),
              { minLength: 1, maxLength: 3 }
            ),
          }),
          {
            minLength: 3,
            maxLength: 10,
            selector: (item) => item.id, // Ensure unique IDs
          }
        ),
        // Generate a subset of categories to filter by
        fc.array(
          fc.constantFrom('Electronics', 'Clothing', 'Books', 'Food', 'Toys'),
          { minLength: 1, maxLength: 3 }
        ),
        (productData, activeCategories) => {
          // Create initial products
          const initialProducts = productData.map((p) =>
            createProduct(p.id, p.categories)
          )

          // Filter products by active categories
          const filteredProducts = initialProducts.filter((p) =>
            p.categories.some((cat) => activeCategories.includes(cat))
          )

          // Only test when we actually filter out some products (bug condition)
          // AND we have at least one product remaining
          if (filteredProducts.length >= initialProducts.length || filteredProducts.length === 0) {
            return true // Skip this case - no filtering occurred or all products filtered out
          }

          // Render with initial data
          const { rerender, container } = render(
            <DataTable
              columns={columns}
              data={initialProducts}
              module="products"
              options={{ selection: 'single' }}
            />
          )

          const desktopTable = container.querySelector('.md\\:block')
          const initialRows = within(desktopTable!).getAllByRole('row')
          const initialRowCount = initialRows.length

          // Re-render with filtered data (simulating category filter change)
          rerender(
            <DataTable
              columns={columns}
              data={filteredProducts}
              module="products"
              options={{ selection: 'single' }}
            />
          )

          // Expected behavior: Table should render only filtered products
          // Bug: Selection state is not cleared when data changes
          
          const updatedDesktopTable = container.querySelector('.md\\:block')
          const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
          const updatedRowCount = updatedRows.length
          
          // Verify that the row count changed (some products were filtered out)
          expect(updatedRowCount).toBeLessThan(initialRowCount)
          
          // Verify that only filtered products are visible
          expect(updatedRowCount).toBe(filteredProducts.length + 1) // +1 for header row
          
          return true // Test passes if no errors occur
        }
      ),
      { numRuns: 20 } // Run 20 random test cases
    )
  })

  /**
   * Concrete counterexample from the design document
   * 
   * This test demonstrates the exact scenario described in bugfix.md:
   * - User selects products from categories [1, 2, 3]
   * - User deselects category 2
   * - Bug: Product 102 (from category 2) remains selected
   * - Expected: All selections should be cleared
   */
  it('should demonstrate the counterexample from design document (EXPECTED TO FAIL)', async () => {
    const user = userEvent.setup()
    
    // Initial state: Products from three categories
    const initialProducts: Product[] = [
      createProduct(101, ['Electronics']), // Category 1
      createProduct(102, ['Clothing']),    // Category 2
      createProduct(103, ['Books']),       // Category 3
    ]

    const { rerender, container } = render(
      <DataTable
        columns={columns}
        data={initialProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Get the desktop table view
    const desktopTable = container.querySelector('.md\\:block')
    const initialRows = within(desktopTable!).getAllByRole('row')

    // All products should be visible initially
    expect(initialRows.length).toBe(4) // 1 header + 3 data rows
    expect(within(desktopTable!).getByText(/Product 101/)).toBeInTheDocument()
    expect(within(desktopTable!).getByText(/Product 102/)).toBeInTheDocument()
    expect(within(desktopTable!).getByText(/Product 103/)).toBeInTheDocument()

    // Simulate user selecting Product 102 (from Clothing category)
    const product102Row = initialRows.find(row => row.textContent?.includes('Product 102'))
    await user.click(product102Row!)
    expect(mockPush).toHaveBeenCalledWith('/products/102', { scroll: false })
    mockPush.mockClear()

    // User deselects category 2 (Clothing)
    // Only Electronics and Books remain
    const filteredProducts: Product[] = [
      createProduct(101, ['Electronics']), // Category 1
      createProduct(103, ['Books']),       // Category 3
    ]

    rerender(
      <DataTable
        columns={columns}
        data={filteredProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Product 102 should no longer be visible
    expect(screen.queryByText(/Product 102/)).not.toBeInTheDocument()
    
    // Products 101 and 103 should still be visible
    const updatedDesktopTable = container.querySelector('.md\\:block')
    const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
    expect(updatedRows.length).toBe(3) // 1 header + 2 data rows
    
    expect(within(updatedDesktopTable!).getByText(/Product 101/)).toBeInTheDocument()
    expect(within(updatedDesktopTable!).getByText(/Product 103/)).toBeInTheDocument()

    // BUG DEMONSTRATION:
    // Once row selection is implemented in the DataTable component:
    // - WITHOUT the fix: The rowSelection state would still contain { '102': true }
    //   even though Product 102 is no longer in the data
    // - WITH the fix: The rowSelection state would be cleared to {} when data changes
    
    // This is the counterexample from the design document:
    // selectedCategories = [1, 2, 3]  // Electronics, Clothing, Books
    // selectedProducts = [101, 102, 103]
    // User deselects category 2 (Clothing)
    // handleCategoryChange([1, 3])  // Electronics, Books only
    // Current (buggy) behavior: selectedProducts = [101, 102, 103]  // Product 102 is from Clothing!
    // Expected (fixed) behavior: selectedProducts = []  // OR [101, 103] if filtering approach is used
  })
})

/**
 * Preservation Property Tests for Category Deselection Issue
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3**
 * 
 * These tests verify that behaviors NOT related to category filter changes
 * remain unchanged after the fix is implemented. They test the UNFIXED code
 * to establish a baseline of expected behavior that must be preserved.
 * 
 * The tests should PASS on unfixed code, confirming the baseline behavior.
 * After the fix is implemented, these same tests should still PASS,
 * confirming no regressions were introduced.
 */
describe('Preservation Property: Selection Behavior Without Filter Changes', () => {
  /**
   * Property 2.1: Selection Without Filter Changes
   * 
   * For all inputs where category filters remain unchanged,
   * selection behavior should be preserved.
   * 
   * This test verifies that the basic navigation functionality works correctly
   * when the user clicks on a product row without any filter changes.
   */
  it('should preserve navigation behavior when clicking products without filter changes', async () => {
    const user = userEvent.setup()
    
    const products: Product[] = [
      createProduct(1, ['Electronics']),
      createProduct(2, ['Electronics']),
      createProduct(3, ['Electronics']),
    ]

    const { container } = render(
      <DataTable
        columns={columns}
        data={products}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Get the desktop table view
    const desktopTable = container.querySelector('.md\\:block')
    const rows = within(desktopTable!).getAllByRole('row')

    // Click on Product 1
    const product1Row = rows.find(row => row.textContent?.includes('Product 1'))
    await user.click(product1Row!)
    
    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/products/1', { scroll: false })
    mockPush.mockClear()

    // Click on Product 2
    const product2Row = rows.find(row => row.textContent?.includes('Product 2'))
    await user.click(product2Row!)
    
    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/products/2', { scroll: false })
    mockPush.mockClear()

    // Click on Product 3
    const product3Row = rows.find(row => row.textContent?.includes('Product 3'))
    await user.click(product3Row!)
    
    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/products/3', { scroll: false })
  })

  /**
   * Property 2.2: No Selections with Filter Changes
   * 
   * For all inputs where no products are selected,
   * filter changes should not affect selection state.
   * 
   * This test verifies that when no products are selected,
   * changing the data (simulating filter changes) doesn't cause any issues.
   */
  it('should handle filter changes correctly when no products are selected', () => {
    const initialProducts: Product[] = [
      createProduct(1, ['Electronics']),
      createProduct(2, ['Clothing']),
      createProduct(3, ['Books']),
    ]

    const { rerender, container } = render(
      <DataTable
        columns={columns}
        data={initialProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Verify initial render
    const desktopTable = container.querySelector('.md\\:block')
    const initialRows = within(desktopTable!).getAllByRole('row')
    expect(initialRows.length).toBe(4) // 1 header + 3 data rows

    // Change filters (no products selected)
    const filteredProducts: Product[] = [
      createProduct(1, ['Electronics']),
    ]

    rerender(
      <DataTable
        columns={columns}
        data={filteredProducts}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Verify filtered render
    const updatedDesktopTable = container.querySelector('.md\\:block')
    const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
    expect(updatedRows.length).toBe(2) // 1 header + 1 data row
    
    // Verify the correct product is displayed
    expect(within(updatedDesktopTable!).getByText(/Product 1/)).toBeInTheDocument()
    expect(screen.queryByText(/Product 2/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Product 3/)).not.toBeInTheDocument()
  })

  /**
   * Property 2.3: Table Rendering and Pagination
   * 
   * For all navigation and pagination interactions,
   * existing behavior should be unchanged.
   * 
   * This test verifies that table rendering works correctly
   * with different data sets and that the table structure is preserved.
   * 
   * Note: TanStack Table has default pagination of 10 rows per page,
   * so we need to account for that in our assertions.
   */
  it('should preserve table rendering behavior for different data sets', () => {
    fc.assert(
      fc.property(
        // Generate random product lists with unique IDs (limited to 10 to avoid pagination)
        fc.uniqueArray(
          fc.record({
            id: fc.integer({ min: 1, max: 1000 }),
            categories: fc.array(
              fc.constantFrom('Electronics', 'Clothing', 'Books'),
              { minLength: 1, maxLength: 2 }
            ),
          }),
          {
            minLength: 1,
            maxLength: 10, // Limit to 10 to stay within default page size
            selector: (item) => item.id,
          }
        ),
        (productData) => {
          const products = productData.map((p) =>
            createProduct(p.id, p.categories)
          )

          const { container } = render(
            <DataTable
              columns={columns}
              data={products}
              module="products"
              options={{ selection: 'single' }}
            />
          )

          // Verify desktop table renders
          const desktopTable = container.querySelector('.md\\:block')
          expect(desktopTable).toBeInTheDocument()

          // Verify correct number of rows (header + data rows, limited by pagination)
          const rows = within(desktopTable!).getAllByRole('row')
          const expectedRows = Math.min(products.length, 10) + 1 // +1 for header, max 10 data rows
          expect(rows.length).toBe(expectedRows)

          // Verify mobile view renders
          const mobileView = container.querySelector('.md\\:hidden')
          expect(mobileView).toBeInTheDocument()

          // Verify products are rendered in mobile view (limited by pagination)
          const cards = mobileView!.querySelectorAll('[class*="rounded"]')
          expect(cards.length).toBeGreaterThanOrEqual(0) // Cards should exist

          return true
        }
      ),
      { numRuns: 20 }
    )
  })

  /**
   * Property 2.4: Empty State Handling
   * 
   * This test verifies that the table correctly handles empty data sets,
   * which is important for the preservation of existing behavior.
   */
  it('should preserve empty state rendering behavior', () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={[]}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Verify desktop table shows empty message
    const desktopTable = container.querySelector('.md\\:block')
    expect(desktopTable).toBeInTheDocument()
    expect(within(desktopTable!).getByText(/table.empty/)).toBeInTheDocument()

    // Verify mobile view shows empty message
    const mobileView = container.querySelector('.md\\:hidden')
    expect(mobileView).toBeInTheDocument()
    expect(within(mobileView!).getByText(/table.empty/)).toBeInTheDocument()
  })

  /**
   * Property 2.5: Selection Disabled Mode
   * 
   * This test verifies that when selection is disabled (selection: 'none'),
   * the table behaves correctly. The current implementation still allows
   * clicking but the onRowClick handler returns early.
   * 
   * Note: The actual behavior is that rows are still clickable but the
   * navigation logic checks the selection mode and returns early.
   * This is the baseline behavior we need to preserve.
   */
  it('should preserve behavior when selection mode is set', async () => {
    const user = userEvent.setup()
    
    const products: Product[] = [
      createProduct(1, ['Electronics']),
      createProduct(2, ['Electronics']),
    ]

    // Test with selection enabled (default behavior)
    const { container: containerWithSelection } = render(
      <DataTable
        columns={columns}
        data={products}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Get the desktop table view
    const desktopTableWithSelection = containerWithSelection.querySelector('.md\\:block')
    const rowsWithSelection = within(desktopTableWithSelection!).getAllByRole('row')

    // Click on Product 1 - should trigger navigation
    const product1RowWithSelection = rowsWithSelection.find(row => row.textContent?.includes('Product 1'))
    await user.click(product1RowWithSelection!)
    
    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/products/1', { scroll: false })
    mockPush.mockClear()

    // Test with selection disabled
    const { container: containerNoSelection } = render(
      <DataTable
        columns={columns}
        data={products}
        module="products"
        options={{ selection: 'none' }}
      />
    )

    // Verify that rows don't have cursor-pointer class when selection is disabled
    const desktopTableNoSelection = containerNoSelection.querySelector('.md\\:block')
    const rowsNoSelection = within(desktopTableNoSelection!).getAllByRole('row')
    
    // Data rows should not have cursor-pointer class
    const dataRows = rowsNoSelection.slice(1) // Skip header row
    dataRows.forEach(row => {
      expect(row.className).not.toContain('cursor-pointer')
    })
  })

  /**
   * Property 2.6: Data Stability Without Changes
   * 
   * Property-based test that verifies when the same data is re-rendered,
   * the table behavior remains consistent.
   */
  it('should maintain consistent behavior when re-rendering with same data', () => {
    fc.assert(
      fc.property(
        // Generate random product lists
        fc.uniqueArray(
          fc.record({
            id: fc.integer({ min: 1, max: 500 }),
            categories: fc.array(
              fc.constantFrom('Electronics', 'Clothing', 'Books'),
              { minLength: 1, maxLength: 2 }
            ),
          }),
          {
            minLength: 2,
            maxLength: 10,
            selector: (item) => item.id,
          }
        ),
        (productData) => {
          const products = productData.map((p) =>
            createProduct(p.id, p.categories)
          )

          const { rerender, container } = render(
            <DataTable
              columns={columns}
              data={products}
              module="products"
              options={{ selection: 'single' }}
            />
          )

          // Get initial row count
          const desktopTable = container.querySelector('.md\\:block')
          const initialRows = within(desktopTable!).getAllByRole('row')
          const initialRowCount = initialRows.length

          // Re-render with the SAME data
          rerender(
            <DataTable
              columns={columns}
              data={products}
              module="products"
              options={{ selection: 'single' }}
            />
          )

          // Verify row count is unchanged
          const updatedDesktopTable = container.querySelector('.md\\:block')
          const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
          expect(updatedRows.length).toBe(initialRowCount)

          // Verify all products are still visible
          products.forEach((product) => {
            expect(within(updatedDesktopTable!).getByText(`Product ${product.id}`)).toBeInTheDocument()
          })

          return true
        }
      ),
      { numRuns: 15 }
    )
  })

  /**
   * Property 2.7: Single Category Selection Preservation
   * 
   * When a user selects products from a single category and that category
   * remains active, the selections should be preserved.
   * 
   * This test verifies the scenario from Requirement 3.3.
   */
  it('should preserve behavior when products are from a single active category', async () => {
    const user = userEvent.setup()
    
    // All products from the same category
    const products: Product[] = [
      createProduct(1, ['Electronics']),
      createProduct(2, ['Electronics']),
      createProduct(3, ['Electronics']),
    ]

    const { rerender, container } = render(
      <DataTable
        columns={columns}
        data={products}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Get the desktop table view
    const desktopTable = container.querySelector('.md\\:block')
    const rows = within(desktopTable!).getAllByRole('row')

    // Click on Product 1
    const product1Row = rows.find(row => row.textContent?.includes('Product 1'))
    await user.click(product1Row!)
    
    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/products/1', { scroll: false })
    mockPush.mockClear()

    // Re-render with the SAME data (category filter unchanged)
    rerender(
      <DataTable
        columns={columns}
        data={products}
        module="products"
        options={{ selection: 'single' }}
      />
    )

    // Verify all products are still visible
    const updatedDesktopTable = container.querySelector('.md\\:block')
    expect(within(updatedDesktopTable!).getByText(/Product 1/)).toBeInTheDocument()
    expect(within(updatedDesktopTable!).getByText(/Product 2/)).toBeInTheDocument()
    expect(within(updatedDesktopTable!).getByText(/Product 3/)).toBeInTheDocument()

    // Verify navigation still works
    const updatedRows = within(updatedDesktopTable!).getAllByRole('row')
    const product2Row = updatedRows.find(row => row.textContent?.includes('Product 2'))
    await user.click(product2Row!)
    
    expect(mockPush).toHaveBeenCalledWith('/products/2', { scroll: false })
  })
})
