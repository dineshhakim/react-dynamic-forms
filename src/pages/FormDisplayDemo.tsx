import React, { useState } from 'react';
import { userFormSchema } from '../schemas/userFormSchema';
import { productFormSchema } from '../schemas/productFormSchema';
import { eventRegistrationSchema } from '../schemas/eventRegistrationSchema';
import FormContainer from '../components/FormContainer';
import Button from '../components/ui/Button';
import { FormMode } from '../types/index';

const FormDisplayDemo: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'user' | 'product' | 'event' | null>(null);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleOpenForm = (form: 'user' | 'product' | 'event', mode: FormMode) => {
    setActiveForm(form);
    setFormMode(mode);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (data: Record<string, any>) => {
    setSubmittedData(data);
    setIsFormOpen(false);
    console.log('Form submitted:', data);
  };

  const getFormSchema = () => {
    switch (activeForm) {
      case 'user':
        return userFormSchema;
      case 'product':
        return productFormSchema;
      case 'event':
        return eventRegistrationSchema;
      default:
        return userFormSchema;
    }
  };

  const getFormTitle = (form: 'user' | 'product' | 'event') => {
    switch (form) {
      case 'user':
        return 'User Form (Dialog)';
      case 'product':
        return 'Product Form (Side Panel)';
      case 'event':
        return 'Event Registration (Page)';
      default:
        return '';
    }
  };

  const getFormDescription = (form: 'user' | 'product' | 'event') => {
    switch (form) {
      case 'user':
        return 'This form uses a modal dialog display mode. It appears in the center of the screen.';
      case 'product':
        return 'This form uses a side panel display mode. It slides in from the right side of the screen.';
      case 'event':
        return 'This form uses a full page display mode. It replaces the current page content.';
      default:
        return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Form Display Modes</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Configure Form Display Modes</h2>
        <p className="mb-4">
          Forms can be displayed in three different modes: dialog, side panel, or full page. 
          You can configure the display mode in the form schema:
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 overflow-auto">
          <pre className="text-sm">
{`// In your form schema:
{
  fields: [...],
  displayConfig: {
    mode: 'dialog',  // or 'sidepanel' or 'page'
    width: 'lg',     // size for dialogs or width for side panels
    title: {
      create: 'Create New Item',
      edit: 'Edit Item',
      view: 'View Item Details',
    },
    submitLabel: {
      create: 'Create',
      edit: 'Save Changes',
    },
    cancelLabel: 'Cancel',
    // For page mode only:
    redirectAfterSubmit: true,
    redirectPath: '/confirmation',
  }
}`}
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Dialog Mode</h3>
            <p className="text-sm text-gray-600 mb-2">
              Best for: Simple forms, quick interactions, maintaining context
            </p>
            <p className="text-sm text-gray-600">
              Configure with: <code className="bg-gray-100 px-1 py-0.5 rounded">mode: 'dialog'</code>
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Side Panel Mode</h3>
            <p className="text-sm text-gray-600 mb-2">
              Best for: Medium complexity forms, maintaining page context
            </p>
            <p className="text-sm text-gray-600">
              Configure with: <code className="bg-gray-100 px-1 py-0.5 rounded">mode: 'sidepanel'</code>
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Page Mode</h3>
            <p className="text-sm text-gray-600 mb-2">
              Best for: Complex forms, multi-step processes, full focus
            </p>
            <p className="text-sm text-gray-600">
              Configure with: <code className="bg-gray-100 px-1 py-0.5 rounded">mode: 'page'</code>
            </p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Demo Examples</h2>
      <p className="mb-6">
        Click the buttons below to see each display mode in action. Each example demonstrates a different form configuration.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {(['user', 'product', 'event'] as const).map((form) => (
          <div key={form} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{getFormTitle(form)}</h2>
            <p className="text-gray-600 mb-4">{getFormDescription(form)}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => handleOpenForm(form, 'create')}
                className="w-full"
              >
                Create Mode
              </Button>
              <Button 
                onClick={() => handleOpenForm(form, 'edit')}
                variant="secondary"
                className="w-full"
              >
                Edit Mode
              </Button>
              <Button 
                onClick={() => handleOpenForm(form, 'view')}
                variant="outline"
                className="w-full"
              >
                View Mode
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {submittedData && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Last Submitted Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
      
      {activeForm && isFormOpen && (
        <FormContainer
          schema={getFormSchema()}
          mode={formMode}
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          defaultValues={{}}
          isSubmitting={false}
        />
      )}
    </div>
  );
};

export default FormDisplayDemo;
