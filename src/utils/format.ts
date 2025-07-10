/**
 * Utility functions for formatting distance and time values
 * Used across journey planning, natural language generation, and demo files
 */

/**
 * Format distance in meters to a human-readable string
 * 
 * @param meters - Distance in meters
 * @returns Formatted distance string
 * @example
 * formatDistance(3153) // "3,153m"
 * formatDistance(1000) // "1,000m"
 * formatDistance(500)  // "500m"
 */
export function formatDistance(meters: number): string {
  if (meters <= 0) return '';
  
  // Add thousands separators
  return `${meters.toLocaleString()}m`;
}

/**
 * Format duration in minutes to a human-readable string
 * 
 * @param minutes - Duration in minutes
 * @returns Formatted duration string
 * @example
 * formatDuration(90)  // "1 hour 30 minutes"
 * formatDuration(60)  // "1 hour"
 * formatDuration(45)  // "45 minutes"
 * formatDuration(1)   // "1 minute"
 */
export function formatDuration(minutes: number): string {
  if (minutes <= 0) return '0 minutes';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }
  
  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
}

/**
 * Format a date for display (shows "today" if it's today, otherwise full date)
 * 
 * @param dateString - ISO date string
 * @returns Formatted date string
 * @example
 * formatDateForDisplay('2025-07-10T00:59:00') // "today" or "10 July 2025"
 */
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  if (isToday) {
    return 'today';
  }
  
  return date.toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}

/**
 * Format a time for display (12-hour format with am/pm)
 * 
 * @param dateString - ISO date string
 * @returns Formatted time string
 * @example
 * formatTimeForDisplay('2025-07-10T00:59:00') // "12:59am"
 */
export function formatTimeForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

/**
 * Format a date and time combination for display
 * 
 * @param dateString - ISO date string
 * @returns Formatted date and time string
 * @example
 * formatDateTimeForDisplay('2025-07-10T00:59:00') // "today 12:59am" or "10 July 2025 12:59am"
 */
export function formatDateTimeForDisplay(dateString: string): string {
  const dateDisplay = formatDateForDisplay(dateString);
  const timeDisplay = formatTimeForDisplay(dateString);
  return `${dateDisplay} ${timeDisplay}`;
} 