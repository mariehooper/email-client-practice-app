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

export default store;
