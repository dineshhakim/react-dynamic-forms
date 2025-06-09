import React, { useState, useEffect } from 'react';
import { TableSchema } from '../../types/index';
import DynamicTable from './DynamicTable';
import Button from '../ui/Button';
import { CheckIcon, PencilIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

interface BulkEditTableProps {
  schema: TableSchema;
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: any) => void;
}

const BulkEditTable: React.FC<BulkEditTableProps> = ({
  schema,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [editedData, setEditedData] = useState<any[]>([...data]);
  const [isSaving, setIsSaving] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);

  // Update editedData when data changes
  useEffect(() => {
    if (!editMode) {
      setEditedData([...data]);
    }
  }, [data, editMode]);

  const handleSelectRow = (item: any) => {
    const isSelected = selectedRows.some(row => row[schema.keyField] === item[schema.keyField]);
    
    if (isSelected) {
      setSelectedRows(selectedRows.filter(row => row[schema.keyField] !== item[schema.keyField]));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...data]);
    }
  };

  const handleBulkEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    if (!schema.bulkEditConfig?.saveAction) return;
    
    setIsSaving(true);
    try {
      await schema.bulkEditConfig.saveAction(editedData);
      setEditMode(false);
      setReorderMode(false);
      setSelectedRows([]);
    } catch (error) {
      console.error('Error saving bulk edit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setReorderMode(false);
    setEditedData([...data]);
    setSelectedRows([]);
    
    if (schema.bulkEditConfig?.cancelAction) {
      schema.bulkEditConfig.cancelAction();
    }
  };

  const handleFieldChange = (rowIndex: number, field: string, value: any) => {
    const newData = [...editedData];
    newData[rowIndex][field] = value;
    setEditedData(newData);
  };

  const handleToggleReorder = () => {
    setReorderMode(!reorderMode);
  };

  const handleMoveRow = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === editedData.length - 1)
    ) {
      return;
    }

    const newData = [...editedData];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the rows
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    
    setEditedData(newData);
  };

  // Enhanced schema with selection column and editable fields
  const enhancedSchema: TableSchema = {
    ...schema,
    columns: [
      {
        id: 'selection',
        header: (
          <input
            type="checkbox"
            checked={selectedRows.length === data.length && data.length > 0}
            onChange={handleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        ),
        accessor: (item: any) => (
          <input
            type="checkbox"
            checked={selectedRows.some(row => row[schema.keyField] === item[schema.keyField])}
            onChange={(e) => {
              e.stopPropagation();
              handleSelectRow(item);
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        ),
        type: 'text',
        width: '40px',
      },
      ...schema.columns,
      ...(reorderMode ? [{
        id: 'reorder',
        header: '',
        accessor: (_item: any, index?: number) => (
          <div className="flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') handleMoveRow(index, 'up');
              }}
              className="p-1 text-gray-500 hover:text-gray-700"
              disabled={typeof index === 'number' && index === 0}
            >
              ↑
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (typeof index === 'number') handleMoveRow(index, 'down');
              }}
              className="p-1 text-gray-500 hover:text-gray-700"
              disabled={typeof index === 'number' && index === editedData.length - 1}
            >
              ↓
            </button>
          </div>
        ),
        type: 'text' as const,
        width: '80px',
      }] : []),
    ],
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          {selectedRows.length > 0 && (
            <span className="text-sm text-gray-600">
              {selectedRows.length} {selectedRows.length === 1 ? 'item' : 'items'} selected
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {!editMode && schema.features?.bulkEdit && selectedRows.length > 0 && (
            <Button onClick={handleBulkEdit}>
              <PencilIcon className="h-4 w-4 mr-1" />
              Edit Selected
            </Button>
          )}
          {editMode && schema.features?.reordering && (
            <Button 
              variant={reorderMode ? 'secondary' : 'outline'} 
              onClick={handleToggleReorder}
            >
              <ArrowsUpDownIcon className="h-4 w-4 mr-1" />
              {reorderMode ? 'Exit Reorder' : 'Reorder Rows'}
            </Button>
          )}
          {editMode && (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} isLoading={isSaving}>
                <CheckIcon className="h-4 w-4 mr-1" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <DynamicTable
        schema={enhancedSchema}
        data={editedData}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick}
        editMode={editMode}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default BulkEditTable;
