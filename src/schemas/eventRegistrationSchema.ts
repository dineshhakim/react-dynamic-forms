import { FormSchema } from '../types/index';

export const eventRegistrationSchema: FormSchema = {
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      validation: {
        required: 'Name is required',
      },
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        required: 'Email is required',
      },
    },
    {
      name: 'eventDate',
      label: 'Event Date',
      type: 'date',
      required: true,
      validation: {
        required: 'Event date is required',
      },
    },
    {
      name: 'ticketType',
      label: 'Ticket Type',
      type: 'radio',
      options: [
        { value: 'standard', label: 'Standard ($50)' },
        { value: 'premium', label: 'Premium ($100)' },
        { value: 'vip', label: 'VIP ($200)' },
      ],
      required: true,
      validation: {
        required: 'Please select a ticket type',
      },
    },
    {
      name: 'quantity',
      label: 'Number of Tickets',
      type: 'number',
      placeholder: 'Enter number of tickets',
      required: true,
      validation: {
        required: 'Quantity is required',
        min: 1,
        max: 10,
      },
      helperText: 'Maximum 10 tickets per order',
    },
    {
      name: 'dietaryRestrictions',
      label: 'Dietary Restrictions',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'glutenFree', label: 'Gluten Free' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'specialRequests',
      label: 'Special Requests',
      type: 'textarea',
      placeholder: 'Enter any special requests or accommodations',
    },
    {
      name: 'agreeTerms',
      label: 'I agree to the terms and conditions',
      type: 'checkbox',
      required: true,
      validation: {
        required: 'You must agree to the terms and conditions',
      },
    },
  ],
  displayConfig: {
    mode: 'page',
    title: {
      create: 'Event Registration',
      edit: 'Update Registration',
      view: 'Registration Details',
    },
    submitLabel: {
      create: 'Complete Registration',
      edit: 'Update Registration',
    },
    cancelLabel: 'Back',
    redirectAfterSubmit: true,
    redirectPath: '/registration-confirmation',
  },
};
