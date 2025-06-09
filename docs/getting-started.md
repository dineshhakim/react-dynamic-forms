# Getting Started

This guide will help you get started with React Dynamic Forms & Tables in your project.

## Installation

Install the library using npm or yarn:

```bash
# Using npm
npm install react-dynamic-forms-tables

# Using yarn
yarn add react-dynamic-forms-tables
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
# Using npm
npm install @headlessui/react @heroicons/react react-router-dom tailwindcss

# Using yarn
yarn add @headlessui/react @heroicons/react react-router-dom tailwindcss
```

## Setting Up Tailwind CSS

The library uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project:

1. If you haven't already, install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add this line to include the library components
    "./node_modules/react-dynamic-forms-tables/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Import Tailwind in your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Basic Setup

### Setting Up the Permission Provider

Wrap your application with the `PermissionProvider` to enable the permission system:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PermissionProvider } from 'react-dynamic-forms-tables';
import App from './App';
import './index.css';

// User permissions could come from your authentication system
const userPermissions = ['view_users', 'edit_users'];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PermissionProvider permissions={userPermissions}>
      <App />
    </PermissionProvider>
  </React.StrictMode>,
);
```

## Your First Dynamic Form

Here's a simple example of creating a dynamic form:

```tsx
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';
import { useState } from 'react';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema: FormSchema = {
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your full name',
        validation: {
          required: 'Name is required',
        },
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Enter your email',
        validation: {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        },
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message',
        validation: {
          required: 'Message is required',
        },
      },
    ],
    displayConfig: {
      mode: 'dialog',
      title: {
        create: 'Contact Us',
        edit: 'Edit Message',
        view: 'View Message',
      },
    },
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsOpen(false);
  };

  return (
    <div>
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Contact Form
      </button>

      <DynamicForm
        schema={formSchema}
        onSubmit={handleSubmit}
        mode="create"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default ContactForm;
```

## Your First Dynamic Table

Here's a simple example of creating a dynamic table:

```tsx
import { DynamicTable, TableSchema } from 'react-dynamic-forms-tables';

function UserTable() {
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
        sortable: true,
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
        onClick: (user) => console.log('Edit user:', user),
        variant: 'primary',
        permission: 'edit_users',
      },
      {
        label: 'Delete',
        onClick: (user) => console.log('Delete user:', user),
        variant: 'danger',
        permission: 'delete_users',
      },
    ],
    keyField: 'id',
  };

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <DynamicTable schema={tableSchema} data={users} />
    </div>
  );
}

export default UserTable;
```

## Next Steps

Now that you have the basics set up, you can explore more advanced features:

- [Dynamic Forms](./dynamic-forms.md) - Learn more about form configuration options
- [Dynamic Tables](./dynamic-tables.md) - Explore table features like filtering and sorting
- [Permission System](./permissions.md) - Understand how to use the permission system
- [Examples](./examples.md) - See more complex examples
