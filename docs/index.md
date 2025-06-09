# React Dynamic Forms & Tables

A modern React library featuring JSON-based dynamic forms and tables with advanced configuration options.

[![npm version](https://img.shields.io/npm/v/react-dynamic-forms-tables.svg)](https://www.npmjs.com/package/react-dynamic-forms-tables)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

React Dynamic Forms & Tables provides flexible, reusable UI components for data input and display. Built with TypeScript and designed for modern React applications, this library makes it easy to create complex forms and data tables with minimal code.

![Library Demo](./assets/library-demo.png)

## Key Features

- 🧩 **JSON-based configuration** - Define forms and tables using simple JSON schemas
- 🔄 **Multiple display modes** - Dialog, side panel, and page layouts
- 🛠️ **Visual builders** - Form and table builders with live preview
- 📝 **Built-in validation** - Form validation with Zod and React Hook Form
- 🔍 **Advanced filtering** - Searchable and filterable data tables
- 🔒 **Permission system** - Role-based access control for UI elements

## Documentation

- [Getting Started](./getting-started.md)
- [Dynamic Forms](./dynamic-forms.md)
- [Dynamic Tables](./dynamic-tables.md)
- [Permission System](./permissions.md)
- [API Reference](./api-reference.md)
- [Examples](./examples.md)

## Quick Installation

```bash
# Install the library
npm install react-dynamic-forms-tables

# Install peer dependencies
npm install @headlessui/react @heroicons/react react-router-dom tailwindcss
```

## Basic Usage

### Dynamic Form

```tsx
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';

const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: {
        required: 'Email is required',
      },
    },
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
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
  return (
    <DynamicForm 
      schema={userFormSchema}
      onSubmit={(data) => console.log('Form submitted:', data)}
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
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'badge',
      badgeOptions: {
        active: { variant: 'success', label: 'Active' },
        inactive: { variant: 'danger', label: 'Inactive' },
      },
    },
  ],
  actions: [
    {
      label: 'Edit',
      onClick: (item) => console.log('Edit', item),
      permission: 'edit_users',
    },
  ],
  keyField: 'id',
};

function MyTable() {
  const data = [
    { id: '1', name: 'John Doe', status: 'active' },
    { id: '2', name: 'Jane Smith', status: 'inactive' },
  ];

  return <DynamicTable schema={tableSchema} data={data} />;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
