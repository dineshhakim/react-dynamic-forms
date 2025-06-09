# Permission System

React Dynamic Forms & Tables includes a robust permission system that allows you to control access to UI elements based on user permissions. This guide covers how to set up and use the permission system.

## Setting Up the Permission Provider

To use the permission system, you need to wrap your application with the `PermissionProvider` component:

```tsx
import { PermissionProvider } from 'react-dynamic-forms-tables';

function App() {
  // User permissions could come from your authentication system
  const userPermissions = ['view_users', 'edit_users'];
  
  return (
    <PermissionProvider permissions={userPermissions}>
      <YourAppComponents />
    </PermissionProvider>
  );
}
```

## Permission Types

The permission system supports two types of permission checks:

1. **Single permission** - Check if the user has a specific permission
2. **Multiple permissions** - Check if the user has any of the specified permissions

## Using Permissions with Buttons

You can restrict buttons based on permissions:

```tsx
import { Button } from 'react-dynamic-forms-tables';

function UserActions() {
  return (
    <div className="space-x-2">
      {/* This button will only be visible to users with 'create_user' permission */}
      <Button 
        permission="create_user" 
        onClick={handleCreateUser}
        variant="primary"
      >
        Create User
      </Button>
      
      {/* This button requires any of the listed permissions */}
      <Button 
        permission={['edit_user', 'admin']} 
        onClick={handleEditUser}
        variant="secondary"
      >
        Edit User
      </Button>
      
      {/* This button requires the 'delete_user' permission */}
      <Button 
        permission="delete_user" 
        onClick={handleDeleteUser}
        variant="danger"
      >
        Delete User
      </Button>
    </div>
  );
}
```

## Using Permissions with Table Actions

You can restrict table actions based on permissions:

```tsx
const tableSchema: TableSchema = {
  // ...other schema properties
  actions: [
    {
      label: 'View',
      onClick: (item) => console.log('View', item),
      variant: 'outline',
      permission: 'view_users', // Only users with this permission will see this action
    },
    {
      label: 'Edit',
      onClick: (item) => console.log('Edit', item),
      variant: 'primary',
      permission: 'edit_users', // Only users with this permission will see this action
    },
    {
      label: 'Delete',
      onClick: (item) => console.log('Delete', item),
      variant: 'danger',
      permission: ['delete_users', 'admin'], // Users with any of these permissions will see this action
    },
  ],
};
```

## Using the Permission Hook

You can use the `usePermissions` hook to check permissions in your components:

```tsx
import { usePermissions } from 'react-dynamic-forms-tables';

function UserManagement() {
  const { hasPermission, userPermissions } = usePermissions();
  
  // Check if user has a specific permission
  const canCreateUser = hasPermission('create_user');
  
  // Check if user has any of the permissions
  const canManageUsers = hasPermission(['edit_users', 'delete_users', 'admin']);
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      {canCreateUser && (
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
          onClick={handleCreateUser}
        >
          Create New User
        </button>
      )}
      
      {canManageUsers && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Advanced User Management</h2>
          {/* Advanced management features */}
        </div>
      )}
      
      <div className="text-sm text-gray-500">
        Your permissions: {userPermissions.join(', ')}
      </div>
    </div>
  );
}
```

## Conditional Rendering with Permissions

You can use the permission hook to conditionally render any part of your UI:

```tsx
function Dashboard() {
  const { hasPermission } = usePermissions();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Always visible */}
      <DashboardCard title="Overview" />
      
      {/* Only visible with 'view_analytics' permission */}
      {hasPermission('view_analytics') && (
        <DashboardCard title="Analytics" />
      )}
      
      {/* Only visible with 'view_reports' permission */}
      {hasPermission('view_reports') && (
        <DashboardCard title="Reports" />
      )}
      
      {/* Only visible with admin or manager permission */}
      {hasPermission(['admin', 'manager']) && (
        <DashboardCard title="Team Performance" />
      )}
    </div>
  );
}
```

## Dynamic Navigation Based on Permissions

You can build dynamic navigation menus based on user permissions:

```tsx
function Navigation() {
  const { hasPermission } = usePermissions();
  
  const navItems = [
    { label: 'Dashboard', path: '/', permission: null }, // Always visible
    { label: 'Users', path: '/users', permission: 'view_users' },
    { label: 'Products', path: '/products', permission: 'view_products' },
    { label: 'Orders', path: '/orders', permission: 'view_orders' },
    { label: 'Settings', path: '/settings', permission: ['admin', 'manager'] },
  ];
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {navItems.map((item) => {
          // If no permission is required, or user has the required permission
          if (!item.permission || hasPermission(item.permission)) {
            return (
              <li key={item.path}>
                <a href={item.path} className="hover:text-blue-300">
                  {item.label}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}
```

## Complete Example

Here's a complete example of using the permission system in a user management interface:

```tsx
import { useState } from 'react';
import { 
  DynamicTable, 
  DynamicForm, 
  Button, 
  usePermissions, 
  TableSchema, 
  FormSchema 
} from 'react-dynamic-forms-tables';

function UserManagement() {
  const { hasPermission } = usePermissions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState('create');
  
  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'User',
      status: 'inactive',
    },
  ];
  
  const tableSchema: TableSchema = {
    columns: [
      {
        id: 'name',
        header: 'Name',
        accessor: 'name',
        type: 'text',
        sortable: true,
      },
      {
        id: 'email',
        header: 'Email',
        accessor: 'email',
        type: 'text',
      },
      {
        id: 'role',
        header: 'Role',
        accessor: 'role',
        type: 'text',
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        type: 'badge',
        badgeOptions: {
          active: {
            variant: 'success',
            label: 'Active',
          },
          inactive: {
            variant: 'danger',
            label: 'Inactive',
          },
        },
      },
    ],
    actions: [
      {
        label: 'Edit',
        onClick: (user) => {
          setSelectedUser(user);
          setFormMode('edit');
          setIsFormOpen(true);
        },
        variant: 'primary',
        permission: 'edit_users',
      },
      {
        label: 'Delete',
        onClick: (user) => {
          console.log('Delete user:', user);
          // Show confirmation dialog and delete
        },
        variant: 'danger',
        permission: 'delete_users',
      },
    ],
    keyField: 'id',
  };
  
  const formSchema: FormSchema = {
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        validation: {
          required: 'Name is required',
        },
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { value: 'Admin', label: 'Administrator' },
          { value: 'User', label: 'Regular User' },
          { value: 'Editor', label: 'Editor' },
        ],
        validation: {
          required: 'Role is required',
        },
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
        validation: {
          required: 'Status is required',
        },
      },
    ],
    displayConfig: {
      mode: 'dialog',
      title: {
        create: 'Create New User',
        edit: 'Edit User',
        view: 'User Details',
      },
    },
  };
  
  const handleCreateUser = () => {
    setSelectedUser(null);
    setFormMode('create');
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    // Save user data
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        
        {/* Only show create button if user has permission */}
        {hasPermission('create_users') && (
          <Button 
            variant="primary" 
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        )}
      </div>
      
      <DynamicTable 
        schema={tableSchema} 
        data={users} 
      />
      
      <DynamicForm
        schema={formSchema}
        onSubmit={handleFormSubmit}
        mode={formMode}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedUser}
      />
    </div>
  );
}

export default UserManagement;
```
