/**
 * @flow
 */

export function formatSenderName(sender: string): string {
  return sender.split('\\')[0];
}

export function formatTimestamp(date: string): string {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const userLang = navigator.language;
  return new Date(Number(date)).toLocaleString(userLang, options);
}

export function formatMailboxName(mailboxName: string): string {
  const trimmed = mailboxName.replace('CATEGORY_', '').toLowerCase();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
