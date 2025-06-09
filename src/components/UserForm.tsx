import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { User, FormMode } from '../types/index';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  status: z.enum(['active', 'inactive']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: User;
  mode: FormMode;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  mode,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        }
      : {
          status: 'active',
        },
  });

  const isViewMode = mode === 'view';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name')}
        error={errors.name?.message}
        disabled={isViewMode}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        disabled={isViewMode}
      />

      <Select
        label="Role"
        {...register('role')}
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
          { value: 'editor', label: 'Editor' },
        ]}
        error={errors.role?.message}
        disabled={isViewMode}
      />

      <Select
        label="Status"
        {...register('status')}
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
        error={errors.status?.message}
        disabled={isViewMode}
      />

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        
        {!isViewMode && (
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
