import { Skeleton } from "@/components/ui/skeleton"

export default function SidebarLoading() {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30 z-10" aria-hidden="true" />
            
            {/* Sidebar */}
            <div className="fixed right-0 top-0 z-20 h-screen w-full bg-white border-l-2 border-gray-100 shadow-2xs md:w-[70%] grid grid-rows-[auto_1fr] overflow-hidden">
                {/* Header - Fixed */}
                <div className='flex justify-between items-center px-4 py-2 border-b'>
                    <Skeleton className="h-8 w-48" />
                    <div className='flex items-center gap-2'>
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                        <Skeleton className="h-9 w-9" />
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="overflow-y-auto px-4 py-4">
                    <div className="space-y-6">
                        {/* Basic Fields */}
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-5 w-32" /> {/* Label */}
                                <Skeleton className="h-10 w-full" /> {/* Input */}
                                <Skeleton className="h-4 w-48" /> {/* Helper text */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
} 