import { Skeleton } from '@/components/ui/skeleton'

export default function SidebarLoading() {
    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-10" aria-hidden="true" />
            <div className="fixed right-0 top-0 z-20 h-screen w-full bg-white border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[auto_1fr] overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="overflow-y-auto px-4 py-4 space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </>
    )
}
