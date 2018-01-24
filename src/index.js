/**
 * @flow
 */

// example of generating HTML with js
import store, {getMessageSubject, getMessageSender, formatSender, formatTimestamp} from './store'

function renderThreads() {
  const { threadIds } = store.mailboxes.INBOX;
  const { messages } = store;

  if (store.mailboxes.INBOX == null) return;

  return threadIds.map( ind => {
    const subject = getMessageSubject(messages[ind]);
    const snippet = messages[ind].snippet;
    const sender = getMessageSender(messages[ind]);
    const timestamp = formatTimestamp(messages[ind].internalDate);

    return `<li>
    <button class="email-item" type="button">
        <div class="sender-details">
          <p class="email">${formatSender(sender)}</p>
          <span class="time">${timestamp}</span>
        </div>
        <p class="email-subject">${subject}</p>
        <p class="snippet">${snippet}</p>
      </button>
      </li>`;
  }).join('');
}

  function renderSidebar() {
    const sidebarContents = `
      <h2 class="email-header inbox-header">Inbox ✨</h2>
      <ul class="email-list">
        ${renderThreads()}
      </ul>`;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

renderSidebar();
