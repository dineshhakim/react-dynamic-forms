import { default as React } from 'react';
import { FormSchema, FormMode } from '../types/index';
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
declare const DynamicForm: React.FC<DynamicFormProps>;
export default DynamicForm;
