import React from 'react';
import { FormSchema, FormMode } from '../types/index';
import Modal from './ui/Modal';
import SidePanel from './SidePanel';
import DynamicForm from './DynamicForm';
import { useNavigate } from 'react-router-dom';

interface FormContainerProps {
  schema: FormSchema;
  mode: FormMode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  defaultValues?: Record<string, any>;
  isSubmitting?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  schema,
  mode,
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  
  const displayMode = schema.displayConfig?.mode || 'dialog';
  const width = schema.displayConfig?.width || (displayMode === 'dialog' ? 'md' : 'max-w-md');
  
  const getTitle = () => {
    if (schema.displayConfig?.title) {
      return schema.displayConfig.title[mode] || `${mode.charAt(0).toUpperCase() + mode.slice(1)} Form`;
    }
    return `${mode.charAt(0).toUpperCase() + mode.slice(1)} Form`;
  };
  
  const handleSubmit = (data: Record<string, any>) => {
    onSubmit(data);
    
    if (schema.displayConfig?.redirectAfterSubmit && schema.displayConfig.redirectPath) {
      navigate(schema.displayConfig.redirectPath);
    }
  };
  
  const renderForm = () => (
    <DynamicForm
      schema={schema}
      mode={mode}
      onSubmit={handleSubmit}
      onCancel={onClose}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      submitLabel={schema.displayConfig?.submitLabel?.[mode as 'create' | 'edit']}
      cancelLabel={schema.displayConfig?.cancelLabel}
    />
  );
  
  if (displayMode === 'page') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">{getTitle()}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          {renderForm()}
        </div>
      </div>
    );
  }
  
  if (displayMode === 'sidepanel') {
    return (
      <SidePanel
        isOpen={isOpen}
        onClose={onClose}
        title={getTitle()}
        width={typeof width === 'string' ? width : 'max-w-md'}
      >
        {renderForm()}
      </SidePanel>
    );
  }
  
  // Default: dialog mode
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      size={typeof width === 'string' ? 'lg' : width}
    >
      {renderForm()}
    </Modal>
  );
};

export default FormContainer;
