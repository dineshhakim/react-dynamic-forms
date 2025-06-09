import { default as React } from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    permission?: string | string[];
    children: React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
