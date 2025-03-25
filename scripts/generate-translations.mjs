import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TRANSLATIONS_DIR = path.join(process.cwd(), 'i18n/translations')
const OUTPUT_DIR = path.join(process.cwd(), 'i18n/messages')
const LANGUAGES = ['en', 'es']

function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(content)
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error)
        return {}
    }
}

function isTranslationData(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge(target, source) {
    for (const key in source) {
        const sourceValue = source[key];
        if (isTranslationData(sourceValue)) {
            if (!(key in target) || !isTranslationData(target[key])) {
                target[key] = {};
            }
            deepMerge(target[key], sourceValue);
        } else if (sourceValue !== undefined) {
            target[key] = sourceValue;
        }
    }
    return target;
}

function processDirectory(dir, base = '') {
    const result = {}
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
        // Create output directory if it doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true })
        }

        for (const lang of LANGUAGES) {
            const langDir = path.join(TRANSLATIONS_DIR, lang)
            if (!fs.existsSync(langDir)) {
                console.warn(`Warning: Language directory ${lang} not found`)
                continue
            }

            const translations = processDirectory(langDir)
            const outputPath = path.join(OUTPUT_DIR, `${lang}.json`)

            fs.writeFileSync(
                outputPath,
                JSON.stringify(translations, null, 2),
                'utf-8'
            )

            console.log(`✅ Generated ${lang}.json successfully in i18n/messages`)
        }
    } catch (error) {
        console.error('Error generating translations:', error)
        process.exit(1)
    }
}

generateTranslations()