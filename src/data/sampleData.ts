// Sample data for tables

export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
    department: 'Engineering',
    salary: 85000,
    location: 'New York',
    lastLogin: '2025-06-01T08:45:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-02-20T14:15:00Z',
    department: 'Marketing',
    salary: 72000,
    location: 'San Francisco',
    lastLogin: '2025-06-05T11:20:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'editor',
    status: 'inactive',
    createdAt: '2025-03-10T09:45:00Z',
    department: 'HR',
    salary: 65000,
    location: 'Chicago',
    lastLogin: '2025-05-28T16:30:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-03-15T11:20:00Z',
    department: 'Sales',
    salary: 78000,
    location: 'Boston',
    lastLogin: '2025-06-07T09:15:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'admin',
    status: 'inactive',
    createdAt: '2025-04-05T16:30:00Z',
    department: 'Engineering',
    salary: 92000,
    location: 'Seattle',
    lastLogin: '2025-05-20T14:45:00Z',
  },
  {
    id: '6',
    name: 'Diana Miller',
    email: 'diana@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-04-12T13:45:00Z',
    department: 'Product',
    salary: 81000,
    location: 'Austin',
    lastLogin: '2025-06-06T10:30:00Z',
  },
  {
    id: '7',
    name: 'Edward Davis',
    email: 'edward@example.com',
    role: 'editor',
    status: 'active',
    createdAt: '2025-04-25T09:15:00Z',
    department: 'Marketing',
    salary: 68000,
    location: 'Denver',
    lastLogin: '2025-06-04T15:20:00Z',
  },
  {
    id: '8',
    name: 'Fiona Clark',
    email: 'fiona@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-05-03T14:30:00Z',
    department: 'Finance',
    salary: 89000,
    location: 'Miami',
    lastLogin: '2025-06-02T11:45:00Z',
  },
];

export const products = [
  {
    id: '1',
    name: 'Smartphone X',
    category: 'electronics',
    price: 999.99,
    inStock: true,
    rating: 4.5,
    description: 'Latest smartphone with advanced features',
    manufacturer: 'TechCorp',
    releaseDate: '2025-01-10',
    discount: 0,
    tags: ['smartphone', 'tech', 'new'],
  },
  {
    id: '2',
    name: 'Designer T-Shirt',
    category: 'clothing',
    price: 49.99,
    inStock: true,
    rating: 4.0,
    description: 'Premium cotton t-shirt with designer print',
    manufacturer: 'FashionBrand',
    releaseDate: '2025-02-15',
    discount: 10,
    tags: ['clothing', 'fashion', 'summer'],
  },
  {
    id: '3',
    name: 'Coffee Table Book',
    category: 'books',
    price: 29.99,
    inStock: false,
    rating: 3.5,
    description: 'Beautiful photography book for your coffee table',
    manufacturer: 'PublishCo',
    releaseDate: '2025-03-05',
    discount: 0,
    tags: ['book', 'photography', 'art'],
  },
  {
    id: '4',
    name: 'Kitchen Blender',
    category: 'home',
    price: 79.99,
    inStock: true,
    rating: 4.8,
    description: 'High-powered blender for all your kitchen needs',
    manufacturer: 'HomeGoods',
    releaseDate: '2025-01-25',
    discount: 15,
    tags: ['kitchen', 'appliance', 'cooking'],
  },
  {
    id: '5',
    name: 'Building Blocks Set',
    category: 'toys',
    price: 24.99,
    inStock: true,
    rating: 4.2,
    description: 'Creative building blocks for children',
    manufacturer: 'ToyMakers',
    releaseDate: '2025-04-10',
    discount: 0,
    tags: ['toys', 'children', 'educational'],
  },
  {
    id: '6',
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 149.99,
    inStock: true,
    rating: 4.6,
    description: 'Noise-cancelling wireless headphones',
    manufacturer: 'AudioTech',
    releaseDate: '2025-02-28',
    discount: 5,
    tags: ['audio', 'wireless', 'music'],
  },
  {
    id: '7',
    name: 'Yoga Mat',
    category: 'fitness',
    price: 35.99,
    inStock: true,
    rating: 4.3,
    description: 'Non-slip yoga mat for exercise',
    manufacturer: 'FitLife',
    releaseDate: '2025-03-15',
    discount: 0,
    tags: ['fitness', 'yoga', 'exercise'],
  },
  {
    id: '8',
    name: 'Desk Lamp',
    category: 'home',
    price: 45.99,
    inStock: false,
    rating: 3.9,
    description: 'Adjustable LED desk lamp',
    manufacturer: 'LightCo',
    releaseDate: '2025-01-05',
    discount: 20,
    tags: ['lighting', 'home', 'office'],
  },
];

export const orders = [
  {
    id: '1001',
    customerName: 'John Doe',
    orderDate: '2025-05-15T10:30:00Z',
    status: 'completed',
    total: 1049.98,
    items: 2,
    shippingAddress: '123 Main St, New York, NY',
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK123456789',
  },
  {
    id: '1002',
    customerName: 'Jane Smith',
    orderDate: '2025-05-20T14:15:00Z',
    status: 'processing',
    total: 79.99,
    items: 1,
    shippingAddress: '456 Oak Ave, San Francisco, CA',
    paymentMethod: 'paypal',
    trackingNumber: null,
  },
  {
    id: '1003',
    customerName: 'Bob Johnson',
    orderDate: '2025-05-22T09:45:00Z',
    status: 'shipped',
    total: 185.97,
    items: 3,
    shippingAddress: '789 Pine Rd, Chicago, IL',
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK987654321',
  },
  {
    id: '1004',
    customerName: 'Alice Williams',
    orderDate: '2025-05-25T11:20:00Z',
    status: 'cancelled',
    total: 24.99,
    items: 1,
    shippingAddress: '101 Maple Dr, Boston, MA',
    paymentMethod: 'paypal',
    trackingNumber: null,
  },
  {
    id: '1005',
    customerName: 'Charlie Brown',
    orderDate: '2025-06-01T16:30:00Z',
    status: 'processing',
    total: 195.98,
    items: 2,
    shippingAddress: '202 Cedar Ln, Seattle, WA',
    paymentMethod: 'credit_card',
    trackingNumber: null,
  },
  {
    id: '1006',
    customerName: 'Diana Miller',
    orderDate: '2025-06-03T13:45:00Z',
    status: 'shipped',
    total: 149.99,
    items: 1,
    shippingAddress: '303 Birch Blvd, Austin, TX',
    paymentMethod: 'credit_card',
    trackingNumber: 'TRK456789123',
  },
];

export const events = [
  {
    id: '2001',
    title: 'Annual Tech Conference',
    date: '2025-07-15',
    location: 'San Francisco Convention Center',
    category: 'conference',
    attendees: 1200,
    price: 499.99,
    featured: true,
    status: 'upcoming',
    organizer: 'TechEvents Inc.',
  },
  {
    id: '2002',
    title: 'Music Festival',
    date: '2025-08-10',
    location: 'Central Park, New York',
    category: 'entertainment',
    attendees: 5000,
    price: 150.00,
    featured: true,
    status: 'upcoming',
    organizer: 'MusicFest Productions',
  },
  {
    id: '2003',
    title: 'Marketing Workshop',
    date: '2025-06-25',
    location: 'Business Center, Chicago',
    category: 'workshop',
    attendees: 75,
    price: 299.99,
    featured: false,
    status: 'upcoming',
    organizer: 'Marketing Pros',
  },
  {
    id: '2004',
    title: 'Charity Gala',
    date: '2025-09-05',
    location: 'Grand Hotel, Miami',
    category: 'charity',
    attendees: 350,
    price: 200.00,
    featured: false,
    status: 'upcoming',
    organizer: 'Helping Hands Foundation',
  },
  {
    id: '2005',
    title: 'Product Launch',
    date: '2025-07-01',
    location: 'Tech Hub, Seattle',
    category: 'business',
    attendees: 200,
    price: 0.00,
    featured: true,
    status: 'upcoming',
    organizer: 'InnovateCorp',
  },
];

export const tasks = [
  {
    id: '3001',
    title: 'Complete project proposal',
    assignee: 'John Doe',
    dueDate: '2025-06-15',
    priority: 'high',
    status: 'in_progress',
    completion: 75,
    category: 'planning',
    tags: ['proposal', 'deadline'],
  },
  {
    id: '3002',
    title: 'Review code changes',
    assignee: 'Jane Smith',
    dueDate: '2025-06-10',
    priority: 'medium',
    status: 'pending',
    completion: 0,
    category: 'development',
    tags: ['code', 'review'],
  },
  {
    id: '3003',
    title: 'Update documentation',
    assignee: 'Bob Johnson',
    dueDate: '2025-06-20',
    priority: 'low',
    status: 'completed',
    completion: 100,
    category: 'documentation',
    tags: ['docs', 'update'],
  },
  {
    id: '3004',
    title: 'Fix login bug',
    assignee: 'Alice Williams',
    dueDate: '2025-06-12',
    priority: 'high',
    status: 'in_progress',
    completion: 50,
    category: 'development',
    tags: ['bug', 'critical'],
  },
  {
    id: '3005',
    title: 'Prepare client presentation',
    assignee: 'Charlie Brown',
    dueDate: '2025-06-18',
    priority: 'medium',
    status: 'not_started',
    completion: 0,
    category: 'client',
    tags: ['presentation', 'meeting'],
  },
];
