import { Skeleton } from "@/components/ui/skeleton"

export default function SidebarLoading() {
    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-10" aria-hidden="true" />
            <div className="fixed right-0 top-0 z-20 h-screen w-full bg-white border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[auto_1fr] overflow-hidden">
                <div className='flex justify-between items-center px-4 py-2 border-b'>
                    <Skeleton className="h-8 w-48" />
                    <div className='flex items-center gap-2'>
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                </div>
                <div className="overflow-hidden px-4 py-4">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-4 w-56" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-52" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-4 w-44" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-48" />
                            <div className="space-y-2">
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 flex-1" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 flex-1" />
                                    <Skeleton className="h-10 flex-1" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-24" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="aspect-square w-full" />
                                <Skeleton className="aspect-square w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}