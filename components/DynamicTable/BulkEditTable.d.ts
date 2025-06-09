import { default as React } from 'react';
import { TableSchema } from '../../types/index';
interface BulkEditTableProps {
    schema: TableSchema;
    data: any[];
    isLoading?: boolean;
    emptyMessage?: string;
    onRowClick?: (item: any) => void;
}
declare const BulkEditTable: React.FC<BulkEditTableProps>;
export default BulkEditTable;
