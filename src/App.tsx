import { useState } from 'react';
import UserTable from './components/UserTable';
import DynamicForm from './components/DynamicForm';
import Modal from './components/ui/Modal';
import { User, FormMode } from './types/index';
import { userFormSchema } from './schemas/userFormSchema';
import { productFormSchema } from './schemas/productFormSchema';
import { v4 as uuidv4 } from 'uuid';
import Button from './components/ui/Button';

// Mock data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2025-02-20T14:15:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'editor',
    status: 'inactive',
    createdAt: '2025-03-10T09:45:00Z',
  },
];

type FormType = 'user' | 'product';

function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFormType, setActiveFormType] = useState<FormType>('user');

  const handleCreateUser = () => {
    setCurrentUser(undefined);
    setFormMode('create');
    setActiveFormType('user');
    setIsModalOpen(true);
  };

  const handleCreateProduct = () => {
    setCurrentUser(undefined);
    setFormMode('create');
    setActiveFormType('product');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setFormMode('edit');
    setActiveFormType('user');
    setIsModalOpen(true);
  };

  const handleViewUser = (user: User) => {
    setCurrentUser(user);
    setFormMode('view');
    setActiveFormType('user');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== user.id));
    }
  };

  const handleSubmit = (data: Record<string, any>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeFormType === 'user') {
        if (formMode === 'create') {
          const newUser: User = {
            id: uuidv4(),
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            createdAt: new Date().toISOString(),
          };
          setUsers([...users, newUser]);
        } else if (formMode === 'edit' && currentUser) {
          setUsers(
            users.map((user) =>
              user.id === currentUser.id
                ? { 
                    ...user, 
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: data.status,
                  }
                : user
            )
          );
        }
      } else if (activeFormType === 'product') {
        // Handle product form submission
        console.log('Product form submitted:', data);
        // In a real app, you would save this to your products state
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 500);
  };

  const getModalTitle = () => {
    const actionText = formMode === 'create' ? 'Create New' : formMode === 'edit' ? 'Edit' : 'View';
    const entityText = activeFormType === 'user' ? 'User' : 'Product';
    return `${actionText} ${entityText}`;
  };

  const getFormSchema = () => {
    return activeFormType === 'user' ? userFormSchema : productFormSchema;
  };

  const getDefaultValues = () => {
    if (activeFormType === 'user' && currentUser) {
      return {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        status: currentUser.status,
      };
    }
    return {};
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Dynamic Forms Demo</h1>
      
      <div className="flex space-x-4 mb-6">
        <Button onClick={handleCreateUser}>
          Create User
        </Button>
        <Button variant="secondary" onClick={handleCreateProduct}>
          Create Product
        </Button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onView={handleViewUser}
          onDelete={handleDeleteUser}
          onCreateNew={handleCreateUser}
        />
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
        size="lg"
      >
        <DynamicForm
          schema={getFormSchema()}
          defaultValues={getDefaultValues()}
          mode={formMode}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default App;
