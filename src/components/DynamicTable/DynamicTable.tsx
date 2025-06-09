import React, { useState, useEffect, useMemo } from 'react';
import { 
  TableSchema, 
  FilterValue, 
  SortConfig, 
  TableColumn, 
  ColumnType,
  FilterOperator
} from '../../types/index';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import FilterPanel from './FilterPanel';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface DynamicTableProps {
  schema: TableSchema;
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: any) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  schema,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
}) => {
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(
    schema.defaultSortField 
      ? { 
          field: schema.defaultSortField, 
          direction: schema.defaultSortDirection || 'asc' 
        } 
      : null
  );
  const [showFilters, setShowFilters] = useState(false);

  // Apply sorting to data
  const sortedData = useMemo(() => {
    if (!sortConfig) return [...data];
    
    return [...data].sort((a, b) => {
      const column = schema.columns.find(col => 
        typeof col.accessor === 'string' && col.accessor === sortConfig.field
      );
      
      if (!column || typeof column.accessor !== 'string') return 0;
      
      const aValue = a[column.accessor];
      const bValue = b[column.accessor];
      
      if (aValue === bValue) return 0;
      
      // Handle null/undefined values in sorting
      if (aValue == null && bValue != null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue != null && bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (aValue == null && bValue == null) return 0;
      
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      
      if (column.type === 'number') {
        return (Number(aValue) - Number(bValue)) * direction;
      } else if (column.type === 'date') {
        return (new Date(aValue).getTime() - new Date(bValue).getTime()) * direction;
      } else {
        return String(aValue).localeCompare(String(bValue)) * direction;
      }
    });
  }, [data, sortConfig]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (filters.length === 0) return sortedData;
    
    return sortedData.filter(item => {
      return filters.every(filter => {
        const tableFilter = schema.filters?.find(f => f.id === filter.filterId);
        if (!tableFilter) return true;
        
        const accessor = tableFilter.accessor;
        const value = item[accessor];
        
        // Handle null/undefined values in filtering
        if (value == null) {
          // If we're filtering for null/empty values, return true
          if (filter.value === '' || filter.value === null) return true;
          return false;
        }
        
        switch (filter.operator) {
          case 'equals':
            if (tableFilter.type === 'checkbox') {
              return value === filter.value;
            }
            return String(value).toLowerCase() === String(filter.value).toLowerCase();
          
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
          
          case 'startsWith':
            return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
          
          case 'endsWith':
            return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
          
          case 'greaterThan':
            if (tableFilter.type === 'date') {
              return new Date(value) > new Date(filter.value);
            }
            return Number(value) > Number(filter.value);
          
          case 'lessThan':
            if (tableFilter.type === 'date') {
              return new Date(value) < new Date(filter.value);
            }
            return Number(value) < Number(filter.value);
          
          case 'between':
            if (tableFilter.type === 'date') {
              const date = new Date(value).getTime();
              return date >= new Date(filter.value).getTime() && 
                     date <= new Date(filter.secondValue).getTime();
            }
            return Number(value) >= Number(filter.value) && 
                   Number(value) <= Number(filter.secondValue);
          
          case 'in':
            if (Array.isArray(filter.value)) {
              return filter.value.includes(value);
            }
            return false;
          
          default:
            return true;
        }
      });
    });
  }, [sortedData, filters, schema.filters]);

  const handleSort = (column: TableColumn) => {
    if (typeof column.accessor !== 'string' || !column.sortable) return;
    
    setSortConfig(prevSort => {
      if (!prevSort || prevSort.field !== column.accessor) {
        return { field: column.accessor as string, direction: 'asc' };
      }
      
      if (prevSort.direction === 'asc') {
        return { field: column.accessor as string, direction: 'desc' };
      }
      
      return null;
    });
  };

  const handleFilterChange = (newFilters: FilterValue[]) => {
    setFilters(newFilters);
  };

  const renderCellContent = (item: any, column: TableColumn) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    
    const value = item[column.accessor];
    
    // Handle null/undefined values
    if (value == null) {
      return column.format ? column.format(value) : '-';
    }
    
    if (column.format) {
      try {
        return column.format(value);
      } catch (error) {
        console.error(`Error formatting value for column ${column.id}:`, error);
        return '-';
      }
    }
    
    switch (column.type) {
      case 'date':
        try {
          return value ? new Date(value).toLocaleDateString() : '-';
        } catch (error) {
          return '-';
        }
      
      case 'boolean':
        return value ? 'Yes' : 'No';
      
      case 'badge':
        if (column.badgeOptions && value) {
          const badgeOption = column.badgeOptions[value];
          if (badgeOption) {
            return (
              <Badge variant={badgeOption.variant}>
                {badgeOption.label || value}
              </Badge>
            );
          }
        }
        return value;
      
      default:
        return value;
    }
  };

  const renderActions = (item: any) => {
    if (!schema.actions || schema.actions.length === 0) return null;
    
    return (
      <div className="flex space-x-2">
        {schema.actions.map((action, index) => {
          if (action.showCondition && !action.showCondition(item)) {
            return null;
          }
          
          return (
            <Button
              key={index}
              size="sm"
              variant={action.variant || 'primary'}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(item);
              }}
            >
              {action.label}
            </Button>
          );
        })}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-w-full overflow-hidden rounded-lg border border-gray-200">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {schema.filters && schema.filters.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">
              {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
            </h3>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {showFilters && (
            <FilterPanel 
              filters={schema.filters} 
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
      )}
      
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        {filteredData.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {schema.columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && typeof column.accessor === 'string' && (
                        <span className="inline-flex flex-col">
                          <ChevronUpIcon 
                            className={`h-3 w-3 ${
                              sortConfig?.field === column.accessor && sortConfig?.direction === 'asc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`} 
                          />
                          <ChevronDownIcon 
                            className={`h-3 w-3 -mt-1 ${
                              sortConfig?.field === column.accessor && sortConfig?.direction === 'desc'
                                ? 'text-blue-600'
                                : 'text-gray-400'
                            }`} 
                          />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {schema.actions && schema.actions.length > 0 && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr
                  key={item[schema.keyField]}
                  className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {schema.columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                  {schema.actions && schema.actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;
