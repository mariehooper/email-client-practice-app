/**
 * @flow
 */

import store, { getMessageInfo } from './store';
import { formatSenderName, formatTimestamp, formatMailboxName } from './utility/formatters';

const state = {
  selectedMailbox: 'INBOX',
};

function renderMailboxList(): string {
  const { mailboxes } = store;
  return Object.keys(mailboxes).map((mailbox: string) => {
    const activeClass = mailbox === state.selectedMailbox ? 'active' : '';
    return `
      <li class="nav-item">
        <button class="${activeClass}" type="button" data-mailbox="${mailbox}">
          ${formatMailboxName(mailbox)}
        </button>
      </li>
    `;
  }).join('');
}

function renderMailboxes(): void {
  const mailboxListContents = renderMailboxList();

  const container = document.querySelector('.mailboxes');
  if (container != null) container.innerHTML = mailboxListContents;
}

function renderThreadList(): string {
  const { mailboxes, threads } = store;
  const selected = mailboxes[state.selectedMailbox];
  if (selected == null) return '';
  return selected.threadIds
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

function renderThreads(): void {
  const sidebarContents = `
    <h2 class="email-header inbox-header">
      ${formatMailboxName(state.selectedMailbox)} ✨
    </h2>
    <ul class="email-list">
      ${renderThreadList()}
    </ul>
  `;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

function addClickHandlers(): void {
  document.querySelectorAll('[data-mailbox]').forEach((button) => {
    button.addEventListener('click', (e: MouseEvent) => {
      document.querySelectorAll('[data-mailbox].active').forEach((activeButton) => {
        activeButton.classList.remove('active');
      });
      if (e.currentTarget instanceof HTMLElement) {
        state.selectedMailbox = e.currentTarget.dataset.mailbox;
        e.currentTarget.classList.add('active');
      }
      renderThreads();
    });
  });
}

renderThreads();
renderMailboxes();
addClickHandlers();
