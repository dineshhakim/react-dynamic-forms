import { FormSchema } from '../types/index';

export const userFormSchema: FormSchema = {
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter full name',
      validation: {
        required: 'Name is required',
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'editor', label: 'Editor' },
      ],
      validation: {
        required: 'Role is required',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Enter a short bio',
      helperText: 'Optional: Tell us about yourself',
    },
    {
      name: 'receiveNotifications',
      label: 'Receive email notifications',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  displayConfig: {
    mode: 'dialog',
    width: 'lg',
    title: {
      create: 'Create New User',
      edit: 'Edit User Profile',
      view: 'User Details',
    },
    submitLabel: {
      create: 'Create User',
      edit: 'Save Changes',
    },
    cancelLabel: 'Cancel',
  },
};
