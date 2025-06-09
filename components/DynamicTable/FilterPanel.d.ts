import { default as React } from 'react';
import { TableFilter, FilterValue } from '../../types/index';
interface FilterPanelProps {
    filters: TableFilter[];
    onFilterChange: (filters: FilterValue[]) => void;
}
declare const FilterPanel: React.FC<FilterPanelProps>;
export default FilterPanel;
