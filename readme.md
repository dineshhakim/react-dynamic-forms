# React Dynamic Forms & Tables

A modern React application featuring JSON-based dynamic forms and tables with advanced configuration options. This project demonstrates best practices for building flexible, reusable UI components for data input and display.

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

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- React Hook Form
- Zod (schema validation)
- Headless UI (accessible components)
- Hero Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-dynamic-forms.git
   cd react-dynamic-forms
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Table.tsx
│   ├── DynamicForm.tsx    # JSON-based form renderer
│   ├── FormContainer.tsx  # Container for different form display modes
│   ├── SidePanel.tsx      # Side panel component for forms
│   ├── FormBuilder.tsx    # Visual form builder
│   ├── DynamicTable/      # Dynamic table components
│   │   ├── DynamicTable.tsx
│   │   ├── FilterPanel.tsx
│   │   └── index.ts
│   └── Layout.tsx         # App layout with navigation
├── pages/
│   ├── FormBuilderPage.tsx    # Form builder page
│   ├── FormDisplayDemo.tsx    # Demo of form display modes
│   ├── TableDemoPage.tsx      # Table demo page
│   └── TableBuilderPage.tsx   # Table builder page
├── schemas/
│   ├── userFormSchema.ts      # User form schema definition
│   ├── productFormSchema.ts   # Product form schema definition
│   ├── eventRegistrationSchema.ts # Event registration form schema
│   ├── tableSchemas.ts        # Table schema definitions
│   └── sampleForms.ts         # Sample form definitions
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Form Display Modes

The application supports three different ways to display forms:

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

## Dynamic Form Schema

Forms are defined using JSON schemas:

```typescript
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
    // More fields...
  ],
  displayConfig: {
    mode: 'dialog',
    // More display options...
  }
};
```

## Dynamic Table Schema

Tables are also defined using JSON schemas:

```typescript
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
    // More columns...
  ],
  filters: [
    {
      id: 'name_filter',
      label: 'Name',
      type: 'text',
      accessor: 'name',
      operators: ['contains', 'equals', 'startsWith'],
    },
    // More filters...
  ],
  actions: [
    {
      label: 'Edit',
      onClick: (item) => console.log('Edit', item),
      variant: 'primary',
    },
    // More actions...
  ],
  keyField: 'id',
};
```

## Form Builder

The Form Builder allows you to:
- Add, edit, and remove form fields
- Configure field properties (type, label, validation, etc.)
- Preview the form
- Save and load form schemas
- Export schemas as JSON

## Table Builder

The Table Builder allows you to:
- Define table columns with different types
- Add filtering capabilities
- Configure sorting
- Add row actions
- Preview the table with sample data
- Save and export table schemas

## License

MIT
