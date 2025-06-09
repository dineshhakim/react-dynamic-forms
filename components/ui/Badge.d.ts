import { default as React } from 'react';
interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
    className?: string;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
