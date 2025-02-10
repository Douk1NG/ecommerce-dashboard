import CurrencyInput from 'react-currency-input-field';
import { cn, safeParseFloat } from '@/lib/utils';
import { CurrencyField } from '@/types/form';
import { useLocale } from 'next-intl';
import { useDebouncedCallback } from 'use-debounce'
export default function Component(props: CurrencyField) {
    const locale = useLocale();

    // TODO: improve the currency config
    const intlConfig = {
        locale: 'es-CO',
        currency: 'COP',
        step: 1000
    }

    if(locale === 'en') {
        intlConfig.locale = 'en-US';
        intlConfig.currency = 'USD';
        intlConfig.step = 1;
    }

    const { value, onChange } = props;

    const handleChange = useDebouncedCallback((_value?: string, _name?: string, values?: Record<string, unknown>) => {
        onChange?.(values?.float);
    }, 400)

    return (
        <CurrencyInput
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            intlConfig={intlConfig}
            step={intlConfig.step}
            defaultValue={safeParseFloat(value) as string}
            allowNegativeValue={false}
            name={props.name}
            onValueChange={handleChange}
        />
    )
}