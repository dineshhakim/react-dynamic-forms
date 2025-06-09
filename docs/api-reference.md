# API Reference

This page provides detailed API documentation for the React Dynamic Forms & Tables library.

## Components

### DynamicForm

The main component for rendering dynamic forms.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `FormSchema` | Yes | The form schema configuration |
| `onSubmit` | `(data: any) => void` | Yes | Function called when the form is submitted |
| `mode` | `'create' \| 'edit' \| 'view'` | Yes | The form mode |
| `isOpen` | `boolean` | Yes | Whether the form is open (for dialog/sidepanel modes) |
| `onClose` | `() => void` | Yes | Function called when the form is closed |
| `initialData` | `any` | No | Initial data for the form (for edit/view modes) |
| `isLoading` | `boolean` | No | Whether the form is in a loading state |
| `onCancel` | `() => void` | No | Function called when the form is cancelled |
| `className` | `string` | No | Additional CSS class for the form |

### FormContainer

A container component that renders the form in different display modes.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `FormSchema` | Yes | The form schema configuration |
| `onSubmit` | `(data: any) => void` | Yes | Function called when the form is submitted |
| `mode` | `'create' \| 'edit' \| 'view'` | Yes | The form mode |
| `isOpen` | `boolean` | Yes | Whether the form is open (for dialog/sidepanel modes) |
| `onClose` | `() => void` | Yes | Function called when the form is closed |
| `initialData` | `any` | No | Initial data for the form (for edit/view modes) |
| `isLoading` | `boolean` | No | Whether the form is in a loading state |
| `onCancel` | `() => void` | No | Function called when the form is cancelled |
| `className` | `string` | No | Additional CSS class for the container |

### DynamicTable

The main component for rendering dynamic tables.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | `TableSchema` | Yes | The table schema configuration |
| `data` | `any[]` | Yes | The data to display in the table |
| `isLoading` | `boolean` | No | Whether the table is in a loading state |
| `emptyMessage` | `string` | No | Message to display when there is no data |
| `onRowClick` | `(item: any) => void` | No | Function called when a row is clicked |
| `editMode` | `boolean` | No | Whether the table is in edit mode |
| `onFieldChange` | `(rowIndex: number, field: string, value: any) => void` | No | Function called when a field is changed in edit mode |

### FormBuilder

A visual builder for creating form schemas.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSave` | `(schema: FormSchema) => void` | Yes | Function called when the schema is saved |
| `initialSchema` | `FormSchema` | No | Initial schema to load in the builder |
| `className` | `string` | No | Additional CSS class for the builder |

### FilterPanel

A component for filtering table data.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `filters` | `TableFilter[]` | Yes | The filter configurations |
| `onFilterChange` | `(filters: FilterValue[]) => void` | Yes | Function called when filters change |
| `initialFilters` | `FilterValue[]` | No | Initial filter values |
| `className` | `string` | No | Additional CSS class for the filter panel |

### PermissionProvider

A provider component for the permission system.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Child components |
| `permissions` | `string[]` | No | Array of permission strings the user has |

### Button

A button component with permission support.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Button content |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'outline' \| 'success'` | No | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | Button size |
| `fullWidth` | `boolean` | No | Whether the button should take full width |
| `isLoading` | `boolean` | No | Whether the button is in a loading state |
| `permission` | `string \| string[]` | No | Permission(s) required to see this button |
| `className` | `string` | No | Additional CSS class for the button |
| `...props` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | No | Any other button props |

## Hooks

### usePermissions

A hook for checking permissions.

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `hasPermission` | `(permission: string \| string[]) => boolean` | Function to check if the user has a permission |
| `userPermissions` | `string[]` | Array of permissions the user has |

## Types

### FormSchema

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

### FormField

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

### FieldType

```typescript
type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'date';
```

### TableSchema

```typescript
interface TableSchema {
  columns: TableColumn[];
  filters?: TableFilter[];
  actions?: TableAction[];
  keyField: string;
  defaultSortField?: string;
  defaultSortDirection?: 'asc' | 'desc';
  features?: {
    bulkEdit?: boolean;
    reordering?: boolean;
    pagination?: boolean;
    exportData?: boolean;
  };
  bulkEditConfig?: {
    editableFields: string[];
    saveAction: (items: any[]) => Promise<void> | void;
    cancelAction?: () => void;
  };
}
```

### TableColumn

```typescript
interface TableColumn {
  id: string;
  header: string | React.ReactNode;
  accessor: string | ((item: any, index?: number) => React.ReactNode);
  type: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  className?: string;
  format?: (value: any) => string | React.ReactNode;
  badgeOptions?: {
    [key: string]: {
      variant: 'success' | 'warning' | 'danger' | 'info' | 'default';
      label?: string;
    };
  };
  options?: SelectOption[];
  dataSource?: ApiDataSource;
  editable?: boolean;
}
```

### ColumnType

```typescript
type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'actions';
```

### TableAction

```typescript
interface TableAction {
  label: string;
  icon?: string;
  onClick: (item: any) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
  showCondition?: (item: any) => boolean;
  permission?: string | string[]; // Permission required to see this action
}
```

### TableFilter

```typescript
interface TableFilter {
  id: string;
  label: string;
  type: FieldType;
  accessor: string;
  operators: FilterOperator[];
  options?: SelectOption[];
  dataSource?: ApiDataSource;
  defaultOperator?: FilterOperator;
  defaultValue?: any;
}
```

### FilterOperator

```typescript
type FilterOperator = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'between'
  | 'in';
```

### SelectOption

```typescript
interface SelectOption {
  value: string;
  label: string;
}
```

### ApiDataSource

```typescript
interface ApiDataSource {
  type: 'api';
  url: string;
  method?: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string>;
  params?: Record<string, string>;
  bodyData?: any;
  responseMapping: {
    value: string; // path to value in response
    label: string; // path to label in response
  };
  dependsOn?: string; // field name this depends on
}
```

### PermissionContextType

```typescript
interface PermissionContextType {
  hasPermission: (permission: string | string[]) => boolean;
  userPermissions: string[];
}
```
