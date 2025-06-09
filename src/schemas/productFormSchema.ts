import { FormSchema } from '../types/index';

export const productFormSchema: FormSchema = {
  fields: [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter product name',
      validation: {
        required: 'Product name is required',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter product description',
      validation: {
        required: 'Description is required',
      },
    },
    {
      name: 'price',
      label: 'Price ($)',
      type: 'number',
      placeholder: 'Enter price',
      validation: {
        required: 'Price is required',
        min: 0,
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
        { value: 'home', label: 'Home & Kitchen' },
        { value: 'toys', label: 'Toys' },
      ],
      validation: {
        required: 'Category is required',
      },
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'releaseDate',
      label: 'Release Date',
      type: 'date',
      validation: {
        required: 'Release date is required',
      },
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'radio',
      options: [
        { value: 'new', label: 'New' },
        { value: 'used', label: 'Used' },
        { value: 'refurbished', label: 'Refurbished' },
      ],
      defaultValue: 'new',
    },
  ],
  displayConfig: {
    mode: 'sidepanel',
    width: 'max-w-lg',
    title: {
      create: 'Add New Product',
      edit: 'Edit Product',
      view: 'Product Details',
    },
    submitLabel: {
      create: 'Add Product',
      edit: 'Update Product',
    },
    cancelLabel: 'Close',
  },
};
