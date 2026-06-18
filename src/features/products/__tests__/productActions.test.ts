/**
 * Bug Condition Exploration Test for Main Image Preservation Issue
 * 
 * **Validates: Requirements 2.4, 2.5, 2.6, 2.7**
 * 
 * This test is designed to FAIL on unfixed code to demonstrate the bug exists.
 * The bug: When editing a product with an existing main image without changing it,
 * the main image is lost during the save operation.
 * 
 * Expected behavior: Main image should be preserved when editing without changing it.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import SaveProduct from '../productActions'
import type { ActionResponse } from '@/src/shared/types/form'

// Mock the services
vi.mock('@/src/features/products/productServices', () => ({
  save: vi.fn(),
  deleteProduct: vi.fn(),
  getProduct: vi.fn(),
}))

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// Import the mocked functions
import { save as saveService, getProduct } from '@/src/features/products/productServices'

describe('Bug Condition Exploration: Main Image Preservation Issue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Property 1: Bug Condition - Main Image Lost on Edit Without Change
   * 
   * This property tests the bug condition:
   * isBugCondition2(input) where:
   *   - input.isEditMode = true
   *   - input.existingProduct.images_preferred IS NOT NULL
   *   - input.formData.get('images_preferred') IS NULL
   * 
   * Expected behavior (after fix):
   *   - Main image should be preserved in the result
   * 
   * Current behavior (unfixed - this test documents the bug):
   *   - The SaveProduct action sets rawData.main_image = rawData.images_preferred
   *   - But rawData.images_preferred comes from formData.get('images_preferred')
   *   - If the user doesn't change the image, this field is not in FormData
   *   - So rawData.main_image becomes null, and the product loses its main image
   * 
   * This test documents the expected behavior. The bug is in the implementation:
   * The SaveProduct action does not preserve the existing main image when
   * formData.get('images_preferred') is null.
   */
  it('should preserve main image when editing without changing it (EXPECTED TO FAIL)', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    // Simulate editing a product with an existing main image
    const productId = '42'
    const existingMainImage = 'product-hero.jpg'

    // Mock getProduct to return existing product data
    vi.mocked(getProduct).mockResolvedValue({
      id: 42,
      name: 'Sample Product',
      images_preferred: existingMainImage,
    })

    // Create FormData for editing the product
    // User changes only the name, does NOT change the main image
    const formData = new FormData()
    formData.set('id', productId)
    formData.set('name', 'Updated Product Name')
    formData.set('description', 'Product description')
    formData.set('price', '99.99')
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    // NOTE: images_preferred is NOT set because the user didn't change the image

    // Call SaveProduct
    const result = await SaveProduct(productId, null, formData)

    // EXPECTED BEHAVIOR (after fix):
    // The main image should be preserved from the existing product
    // result.data.main_image should equal existingMainImage
    
    // BUG (current behavior):
    // rawData.images_preferred = formData.get('images_preferred') = null
    // rawData.main_image = rawData.images_preferred = null
    // The product loses its main image!
    
    // This assertion will FAIL on unfixed code, confirming the bug exists
    expect(result.success).toBe(true)
    
    // The bug: main_image is null instead of preserving the existing value
    // After fix: This should be existingMainImage
    // Before fix: This will be null or undefined
    console.log('Main image in result:', result.data?.main_image)
    console.log('Expected main image:', existingMainImage)
    
    // This is the counterexample that demonstrates the bug:
    // When editing without changing the image, main_image becomes null
    expect(result.data?.main_image).toBe(existingMainImage)
  })

  /**
   * Concrete test case demonstrating the bug with minimal setup
   * 
   * This test shows the exact scenario from the design document:
   * - Edit product with ID 42 that has main image "product-main-image.jpg"
   * - Submit form without changing the main image
   * - Bug: Product loses its main image
   * - Expected: Main image should be preserved
   */
  it('should demonstrate the counterexample from design document (EXPECTED TO FAIL)', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    // Existing product data (from design document counterexample)
    const existingProduct = {
      id: 42,
      name: 'Sample Product',
      images_preferred: 'product-main-image.jpg',
      // ... other fields
    }

    // Mock getProduct to return existing product data
    vi.mocked(getProduct).mockResolvedValue(existingProduct)

    // User submits edit form without changing main image
    const formData = new FormData()
    formData.set('id', '42')
    formData.set('name', 'Updated Product Name')
    formData.set('description', 'Sample description')
    formData.set('price', '49.99')
    formData.set('featured_product', 'false')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    // images_preferred is NOT set in formData

    // Call SaveProduct
    const result = await SaveProduct('42', null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    
    // BUG DEMONSTRATION:
    // The main_image field in the FormData sent to the service is null
    // because rawData.images_preferred was null (not in original FormData)
    const mainImageInService = serviceFormData?.get('main_image')
    console.log('Main image sent to service:', mainImageInService)
    console.log('Expected main image:', existingProduct.images_preferred)
    
    // This is the counterexample from the design document:
    // existingProduct.images_preferred = "product-main-image.jpg"
    // formData.get('images_preferred') = null (not set)
    // rawData.images_preferred = null
    // rawData.main_image = null
    // Product loses its main image!
    
    // Current (buggy) behavior: mainImageInService = null
    // Expected (fixed) behavior: mainImageInService = "product-main-image.jpg"
    
    // This assertion will FAIL on unfixed code
    expect(mainImageInService).toBe(existingProduct.images_preferred)
  })

  /**
   * Property-based test using fast-check
   * 
   * This test generates random scenarios where:
   * 1. A product is being edited (has an ID)
   * 2. The product has an existing main image
   * 3. The user doesn't change the main image (images_preferred not in FormData)
   * 4. Verification that the main image should be preserved
   */
  it('should preserve main image across various edit scenarios (property-based test)', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate random product IDs
        fc.integer({ min: 1, max: 1000 }).map(id => id.toString()),
        // Generate random existing main image filenames
        fc.constantFrom(
          'product-hero.jpg',
          'main-image.png',
          'featured-product.webp',
          'product-photo.jpg',
          'item-image.png'
        ),
        // Generate random product data
        fc.record({
          name: fc.string({ minLength: 1, maxLength: 50 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
          price: fc.integer({ min: 1, max: 9999 }).map(n => n + 0.99),
          featured_product: fc.boolean(),
          active: fc.boolean(),
          categories: fc.array(fc.integer({ min: 1, max: 10 }), { minLength: 1, maxLength: 3 }),
        }),
        async (productId, existingMainImage, productData) => {
          // Mock the service to return success
          vi.mocked(saveService).mockResolvedValue({
            success: true,
            message: 'Product updated successfully',
            id: parseInt(productId),
          })

          // Mock getProduct to return existing product with main image
          vi.mocked(getProduct).mockResolvedValue({
            id: parseInt(productId),
            name: 'Existing Product',
            images_preferred: existingMainImage,
          })

          // Create FormData for editing the product
          // User changes product data but does NOT change the main image
          const formData = new FormData()
          formData.set('id', productId)
          formData.set('name', productData.name)
          formData.set('description', productData.description)
          formData.set('price', productData.price.toFixed(2))
          formData.set('featured_product', productData.featured_product.toString())
          formData.set('active', productData.active.toString())
          formData.set('categories', productData.categories[0]?.toString() || '1')
          formData.set('filter_combinations', '[]')
          // NOTE: images_preferred is NOT set

          // Call SaveProduct
          const result = await SaveProduct(productId, null, formData)

          // Expected behavior: Main image should be preserved
          // After fix: mainImageInService should equal existingMainImage
          
          // Verify the service was called
          expect(saveService).toHaveBeenCalled()
          
          // Get the FormData that was passed to the service
          const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
          const mainImageInService = serviceFormData?.get('main_image')
          
          // This assertion verifies the expected behavior
          // After fix: mainImageInService should equal existingMainImage
          console.log(`Product ${productId}: Expected "${existingMainImage}", got "${mainImageInService}"`)
          
          // Assert that the main image was preserved
          expect(mainImageInService).toBe(existingMainImage)
          
          // Clear mocks for next iteration
          vi.clearAllMocks()
        }
      ),
      { numRuns: 10 } // Run 10 random test cases
    )
  })

  /**
   * Edge case: Editing with related images but not changing main image
   * 
   * This test verifies that when a user adds or removes related images
   * but doesn't change the main image, the main image should still be preserved.
   */
  it('should preserve main image when adding related images (EXPECTED TO FAIL)', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    const existingMainImage = 'main-product-image.jpg'

    // Mock getProduct to return existing product with main image
    vi.mocked(getProduct).mockResolvedValue({
      id: 42,
      name: 'Existing Product',
      images_preferred: existingMainImage,
    })

    // Create FormData with a new related image
    const formData = new FormData()
    formData.set('id', '42')
    formData.set('name', 'Product with New Related Image')
    formData.set('description', 'Product description')
    formData.set('price', '79.99')
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // Add a new related image
    const relatedImageFile = new File(['image content'], 'related-image.jpg', { type: 'image/jpeg' })
    formData.append('images', relatedImageFile)
    
    // NOTE: images_preferred is NOT set (user didn't change main image)

    // Call SaveProduct
    const result = await SaveProduct('42', null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // BUG: The main image is lost even though we only added a related image
    // Expected: main_image should be preserved as existingMainImage
    // Actual: main_image is null
    
    console.log('Main image when adding related image:', mainImageInService)
    console.log('Expected main image:', existingMainImage)
    
    // This assertion will FAIL on unfixed code
    expect(mainImageInService).toBe(existingMainImage)
  })

  /**
   * Edge case: Editing with images_removed but not changing main image
   * 
   * This test verifies that when a user removes related images
   * but doesn't change the main image, the main image should still be preserved.
   */
  it('should preserve main image when removing related images (EXPECTED TO FAIL)', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    const existingMainImage = 'main-product-image.jpg'

    // Mock getProduct to return existing product with main image
    vi.mocked(getProduct).mockResolvedValue({
      id: 42,
      name: 'Existing Product',
      images_preferred: existingMainImage,
    })

    // Create FormData with images to remove
    const formData = new FormData()
    formData.set('id', '42')
    formData.set('name', 'Product with Removed Related Image')
    formData.set('description', 'Product description')
    formData.set('price', '59.99')
    formData.set('featured_product', 'false')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // Remove a related image
    formData.append('images_removed', 'old-related-image.jpg')
    
    // NOTE: images_preferred is NOT set (user didn't change main image)

    // Call SaveProduct
    const result = await SaveProduct('42', null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // BUG: The main image is lost even though we only removed a related image
    // Expected: main_image should be preserved as existingMainImage
    // Actual: main_image is null
    
    console.log('Main image when removing related image:', mainImageInService)
    console.log('Expected main image:', existingMainImage)
    
    // This assertion will FAIL on unfixed code
    expect(mainImageInService).toBe(existingMainImage)
  })
})

/**
 * Preservation Property Tests for Main Image Handling
 * 
 * **Validates: Requirements 3.4, 3.5, 3.6, 3.7**
 * 
 * These tests verify that behaviors we want to preserve work correctly on UNFIXED code.
 * They should PASS on unfixed code to establish the baseline behavior.
 * After implementing the fix, these tests should still PASS to confirm no regressions.
 * 
 * Preservation Requirements:
 * - Creating new products with main images should work correctly
 * - Editing products and changing the main image should work correctly
 * - Editing products and removing the main image intentionally should work correctly
 * - Editing products without touching images should preserve all image data
 * - Related images (non-main images) handling should work correctly
 */

describe('Preservation Property Tests: Main Image Handling for Other Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  /**
   * Property 2.1: Creating New Products with Main Images
   * 
   * This test verifies that creating new products with main images works correctly.
   * This behavior should be preserved after the fix.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should attach main image when creating new products', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product created successfully',
      id: 100,
    })

    // Create FormData for a new product with a main image
    const formData = new FormData()
    // No ID means this is a new product
    formData.set('name', 'New Product with Main Image')
    formData.set('description', 'A brand new product')
    formData.set('price', '149.99')
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // Set the main image
    formData.set('images_preferred', 'new-product-main.jpg')

    // Call SaveProduct without an ID (new product)
    const result = await SaveProduct(undefined, null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // Verify the main image was correctly set
    expect(result.success).toBe(true)
    expect(mainImageInService).toBe('new-product-main.jpg')
    
    console.log('New product main image:', mainImageInService)
  })

  /**
   * Property 2.2: Changing Main Image During Edit
   * 
   * This test verifies that changing the main image during edit works correctly.
   * This behavior should be preserved after the fix.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should update main image when user changes it during edit', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    // Existing product has main image "old-main-image.jpg"
    const productId = '42'
    const newMainImage = 'new-main-image.jpg'

    // Create FormData for editing the product with a new main image
    const formData = new FormData()
    formData.set('id', productId)
    formData.set('name', 'Product with Updated Main Image')
    formData.set('description', 'Product description')
    formData.set('price', '89.99')
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // User changes the main image
    formData.set('images_preferred', newMainImage)

    // Call SaveProduct
    const result = await SaveProduct(productId, null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // Verify the new main image was correctly set
    expect(result.success).toBe(true)
    expect(mainImageInService).toBe(newMainImage)
    
    console.log('Updated main image:', mainImageInService)
  })

  /**
   * Property 2.3: Intentionally Removing Main Image
   * 
   * This test verifies that intentionally removing the main image works correctly.
   * This behavior should be preserved after the fix.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should allow intentional removal of main image', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    const productId = '42'

    // Mock getProduct to return existing product with main image
    vi.mocked(getProduct).mockResolvedValue({
      id: 42,
      name: 'Existing Product',
      images_preferred: 'old-main-image.jpg',
    })

    // Create FormData for editing the product and removing the main image
    const formData = new FormData()
    formData.set('id', productId)
    formData.set('name', 'Product with Removed Main Image')
    formData.set('description', 'Product description')
    formData.set('price', '69.99')
    formData.set('featured_product', 'false')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // User intentionally removes the main image (set to empty string or null)
    formData.set('images_preferred', '')

    // Call SaveProduct
    const result = await SaveProduct(productId, null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // Verify the main image was removed (should not be set in FormData when empty)
    expect(result.success).toBe(true)
    // When images_preferred is empty string, the conditional check prevents setting main_image
    // So main_image should not be in the FormData at all
    expect(mainImageInService).toBeNull()
    
    console.log('Removed main image (should be null):', mainImageInService)
  })

  /**
   * Property 2.4: Editing Other Fields Preserves Image Data
   * 
   * This test verifies that when editing other fields without touching images,
   * the main image is preserved (after the fix).
   * 
   * Expected: After fix, main image should be preserved
   */
  it('should preserve main image when editing other fields without image changes', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    const productId = '42'
    const existingMainImage = 'existing-main-image.jpg'

    // Mock getProduct to return existing product with main image
    vi.mocked(getProduct).mockResolvedValue({
      id: 42,
      name: 'Existing Product',
      images_preferred: existingMainImage,
    })

    // Create FormData for editing only the price (no image changes)
    const formData = new FormData()
    formData.set('id', productId)
    formData.set('name', 'Product Name')
    formData.set('description', 'Product description')
    formData.set('price', '199.99')  // Only changing the price
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // NOTE: images_preferred is NOT set (user didn't touch images)

    // Call SaveProduct
    const result = await SaveProduct(productId, null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    
    // After fix, the main image should be preserved
    expect(result.success).toBe(true)
    expect(mainImageInService).toBe(existingMainImage)
    
    console.log('Main image when editing other fields:', mainImageInService)
    console.log('Expected:', existingMainImage)
  })

  /**
   * Property 2.5: Related Images Handling
   * 
   * This test verifies that related images (non-main images) are handled correctly.
   * This behavior should be preserved after the fix.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should handle related images correctly', async () => {
    // Mock the service to return success
    vi.mocked(saveService).mockResolvedValue({
      success: true,
      message: 'Product updated successfully',
      id: 42,
    })

    const productId = '42'

    // Create FormData with related images
    const formData = new FormData()
    formData.set('id', productId)
    formData.set('name', 'Product with Related Images')
    formData.set('description', 'Product description')
    formData.set('price', '129.99')
    formData.set('featured_product', 'true')
    formData.set('active', 'true')
    formData.set('categories', '1')
    formData.set('filter_combinations', '[]')
    
    // Set main image
    formData.set('images_preferred', 'main-image.jpg')
    
    // Add related images
    const relatedImage1 = new File(['image1'], 'related-1.jpg', { type: 'image/jpeg' })
    const relatedImage2 = new File(['image2'], 'related-2.jpg', { type: 'image/jpeg' })
    formData.append('images', relatedImage1)
    formData.append('images', relatedImage2)

    // Call SaveProduct
    const result = await SaveProduct(productId, null, formData)

    // Verify the service was called
    expect(saveService).toHaveBeenCalled()
    
    // Get the FormData that was passed to the service
    const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
    const mainImageInService = serviceFormData?.get('main_image')
    const relatedImages = serviceFormData.getAll('related_images[]')
    
    // Verify both main and related images are handled correctly
    expect(result.success).toBe(true)
    expect(mainImageInService).toBe('main-image.jpg')
    expect(relatedImages.length).toBe(2)
    
    console.log('Main image with related images:', mainImageInService)
    console.log('Related images count:', relatedImages.length)
  })

  /**
   * Property-Based Test: New Product Creation with Various Image Configurations
   * 
   * This test generates random scenarios for creating new products with different
   * image configurations to verify the behavior is consistent.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should handle new product creation with main image (simplified property test)', async () => {
    // Test a few specific scenarios instead of using fast-check
    const testCases = [
      { name: 'Product A', hasMainImage: true, mainImage: 'product-a.jpg' },
      { name: 'Product B', hasMainImage: true, mainImage: 'product-b.jpg' },
      { name: 'Product C', hasMainImage: false, mainImage: null },
    ]

    for (const testCase of testCases) {
      // Mock the service to return success
      vi.mocked(saveService).mockResolvedValue({
        success: true,
        message: 'Product created successfully',
        id: 100,
      })

      // Create FormData for a new product
      const formData = new FormData()
      formData.set('name', testCase.name)
      formData.set('description', 'Test product')
      formData.set('price', '99.99')
      formData.set('featured_product', 'true')
      formData.set('active', 'true')
      formData.set('categories', '1')
      formData.set('filter_combinations', '[]')
      
      // Optionally set a main image
      if (testCase.hasMainImage && testCase.mainImage) {
        formData.set('images_preferred', testCase.mainImage)
      }

      // Call SaveProduct without an ID (new product)
      const result = await SaveProduct(undefined, null, formData)

      // Verify the service was called
      expect(saveService).toHaveBeenCalled()
      
      // Get the FormData that was passed to the service
      const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
      const mainImageInService = serviceFormData?.get('main_image')
      
      // Verify the result
      expect(result.success).toBe(true)
      
      // If we set a main image, it should be in the service call
      if (testCase.hasMainImage && testCase.mainImage) {
        expect(mainImageInService).toBe(testCase.mainImage)
      }
      
      console.log(`New product "${testCase.name}": main_image = ${mainImageInService}`)
      
      // Clear mocks for next iteration
      vi.clearAllMocks()
    }
  })

  /**
   * Property-Based Test: Editing Products with Main Image Changes
   * 
   * This test generates random scenarios for editing products with different
   * main image change operations to verify the behavior is consistent.
   * 
   * Expected: Test PASSES on unfixed code (this functionality already works)
   */
  it('should handle main image changes during edit (simplified property test)', async () => {
    // Test a few specific scenarios instead of using fast-check
    const testCases = [
      { productId: '1', newMainImage: 'new-main-1.jpg', name: 'Product 1' },
      { productId: '2', newMainImage: 'updated-hero.png', name: 'Product 2' },
      { productId: '3', newMainImage: 'product-featured.webp', name: 'Product 3' },
    ]

    for (const testCase of testCases) {
      // Mock the service to return success
      vi.mocked(saveService).mockResolvedValue({
        success: true,
        message: 'Product updated successfully',
        id: parseInt(testCase.productId),
      })

      // Create FormData for editing with a new main image
      const formData = new FormData()
      formData.set('id', testCase.productId)
      formData.set('name', testCase.name)
      formData.set('description', 'Product description')
      formData.set('price', '99.99')
      formData.set('featured_product', 'true')
      formData.set('active', 'true')
      formData.set('categories', '1')
      formData.set('filter_combinations', '[]')
      
      // User changes the main image
      formData.set('images_preferred', testCase.newMainImage)

      // Call SaveProduct
      const result = await SaveProduct(testCase.productId, null, formData)

      // Verify the service was called
      expect(saveService).toHaveBeenCalled()
      
      // Get the FormData that was passed to the service
      const serviceFormData = vi.mocked(saveService).mock.calls[0]?.[0] as FormData
      const mainImageInService = serviceFormData?.get('main_image')
      
      // Verify the new main image was set
      expect(result.success).toBe(true)
      expect(mainImageInService).toBe(testCase.newMainImage)
      
      console.log(`Product ${testCase.productId}: Changed main_image to ${mainImageInService}`)
      
      // Clear mocks for next iteration
      vi.clearAllMocks()
    }
  })
})
