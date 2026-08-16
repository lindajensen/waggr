import { timeStamp } from "console";

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;

  return `${diffDays}d ago`;
}
