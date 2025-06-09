import React, { useState } from 'react';
import DynamicTable from '../components/DynamicTable';
import { advancedUsersTableSchema, ordersTableSchema, tasksTableSchema } from '../schemas/advancedTableSchemas';
import { users, orders, tasks } from '../data/sampleData';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const AdvancedTableDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'tasks'>('users');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const getTableSchema = () => {
    switch (activeTab) {
      case 'users':
        return advancedUsersTableSchema;
      case 'orders':
        return ordersTableSchema;
      case 'tasks':
        return tasksTableSchema;
      default:
        return advancedUsersTableSchema;
    }
  };

  const getTableData = () => {
    switch (activeTab) {
      case 'users':
        return users;
      case 'orders':
        return orders;
      case 'tasks':
        return tasks;
      default:
        return users;
    }
  };

  const getModalTitle = () => {
    switch (activeTab) {
      case 'users':
        return 'User Details';
      case 'orders':
        return 'Order Details';
      case 'tasks':
        return 'Task Details';
      default:
        return 'Details';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Advanced Dynamic Tables</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('users')}
            >
              Users Table
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              Orders Table
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              Tasks Table
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'tasks' && 'Task Management'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === 'users' && 'View and manage user accounts with advanced filtering and sorting.'}
            {activeTab === 'orders' && 'Track and manage customer orders with status updates and filtering.'}
            {activeTab === 'tasks' && 'Organize tasks with priority levels, assignees, and progress tracking.'}
          </p>
        </div>
        
        <DynamicTable
          schema={getTableSchema()}
          data={getTableData()}
          onRowClick={handleRowClick}
        />
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Table Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600">Advanced Filtering</h3>
            <p className="text-sm text-gray-600 mt-1">
              Filter data using multiple criteria and operators like contains, equals, greater than, between, etc.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600">Custom Formatting</h3>
            <p className="text-sm text-gray-600 mt-1">
              Format cell values with custom renderers for currencies, dates, progress bars, and badges.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600">Conditional Actions</h3>
            <p className="text-sm text-gray-600 mt-1">
              Show or hide action buttons based on row data conditions for context-aware interfaces.
            </p>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={getModalTitle()}
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <p className="text-sm font-medium text-gray-500">{key}</p>
                  <p className="mt-1">
                    {typeof value === 'boolean'
                      ? value ? 'Yes' : 'No'
                      : Array.isArray(value)
                      ? value.join(', ')
                      : String(value)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdvancedTableDemo;
