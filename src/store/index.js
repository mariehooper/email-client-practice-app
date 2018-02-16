/**
 * The data store is currently a JSON file, but its schema mirrors the Gmail
 * API so we can feed it from your own inbox at a later date.
 *
 * @flow
 */

import type { Data, Message } from './types';

const store: Data = require('./emails.json');

/**
 * You might find it useful to implement some functions that make accessing
 * deeply nested attributes of Messages or Threads...
 */

// For example, this returns the subject of a given message if it is defined
// by a header in the message payload
export function getMessageSubject(message: Message): ?string {
  const { headers } = message.payload;
  const subjectHeader = headers.find(header => header.name === 'Subject');
  return subjectHeader && subjectHeader.value;
}

export function getMessageSender(message: Message): ?string {
  const { headers } = message.payload;
  const senderHeader = headers.find(header => header.name === 'From');
  return senderHeader && senderHeader.value;
}

export function formatSender(sender: String){
  return sender.split('\\')[0];
}

export function formatTimestamp(date: String){
  return new Date(Number(date)).toLocaleDateString();
}

export function formatMailboxNames(name: String){
  return name.includes('CATEGORY_') ? name.split('CATEGORY_')[1] : name;
}

export default store;
