#!/usr/bin/env node

/**
 * Translation Validation Script
 * 
 * This script validates that all translation files have:
 * 1. Valid JSON syntax
 * 2. Matching keys across all locales
 * 3. No missing translations
 * 4. Consistent structure
 * 
 * Usage: node scripts/validate-translations.js
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'i18n', 'messages');
const LOCALES = ['en', 'es'];

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getAllKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

function validateJSON(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(content);
    log(`✓ ${locale}.json is valid JSON`, 'green');
    return { valid: true, data: parsed };
  } catch (error) {
    log(`✗ ${locale}.json has invalid JSON: ${error.message}`, 'red');
    return { valid: false, error: error.message };
  }
}

function compareKeys(locale1, keys1, locale2, keys2) {
  const missing1 = keys2.filter(key => !keys1.includes(key));
  const missing2 = keys1.filter(key => !keys2.includes(key));
  
  if (missing1.length === 0 && missing2.length === 0) {
    log(`✓ ${locale1} and ${locale2} have matching keys`, 'green');
    return { match: true };
  }
  
  const errors = [];
  
  if (missing1.length > 0) {
    log(`✗ Keys in ${locale2} but missing in ${locale1}:`, 'red');
    missing1.forEach(key => log(`  - ${key}`, 'yellow'));
    errors.push(...missing1.map(key => `${locale1} missing: ${key}`));
  }
  
  if (missing2.length > 0) {
    log(`✗ Keys in ${locale1} but missing in ${locale2}:`, 'red');
    missing2.forEach(key => log(`  - ${key}`, 'yellow'));
    errors.push(...missing2.map(key => `${locale2} missing: ${key}`));
  }
  
  return { match: false, errors };
}

function checkEmptyValues(locale, data, keys) {
  const emptyKeys = [];
  
  keys.forEach(key => {
    const parts = key.split('.');
    let value = data;
    
    for (const part of parts) {
      value = value[part];
      if (value === undefined) break;
    }
    
    if (value === '' || value === null || value === undefined) {
      emptyKeys.push(key);
    }
  });
  
  if (emptyKeys.length === 0) {
    log(`✓ ${locale}.json has no empty values`, 'green');
    return { hasEmpty: false };
  }
  
  log(`⚠ ${locale}.json has ${emptyKeys.length} empty value(s):`, 'yellow');
  emptyKeys.forEach(key => log(`  - ${key}`, 'yellow'));
  
  return { hasEmpty: true, emptyKeys };
}

function validateStructure(locale, data) {
  const expectedModules = [
    'categories',
    'filters',
    'inventory',
    'layout',
    'login',
    'orders',
    'outflow',
    'products'
  ];
  
  const actualModules = Object.keys(data).sort();
  const missingModules = expectedModules.filter(m => !actualModules.includes(m));
  const extraModules = actualModules.filter(m => !expectedModules.includes(m));
  
  if (missingModules.length === 0 && extraModules.length === 0) {
    log(`✓ ${locale}.json has correct module structure`, 'green');
    return { valid: true };
  }
  
  const errors = [];
  
  if (missingModules.length > 0) {
    log(`✗ ${locale}.json is missing modules:`, 'red');
    missingModules.forEach(m => log(`  - ${m}`, 'yellow'));
    errors.push(...missingModules.map(m => `Missing module: ${m}`));
  }
  
  if (extraModules.length > 0) {
    log(`⚠ ${locale}.json has unexpected modules:`, 'yellow');
    extraModules.forEach(m => log(`  - ${m}`, 'yellow'));
  }
  
  return { valid: missingModules.length === 0, errors };
}

function main() {
  log('\n=== Translation Validation ===\n', 'cyan');
  
  const results = {};
  let hasErrors = false;
  
  // Step 1: Validate JSON syntax
  log('Step 1: Validating JSON syntax...', 'blue');
  for (const locale of LOCALES) {
    const result = validateJSON(locale);
    results[locale] = result;
    
    if (!result.valid) {
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    log('\n✗ Validation failed: Invalid JSON syntax', 'red');
    process.exit(1);
  }
  
  log('');
  
  // Step 2: Validate structure
  log('Step 2: Validating module structure...', 'blue');
  for (const locale of LOCALES) {
    const structureResult = validateStructure(locale, results[locale].data);
    if (!structureResult.valid) {
      hasErrors = true;
    }
  }
  
  log('');
  
  // Step 3: Extract and compare keys
  log('Step 3: Comparing translation keys...', 'blue');
  const allKeys = {};
  
  for (const locale of LOCALES) {
    allKeys[locale] = getAllKeys(results[locale].data);
    log(`  ${locale}.json has ${allKeys[locale].length} keys`, 'cyan');
  }
  
  log('');
  
  // Compare each pair of locales
  for (let i = 0; i < LOCALES.length; i++) {
    for (let j = i + 1; j < LOCALES.length; j++) {
      const locale1 = LOCALES[i];
      const locale2 = LOCALES[j];
      
      const compareResult = compareKeys(
        locale1,
        allKeys[locale1],
        locale2,
        allKeys[locale2]
      );
      
      if (!compareResult.match) {
        hasErrors = true;
      }
    }
  }
  
  log('');
  
  // Step 4: Check for empty values
  log('Step 4: Checking for empty values...', 'blue');
  for (const locale of LOCALES) {
    const emptyResult = checkEmptyValues(locale, results[locale].data, allKeys[locale]);
    // Empty values are warnings, not errors
  }
  
  log('');
  
  // Final result
  if (hasErrors) {
    log('=== Validation Failed ===', 'red');
    log('Please fix the errors above and run validation again.', 'red');
    process.exit(1);
  } else {
    log('=== Validation Passed ===', 'green');
    log('All translation files are valid and consistent!', 'green');
    process.exit(0);
  }
}

// Run validation
main();
