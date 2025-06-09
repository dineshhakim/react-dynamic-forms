export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export type FormMode = 'create' | 'edit' | 'view';

export type FormDisplayMode = 'dialog' | 'sidepanel' | 'page';

export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'radio'
  | 'date';

export interface SelectOption {
  value: string;
  label: string;
}

export interface ApiDataSource {
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

export interface FormField {
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

export interface FormSchema {
  fields: FormField[];
  displayConfig?: {
    mode: FormDisplayMode;
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

// Table types
export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'actions';

export type FilterOperator = 
  | 'equals' 
  | 'contains' 
  | 'startsWith' 
  | 'endsWith' 
  | 'greaterThan' 
  | 'lessThan' 
  | 'between'
  | 'in';

export interface TableColumn {
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

export interface TableAction {
  label: string;
  icon?: string;
  onClick: (item: any) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
  showCondition?: (item: any) => boolean;
  permission?: string | string[]; // Single permission or array of permissions required
}

export interface TableFilter {
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

export interface TableSchema {
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

export interface FilterValue {
  filterId: string;
  operator: FilterOperator;
  value: any;
  secondValue?: any; // For 'between' operator
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

// Permission context types
export interface PermissionContextType {
  hasPermission: (permission: string | string[]) => boolean;
  userPermissions: string[];
}

export interface PermissionProviderProps {
  children: React.ReactNode;
  permissions?: string[];
}
