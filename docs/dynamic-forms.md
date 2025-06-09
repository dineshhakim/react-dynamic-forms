# Dynamic Forms

React Dynamic Forms & Tables provides a powerful system for creating dynamic forms using JSON schemas. This guide covers the features and configuration options for dynamic forms.

## Form Schema

The form schema is a JSON object that defines the structure and behavior of your form. Here's the basic structure:

```typescript
interface FormSchema {
  fields: FormField[];
  displayConfig?: {
    mode: 'dialog' | 'sidepanel' | 'page';
    width?: string;
    title?: {
      create: string;
      edit: string;
      view: string;
    };
    submitLabel?: {
      create: string;
      edit: string;
    };
    cancelLabel?: string;
    redirectAfterSubmit?: boolean;
    redirectPath?: string;
  };
}
```

## Field Types

The library supports various field types:

| Type | Description |
|------|-------------|
| `text` | Standard text input |
| `email` | Email input with validation |
| `password` | Password input with masking |
| `number` | Numeric input |
| `select` | Dropdown select |
| `textarea` | Multi-line text input |
| `checkbox` | Boolean checkbox |
| `radio` | Radio button group |
| `date` | Date picker |

## Field Configuration

Each field in your form is defined with a `FormField` object:

```typescript
interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  dataSource?: ApiDataSource;
  validation?: {
    required?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  defaultValue?: any;
  disabled?: boolean;
  helperText?: string;
}
```

### Example Field Configurations

#### Text Field

```typescript
{
  name: 'firstName',
  label: 'First Name',
  type: 'text',
  placeholder: 'Enter your first name',
  validation: {
    required: 'First name is required',
    minLength: 2,
    maxLength: 50
  },
  helperText: 'Your legal first name'
}
```

#### Email Field with Validation

```typescript
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
  }
}
```

#### Select Field with Options

```typescript
{
  name: 'country',
  label: 'Country',
  type: 'select',
  options: [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' }
  ],
  validation: {
    required: 'Please select a country'
  }
}
```

#### Select Field with API Data Source

```typescript
{
  name: 'department',
  label: 'Department',
  type: 'select',
  dataSource: {
    type: 'api',
    url: '/api/departments',
    method: 'GET',
    responseMapping: {
      value: 'id',
      label: 'name'
    }
  },
  validation: {
    required: 'Please select a department'
  }
}
```

## Display Modes

The library supports three different ways to display forms:

### Dialog Mode

Forms appear in a modal dialog in the center of the screen. Ideal for quick interactions.

```typescript
displayConfig: {
  mode: 'dialog',
  width: 'lg', // sm, md, lg, xl, 2xl
  title: {
    create: 'Create New User',
    edit: 'Edit User Profile',
    view: 'User Details',
  }
}
```

### Side Panel Mode

Forms slide in from the right side of the screen. Good for maintaining context while editing.

```typescript
displayConfig: {
  mode: 'sidepanel',
  width: 'max-w-lg', // Any Tailwind width class
  title: {
    create: 'Add New Product',
    edit: 'Edit Product',
    view: 'Product Details',
  }
}
```

### Page Mode

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

## Form Validation

The library uses React Hook Form with Zod for validation. You can specify validation rules in the field configuration:

```typescript
validation: {
  required: 'This field is required', // Error message for required fields
  min: 0, // Minimum value for number fields
  max: 100, // Maximum value for number fields
  minLength: 5, // Minimum length for text fields
  maxLength: 50, // Maximum length for text fields
  pattern: { // Regex pattern for validation
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
}
```

## Form Builder

The library includes a visual form builder that allows you to create form schemas interactively:

```tsx
import { FormBuilder } from 'react-dynamic-forms-tables';

function MyFormBuilder() {
  const handleSave = (schema) => {
    console.log('Form schema:', schema);
    // Save the schema to your backend or local storage
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <FormBuilder onSave={handleSave} />
    </div>
  );
}
```

## Complete Example

Here's a complete example of a registration form:

```tsx
import { useState } from 'react';
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';

function RegistrationForm() {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema: FormSchema = {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter your first name',
        validation: {
          required: 'First name is required',
        },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter your last name',
        validation: {
          required: 'Last name is required',
        },
      },
      {
        name: 'email',
        label: 'Email',
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
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        validation: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        },
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Administrator' },
          { value: 'editor', label: 'Editor' },
        ],
        validation: {
          required: 'Please select a role',
        },
      },
      {
        name: 'agreeToTerms',
        label: 'I agree to the terms and conditions',
        type: 'checkbox',
        validation: {
          required: 'You must agree to the terms',
        },
      },
    ],
    displayConfig: {
      mode: 'dialog',
      width: 'lg',
      title: {
        create: 'Create Account',
        edit: 'Edit Account',
        view: 'Account Details',
      },
      submitLabel: {
        create: 'Register',
        edit: 'Update',
      },
      cancelLabel: 'Cancel',
    },
  };

  const handleSubmit = (data) => {
    console.log('Registration data:', data);
    setIsOpen(false);
    // Process registration...
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Register
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

export default RegistrationForm;
```
