export const APP_NAME       = "Blood Donation App";
export const APP_VERSION    = "1.0.0";
export const RECAPTCHA      = "c9d6d708-8c48-4810-af92-1e12bf42824c";

export function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date strings
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
}