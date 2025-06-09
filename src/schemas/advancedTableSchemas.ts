import { TableSchema } from '../types/index';

export const advancedUsersTableSchema: TableSchema = {
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
      filterable: true,
    },
    {
      id: 'department',
      header: 'Department',
      accessor: 'department',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'salary',
      header: 'Salary',
      accessor: 'salary',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => value != null ? `$${value.toLocaleString()}` : '-',
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'badge',
      sortable: true,
      filterable: true,
      badgeOptions: {
        active: { variant: 'success', label: 'Active' },
        inactive: { variant: 'danger', label: 'Inactive' },
      },
    },
    {
      id: 'lastLogin',
      header: 'Last Login',
      accessor: 'lastLogin',
      type: 'date',
      sortable: true,
      filterable: true,
      format: (value) => {
        if (value == null) return '-';
        try {
          const date = new Date(value);
          return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
          return '-';
        }
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
    {
      id: 'department_filter',
      label: 'Department',
      type: 'select',
      accessor: 'department',
      operators: ['equals'],
      options: [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'HR', label: 'HR' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Product', label: 'Product' },
        { value: 'Finance', label: 'Finance' },
      ],
    },
    {
      id: 'salary_filter',
      label: 'Salary',
      type: 'number',
      accessor: 'salary',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
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
      ],
    },
    {
      id: 'lastLogin_filter',
      label: 'Last Login',
      type: 'date',
      accessor: 'lastLogin',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
  ],
  actions: [
    {
      label: 'View Profile',
      onClick: (user) => console.log('View profile', user),
      variant: 'outline',
    },
    {
      label: 'Edit',
      onClick: (user) => console.log('Edit user', user),
      variant: 'primary',
    },
    {
      label: 'Deactivate',
      onClick: (user) => console.log('Deactivate user', user),
      variant: 'danger',
      showCondition: (user) => user.status === 'active',
    },
    {
      label: 'Activate',
      onClick: (user) => console.log('Activate user', user),
      variant: 'success',
      showCondition: (user) => user.status === 'inactive',
    },
  ],
  keyField: 'id',
  defaultSortField: 'name',
  defaultSortDirection: 'asc',
};

export const ordersTableSchema: TableSchema = {
  columns: [
    {
      id: 'id',
      header: 'Order ID',
      accessor: 'id',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'customerName',
      header: 'Customer',
      accessor: 'customerName',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'orderDate',
      header: 'Order Date',
      accessor: 'orderDate',
      type: 'date',
      sortable: true,
      filterable: true,
      format: (value) => {
        if (value == null) return '-';
        try {
          return new Date(value).toLocaleDateString();
        } catch (e) {
          return '-';
        }
      },
    },
    {
      id: 'total',
      header: 'Total',
      accessor: 'total',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => value != null ? `$${value.toFixed(2)}` : '-',
    },
    {
      id: 'items',
      header: 'Items',
      accessor: 'items',
      type: 'number',
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'badge',
      sortable: true,
      filterable: true,
      badgeOptions: {
        completed: { variant: 'success', label: 'Completed' },
        processing: { variant: 'info', label: 'Processing' },
        shipped: { variant: 'warning', label: 'Shipped' },
        cancelled: { variant: 'danger', label: 'Cancelled' },
      },
    },
  ],
  filters: [
    {
      id: 'id_filter',
      label: 'Order ID',
      type: 'text',
      accessor: 'id',
      operators: ['contains', 'equals'],
    },
    {
      id: 'customer_filter',
      label: 'Customer',
      type: 'text',
      accessor: 'customerName',
      operators: ['contains', 'equals', 'startsWith'],
    },
    {
      id: 'date_filter',
      label: 'Order Date',
      type: 'date',
      accessor: 'orderDate',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
    {
      id: 'total_filter',
      label: 'Total',
      type: 'number',
      accessor: 'total',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
    {
      id: 'status_filter',
      label: 'Status',
      type: 'select',
      accessor: 'status',
      operators: ['equals'],
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
  ],
  actions: [
    {
      label: 'View Details',
      onClick: (order) => console.log('View order details', order),
      variant: 'outline',
    },
    {
      label: 'Track',
      onClick: (order) => console.log('Track order', order),
      variant: 'primary',
      showCondition: (order) => order.status === 'shipped' && order.trackingNumber,
    },
    {
      label: 'Cancel',
      onClick: (order) => console.log('Cancel order', order),
      variant: 'danger',
      showCondition: (order) => order.status === 'processing',
    },
  ],
  keyField: 'id',
  defaultSortField: 'orderDate',
  defaultSortDirection: 'desc',
};

export const tasksTableSchema: TableSchema = {
  columns: [
    {
      id: 'title',
      header: 'Task',
      accessor: 'title',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'assignee',
      header: 'Assignee',
      accessor: 'assignee',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      accessor: 'dueDate',
      type: 'date',
      sortable: true,
      filterable: true,
      format: (value) => {
        if (value == null) return '-';
        try {
          return new Date(value).toLocaleDateString();
        } catch (e) {
          return '-';
        }
      },
    },
    {
      id: 'priority',
      header: 'Priority',
      accessor: 'priority',
      type: 'badge',
      sortable: true,
      filterable: true,
      badgeOptions: {
        high: { variant: 'danger', label: 'High' },
        medium: { variant: 'warning', label: 'Medium' },
        low: { variant: 'info', label: 'Low' },
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'badge',
      sortable: true,
      filterable: true,
      badgeOptions: {
        completed: { variant: 'success', label: 'Completed' },
        in_progress: { variant: 'info', label: 'In Progress' },
        pending: { variant: 'warning', label: 'Pending' },
        not_started: { variant: 'default', label: 'Not Started' },
      },
    },
    {
      id: 'completion',
      header: 'Progress',
      accessor: 'completion',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => value != null ? `${value}% complete` : '-',
    },
  ],
  filters: [
    {
      id: 'title_filter',
      label: 'Task',
      type: 'text',
      accessor: 'title',
      operators: ['contains', 'equals'],
    },
    {
      id: 'assignee_filter',
      label: 'Assignee',
      type: 'text',
      accessor: 'assignee',
      operators: ['contains', 'equals'],
    },
    {
      id: 'dueDate_filter',
      label: 'Due Date',
      type: 'date',
      accessor: 'dueDate',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
    {
      id: 'priority_filter',
      label: 'Priority',
      type: 'select',
      accessor: 'priority',
      operators: ['equals'],
      options: [
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' },
      ],
    },
    {
      id: 'status_filter',
      label: 'Status',
      type: 'select',
      accessor: 'status',
      operators: ['equals'],
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'pending', label: 'Pending' },
        { value: 'not_started', label: 'Not Started' },
      ],
    },
    {
      id: 'completion_filter',
      label: 'Progress',
      type: 'number',
      accessor: 'completion',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
  ],
  actions: [
    {
      label: 'Edit',
      onClick: (task) => console.log('Edit task', task),
      variant: 'outline',
    },
    {
      label: 'Complete',
      onClick: (task) => console.log('Complete task', task),
      variant: 'success',
      showCondition: (task) => task.status !== 'completed',
    },
    {
      label: 'Delete',
      onClick: (task) => console.log('Delete task', task),
      variant: 'danger',
    },
  ],
  keyField: 'id',
  defaultSortField: 'dueDate',
  defaultSortDirection: 'asc',
};
