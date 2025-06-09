import { default as React } from 'react';
import { TableSchema } from '../../types/index';
interface DynamicTableProps {
    schema: TableSchema;
    data: any[];
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: any) => void;
    editMode?: boolean;
    onFieldChange?: (rowIndex: number, field: string, value: any) => void;
}
declare const DynamicTable: React.FC<DynamicTableProps>;
export default DynamicTable;
