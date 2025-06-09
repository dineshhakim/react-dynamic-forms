import { default as React } from 'react';
interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}
interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: T) => void;
}
declare function Table<T>({ data, columns, keyExtractor, isLoading, emptyMessage, onRowClick, }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
export default Table;
