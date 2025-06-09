import { ApiDataSource, SelectOption } from '../types/index';

/**
 * Fetches options from an API based on the provided data source configuration
 * @param dataSource API data source configuration
 * @param dependentValue Value of the dependent field if applicable
 * @returns Array of select options
 */
export const fetchOptionsFromAPI = async (
  dataSource: ApiDataSource,
  dependentValue?: any
): Promise<SelectOption[]> => {
  try {
    const url = new URL(dataSource.url);
    
    // Add query parameters
    if (dataSource.params) {
      Object.entries(dataSource.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    // Add dependent parameter if specified
    if (dataSource.dependsOn && dependentValue) {
      url.searchParams.append(dataSource.dependsOn, dependentValue);
    }
    
    const response = await fetch(url.toString(), {
      method: dataSource.method || 'GET',
      headers: dataSource.headers || {
        'Content-Type': 'application/json',
      },
      body: dataSource.method !== 'GET' && dataSource.bodyData 
        ? JSON.stringify(dataSource.bodyData) 
        : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map response to options format
    return extractOptionsFromResponse(data, dataSource.responseMapping);
  } catch (error) {
    console.error('Error fetching options from API:', error);
    return [];
  }
};

/**
 * Extracts options from API response based on the mapping
 * @param data API response data
 * @param mapping Mapping for value and label fields
 * @returns Array of select options
 */
export const extractOptionsFromResponse = (
  data: any, 
  mapping: { value: string; label: string }
): SelectOption[] => {
  // Handle array responses
  if (Array.isArray(data)) {
    return data.map(item => ({
      value: getNestedValue(item, mapping.value),
      label: getNestedValue(item, mapping.label),
    }));
  }
  
  // Handle nested data
  const items = getNestedValue(data, 'items') || 
                getNestedValue(data, 'data') || 
                getNestedValue(data, 'results') ||
                [];
                
  if (Array.isArray(items)) {
    return items.map(item => ({
      value: getNestedValue(item, mapping.value),
      label: getNestedValue(item, mapping.label),
    }));
  }
  
  return [];
};

/**
 * Gets a nested value from an object using dot notation
 * @param obj Object to extract value from
 * @param path Path to the value using dot notation (e.g., 'user.address.city')
 * @returns The value at the specified path or null if not found
 */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
};
