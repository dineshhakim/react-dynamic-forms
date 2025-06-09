# Examples

This page provides practical examples of using React Dynamic Forms & Tables in various scenarios.

## Basic Contact Form

A simple contact form with validation:

```tsx
import { useState } from 'react';
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';

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
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'Enter subject',
        validation: {
          required: 'Subject is required',
        },
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Enter your message',
        validation: {
          required: 'Message is required',
          minLength: {
            value: 10,
            message: 'Message must be at least 10 characters',
          },
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
      submitLabel: {
        create: 'Send Message',
        edit: 'Update Message',
      },
    },
  };

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsOpen(false);
    // Process form submission...
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Contact Us
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

## Product Management Table

A table for managing products with filtering and actions:

```tsx
import { DynamicTable, TableSchema } from 'react-dynamic-forms-tables';

function ProductTable() {
  const tableSchema: TableSchema = {
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
      },
      {
        id: 'price',
        header: 'Price',
        accessor: 'price',
        type: 'number',
        sortable: true,
        format: (value) => `$${value.toFixed(2)}`,
      },
      {
        id: 'stock',
        header: 'Stock',
        accessor: 'stock',
        type: 'number',
        sortable: true,
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        type: 'badge',
        badgeOptions: {
          inStock: {
            variant: 'success',
            label: 'In Stock',
          },
          lowStock: {
            variant: 'warning',
            label: 'Low Stock',
          },
          outOfStock: {
            variant: 'danger',
            label: 'Out of Stock',
          },
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
          { value: 'Electronics', label: 'Electronics' },
          { value: 'Clothing', label: 'Clothing' },
          { value: 'Home & Kitchen', label: 'Home & Kitchen' },
          { value: 'Books', label: 'Books' },
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
        id: 'status_filter',
        label: 'Status',
        type: 'select',
        accessor: 'status',
        operators: ['equals'],
        options: [
          { value: 'inStock', label: 'In Stock' },
          { value: 'lowStock', label: 'Low Stock' },
          { value: 'outOfStock', label: 'Out of Stock' },
        ],
      },
    ],
    actions: [
      {
        label: 'Edit',
        onClick: (product) => console.log('Edit product:', product),
        variant: 'primary',
        permission: 'edit_products',
      },
      {
        label: 'Delete',
        onClick: (product) => console.log('Delete product:', product),
        variant: 'danger',
        permission: 'delete_products',
      },
    ],
    keyField: 'id',
    defaultSortField: 'name',
    defaultSortDirection: 'asc',
  };

  const products = [
    {
      id: '1',
      name: 'Laptop Pro',
      category: 'Electronics',
      price: 1299.99,
      stock: 45,
      status: 'inStock',
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 199.99,
      stock: 78,
      status: 'inStock',
    },
    {
      id: '3',
      name: 'Cotton T-Shirt',
      category: 'Clothing',
      price: 24.99,
      stock: 5,
      status: 'lowStock',
    },
    {
      id: '4',
      name: 'Coffee Maker',
      category: 'Home & Kitchen',
      price: 89.99,
      stock: 0,
      status: 'outOfStock',
    },
    {
      id: '5',
      name: 'Programming Guide',
      category: 'Books',
      price: 49.99,
      stock: 12,
      status: 'inStock',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Inventory</h1>
      <DynamicTable schema={tableSchema} data={products} />
    </div>
  );
}

export default ProductTable;
```

## User Registration Form with Side Panel

A user registration form displayed in a side panel:

```tsx
import { useState } from 'react';
import { DynamicForm, FormSchema } from 'react-dynamic-forms-tables';

function UserRegistration() {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema: FormSchema = {
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        validation: {
          required: 'First name is required',
        },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        validation: {
          required: 'Last name is required',
        },
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
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
        validation: {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        },
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        validation: {
          required: 'Please confirm your password',
        },
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Administrator' },
        ],
        defaultValue: 'user',
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
      mode: 'sidepanel',
      width: 'max-w-md',
      title: {
        create: 'Register New User',
        edit: 'Edit User',
        view: 'User Details',
      },
      submitLabel: {
        create: 'Register',
        edit: 'Save Changes',
      },
    },
  };

  const handleSubmit = (data) => {
    // Validate that passwords match
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    console.log('Registration data:', data);
    setIsOpen(false);
    // Process registration...
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => setIsOpen(true)}
      >
        Register New User
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

export default UserRegistration;
```

## Event Management with Permissions

A complete example showing event management with permission-based controls:

```tsx
import { useState } from 'react';
import { 
  DynamicTable, 
  DynamicForm, 
  Button, 
  usePermissions, 
  TableSchema, 
  FormSchema 
} from 'react-dynamic-forms-tables';

function EventManagement() {
  const { hasPermission } = usePermissions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formMode, setFormMode] = useState('create');
  
  const events = [
    {
      id: '1',
      title: 'Annual Conference',
      date: '2023-10-15',
      location: 'Convention Center',
      organizer: 'Marketing Team',
      status: 'upcoming',
      attendees: 250,
    },
    {
      id: '2',
      title: 'Product Launch',
      date: '2023-11-05',
      location: 'Main Office',
      organizer: 'Product Team',
      status: 'upcoming',
      attendees: 100,
    },
    {
      id: '3',
      title: 'Team Building',
      date: '2023-09-10',
      location: 'City Park',
      organizer: 'HR Department',
      status: 'completed',
      attendees: 45,
    },
  ];
  
  const tableSchema: TableSchema = {
    columns: [
      {
        id: 'title',
        header: 'Event Title',
        accessor: 'title',
        type: 'text',
        sortable: true,
      },
      {
        id: 'date',
        header: 'Date',
        accessor: 'date',
        type: 'date',
        sortable: true,
      },
      {
        id: 'location',
        header: 'Location',
        accessor: 'location',
        type: 'text',
      },
      {
        id: 'organizer',
        header: 'Organizer',
        accessor: 'organizer',
        type: 'text',
      },
      {
        id: 'attendees',
        header: 'Attendees',
        accessor: 'attendees',
        type: 'number',
      },
      {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        type: 'badge',
        badgeOptions: {
          upcoming: {
            variant: 'info',
            label: 'Upcoming',
          },
          inProgress: {
            variant: 'warning',
            label: 'In Progress',
          },
          completed: {
            variant: 'success',
            label: 'Completed',
          },
          cancelled: {
            variant: 'danger',
            label: 'Cancelled',
          },
        },
      },
    ],
    filters: [
      {
        id: 'title_filter',
        label: 'Event Title',
        type: 'text',
        accessor: 'title',
        operators: ['contains', 'equals'],
      },
      {
        id: 'status_filter',
        label: 'Status',
        type: 'select',
        accessor: 'status',
        operators: ['equals'],
        options: [
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'inProgress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ],
    actions: [
      {
        label: 'View',
        onClick: (event) => {
          setSelectedEvent(event);
          setFormMode('view');
          setIsFormOpen(true);
        },
        variant: 'outline',
        permission: 'view_events',
      },
      {
        label: 'Edit',
        onClick: (event) => {
          setSelectedEvent(event);
          setFormMode('edit');
          setIsFormOpen(true);
        },
        variant: 'primary',
        permission: 'edit_events',
        showCondition: (event) => event.status !== 'completed',
      },
      {
        label: 'Cancel',
        onClick: (event) => {
          console.log('Cancel event:', event);
          // Show confirmation dialog and cancel
        },
        variant: 'danger',
        permission: 'cancel_events',
        showCondition: (event) => event.status === 'upcoming',
      },
    ],
    keyField: 'id',
    defaultSortField: 'date',
    defaultSortDirection: 'asc',
  };
  
  const formSchema: FormSchema = {
    fields: [
      {
        name: 'title',
        label: 'Event Title',
        type: 'text',
        validation: {
          required: 'Event title is required',
        },
      },
      {
        name: 'date',
        label: 'Date',
        type: 'date',
        validation: {
          required: 'Date is required',
        },
      },
      {
        name: 'location',
        label: 'Location',
        type: 'text',
        validation: {
          required: 'Location is required',
        },
      },
      {
        name: 'organizer',
        label: 'Organizer',
        type: 'text',
        validation: {
          required: 'Organizer is required',
        },
      },
      {
        name: 'attendees',
        label: 'Expected Attendees',
        type: 'number',
        validation: {
          required: 'Number of attendees is required',
          min: 1,
        },
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'inProgress', label: 'In Progress' },
          { value: 'completed', label: 'Completed' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
        validation: {
          required: 'Status is required',
        },
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter event description',
      },
    ],
    displayConfig: {
      mode: 'dialog',
      width: 'lg',
      title: {
        create: 'Create New Event',
        edit: 'Edit Event',
        view: 'Event Details',
      },
    },
  };
  
  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setFormMode('create');
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    // Save event data
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event Management</h1>
        
        {/* Only show create button if user has permission */}
        {hasPermission('create_events') && (
          <Button 
            variant="primary" 
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
        )}
      </div>
      
      <DynamicTable 
        schema={tableSchema} 
        data={events} 
      />
      
      <DynamicForm
        schema={formSchema}
        onSubmit={handleFormSubmit}
        mode={formMode}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={selectedEvent}
      />
    </div>
  );
}

export default EventManagement;
```

## Permission-Based Navigation

An example of a navigation menu with permission-based visibility:

```tsx
import { usePermissions } from 'react-dynamic-forms-tables';

function AppNavigation() {
  const { hasPermission } = usePermissions();
  
  const navItems = [
    { 
      label: 'Dashboard', 
      path: '/', 
      permission: null, // Always visible
      icon: 'HomeIcon'
    },
    { 
      label: 'Users', 
      path: '/users', 
      permission: 'view_users',
      icon: 'UsersIcon'
    },
    { 
      label: 'Products', 
      path: '/products', 
      permission: 'view_products',
      icon: 'ShoppingBagIcon'
    },
    { 
      label: 'Orders', 
      path: '/orders', 
      permission: 'view_orders',
      icon: 'ShoppingCartIcon'
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      permission: ['view_reports', 'admin'],
      icon: 'ChartBarIcon'
    },
    { 
      label: 'Settings', 
      path: '/settings', 
      permission: 'admin',
      icon: 'CogIcon'
    },
  ];
  
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-xl font-bold mb-8 pl-2">My Application</div>
      
      <ul className="space-y-2">
        {navItems.map((item) => {
          // If no permission is required, or user has the required permission
          if (!item.permission || hasPermission(item.permission)) {
            return (
              <li key={item.path}>
                <a 
                  href={item.path} 
                  className="flex items-center px-2 py-2 rounded hover:bg-gray-700"
                >
                  <span className="mr-3">{/* Icon would go here */}</span>
                  {item.label}
                </a>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
}

export default AppNavigation;
```
