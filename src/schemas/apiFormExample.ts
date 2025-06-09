import { FormSchema } from '../types/index';

export const apiFormExample: FormSchema = {
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
      name: 'country',
      label: 'Country',
      type: 'select',
      placeholder: 'Select country',
      dataSource: {
        type: 'api',
        url: 'https://restcountries.com/v3.1/all',
        responseMapping: {
          value: 'cca2',
          label: 'name.common',
        },
      },
      validation: {
        required: 'Country is required',
      },
    },
    {
      name: 'state',
      label: 'State/Province',
      type: 'select',
      placeholder: 'Select state',
      dataSource: {
        type: 'api',
        url: 'https://api.example.com/states',
        dependsOn: 'country', // This field depends on the country field
        responseMapping: {
          value: 'code',
          label: 'name',
        },
      },
      helperText: 'Select a country first',
    },
    {
      name: 'interests',
      label: 'Interests',
      type: 'select',
      placeholder: 'Select interests',
      dataSource: {
        type: 'api',
        url: 'https://api.example.com/interests',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        responseMapping: {
          value: 'id',
          label: 'name',
        },
      },
      helperText: 'Select your areas of interest',
    },
    {
      name: 'comments',
      label: 'Comments',
      type: 'textarea',
      placeholder: 'Enter any additional comments',
    },
  ],
  displayConfig: {
    mode: 'dialog',
    width: 'lg',
    title: {
      create: 'Create Profile with API Data',
      edit: 'Edit Profile',
      view: 'Profile Details',
    },
    submitLabel: {
      create: 'Create Profile',
      edit: 'Save Changes',
    },
    cancelLabel: 'Cancel',
  },
};
