export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);

  if (isNaN(date)) {
    return 'Invalid Date';
  }

  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const formatName = (name) => {
    if (!name) return '';

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return formattedName;
};