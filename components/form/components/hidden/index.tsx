const Component = (props: Record<string, unknown>) => {
    return (
        <input
            type="hidden"
            aria-describedby={props['aria-describedby'] as string}
            aria-invalid={props['aria-invalid'] as boolean}
            value={props.value as string}
            id={props.id as string}
            onBlur={props.onBlur as () => void}
            onChange={props.onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
        />
    )
}

export default Component