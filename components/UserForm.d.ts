import { default as React } from 'react';
import { z } from 'zod';
import { User, FormMode } from '../types/index';
declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
    status: z.ZodEnum<["active", "inactive"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    role: string;
    email: string;
    status: "active" | "inactive";
}, {
    name: string;
    role: string;
    email: string;
    status: "active" | "inactive";
}>;
type UserFormData = z.infer<typeof userSchema>;
interface UserFormProps {
    user?: User;
    mode: FormMode;
    onSubmit: (data: UserFormData) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
}
declare const UserForm: React.FC<UserFormProps>;
export default UserForm;
