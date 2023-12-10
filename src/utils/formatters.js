import { useMemo } from 'react';

export const useDateFormat = (dateString) => {
    const formatDate = useMemo(() => {
      if (!dateString) {
        return ''; // Return empty string if dateString is empty or undefined
      }
  
      const date = new Date(dateString);
  
      // Check if the date is valid or not (Invalid Date)
      if (isNaN(date)) {
        return 'Invalid Date';
      }
  
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const year = date.getFullYear();
  
      return `${month} ${day}, ${year}`;
    }, [dateString]);
  
    return formatDate;
  };
  


  export const formatName = (name) => {
    if (!name) return ''; // Handle empty names
  
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return formattedName;
  };