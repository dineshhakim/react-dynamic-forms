import { TableSchema } from '../types/index';

export const tasksWithBulkEditSchema: TableSchema = {
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
      id: 'dueDate',
      header: 'Due Date',
      accessor: 'dueDate',
      type: 'date',
      sortable: true,
      filterable: true,
    },
    {
      id: 'completion',
      header: 'Progress',
      accessor: 'completion',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => value != null ? `${value}%` : '-',
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
  ],
  actions: [
    {
      label: 'Edit',
      onClick: (task) => console.log('Edit task', task),
      variant: 'outline',
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
  features: {
    bulkEdit: true,
    reordering: true,
    pagination: true,
    exportData: true,
  },
  bulkEditConfig: {
    editableFields: ['assignee', 'priority', 'status', 'dueDate', 'completion'],
    saveAction: async (items) => {
      console.log('Saving bulk edited items:', items);
      // In a real app, you would make an API call here
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
  },
};
