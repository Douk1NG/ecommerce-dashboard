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
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" /> {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                            <Skeleton className="h-4 w-48" /> {/* Helper text */}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-32" /> {/* Label */}
                            <Skeleton className="h-32 w-full" /> {/* Textarea */}
                            <Skeleton className="h-4 w-56" /> {/* Helper text */}
                        </div>

                        {/* Parent Category Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-36" /> {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Select */}
                            <Skeleton className="h-4 w-52" /> {/* Helper text */}
                        </div>

                        {/* Filters Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-20" /> {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Multiselect */}
                            <Skeleton className="h-4 w-44" /> {/* Helper text */}
                        </div>

                        {/* Featured Category Toggle */}
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" /> {/* Label */}
                            <Skeleton className="h-6 w-12" /> {/* Toggle */}
                            <Skeleton className="h-4 w-56" /> {/* Helper text */}
                        </div>

                        {/* Image Section */}
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-24" /> {/* Label */}
                            <div className="aspect-square w-full max-w-sm">
                                <Skeleton className="h-full w-full" /> {/* Image placeholder */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 