/**
 * @flow
 */

import store, {
  getMessageInfo,
  formatSenderName,
  formatTimestamp,
} from './store';

function renderThreads(): string {
  const { mailboxes, threads } = store;
  const inbox = mailboxes.INBOX;
  if (inbox == null) return '';
  return inbox.threadIds
    .map((id) => {
      const [lastMessage] = threads[id].messages.slice(-1);
      const message = store.messages[lastMessage.id];
      const sender = getMessageInfo(message, 'From');
      const timestamp = formatTimestamp(message.internalDate);
      const subject = getMessageInfo(message, 'Subject') || 'No Subject';
      if (sender) {
        return `
          <li>
            <button class="email-item" type="button">
              <div class="sender-details">
                <p>${formatSenderName(sender)}</p>
                <span class="timestamp">${timestamp}</span>
              </div>
              <p class="email-subject">${subject}</p>
              <p class="snippet">${message.snippet}</p>
            </button>
          </li>
        `;
      }
      return '';
    }).join('');
}

function renderSidebar() {
  const sidebarContents = `
    <h2 class="email-header inbox-header">Inbox ✨</h2>
    <ul class="email-list">
      ${renderThreads()}
    </ul>
  `;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

renderSidebar();
