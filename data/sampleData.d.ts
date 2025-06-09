export declare const users: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    department: string;
    salary: number;
    location: string;
    lastLogin: string;
}[];
export declare const products: {
    id: string;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    rating: number;
    description: string;
    manufacturer: string;
    releaseDate: string;
    discount: number;
    tags: string[];
}[];
export declare const orders: ({
    id: string;
    customerName: string;
    orderDate: string;
    status: string;
    total: number;
    items: number;
    shippingAddress: string;
    paymentMethod: string;
    trackingNumber: string;
} | {
    id: string;
    customerName: string;
    orderDate: string;
    status: string;
    total: number;
    items: number;
    shippingAddress: string;
    paymentMethod: string;
    trackingNumber: null;
})[];
export declare const events: {
    id: string;
    title: string;
    date: string;
    location: string;
    category: string;
    attendees: number;
    price: number;
    featured: boolean;
    status: string;
    organizer: string;
}[];
export declare const tasks: {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
    priority: string;
    status: string;
    completion: number;
    category: string;
    tags: string[];
}[];
