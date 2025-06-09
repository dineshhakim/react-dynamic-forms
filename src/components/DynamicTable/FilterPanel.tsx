import React, { useState, useEffect } from 'react';
import { TableFilter, FilterValue, FilterOperator, SelectOption } from '../../types/index';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { fetchOptionsFromAPI } from '../../utils/apiUtils';

interface FilterPanelProps {
  filters: TableFilter[];
  onFilterChange: (filters: FilterValue[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>([]);
  const [selectedFilterId, setSelectedFilterId] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<Record<string, SelectOption[]>>({});
  const [isLoadingOptions, setIsLoadingOptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize with default filters if provided
    const defaultFilters = filters
      .filter(filter => filter.defaultValue !== undefined)
      .map(filter => ({
        filterId: filter.id,
        operator: filter.defaultOperator || getDefaultOperator(filter.type),
        value: filter.defaultValue,
      }));
    
    if (defaultFilters.length > 0) {
      setActiveFilters(defaultFilters);
      onFilterChange(defaultFilters);
    }
    
    // Load options from API for filters with dataSource
    filters.forEach(async (filter) => {
      if (filter.dataSource && filter.dataSource.type === 'api') {
        setIsLoadingOptions(prev => ({ ...prev, [filter.id]: true }));
        
        try {
          const options = await fetchOptionsFromAPI(filter.dataSource);
          setFilterOptions(prev => ({ ...prev, [filter.id]: options }));
        } finally {
          setIsLoadingOptions(prev => ({ ...prev, [filter.id]: false }));
        }
      }
    });
  }, [filters]);

  const getDefaultOperator = (type: string): FilterOperator => {
    switch (type) {
      case 'number':
      case 'date':
        return 'equals';
      case 'select':
        return 'equals';
      case 'checkbox':
        return 'equals';
      default:
        return 'contains';
    }
  };

  const getOperatorOptions = (operators: FilterOperator[]) => {
    const operatorLabels: Record<FilterOperator, string> = {
      equals: 'Equals',
      contains: 'Contains',
      startsWith: 'Starts with',
      endsWith: 'Ends with',
      greaterThan: 'Greater than',
      lessThan: 'Less than',
      between: 'Between',
      in: 'In list',
    };

    return operators.map(op => ({
      value: op,
      label: operatorLabels[op],
    }));
  };

  const handleAddFilter = () => {
    if (!selectedFilterId) return;
    
    const filterDef = filters.find(f => f.id === selectedFilterId);
    if (!filterDef) return;
    
    const newFilter: FilterValue = {
      filterId: selectedFilterId,
      operator: filterDef.defaultOperator || getDefaultOperator(filterDef.type),
      value: filterDef.type === 'checkbox' ? true : '',
    };
    
    const updatedFilters = [...activeFilters, newFilter];
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
    setSelectedFilterId('');
  };

  const handleRemoveFilter = (index: number) => {
    const updatedFilters = activeFilters.filter((_, i) => i !== index);
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleFilterChange = (index: number, field: keyof FilterValue, value: any) => {
    const updatedFilters = [...activeFilters];
    updatedFilters[index] = { ...updatedFilters[index], [field]: value };
    
    // Reset second value if operator is changed from 'between'
    if (field === 'operator' && updatedFilters[index].operator !== 'between') {
      updatedFilters[index].secondValue = undefined;
    }
    
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const renderFilterValueInput = (filter: FilterValue, index: number) => {
    const filterDef = filters.find(f => f.id === filter.filterId);
    if (!filterDef) return null;
    
    switch (filterDef.type) {
      case 'select':
        // Use API-loaded options if available, otherwise use static options
        const options = filterOptions[filterDef.id] || filterDef.options || [];
        const isLoading = isLoadingOptions[filterDef.id] || false;
        
        return (
          <Select
            options={options}
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
            className="w-full"
            isLoading={isLoading}
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-900">
              {filter.value ? 'Yes' : 'No'}
            </label>
          </div>
        );
      
      case 'date':
        return (
          <div className="flex space-x-2">
            <Input
              type="date"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              className="w-full"
            />
            {filter.operator === 'between' && (
              <Input
                type="date"
                value={filter.secondValue || ''}
                onChange={(e) => handleFilterChange(index, 'secondValue', e.target.value)}
                className="w-full"
                placeholder="End date"
              />
            )}
          </div>
        );
      
      case 'number':
        return (
          <div className="flex space-x-2">
            <Input
              type="number"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              className="w-full"
            />
            {filter.operator === 'between' && (
              <Input
                type="number"
                value={filter.secondValue || ''}
                onChange={(e) => handleFilterChange(index, 'secondValue', e.target.value)}
                className="w-full"
                placeholder="Max value"
              />
            )}
          </div>
        );
      
      default:
        return (
          <Input
            type="text"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
            className="w-full"
            placeholder={`Filter by ${filterDef.label.toLowerCase()}`}
          />
        );
    }
  };

  const availableFilters = filters.filter(
    filter => !activeFilters.some(af => af.filterId === filter.id)
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
      <div className="space-y-4">
        {activeFilters.map((filter, index) => {
          const filterDef = filters.find(f => f.id === filter.filterId);
          if (!filterDef) return null;
          
          return (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1/4">
                <span className="text-sm font-medium text-gray-700">
                  {filterDef.label}
                </span>
              </div>
              <div className="w-1/4">
                <Select
                  options={getOperatorOptions(filterDef.operators)}
                  value={filter.operator}
                  onChange={(e) => handleFilterChange(index, 'operator', e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                {renderFilterValueInput(filter, index)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveFilter(index)}
                className="flex-shrink-0"
              >
                <XMarkIcon className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
        
        {availableFilters.length > 0 && (
          <div className="flex items-center space-x-2 pt-2">
            <Select
              options={availableFilters.map(filter => ({
                value: filter.id,
                label: filter.label,
              }))}
              value={selectedFilterId}
              onChange={(e) => setSelectedFilterId(e.target.value)}
              className="w-full"
              placeholder="Add filter"
            />
            <Button
              onClick={handleAddFilter}
              disabled={!selectedFilterId}
              size="sm"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
