/**
 * Function format date
 */
export const formatDateString = (
  isoString: string,
  includeTime: boolean = false,
  isDeadline: boolean = false,
) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(isoString);
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  if (includeTime) {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}.${minutes}`;
  }

  if (isDeadline) {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return `${month} ${day}, ${year}`;
};
