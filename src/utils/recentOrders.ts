
/**
 * Utilities for tracking recent orders in current browser session.
 */

const RECENT_KEY = "recentOrderIds";
const MAX_RECENTS = 5;

export function getRecentOrderIds(): string[] {
  try {
    const stored = sessionStorage.getItem(RECENT_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

export function addRecentOrderId(id: string) {
  let recents = getRecentOrderIds();
  recents = [id, ...recents.filter((o) => o !== id)];
  if (recents.length > MAX_RECENTS) recents = recents.slice(0, MAX_RECENTS);
  sessionStorage.setItem(RECENT_KEY, JSON.stringify(recents));
}
