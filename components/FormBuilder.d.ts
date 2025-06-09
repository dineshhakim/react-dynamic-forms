import { default as React } from 'react';
import { FormSchema } from '../types/index';
interface FormBuilderProps {
    onSave: (schema: FormSchema) => void;
    initialSchema?: FormSchema;
}
declare const FormBuilder: React.FC<FormBuilderProps>;
export default FormBuilder;
