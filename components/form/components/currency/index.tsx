import CurrencyInput from 'react-currency-input-field';
import { cn, safeParseFloat } from '@/lib/utils';
import { CurrencyField } from '@/types/form';
import { useLocale } from 'next-intl';
import { useDebouncedCallback } from 'use-debounce'

export default function Component(props: CurrencyField) {
    const locale = useLocale();
    const { value, id, name, onChange } = props;
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

    const handleChange = useDebouncedCallback((_value?: string, _name?: string, values?: Record<string, unknown>) => {
        // todo: fix behaviour : components call this function without fire events
        onChange?.(values?.float);
    }, 400)

    return (
        <CurrencyInput
            id={id ?? name}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            intlConfig={intlConfig}
            step={intlConfig.step}
            defaultValue={safeParseFloat(value) as number}
            allowNegativeValue={false}
            name={props.name}
            onValueChange={handleChange}
        />
    )
}