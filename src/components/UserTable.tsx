import React, { useState } from 'react';
import Table from './ui/Table';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { User } from '../types/index';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (user: User) => void;
  onCreateNew: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading = false,
  onEdit,
  onView,
  onDelete,
  onCreateNew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    {
      header: 'Name',
      accessor: (user: User) => user.name,
    },
    {
      header: 'Email',
      accessor: (user: User) => user.email,
    },
    {
      header: 'Role',
      accessor: (user: User) => user.role,
      className: 'capitalize',
    },
    {
      header: 'Status',
      accessor: (user: User) => (
        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
          {user.status}
        </Badge>
      ),
    },
    {
      header: 'Created At',
      accessor: (user: User) => new Date(user.createdAt).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onView(user);
            }}
          >
            View
          </Button>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={onCreateNew}>
          <PlusIcon className="h-5 w-5 mr-1" />
          Add User
        </Button>
      </div>

      <Table
        data={filteredUsers}
        columns={columns}
        keyExtractor={(user) => user.id}
        isLoading={isLoading}
        emptyMessage="No users found"
        onRowClick={onView}
      />
    </div>
  );
};

export default UserTable;
