import fs from 'fs'
import path from 'path'

const TRANSLATIONS_DIR = path.join(process.cwd(), 'i18n/messages')
const LANGUAGES = ['en', 'es']

function readJsonFile(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return {}
  }
}

function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      target[key] = target[key] || {}
      deepMerge(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

function processDirectory(dir: string, base: string = ''): any {
  const result: any = {}
  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    const relativePath = path.join(base, item)

    if (stat.isDirectory()) {
      const nestedResult = processDirectory(fullPath, relativePath)
      deepMerge(result, nestedResult)
    } else if (item.endsWith('.json')) {
      const key = path.dirname(relativePath).replace(/\\/g, '.')
      const content = readJsonFile(fullPath)
      
      if (key === '.') {
        // Files in root directory
        const fileKey = path.basename(item, '.json')
        result[fileKey] = content
      } else {
        // Nested files
        const fileKey = path.basename(item, '.json')
        const fullKey = key.split('.').filter(Boolean)
        
        let current = result
        for (const k of fullKey) {
          current[k] = current[k] || {}
          current = current[k]
        }
        current[fileKey] = content
      }
    }
  }

  return result
}

async function generateTranslations() {
  try {
    for (const lang of LANGUAGES) {
      const langDir = path.join(TRANSLATIONS_DIR, lang)
      if (!fs.existsSync(langDir)) {
        console.warn(`Warning: Language directory ${lang} not found`)
        continue
      }

      const translations = processDirectory(langDir)
      const outputPath = path.join(TRANSLATIONS_DIR, `${lang}.json`)
      
      fs.writeFileSync(
        outputPath,
        JSON.stringify(translations, null, 2),
        'utf-8'
      )
      
      console.log(`✅ Generated ${lang}.json successfully`)
    }
  } catch (error) {
    console.error('Error generating translations:', error)
    process.exit(1)
  }
}

generateTranslations() 