import React, { useState } from 'react';
import DynamicTable from '../components/DynamicTable';
import { usersTableSchema, productsTableSchema } from '../schemas/tableSchemas';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Sample data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-02-20T14:15:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'editor',
    status: 'inactive',
    createdAt: '2025-03-10T09:45:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-03-15T11:20:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'admin',
    status: 'inactive',
    createdAt: '2025-04-05T16:30:00Z',
  },
];

const products = [
  {
    id: '1',
    name: 'Smartphone X',
    category: 'electronics',
    price: 999.99,
    inStock: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Designer T-Shirt',
    category: 'clothing',
    price: 49.99,
    inStock: true,
    rating: 4.0,
  },
  {
    id: '3',
    name: 'Coffee Table Book',
    category: 'books',
    price: 29.99,
    inStock: false,
    rating: 3.5,
  },
  {
    id: '4',
    name: 'Kitchen Blender',
    category: 'home',
    price: 79.99,
    inStock: true,
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Building Blocks Set',
    category: 'toys',
    price: 24.99,
    inStock: true,
    rating: 4.2,
  },
];

const TableDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'products'>('users');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleRowClick = (item: any) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Dynamic Tables</h1>
      
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
                activeTab === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products Table
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'users' ? (
          <DynamicTable
            schema={usersTableSchema}
            data={users}
            onRowClick={handleRowClick}
          />
        ) : (
          <DynamicTable
            schema={productsTableSchema}
            data={products}
            onRowClick={handleRowClick}
          />
        )}
      </div>
      
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={`${activeTab === 'users' ? 'User' : 'Product'} Details`}
        size="md"
      >
        {selectedItem && (
          <div className="space-y-4">
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(selectedItem, null, 2)}
            </pre>
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

export default TableDemoPage;
