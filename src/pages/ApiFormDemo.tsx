import React, { useState } from 'react';
import { apiFormExample } from '../schemas/apiFormExample';
import FormContainer from '../components/FormContainer';
import Button from '../components/ui/Button';
import { FormMode } from '../types/index';

const ApiFormDemo: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const handleOpenForm = (mode: FormMode) => {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">API-Powered Forms Demo</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Configure API Data Sources</h2>
        <p className="mb-4">
          Forms can fetch options for select fields from APIs. This is useful for dynamic data like countries, states, categories, etc.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 overflow-auto">
          <pre className="text-sm">
{`// In your form schema:
{
  name: 'country',
  label: 'Country',
  type: 'select',
  dataSource: {
    type: 'api',
    url: 'https://restcountries.com/v3.1/all',
    responseMapping: {
      value: 'cca2',
      label: 'name.common',
    },
  },
}

// For dependent fields:
{
  name: 'state',
  label: 'State/Province',
  type: 'select',
  dataSource: {
    type: 'api',
    url: 'https://api.example.com/states',
    dependsOn: 'country',  // This field depends on the country field
    responseMapping: {
      value: 'code',
      label: 'name',
    },
  },
}`}
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Simple API Integration</h3>
            <p className="text-sm text-gray-600">
              Fetch options from an API endpoint with a simple configuration. The system handles loading states and error handling.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Dependent Fields</h3>
            <p className="text-sm text-gray-600">
              Create cascading select fields where one field's options depend on another field's value (e.g., country → state).
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">Custom Response Mapping</h3>
            <p className="text-sm text-gray-600">
              Map API responses to option values and labels using dot notation for nested properties.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Demo Form with API Integration</h2>
        <p className="mb-6">
          This form demonstrates API integration with the Countries REST API. The Country field loads options from an API, and the State field would depend on the selected country (simulated).
        </p>
        
        <div className="space-y-2">
          <Button 
            onClick={() => handleOpenForm('create')}
            className="w-full md:w-auto"
          >
            Open Form (Create Mode)
          </Button>
          <Button 
            onClick={() => handleOpenForm('edit')}
            variant="secondary"
            className="w-full md:w-auto ml-0 md:ml-2"
          >
            Open Form (Edit Mode)
          </Button>
        </div>
      </div>
      
      {submittedData && (
        <div className="bg-white shadow rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Submitted Data</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
      
      {isFormOpen && (
        <FormContainer
          schema={apiFormExample}
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

export default ApiFormDemo;
