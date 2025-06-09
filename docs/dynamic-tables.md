# Dynamic Tables

React Dynamic Forms & Tables provides a powerful system for creating dynamic data tables using JSON schemas. This guide covers the features and configuration options for dynamic tables.

## Table Schema

The table schema is a JSON object that defines the structure and behavior of your table. Here's the basic structure:

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

## Column Types

The library supports various column types:

| Type | Description |
|------|-------------|
| `text` | Standard text display |
| `number` | Numeric display with optional formatting |
| `date` | Date display with formatting |
| `boolean` | Boolean values displayed as Yes/No |
| `badge` | Status badges with color variants |
| `actions` | Action buttons |

## Column Configuration

Each column in your table is defined with a `TableColumn` object:

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

### Example Column Configurations

#### Text Column

```typescript
{
  id: 'name',
  header: 'Name',
  accessor: 'name',
  type: 'text',
  sortable: true,
  filterable: true
}
```

#### Date Column with Formatting

```typescript
{
  id: 'createdAt',
  header: 'Created Date',
  accessor: 'createdAt',
  type: 'date',
  sortable: true,
  format: (value) => new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
```

#### Badge Column

```typescript
{
  id: 'status',
  header: 'Status',
  accessor: 'status',
  type: 'badge',
  badgeOptions: {
    active: {
      variant: 'success',
      label: 'Active'
    },
    pending: {
      variant: 'warning',
      label: 'Pending'
    },
    inactive: {
      variant: 'danger',
      label: 'Inactive'
    }
  }
}
```

#### Custom Accessor Function

```typescript
{
  id: 'fullName',
  header: 'Full Name',
  accessor: (item) => `${item.firstName} ${item.lastName}`,
  type: 'text',
  sortable: false
}
```

## Table Actions

You can define actions that appear for each row in the table:

```typescript
actions: [
  {
    label: 'Edit',
    onClick: (item) => console.log('Edit', item),
    variant: 'primary',
    permission: 'edit_users', // Only users with this permission will see this action
    showCondition: (item) => item.status === 'active' // Only show for active items
  },
  {
    label: 'Delete',
    onClick: (item) => console.log('Delete', item),
    variant: 'danger',
    permission: ['delete_users', 'admin'] // Users with any of these permissions will see this action
  }
]
```

## Filtering

The library supports advanced filtering capabilities:

```typescript
filters: [
  {
    id: 'name_filter',
    label: 'Name',
    type: 'text',
    accessor: 'name',
    operators: ['contains', 'equals', 'startsWith', 'endsWith']
  },
  {
    id: 'status_filter',
    label: 'Status',
    type: 'select',
    accessor: 'status',
    operators: ['equals', 'in'],
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  },
  {
    id: 'created_date_filter',
    label: 'Created Date',
    type: 'date',
    accessor: 'createdAt',
    operators: ['equals', 'greaterThan', 'lessThan', 'between']
  }
]
```

## Sorting

You can enable sorting for columns by setting the `sortable` property to `true`. You can also set a default sort field and direction:

```typescript
{
  columns: [
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      type: 'text',
      sortable: true
    },
    // Other columns...
  ],
  defaultSortField: 'name',
  defaultSortDirection: 'asc'
}
```

## Bulk Editing

The library supports bulk editing of table data:

```typescript
features: {
  bulkEdit: true
},
bulkEditConfig: {
  editableFields: ['status', 'role'],
  saveAction: async (items) => {
    console.log('Saving items:', items);
    // Make API call to save changes
    await api.updateUsers(items);
  },
  cancelAction: () => {
    console.log('Bulk edit cancelled');
  }
}
```

## Complete Example

Here's a complete example of a user management table:

```tsx
import { DynamicTable, TableSchema } from 'react-dynamic-forms-tables';

function UserManagementTable() {
  const tableSchema: TableSchema = {
    columns: [
      {
        id: 'name',
        header: 'Name',
        accessor: 'name',
        type: 'text',
        sortable: true,
        filterable: true
      },
      {
        id: 'email',
        header: 'Email',
        accessor: 'email',
        type: 'text',
        sortable: true
      },
      {
        id: 'role',
        header: 'Role',
        accessor: 'role',
        type: 'text'
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        type: 'badge',
        badgeOptions: {
          active: {
            variant: 'success',
            label: 'Active'
          },
          inactive: {
            variant: 'danger',
            label: 'Inactive'
          },
          pending: {
            variant: 'warning',
            label: 'Pending'
          }
        }
      },
      {
        id: 'createdAt',
        header: 'Created',
        accessor: 'createdAt',
        type: 'date',
        sortable: true,
        format: (value) => new Date(value).toLocaleDateString()
      }
    ],
    filters: [
      {
        id: 'name_filter',
        label: 'Name',
        type: 'text',
        accessor: 'name',
        operators: ['contains', 'equals', 'startsWith']
      },
      {
        id: 'status_filter',
        label: 'Status',
        type: 'select',
        accessor: 'status',
        operators: ['equals'],
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' }
        ]
      }
    ],
    actions: [
      {
        label: 'Edit',
        onClick: (user) => console.log('Edit user:', user),
        variant: 'primary',
        permission: 'edit_users'
      },
      {
        label: 'Delete',
        onClick: (user) => console.log('Delete user:', user),
        variant: 'danger',
        permission: 'delete_users',
        showCondition: (user) => user.status !== 'pending'
      }
    ],
    keyField: 'id',
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
    features: {
      bulkEdit: true,
      pagination: true,
      exportData: true
    }
  };

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      createdAt: '2023-01-15T08:30:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      createdAt: '2023-02-20T10:15:00Z'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'User',
      status: 'inactive',
      createdAt: '2023-01-05T14:45:00Z'
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice@example.com',
      role: 'Editor',
      status: 'pending',
      createdAt: '2023-03-10T09:20:00Z'
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <DynamicTable schema={tableSchema} data={users} />
    </div>
  );
}

export default UserManagementTable;
```
