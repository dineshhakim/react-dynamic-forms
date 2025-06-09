import React, { useState } from 'react';
import { FormField, FormSchema, SelectOption } from '../types/index';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface FormBuilderProps {
  onSave: (schema: FormSchema) => void;
  initialSchema?: FormSchema;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSave, initialSchema }) => {
  const [fields, setFields] = useState<FormField[]>(initialSchema?.fields || []);
  const [currentField, setCurrentField] = useState<FormField | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Password' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Select' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio' },
    { value: 'date', label: 'Date' },
  ];

  const resetCurrentField = () => {
    setCurrentField({
      name: '',
      label: '',
      type: 'text',
      placeholder: '',
      required: false,
    });
    setOptions([]);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleAddField = () => {
    resetCurrentField();
  };

  const handleEditField = (index: number) => {
    const field = fields[index];
    setCurrentField(field);
    setOptions(field.options || []);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the fields
    [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
    
    setFields(newFields);
  };

  const handleSaveField = () => {
    if (!currentField || !currentField.name || !currentField.label) return;

    const fieldToSave: FormField = {
      ...currentField,
    };

    if (['select', 'radio'].includes(currentField.type) && options.length > 0) {
      fieldToSave.options = [...options];
    }

    if (currentField.required) {
      fieldToSave.validation = {
        ...fieldToSave.validation,
        required: `${currentField.label} is required`,
      };
    }

    if (isEditing && editingIndex !== null) {
      const updatedFields = [...fields];
      updatedFields[editingIndex] = fieldToSave;
      setFields(updatedFields);
    } else {
      setFields([...fields, fieldToSave]);
    }

    resetCurrentField();
  };

  const handleAddOption = () => {
    setOptions([...options, { value: '', label: '' }]);
  };

  const handleOptionChange = (index: number, key: 'value' | 'label', value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [key]: value };
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSaveForm = () => {
    onSave({ fields });
  };

  const generateFieldName = (label: string) => {
    if (!label) return '';
    
    // Convert to camelCase
    return label
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[A-Z]/, (c) => c.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Form Fields</h2>
        {fields.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No fields added yet. Click "Add Field" to start building your form.
          </div>
        ) : (
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <span className="font-medium">{field.label}</span>
                  <span className="ml-2 text-sm text-gray-500">({field.type})</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleMoveField(index, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleMoveField(index, 'down')}
                    disabled={index === fields.length - 1}
                  >
                    ↓
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditField(index)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteField(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Button onClick={handleAddField}>Add Field</Button>
        </div>
      </div>

      {currentField && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">
            {isEditing ? 'Edit Field' : 'Add New Field'}
          </h2>
          <div className="space-y-4">
            <Input
              label="Field Label"
              value={currentField.label}
              onChange={(e) => {
                const label = e.target.value;
                setCurrentField({ 
                  ...currentField, 
                  label,
                  name: isEditing ? currentField.name : generateFieldName(label)
                });
              }}
              placeholder="e.g. First Name"
            />
            <Input
              label="Field Name (ID)"
              value={currentField.name}
              onChange={(e) => setCurrentField({ ...currentField, name: e.target.value })}
              placeholder="e.g. firstName"
              helperText="Unique identifier for this field"
            />
            <Select
              label="Field Type"
              value={currentField.type}
              onChange={(e) => setCurrentField({ ...currentField, type: e.target.value as any })}
              options={fieldTypes}
            />
            <Input
              label="Placeholder"
              value={currentField.placeholder || ''}
              onChange={(e) => setCurrentField({ ...currentField, placeholder: e.target.value })}
              placeholder="e.g. Enter your first name"
            />
            <Input
              label="Helper Text"
              value={currentField.helperText || ''}
              onChange={(e) => setCurrentField({ ...currentField, helperText: e.target.value })}
              placeholder="e.g. This will be displayed on your profile"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={currentField.required || false}
                onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
                Required Field
              </label>
            </div>

            {['select', 'radio'].includes(currentField.type) && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Options</h3>
                  <Button size="sm" onClick={handleAddOption}>
                    Add Option
                  </Button>
                </div>
                {options.map((option, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1"
                    />
                    <Input
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                      placeholder="Label"
                      className="flex-1"
                    />
                    <Button size="sm" variant="danger" onClick={() => handleRemoveOption(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={resetCurrentField}>
                Cancel
              </Button>
              <Button onClick={handleSaveField}>
                {isEditing ? 'Update Field' : 'Add Field'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {fields.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleSaveForm}>Save Form</Button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
