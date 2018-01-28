/**
 * The data store is currently a JSON file, but its schema mirrors the Gmail
 * API so we can feed it from your own inbox at a later date.
 *
 * @flow
 */

import type { Data, Message } from './types';

const store: Data = require('./emails.json');

export function getMessageInfo(message: Message, headerName: string): ?string {
  const { headers } = message.payload;
  const header = headers.find(h => h.name === headerName);
  return header && header.value;
}

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

export default store;
