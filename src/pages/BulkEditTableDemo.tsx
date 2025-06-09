import React, { useState } from 'react';
import BulkEditTable from '../components/DynamicTable/BulkEditTable';
import { tasksWithBulkEditSchema } from '../schemas/bulkEditTableSchema';
import { tasks } from '../data/sampleData';

const BulkEditTableDemo: React.FC = () => {
  const [taskData, setTaskData] = useState([...tasks]);

  // Update the schema to use our local state
  const enhancedSchema = {
    ...tasksWithBulkEditSchema,
    bulkEditConfig: {
      ...tasksWithBulkEditSchema.bulkEditConfig,
      editableFields: tasksWithBulkEditSchema.bulkEditConfig?.editableFields || [],
      saveAction: async (items: any[]) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTaskData(items);
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Bulk Edit Table Demo</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Use Bulk Edit</h2>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Select one or more rows using the checkboxes</li>
          <li>Click the "Edit Selected" button to enter edit mode</li>
          <li>Make changes to the editable fields</li>
          <li>Use the "Reorder Rows" button to change the order</li>
          <li>Click "Save Changes" to apply your edits</li>
        </ol>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 overflow-auto">
          <pre className="text-sm">
{`// Configure bulk edit in your table schema:
{
  // ... columns, filters, etc.
  features: {
    bulkEdit: true,
    reordering: true,
  },
  bulkEditConfig: {
    editableFields: ['assignee', 'priority', 'status'],
    saveAction: async (items) => {
      // Save the edited items
      await api.updateItems(items);
    },
  },
}`}
          </pre>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <BulkEditTable
          schema={enhancedSchema}
          data={taskData}
          emptyMessage="No tasks available"
        />
      </div>
    </div>
  );
};

export default BulkEditTableDemo;
