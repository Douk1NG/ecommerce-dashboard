import Icon from "@/components/layout/icon";
import IntlButton from "@/components/intl/Button";

export default function FormSubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <div className='flex justify-end gap-4'>
            <IntlButton
                type='submit'
                disabled={isPending}
                title='layout.sidebar.save'
                text
            >
                {isPending && <Icon name='loader' className='animate-spin mr-2 h-4 w-4' />}
            </IntlButton>
        </div>
    )
}