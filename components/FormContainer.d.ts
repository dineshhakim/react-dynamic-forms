import { default as React } from 'react';
import { FormSchema, FormMode } from '../types/index';
interface FormContainerProps {
    schema: FormSchema;
    mode: FormMode;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
    isSubmitting?: boolean;
}
declare const FormContainer: React.FC<FormContainerProps>;
export default FormContainer;
