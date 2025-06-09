import React, { createContext, useContext, useState } from 'react';
import { PermissionContextType, PermissionProviderProps } from '../types';

// Create the permission context
const PermissionContext = createContext<PermissionContextType>({
  hasPermission: () => false,
  userPermissions: [],
});

// Custom hook to use the permission context
export const usePermissions = () => useContext(PermissionContext);

// Permission provider component
export const PermissionProvider: React.FC<PermissionProviderProps> = ({ 
  children, 
  permissions = [] 
}) => {
  const [userPermissions] = useState<string[]>(permissions);

  // Function to check if user has a specific permission
  const hasPermission = (requiredPermission: string | string[]): boolean => {
    // If no permissions are required, allow access
    if (!requiredPermission) return true;
    
    // If no user permissions are set, deny access
    if (!userPermissions || userPermissions.length === 0) return false;
    
    // Check if user has any of the required permissions
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(perm => userPermissions.includes(perm));
    }
    
    // Check for a single permission
    return userPermissions.includes(requiredPermission);
  };

  return (
    <PermissionContext.Provider value={{ hasPermission, userPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionContext;
