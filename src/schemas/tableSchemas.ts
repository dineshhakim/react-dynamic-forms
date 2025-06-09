import { TableSchema } from '../types/index';

export const usersTableSchema: TableSchema = {
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
      id: 'role',
      header: 'Role',
      accessor: 'role',
      type: 'text',
      sortable: true,
      filterable: true,
      className: 'capitalize',
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      type: 'badge',
      sortable: true,
      filterable: true,
      badgeOptions: {
        active: { variant: 'success' },
        inactive: { variant: 'danger' },
      },
    },
    {
      id: 'createdAt',
      header: 'Created At',
      accessor: 'createdAt',
      type: 'date',
      sortable: true,
      filterable: true,
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
      id: 'email_filter',
      label: 'Email',
      type: 'text',
      accessor: 'email',
      operators: ['contains', 'equals', 'endsWith'],
    },
    {
      id: 'role_filter',
      label: 'Role',
      type: 'select',
      accessor: 'role',
      operators: ['equals', 'in'],
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'editor', label: 'Editor' },
      ],
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
      id: 'created_filter',
      label: 'Created Date',
      type: 'date',
      accessor: 'createdAt',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
  ],
  actions: [
    {
      label: 'View',
      onClick: (user) => console.log('View user', user),
      variant: 'outline',
    },
    {
      label: 'Edit',
      onClick: (user) => console.log('Edit user', user),
      variant: 'primary',
    },
    {
      label: 'Delete',
      onClick: (user) => console.log('Delete user', user),
      variant: 'danger',
      showCondition: (user) => user.status !== 'inactive',
    },
  ],
  keyField: 'id',
  defaultSortField: 'name',
  defaultSortDirection: 'asc',
};

export const productsTableSchema: TableSchema = {
  columns: [
    {
      id: 'name',
      header: 'Product Name',
      accessor: 'name',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'category',
      header: 'Category',
      accessor: 'category',
      type: 'text',
      sortable: true,
      filterable: true,
    },
    {
      id: 'price',
      header: 'Price',
      accessor: 'price',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => value != null ? `$${value.toFixed(2)}` : '-',
    },
    {
      id: 'stock',
      header: 'In Stock',
      accessor: 'inStock',
      type: 'boolean',
      sortable: true,
      filterable: true,
    },
    {
      id: 'rating',
      header: 'Rating',
      accessor: 'rating',
      type: 'number',
      sortable: true,
      filterable: true,
      format: (value) => {
        if (value == null) return '-';
        const stars = '★'.repeat(Math.floor(value));
        const emptyStars = '☆'.repeat(5 - Math.floor(value));
        return `${stars}${emptyStars} (${value})`;
      },
    },
  ],
  filters: [
    {
      id: 'name_filter',
      label: 'Product Name',
      type: 'text',
      accessor: 'name',
      operators: ['contains', 'equals', 'startsWith'],
    },
    {
      id: 'category_filter',
      label: 'Category',
      type: 'select',
      accessor: 'category',
      operators: ['equals'],
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
        { value: 'home', label: 'Home & Kitchen' },
        { value: 'toys', label: 'Toys' },
      ],
    },
    {
      id: 'price_filter',
      label: 'Price',
      type: 'number',
      accessor: 'price',
      operators: ['equals', 'greaterThan', 'lessThan', 'between'],
    },
    {
      id: 'stock_filter',
      label: 'In Stock',
      type: 'checkbox',
      accessor: 'inStock',
      operators: ['equals'],
    },
    {
      id: 'rating_filter',
      label: 'Rating',
      type: 'number',
      accessor: 'rating',
      operators: ['equals', 'greaterThan', 'lessThan'],
    },
  ],
  actions: [
    {
      label: 'View',
      onClick: (product) => console.log('View product', product),
      variant: 'outline',
    },
    {
      label: 'Edit',
      onClick: (product) => console.log('Edit product', product),
      variant: 'primary',
    },
    {
      label: 'Delete',
      onClick: (product) => console.log('Delete product', product),
      variant: 'danger',
    },
  ],
  keyField: 'id',
  defaultSortField: 'name',
  defaultSortDirection: 'asc',
};
