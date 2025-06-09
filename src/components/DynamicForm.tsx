import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { FormSchema, FormMode, SelectOption } from '../types/index';
import { fetchOptionsFromAPI } from '../utils/apiUtils';

interface DynamicFormProps {
  schema: FormSchema;
  defaultValues?: Record<string, any>;
  mode: FormMode;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  defaultValues = {},
  mode,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel,
  cancelLabel = 'Cancel',
}) => {
  // State for API-loaded options
  const [fieldOptions, setFieldOptions] = useState<Record<string, SelectOption[]>>({});
  const [isLoadingOptions, setIsLoadingOptions] = useState<Record<string, boolean>>({});
  
  // Build Zod schema dynamically from the form schema
  const buildZodSchema = () => {
    const schemaMap: Record<string, any> = {};
    
    schema.fields.forEach((field) => {
      let fieldSchema: any;
      
      // Basic type validation
      switch (field.type) {
        case 'text':
        case 'textarea':
        case 'password':
          fieldSchema = z.string();
          
          // Add additional validations for string types
          if (field.validation) {
            if (field.validation.required) {
              fieldSchema = fieldSchema.min(1, field.validation.required);
            }
            
            if (field.validation.minLength) {
              fieldSchema = fieldSchema.min(field.validation.minLength, `Minimum ${field.validation.minLength} characters required`);
            }
            
            if (field.validation.maxLength) {
              fieldSchema = fieldSchema.max(field.validation.maxLength, `Maximum ${field.validation.maxLength} characters allowed`);
            }
            
            if (field.validation.pattern) {
              fieldSchema = fieldSchema.regex(field.validation.pattern.value, field.validation.pattern.message);
            }
          }
          break;
          
        case 'email':
          fieldSchema = z.string().email(field.validation?.required || 'Invalid email address');
          
          // Add additional validations for email
          if (field.validation) {
            if (field.validation.required) {
              fieldSchema = fieldSchema.min(1, field.validation.required);
            }
          }
          break;
          
        case 'number':
          fieldSchema = z.coerce.number();
          
          // Add additional validations for number
          if (field.validation) {
            if (field.validation.required) {
              fieldSchema = fieldSchema.min(field.validation.min || 0, field.validation.required);
            }
            
            if (field.validation.min !== undefined) {
              fieldSchema = fieldSchema.min(field.validation.min, `Minimum value is ${field.validation.min}`);
            }
            
            if (field.validation.max !== undefined) {
              fieldSchema = fieldSchema.max(field.validation.max, `Maximum value is ${field.validation.max}`);
            }
          }
          break;
          
        case 'checkbox':
          fieldSchema = z.boolean();
          break;
          
        case 'date':
          fieldSchema = z.string();
          
          if (field.validation?.required) {
            fieldSchema = fieldSchema.min(1, field.validation.required);
          }
          break;
          
        case 'select':
        case 'radio':
          fieldSchema = z.string();
          
          if (field.validation?.required) {
            fieldSchema = fieldSchema.min(1, field.validation.required);
          }
          break;
          
        default:
          fieldSchema = z.string();
          
          if (field.validation?.required) {
            fieldSchema = fieldSchema.min(1, field.validation.required);
          }
      }
      
      // Make field optional if not required
      if (!field.validation?.required) {
        fieldSchema = fieldSchema.optional();
      }
      
      schemaMap[field.name] = fieldSchema;
    });
    
    return z.object(schemaMap);
  };
  
  const zodSchema = buildZodSchema();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Record<string, any>>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues,
  });
  
  // Load options from API for fields with dataSource
  useEffect(() => {
    schema.fields.forEach(async (field) => {
      if (field.dataSource && field.dataSource.type === 'api' && !field.dataSource.dependsOn) {
        setIsLoadingOptions(prev => ({ ...prev, [field.name]: true }));
        
        try {
          const options = await fetchOptionsFromAPI(field.dataSource);
          setFieldOptions(prev => ({ ...prev, [field.name]: options }));
        } finally {
          setIsLoadingOptions(prev => ({ ...prev, [field.name]: false }));
        }
      }
    });
  }, [schema.fields]);
  
  // Watch for changes in fields that other fields depend on
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (!name || type !== 'change') return;
      
      // Find fields that depend on this field
      schema.fields.forEach(async (field) => {
        if (field.dataSource?.dependsOn === name) {
          setIsLoadingOptions(prev => ({ ...prev, [field.name]: true }));
          setValue(field.name, ''); // Reset the dependent field
          
          try {
            const options = await fetchOptionsFromAPI(field.dataSource, value[name]);
            setFieldOptions(prev => ({ ...prev, [field.name]: options }));
          } finally {
            setIsLoadingOptions(prev => ({ ...prev, [field.name]: false }));
          }
        }
      });
    });
    
    return () => subscription.unsubscribe();
  }, [watch, schema.fields, setValue]);
  
  const isViewMode = mode === 'view';
  
  const renderField = (field: any) => {
    const commonProps = {
      label: field.label,
      placeholder: field.placeholder,
      disabled: isViewMode || field.disabled,
      error: errors[field.name]?.message as string,
      helperText: field.helperText,
      ...register(field.name),
    };
    
    switch (field.type) {
      case 'select':
        // Use API-loaded options if available, otherwise use static options
        const options = fieldOptions[field.name] || field.options || [];
        const isLoading = isLoadingOptions[field.name] || false;
        
        return (
          <Select
            key={field.name}
            options={options}
            isLoading={isLoading}
            {...commonProps}
          />
        );
      case 'textarea':
        return (
          <div key={field.name} className="w-full">
            {field.label && (
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
            )}
            <textarea
              className={`
                w-full rounded-md border px-3 py-2 text-sm
                ${errors[field.name] ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                shadow-sm focus:outline-none focus:ring-1
                disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              `}
              rows={4}
              {...register(field.name)}
              placeholder={field.placeholder}
              disabled={isViewMode || field.disabled}
            />
            {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]?.message as string}</p>}
            {field.helperText && !errors[field.name] && <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>}
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              {...register(field.name)}
              disabled={isViewMode || field.disabled}
            />
            <label className="ml-2 block text-sm text-gray-900">
              {field.label}
            </label>
            {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]?.message as string}</p>}
          </div>
        );
      case 'radio':
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="space-y-2">
              {field.options?.map((option: { value: string; label: string }) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`${field.name}-${option.value}`}
                    value={option.value}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    {...register(field.name)}
                    disabled={isViewMode || field.disabled}
                  />
                  <label htmlFor={`${field.name}-${option.value}`} className="ml-2 block text-sm text-gray-900">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {errors[field.name] && <p className="mt-1 text-sm text-red-600">{errors[field.name]?.message as string}</p>}
            {field.helperText && !errors[field.name] && <p className="mt-1 text-sm text-gray-500">{field.helperText}</p>}
          </div>
        );
      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            {...commonProps}
          />
        );
    }
  };

  const getSubmitLabel = () => {
    if (submitLabel) return submitLabel;
    return mode === 'create' ? 'Create' : 'Update';
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {schema.fields.map((field) => renderField(field))}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
        
        {!isViewMode && (
          <Button
            type="submit"
            isLoading={isSubmitting}
          >
            {getSubmitLabel()}
          </Button>
        )}
      </div>
    </form>
  );
};

export default DynamicForm;
