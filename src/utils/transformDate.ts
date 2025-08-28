// transform dates
// This function transforms a date string into a more readable format.
export const transformDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
};
// Example usage:
// const date = "2024-01-20 10:30 AM";
// console.log(transformDate(date)); // Output: "01/20/2024, 10:30 AM"
