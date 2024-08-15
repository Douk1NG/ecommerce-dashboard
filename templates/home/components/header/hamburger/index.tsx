import Icon from '@/components/lazy-svg/client';
import { Button } from '@/components/ui/button';
import { translations } from '@/i18n';
import { useTranslations } from 'next-intl';

interface PropTypes {
    onClick: () => void;
}

const Index = ({onClick}:PropTypes) => {
    const t = useTranslations(translations.header);
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            title={t('toggle')}
            className='flex hover:bg-slate-600 md:hidden mr-auto'
            onClick={onClick}
        >
            <Icon name='menu' className='invert' />
        </Button>
    )
}

export default Index