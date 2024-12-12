import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data.json')

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8')
        const base = JSON.parse(data)
        const filterId = (await params).id
        const filter = base.find((item: any) => item.id === filterId)

        return NextResponse.json({
            body: filter,
            message: 'Filter obtained successfully'
        })
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to fetch filter'
        }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const data = await request.json()
        const filterId = (await params).id

        const currentData = await fs.readFile(dataFilePath, 'utf8')
        const base = JSON.parse(currentData)

        console.log(filterId)
        const index = base.findIndex((item: any) => item.id === filterId)

        if (index === -1) {
            return NextResponse.json(
                { error: 'Filter not found' },
                { status: 404 }
            )
        }

        base[index] = { ...data, id: filterId }

        await fs.writeFile(dataFilePath, JSON.stringify(base, null, 2))

        return NextResponse.json({
            message: 'Filter updated successfully',
            body: base
        }, { status: 200 })
    } catch (error) {
        console.error('Error updating filter:', error)
        return NextResponse.json(
            { error: 'Failed to update filter' },
            { status: 500 }
        )
    }
}

// DELETE - Delete filter
export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json()
        // TODO: Implement database delete logic
        return NextResponse.json(
            { message: 'Filter deleted successfully' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete filter' },
            { status: 500 }
        )
    }
}
