import Icon from "@/components/icon";
import IntlButton from "@/components/intl/ui/Button";

export default function FormSubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <div className='flex justify-end gap-4'>
            <IntlButton
                type='submit'
                disabled={isPending}
                title='layout.sidebar.save'
                showTitle={true}
            >
                {isPending && <Icon name='loader' className='animate-spin mr-2' />}
            </IntlButton>
        </div>
    )
}