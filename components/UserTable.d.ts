import { default as React } from 'react';
import { User } from '../types/index';
interface UserTableProps {
    users: User[];
    isLoading?: boolean;
    onEdit: (user: User) => void;
    onView: (user: User) => void;
    onDelete: (user: User) => void;
    onCreateNew: () => void;
}
declare const UserTable: React.FC<UserTableProps>;
export default UserTable;
