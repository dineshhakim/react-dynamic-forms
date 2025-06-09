# React Dynamic Forms & Tables

A modern React library featuring JSON-based dynamic forms and tables with advanced configuration options. This library provides flexible, reusable UI components for data input and display.

## Installation

```bash
npm install react-dynamic-forms-tables
# or
yarn add react-dynamic-forms-tables
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install @headlessui/react @heroicons/react react-router-dom tailwindcss
# or
yarn add @headlessui/react @heroicons/react react-router-dom tailwindcss
```

## Features

### Dynamic Forms
- 🧩 JSON-based form generation
- 🔄 Multiple display modes (dialog, side panel, page)
- 🛠️ Visual form builder with live preview
- 📝 Form validation with Zod and React Hook Form
- 💾 Save and load form schemas
- 📤 Export schemas as JSON

### Dynamic Tables
- 🔍 Searchable and filterable data tables
- 🔢 Sorting capabilities
- 📊 Custom column types and formatting
- 🎛️ Advanced filtering with multiple operators
- 🛠️ Visual table builder
- 🔄 JSON-based table configuration

### Permission System
- 🔒 Role-based access control
- 👁️ Conditional UI rendering based on permissions
- 🛡️ Secure action handling
- 🔑 Flexible permission checking

## Usage

### Dynamic Form

```tsx
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';

const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      validation: {
        required: 'Name is required',
      },
    },
  ],
  displayConfig: {
    mode: 'dialog',
    title: {
      create: 'Create New User',
      edit: 'Edit User Profile',
      view: 'User Details',
    }
  }
};

function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <DynamicForm 
      schema={userFormSchema}
      onSubmit={handleSubmit}
      mode="create"
      isOpen={true}
      onClose={() => console.log('Form closed')}
    />
  );
}
```

### Form Container

```tsx
import { FormContainer, FormSchema } from 'react-dynamic-forms-tables';

function MyFormContainer() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormContainer 
      schema={userFormSchema}
      onSubmit={handleSubmit}
      mode="create"
      isOpen={true}
      onClose={() => console.log('Form closed')}
    />
  );
}
```

### Dynamic Table

```tsx
import { DynamicTable, TableSchema } from 'react-dynamic-forms-tables';

const tableSchema: TableSchema = {
  columns: [
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'email',
      header: 'Email',
      accessor: 'email',
      type: 'text',
      sortable: true,
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
  filters: [
    {
      id: 'name_filter',
      label: 'Name',
      type: 'text',
      accessor: 'name',
      operators: ['contains', 'equals', 'startsWith'],
    },
  ],
  actions: [
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
  keyField: 'id',
};

function MyTable() {
  const data = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ];

  return (
    <DynamicTable 
      schema={tableSchema}
      data={data}
    />
  );
}
```

### Form Builder

```tsx
import { FormBuilder } from 'react-dynamic-forms-tables';

function MyFormBuilder() {
  const handleSave = (schema) => {
    console.log('Form schema:', schema);
  };

  return (
    <FormBuilder onSave={handleSave} />
  );
}
```

## Form Display Modes

The library supports three different ways to display forms:

### 1. Dialog Mode
Forms appear in a modal dialog in the center of the screen. Ideal for quick interactions.

```typescript
displayConfig: {
  mode: 'dialog',
  width: 'lg',
  title: {
    create: 'Create New User',
    edit: 'Edit User Profile',
    view: 'User Details',
  }
}
```

### 2. Side Panel Mode
Forms slide in from the right side of the screen. Good for maintaining context while editing.

```typescript
displayConfig: {
  mode: 'sidepanel',
  width: 'max-w-lg',
  title: {
    create: 'Add New Product',
    edit: 'Edit Product',
    view: 'Product Details',
  }
}
```

### 3. Page Mode
Forms take up a full page. Best for complex forms or when full focus is needed.

```typescript
displayConfig: {
  mode: 'page',
  title: {
    create: 'Event Registration',
    edit: 'Update Registration',
    view: 'Registration Details',
  },
  redirectAfterSubmit: true,
  redirectPath: '/registration-confirmation',
}
```

## Permission System

The library includes a permission system that allows you to control access to buttons and actions based on user permissions.

### Setting Up Permissions

Wrap your application with the `PermissionProvider` to enable permission checking:

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

### Using Permissions with Buttons

You can restrict buttons based on permissions:

```tsx
import { Button } from 'react-dynamic-forms-tables';

function MyComponent() {
  return (
    <div>
      {/* This button will only be visible to users with 'create_user' permission */}
      <Button permission="create_user" onClick={handleCreateUser}>
        Create User
      </Button>
      
      {/* This button requires any of the listed permissions */}
      <Button permission={['edit_user', 'admin']} onClick={handleEditUser}>
        Edit User
      </Button>
    </div>
  );
}
```

### Using Permissions with Table Actions

You can also restrict table actions based on permissions:

```tsx
const tableSchema: TableSchema = {
  // ...other schema properties
  actions: [
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

### Using the Permission Hook

You can use the `usePermissions` hook to check permissions in your components:

```tsx
import { usePermissions } from 'react-dynamic-forms-tables';

function MyComponent() {
  const { hasPermission, userPermissions } = usePermissions();
  
  // Check if user has a specific permission
  const canCreateUser = hasPermission('create_user');
  
  // Check if user has any of the permissions
  const canManageUsers = hasPermission(['edit_users', 'delete_users', 'admin']);
  
  return (
    <div>
      {canCreateUser && <div>User can create users</div>}
      {canManageUsers && <div>User can manage users</div>}
      <div>User has the following permissions: {userPermissions.join(', ')}</div>
    </div>
  );
}
```

## Library Structure

The library is organized as follows:

```
react-dynamic-forms-tables/
├── components/
│   ├── DynamicForm.tsx       # Main form component
│   ├── FormContainer.tsx     # Container for different form modes
│   ├── FormBuilder.tsx       # Visual form builder
│   ├── DynamicTable/         # Table components
│   │   ├── DynamicTable.tsx  # Main table component
│   │   ├── FilterPanel.tsx   # Table filtering UI
│   │   └── BulkEditTable.tsx # Bulk editing functionality
│   └── ui/                   # Base UI components
│       ├── Button.tsx        # Button with permission support
│       ├── Badge.tsx         # Status badges
│       └── ...
├── context/
│   └── PermissionContext.tsx # Permission management
├── types/
│   └── index.ts              # TypeScript type definitions
└── lib/
    ├── index.ts              # Main library exports
    └── components.css        # Component styles
```

## Using with TypeScript

The library is built with TypeScript and provides comprehensive type definitions:

```tsx
import { 
  DynamicForm, 
  FormSchema, 
  FormField, 
  FormMode,
  TableSchema,
  TableColumn,
  PermissionProvider
} from 'react-dynamic-forms-tables';

// Define your form schema with proper typing
const formSchema: FormSchema = {
  fields: [
    // Your form fields here
  ]
};

// Define your table schema with proper typing
const tableSchema: TableSchema = {
  columns: [
    // Your table columns here
  ],
  keyField: 'id'
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
