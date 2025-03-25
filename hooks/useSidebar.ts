import { usePathname } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { getBasePath } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';

interface UseSidebarProps {
    isNew: boolean;
    isEditing: boolean;
    onDelete: () => Promise<{ success: boolean; message: string }>;
    onEditModeChange?: (value: boolean) => void;
}

export const useSidebar = ({
    isNew,
    isEditing,
    onDelete,
    onEditModeChange
}: UseSidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const base = getBasePath(pathname);
    const isDetail = !isNew && !isEditing;

    const handleConfirm = () => {
        router.push(`/${base}`, { scroll: true });
    };

    const handleReturn = () => {
        onEditModeChange?.(false);
    };

    const handleEdit = () => {
        onEditModeChange?.(true);
    };

    const handleDelete = async () => {
        try {
            const response = await onDelete();
            const { success, message } = response;

            const title = success ? '' : 'Ha ocurrido un error.';
            const variant = success ? 'default' : 'destructive';

            toast({
                title: title,
                description: message,
                variant: variant,
            });

            if (response.success) {
                router.push(`/${base}`);
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while deleting',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return {
        isDetail,
        handleConfirm,
        handleReturn,
        handleEdit,
        handleDelete
    };
}; 