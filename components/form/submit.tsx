import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";

export default function FormSubmitButton({ isPending, translations }: { isPending: boolean, translations: (key: string) => string }) {
    return (
        <div className='flex justify-end gap-4'>
            <Button type='submit' disabled={isPending}>

                {isPending && <Icon name='loader' className='animate-spin mr-2' />}
                {translations('layout.save')}
            </Button>
        </div>
    )
}