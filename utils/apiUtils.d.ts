import { ApiDataSource, SelectOption } from '../types/index';
/**
 * Fetches options from an API based on the provided data source configuration
 * @param dataSource API data source configuration
 * @param dependentValue Value of the dependent field if applicable
 * @returns Array of select options
 */
export declare const fetchOptionsFromAPI: (dataSource: ApiDataSource, dependentValue?: any) => Promise<SelectOption[]>;
/**
 * Extracts options from API response based on the mapping
 * @param data API response data
 * @param mapping Mapping for value and label fields
 * @returns Array of select options
 */
export declare const extractOptionsFromResponse: (data: any, mapping: {
    value: string;
    label: string;
}) => SelectOption[];
/**
 * Gets a nested value from an object using dot notation
 * @param obj Object to extract value from
 * @param path Path to the value using dot notation (e.g., 'user.address.city')
 * @returns The value at the specified path or null if not found
 */
export declare const getNestedValue: (obj: any, path: string) => any;
