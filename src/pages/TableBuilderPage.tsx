import React, { useState, useEffect } from 'react';
import { TableSchema, TableColumn, TableFilter, TableAction } from '../types/index';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import DynamicTable from '../components/DynamicTable';
import Modal from '../components/ui/Modal';
import { usersTableSchema, productsTableSchema } from '../schemas/tableSchemas';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const STORAGE_KEY = 'savedTableSchemas';

interface SavedTableSchema {
  id: string;
  name: string;
  schema: TableSchema;
  createdAt: string;
}

const sampleData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 32,
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
    department: 'Engineering',
    salary: 85000,
    isManager: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    status: 'active',
    createdAt: '2025-02-20T14:15:00Z',
    department: 'Marketing',
    salary: 72000,
    isManager: false,
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 45,
    status: 'inactive',
    createdAt: '2025-03-10T09:45:00Z',
    department: 'HR',
    salary: 65000,
    isManager: true,
  },
];

const TableBuilderPage: React.FC = () => {
  const [tableSchema, setTableSchema] = useState<TableSchema>({
    columns: [],
    filters: [],
    actions: [],
    keyField: 'id',
  });
  const [savedSchemas, setSavedSchemas] = useState<SavedTableSchema[]>([]);
  const [schemaName, setSchemaName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedSchemasModal, setShowSavedSchemasModal] = useState(false);
  const [showSampleSchemasModal, setShowSampleSchemasModal] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState<SavedTableSchema | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Column editing
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<TableColumn | null>(null);
  const [editingColumnIndex, setEditingColumnIndex] = useState<number | null>(null);
  
  // Filter editing
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<TableFilter | null>(null);
  const [editingFilterIndex, setEditingFilterIndex] = useState<number | null>(null);
  
  // Action editing
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<TableAction | null>(null);
  const [editingActionIndex, setEditingActionIndex] = useState<number | null>(null);

  // Load saved schemas from localStorage on component mount
  useEffect(() => {
    const storedSchemas = localStorage.getItem(STORAGE_KEY);
    if (storedSchemas) {
      setSavedSchemas(JSON.parse(storedSchemas));
    }
  }, []);

  const handleSaveSchema = () => {
    if (tableSchema.columns.length === 0) {
      alert('Please add at least one column before saving');
      return;
    }
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    if (!schemaName.trim()) return;

    const newSchema: SavedTableSchema = {
      id: Date.now().toString(),
      name: schemaName,
      schema: tableSchema,
      createdAt: new Date().toISOString(),
    };

    const updatedSchemas = [...savedSchemas, newSchema];
    setSavedSchemas(updatedSchemas);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSchemas));
    
    setSchemaName('');
    setShowSaveModal(false);
    alert('Table schema saved successfully!');
  };

  const handleViewSavedSchemas = () => {
    setShowSavedSchemasModal(true);
  };

  const handleViewSampleSchemas = () => {
    setShowSampleSchemasModal(true);
  };

  const handleLoadSchema = (schema: SavedTableSchema) => {
    setTableSchema(schema.schema);
    setSelectedSchema(schema);
    setShowSavedSchemasModal(false);
    setShowSampleSchemasModal(false);
  };

  const handleDeleteSavedSchema = (id: string) => {
    if (confirm('Are you sure you want to delete this schema?')) {
      const updatedSchemas = savedSchemas.filter(schema => schema.id !== id);
      setSavedSchemas(updatedSchemas);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSchemas));
    }
  };

  const handleCreateNewSchema = () => {
    setTableSchema({
      columns: [],
      filters: [],
      actions: [],
      keyField: 'id',
    });
    setSelectedSchema(null);
    setPreviewMode(false);
  };

  // Column management
  const handleAddColumn = () => {
    setCurrentColumn({
      id: '',
      header: '',
      accessor: '',
      type: 'text',
      sortable: true,
      filterable: true,
    });
    setEditingColumnIndex(null);
    setShowColumnModal(true);
  };

  const handleEditColumn = (index: number) => {
    setCurrentColumn({ ...tableSchema.columns[index] });
    setEditingColumnIndex(index);
    setShowColumnModal(true);
  };

  const handleDeleteColumn = (index: number) => {
    const updatedColumns = [...tableSchema.columns];
    updatedColumns.splice(index, 1);
    setTableSchema({ ...tableSchema, columns: updatedColumns });
  };

  const handleSaveColumn = () => {
    if (!currentColumn || !currentColumn.id || !currentColumn.header || !currentColumn.accessor) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedColumns = [...tableSchema.columns];
    
    if (editingColumnIndex !== null) {
      updatedColumns[editingColumnIndex] = currentColumn;
    } else {
      updatedColumns.push(currentColumn);
    }
    
    setTableSchema({ ...tableSchema, columns: updatedColumns });
    setShowColumnModal(false);
  };

  // Filter management
  const handleAddFilter = () => {
    setCurrentFilter({
      id: '',
      label: '',
      type: 'text',
      accessor: '',
      operators: ['equals', 'contains'],
    });
    setEditingFilterIndex(null);
    setShowFilterModal(true);
  };

  const handleEditFilter = (index: number) => {
    if (!tableSchema.filters) return;
    setCurrentFilter({ ...tableSchema.filters[index] });
    setEditingFilterIndex(index);
    setShowFilterModal(true);
  };

  const handleDeleteFilter = (index: number) => {
    if (!tableSchema.filters) return;
    const updatedFilters = [...tableSchema.filters];
    updatedFilters.splice(index, 1);
    setTableSchema({ ...tableSchema, filters: updatedFilters });
  };

  const handleSaveFilter = () => {
    if (!currentFilter || !currentFilter.id || !currentFilter.label || !currentFilter.accessor) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedFilters = [...(tableSchema.filters || [])];
    
    if (editingFilterIndex !== null) {
      updatedFilters[editingFilterIndex] = currentFilter;
    } else {
      updatedFilters.push(currentFilter);
    }
    
    setTableSchema({ ...tableSchema, filters: updatedFilters });
    setShowFilterModal(false);
  };

  // Action management
  const handleAddAction = () => {
    setCurrentAction({
      label: '',
      onClick: () => {},
      variant: 'primary',
    });
    setEditingActionIndex(null);
    setShowActionModal(true);
  };

  const handleEditAction = (index: number) => {
    if (!tableSchema.actions) return;
    setCurrentAction({ ...tableSchema.actions[index] });
    setEditingActionIndex(index);
    setShowActionModal(true);
  };

  const handleDeleteAction = (index: number) => {
    if (!tableSchema.actions) return;
    const updatedActions = [...tableSchema.actions];
    updatedActions.splice(index, 1);
    setTableSchema({ ...tableSchema, actions: updatedActions });
  };

  const handleSaveAction = () => {
    if (!currentAction || !currentAction.label) {
      alert('Please fill in all required fields');
      return;
    }

    // Create a new action with a console.log onClick handler
    const actionToSave = {
      ...currentAction,
      onClick: (item: any) => console.log(`${currentAction.label} clicked:`, item),
    };

    const updatedActions = [...(tableSchema.actions || [])];
    
    if (editingActionIndex !== null) {
      updatedActions[editingActionIndex] = actionToSave;
    } else {
      updatedActions.push(actionToSave);
    }
    
    setTableSchema({ ...tableSchema, actions: updatedActions });
    setShowActionModal(false);
  };

  const handleTogglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleExportSchema = () => {
    if (tableSchema.columns.length === 0) {
      alert('Please add at least one column before exporting');
      return;
    }
    
    const schemaJson = JSON.stringify(tableSchema, null, 2);
    const blob = new Blob([schemaJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sampleSchemas = [
    {
      id: 'users-table',
      name: 'Users Table',
      schema: usersTableSchema,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'products-table',
      name: 'Products Table',
      schema: productsTableSchema,
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Table Builder</h1>
      
      <div className="flex justify-between mb-4">
        <div>
          <Button variant="outline" onClick={handleCreateNewSchema} className="mr-2">
            Create New Table
          </Button>
          <Button variant="outline" onClick={handleViewSampleSchemas}>
            View Sample Tables
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleViewSavedSchemas}>
            View Saved Tables
          </Button>
          <Button onClick={handleTogglePreview}>
            {previewMode ? 'Edit Table' : 'Preview Table'}
          </Button>
          {!previewMode && tableSchema.columns.length > 0 && (
            <>
              <Button onClick={handleSaveSchema}>
                Save Table
              </Button>
              <Button variant="outline" onClick={handleExportSchema}>
                Export Schema
              </Button>
            </>
          )}
        </div>
      </div>
      
      {previewMode ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedSchema ? `Table Preview: ${selectedSchema.name}` : 'Table Preview'}
            </h2>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <DynamicTable
              schema={tableSchema}
              data={sampleData}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Table Columns</h2>
            {tableSchema.columns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No columns added yet. Click "Add Column" to start building your table.
              </div>
            ) : (
              <div className="space-y-2">
                {tableSchema.columns.map((column, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <span className="font-medium">{column.header}</span>
                      <span className="ml-2 text-sm text-gray-500">({column.type})</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditColumn(index)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteColumn(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button onClick={handleAddColumn}>Add Column</Button>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Table Filters</h2>
            {!tableSchema.filters || tableSchema.filters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No filters added yet. Click "Add Filter" to add filtering capabilities.
              </div>
            ) : (
              <div className="space-y-2">
                {tableSchema.filters.map((filter, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <span className="font-medium">{filter.label}</span>
                      <span className="ml-2 text-sm text-gray-500">({filter.type})</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditFilter(index)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteFilter(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button onClick={handleAddFilter}>Add Filter</Button>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Table Actions</h2>
            {!tableSchema.actions || tableSchema.actions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No actions added yet. Click "Add Action" to add row actions.
              </div>
            ) : (
              <div className="space-y-2">
                {tableSchema.actions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <span className="font-medium">{action.label}</span>
                      <span className="ml-2 text-sm text-gray-500">({action.variant})</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditAction(index)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDeleteAction(index)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button onClick={handleAddAction}>Add Action</Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Schema Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Table Schema"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Name
            </label>
            <input
              type="text"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a name for your table"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSave} disabled={!schemaName.trim()}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Saved Schemas Modal */}
      <Modal
        isOpen={showSavedSchemasModal}
        onClose={() => setShowSavedSchemasModal(false)}
        title="Saved Table Schemas"
        size="lg"
      >
        <div className="space-y-4">
          {savedSchemas.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No saved table schemas yet. Build and save a table to see it here.
            </p>
          ) : (
            <div className="space-y-2">
              {savedSchemas.map((schema) => (
                <div key={schema.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">{schema.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({new Date(schema.createdAt).toLocaleDateString()})
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleLoadSchema(schema)}>
                      Load
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeleteSavedSchema(schema.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setShowSavedSchemasModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Sample Schemas Modal */}
      <Modal
        isOpen={showSampleSchemasModal}
        onClose={() => setShowSampleSchemasModal(false)}
        title="Sample Table Schemas"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Select a sample table schema to get started quickly. These templates demonstrate different table configurations.
          </p>
          <div className="space-y-2">
            {sampleSchemas.map((schema) => (
              <div key={schema.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <span className="font-medium">{schema.name}</span>
                  <p className="text-sm text-gray-500 mt-1">
                    {schema.schema.columns.length} columns, {schema.schema.filters?.length || 0} filters
                  </p>
                </div>
                <Button size="sm" onClick={() => handleLoadSchema(schema)}>
                  Use Template
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setShowSampleSchemasModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Column Modal */}
      <Modal
        isOpen={showColumnModal}
        onClose={() => setShowColumnModal(false)}
        title={editingColumnIndex !== null ? "Edit Column" : "Add Column"}
        size="md"
      >
        {currentColumn && (
          <div className="space-y-4">
            <Input
              label="Column ID"
              value={currentColumn.id}
              onChange={(e) => setCurrentColumn({ ...currentColumn, id: e.target.value })}
              placeholder="e.g. name"
              helperText="Unique identifier for this column"
            />
            <Input
              label="Header"
              value={currentColumn.header}
              onChange={(e) => setCurrentColumn({ ...currentColumn, header: e.target.value })}
              placeholder="e.g. Name"
              helperText="Display name for the column header"
            />
            <Input
              label="Accessor"
              value={typeof currentColumn.accessor === 'string' ? currentColumn.accessor : ''}
              onChange={(e) => setCurrentColumn({ ...currentColumn, accessor: e.target.value })}
              placeholder="e.g. name"
              helperText="Property name in the data object"
            />
            <Select
              label="Column Type"
              value={currentColumn.type}
              onChange={(e) => setCurrentColumn({ ...currentColumn, type: e.target.value as any })}
              options={[
                { value: 'text', label: 'Text' },
                { value: 'number', label: 'Number' },
                { value: 'date', label: 'Date' },
                { value: 'boolean', label: 'Boolean' },
                { value: 'badge', label: 'Badge' },
              ]}
            />
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sortable"
                  checked={currentColumn.sortable || false}
                  onChange={(e) => setCurrentColumn({ ...currentColumn, sortable: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="sortable" className="ml-2 block text-sm text-gray-900">
                  Sortable
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="filterable"
                  checked={currentColumn.filterable || false}
                  onChange={(e) => setCurrentColumn({ ...currentColumn, filterable: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="filterable" className="ml-2 block text-sm text-gray-900">
                  Filterable
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowColumnModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveColumn}>
                {editingColumnIndex !== null ? 'Update Column' : 'Add Column'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title={editingFilterIndex !== null ? "Edit Filter" : "Add Filter"}
        size="md"
      >
        {currentFilter && (
          <div className="space-y-4">
            <Input
              label="Filter ID"
              value={currentFilter.id}
              onChange={(e) => setCurrentFilter({ ...currentFilter, id: e.target.value })}
              placeholder="e.g. name_filter"
              helperText="Unique identifier for this filter"
            />
            <Input
              label="Label"
              value={currentFilter.label}
              onChange={(e) => setCurrentFilter({ ...currentFilter, label: e.target.value })}
              placeholder="e.g. Name"
              helperText="Display name for the filter"
            />
            <Input
              label="Accessor"
              value={currentFilter.accessor}
              onChange={(e) => setCurrentFilter({ ...currentFilter, accessor: e.target.value })}
              placeholder="e.g. name"
              helperText="Property name in the data object"
            />
            <Select
              label="Filter Type"
              value={currentFilter.type}
              onChange={(e) => setCurrentFilter({ ...currentFilter, type: e.target.value as any })}
              options={[
                { value: 'text', label: 'Text' },
                { value: 'number', label: 'Number' },
                { value: 'date', label: 'Date' },
                { value: 'select', label: 'Select' },
                { value: 'checkbox', label: 'Checkbox' },
              ]}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowFilterModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveFilter}>
                {editingFilterIndex !== null ? 'Update Filter' : 'Add Filter'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Action Modal */}
      <Modal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        title={editingActionIndex !== null ? "Edit Action" : "Add Action"}
        size="md"
      >
        {currentAction && (
          <div className="space-y-4">
            <Input
              label="Label"
              value={currentAction.label}
              onChange={(e) => setCurrentAction({ ...currentAction, label: e.target.value })}
              placeholder="e.g. Edit"
              helperText="Text to display on the action button"
            />
            <Select
              label="Variant"
              value={currentAction.variant || 'primary'}
              onChange={(e) => setCurrentAction({ ...currentAction, variant: e.target.value as any })}
              options={[
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'danger', label: 'Danger' },
                { value: 'outline', label: 'Outline' },
              ]}
              helperText="Button style for this action"
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowActionModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAction}>
                {editingActionIndex !== null ? 'Update Action' : 'Add Action'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TableBuilderPage;
