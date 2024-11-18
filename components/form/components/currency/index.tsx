import { cn, safeParseFloat } from '@/lib/utils';
import { useLocale } from 'next-intl';

import CurrencyInput from 'react-currency-input-field';

export default function Component(props: Record<string, unknown>) {
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

    const { value } = props;

    const handleChange = (_value?: string, _name?: string, values?: Record<string, unknown>) => {
        if (typeof props.onChange === 'function') {
            props.onChange(values?.float);
        }
    }

    return (
        <CurrencyInput
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
            intlConfig={intlConfig}
            step={intlConfig.step}
            defaultValue={safeParseFloat(value)}
            allowNegativeValue={false}
            onValueChange={handleChange}
        />
    )
}