import Item from './item'

interface PropTypes {
    // todo: change any to the type of the items
    items: any[]
}

export default function Index({ items }: PropTypes) {
    return (
        <div className="mx-auto py-10">
            {!items.length && (
                <div className="text-center text-xl text-gray-300">No se encontraron items</div>
            )}
            {items.length && (
                <div className="mx-auto grid grid-cols-1 justify-items-center gap-x-4 gap-y-12 sm:grid-cols-2  lg:gap-x-12 xl:grid-cols-3">
                    {items.map((it, index) => (
                        <Item
                            key={index}
                            item={it}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}