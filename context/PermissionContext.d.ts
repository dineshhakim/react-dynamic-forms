import { default as React } from 'react';
import { PermissionContextType, PermissionProviderProps } from '../types';
declare const PermissionContext: React.Context<PermissionContextType>;
export declare const usePermissions: () => PermissionContextType;
export declare const PermissionProvider: React.FC<PermissionProviderProps>;
export default PermissionContext;
