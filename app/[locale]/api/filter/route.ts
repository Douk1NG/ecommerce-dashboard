import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'public/filters/data.json')

export async function GET() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8')
        const base = JSON.parse(data)

        return NextResponse.json({
            body: base,
            message: 'Filters obtained successfully'
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch filters'
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const id = uuidv4()

        const currentData = await fs.readFile(dataFilePath, 'utf8')
        const base = JSON.parse(currentData)

        const newData = base.concat({
            id,
            ...data
        })

        await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2))

        return NextResponse.json({
            message: 'Filter created successfully',
            body: newData
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create filter' },
            { status: 500 }
        )
    }
}