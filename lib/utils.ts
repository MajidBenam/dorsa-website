import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function formatYear(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getFullYear().toString();
}

/**
 * Format a date range for experiences.
 * - Uses years only when dates are Jan 1 (simplifies display)
 * - dateTo null: when ongoing=true shows "– present", otherwise shows single date
 */
export function formatDateRange(
  dateFrom: string | Date | null | undefined,
  dateTo: string | Date | null | undefined,
  options?: { ongoing?: boolean }
): string {
  if (dateFrom == null || dateFrom === '') return '–';
  const from = typeof dateFrom === 'string' ? new Date(dateFrom) : dateFrom;
  if (isNaN(from.getTime())) return '–';
  const fromYear = from.getFullYear();
  const fromMonth = from.getMonth();
  const fromDay = from.getDate();
  const fromIsJan1 = fromMonth === 0 && fromDay === 1;

  if (!dateTo || dateTo === '') {
    const fromStr = fromIsJan1 ? fromYear.toString() : formatDate(from);
    return options?.ongoing !== false ? `${fromStr} – present` : fromStr;
  }

  const to = typeof dateTo === 'string' ? new Date(dateTo) : dateTo;
  if (isNaN(to.getTime())) {
    const fromStr = fromIsJan1 ? fromYear.toString() : formatDate(from);
    return options?.ongoing !== false ? `${fromStr} – present` : fromStr;
  }
  const toYear = to.getFullYear();
  const toMonth = to.getMonth();
  const toDay = to.getDate();
  const toIsJan1 = toMonth === 0 && toDay === 1;

  if (fromIsJan1 && toIsJan1) {
    if (fromYear === toYear) return fromYear.toString();
    return `${fromYear} – ${toYear}`;
  }

  return `${formatDate(from)} – ${formatDate(to)}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
