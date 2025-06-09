import { FormSchema } from '../types/index';

export const contactFormSchema: FormSchema = {
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      validation: {
        required: 'Full name is required',
        minLength: 2,
        maxLength: 100,
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
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: '(123) 456-7890',
      helperText: 'Optional: We\'ll only call if there\'s an issue',
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing Question' },
        { value: 'feedback', label: 'Feedback' },
      ],
      required: true,
      validation: {
        required: 'Please select a subject',
      },
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Enter your message here',
      required: true,
      validation: {
        required: 'Message is required',
        minLength: 10,
      },
      helperText: 'Please provide as much detail as possible',
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'radio',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ],
      defaultValue: 'medium',
    },
    {
      name: 'subscribe',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export const jobApplicationSchema: FormSchema = {
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
      required: true,
      validation: {
        required: 'First name is required',
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter your last name',
      required: true,
      validation: {
        required: 'Last name is required',
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
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Enter your phone number',
      required: true,
      validation: {
        required: 'Phone number is required',
      },
    },
    {
      name: 'position',
      label: 'Position Applied For',
      type: 'select',
      options: [
        { value: 'developer', label: 'Software Developer' },
        { value: 'designer', label: 'UI/UX Designer' },
        { value: 'manager', label: 'Project Manager' },
        { value: 'qa', label: 'QA Engineer' },
      ],
      required: true,
      validation: {
        required: 'Please select a position',
      },
    },
    {
      name: 'experience',
      label: 'Years of Experience',
      type: 'number',
      placeholder: 'Enter years of experience',
      required: true,
      validation: {
        required: 'Experience is required',
        min: 0,
      },
    },
    {
      name: 'startDate',
      label: 'Available Start Date',
      type: 'date',
      required: true,
      validation: {
        required: 'Start date is required',
      },
    },
    {
      name: 'education',
      label: 'Highest Education Level',
      type: 'select',
      options: [
        { value: 'highschool', label: 'High School' },
        { value: 'associate', label: 'Associate Degree' },
        { value: 'bachelor', label: 'Bachelor\'s Degree' },
        { value: 'master', label: 'Master\'s Degree' },
        { value: 'phd', label: 'PhD' },
      ],
    },
    {
      name: 'coverLetter',
      label: 'Cover Letter',
      type: 'textarea',
      placeholder: 'Tell us why you\'re a good fit for this position',
      required: true,
      validation: {
        required: 'Cover letter is required',
        minLength: 50,
      },
    },
    {
      name: 'relocate',
      label: 'Willing to relocate',
      type: 'checkbox',
    },
  ],
};

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
};

export const sampleForms = [
  {
    id: 'contact-form',
    name: 'Contact Form',
    schema: contactFormSchema,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'job-application',
    name: 'Job Application',
    schema: jobApplicationSchema,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'event-registration',
    name: 'Event Registration',
    schema: eventRegistrationSchema,
    createdAt: new Date().toISOString(),
  },
];
