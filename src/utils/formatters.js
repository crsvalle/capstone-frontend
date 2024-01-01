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

  name = name.split(' ');
  let formattedName = '';
  for (const part of name) {
    formattedName += part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() + ' ';
  }
  return formattedName;
};
