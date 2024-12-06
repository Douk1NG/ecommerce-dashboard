import type { ColumnDef } from "@tanstack/react-table"
import type { Inventory } from '../types';

import CONSTANTS from "../resources/constants";

const columns: ColumnDef<Inventory>[] = [
    {
        accessorKey: CONSTANTS.KEYS.PRODUCT,
        header: CONSTANTS.SCHEME.PRODUCT,
    },
    {
        accessorKey: CONSTANTS.KEYS.QUANTITY,
        header: CONSTANTS.SCHEME.QUANTITY,
    }
]

export default columns;