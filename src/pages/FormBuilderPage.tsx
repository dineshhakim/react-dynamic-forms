import React, { useState, useEffect } from 'react';
import FormBuilder from '../components/FormBuilder';
import DynamicForm from '../components/DynamicForm';
import { FormSchema } from '../types/index';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { sampleForms } from '../schemas/sampleForms';

const STORAGE_KEY = 'savedForms';

interface SavedForm {
  id: string;
  name: string;
  schema: FormSchema;
  createdAt: string;
}

const FormBuilderPage: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [formName, setFormName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showSavedFormsModal, setShowSavedFormsModal] = useState(false);
  const [showSampleFormsModal, setShowSampleFormsModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<SavedForm | null>(null);

  // Load saved forms from localStorage on component mount
  useEffect(() => {
    const storedForms = localStorage.getItem(STORAGE_KEY);
    if (storedForms) {
      setSavedForms(JSON.parse(storedForms));
    }
  }, []);

  const handleSaveSchema = (schema: FormSchema) => {
    setFormSchema(schema);
    setPreviewMode(true);
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data);
    alert('Form submitted! Check console for data.');
    console.log('Form data:', data);
  };

  const handleEditSchema = () => {
    setPreviewMode(false);
  };

  const handleExportSchema = () => {
    if (!formSchema) return;
    
    const schemaJson = JSON.stringify(formSchema, null, 2);
    const blob = new Blob([schemaJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveForm = () => {
    if (!formSchema) return;
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    if (!formSchema || !formName.trim()) return;

    const newForm: SavedForm = {
      id: Date.now().toString(),
      name: formName,
      schema: formSchema,
      createdAt: new Date().toISOString(),
    };

    const updatedForms = [...savedForms, newForm];
    setSavedForms(updatedForms);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    
    setFormName('');
    setShowSaveModal(false);
    alert('Form saved successfully!');
  };

  const handleViewSavedForms = () => {
    setShowSavedFormsModal(true);
  };

  const handleViewSampleForms = () => {
    setShowSampleFormsModal(true);
  };

  const handleLoadForm = (form: SavedForm) => {
    setFormSchema(form.schema);
    setSelectedForm(form);
    setShowSavedFormsModal(false);
    setShowSampleFormsModal(false);
    setPreviewMode(true);
  };

  const handleDeleteSavedForm = (id: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      const updatedForms = savedForms.filter(form => form.id !== id);
      setSavedForms(updatedForms);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedForms));
    }
  };

  const handleCreateNewForm = () => {
    setFormSchema(null);
    setSelectedForm(null);
    setPreviewMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Form Builder</h1>
      
      <div className="flex justify-between mb-4">
        <div>
          <Button variant="outline" onClick={handleCreateNewForm} className="mr-2">
            Create New Form
          </Button>
          <Button variant="outline" onClick={handleViewSampleForms}>
            View Sample Forms
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleViewSavedForms}>
            View Saved Forms
          </Button>
          {previewMode && formSchema && (
            <Button onClick={handleSaveForm}>
              Save Form
            </Button>
          )}
        </div>
      </div>
      
      {previewMode && formSchema ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {selectedForm ? `Form Preview: ${selectedForm.name}` : 'Form Preview'}
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleEditSchema}>
                Edit Form
              </Button>
              <Button onClick={handleExportSchema}>
                Export Schema
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <DynamicForm
              schema={formSchema}
              mode="create"
              onSubmit={handleFormSubmit}
              onCancel={() => {}}
            />
          </div>
          
          {Object.keys(formData).length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Submitted Data</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <FormBuilder onSave={handleSaveSchema} initialSchema={formSchema || undefined} />
        </div>
      )}

      {/* Save Form Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Form"
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Name
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a name for your form"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setShowSaveModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSave} disabled={!formName.trim()}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Saved Forms Modal */}
      <Modal
        isOpen={showSavedFormsModal}
        onClose={() => setShowSavedFormsModal(false)}
        title="Saved Forms"
        size="lg"
      >
        <div className="space-y-4">
          {savedForms.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No saved forms yet. Build and save a form to see it here.
            </p>
          ) : (
            <div className="space-y-2">
              {savedForms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="font-medium">{form.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({new Date(form.createdAt).toLocaleDateString()})
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleLoadForm(form)}>
                      View
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeleteSavedForm(form.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setShowSavedFormsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Sample Forms Modal */}
      <Modal
        isOpen={showSampleFormsModal}
        onClose={() => setShowSampleFormsModal(false)}
        title="Sample Forms"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Select a sample form to get started quickly. These templates demonstrate different form types and field configurations.
          </p>
          <div className="space-y-2">
            {sampleForms.map((form) => (
              <div key={form.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                <div>
                  <span className="font-medium">{form.name}</span>
                  <p className="text-sm text-gray-500 mt-1">
                    {form.schema.fields.length} fields
                  </p>
                </div>
                <Button size="sm" onClick={() => handleLoadForm(form)}>
                  Use Template
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={() => setShowSampleFormsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormBuilderPage;
