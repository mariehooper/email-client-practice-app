/**
 * @flow
 */

// example of generating HTML with js
import store, {getMessageSubject, getMessageSender, formatSender, formatTimestamp, formatMailboxNames} from './store'

function renderMailboxNames(){
  const mailboxNames = Object.keys(store.mailboxes);
  return mailboxNames.map( mailboxName => {
    return `
    <li>
      <button class="mailbox-btn" type="button" data-mailbox="${mailboxName}">
        ${formatMailboxNames(mailboxName)}
      </button>
    </li>`;
  }).join('');
}

let selectedMailboxName = 'INBOX';

function renderThreads() {
  const { messages, mailboxes } = store;
  const selectedMailbox = mailboxes[selectedMailboxName];
  const { threadIds } = selectedMailbox;
  console.log(threadIds);

  if (selectedMailbox == null) return '';
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

function renderMailbox() {
  const sidebarContents = `
    <h2 class="email-header inbox-header">${formatMailboxNames(selectedMailboxName)} ✨</h2>
    <ul class="email-list">
      ${renderThreads()}
    </ul>`;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

function renderMailboxButtons(){
  const toggleMailboxes = `
    <ul class="mailbox-list">
      ${renderMailboxNames()}
    </ul>`;
  const wrapper = document.querySelector('.toggle-mailboxes');
  if (wrapper != null) wrapper.innerHTML = toggleMailboxes;
}

function addClickEvents(){
  const mailboxButtons = document.querySelectorAll('[data-mailbox]');
  mailboxButtons.forEach(btn => {
    btn.addEventListener('click', (event: MouseEvent) =>{
      selectedMailboxName = event.target.getAttribute('data-mailbox');
      renderMailbox();
    });
  });
}

renderMailboxButtons();
renderMailbox();
addClickEvents();


//import Base64 from 'utility/Base64.js'
//Base64.decode(...)
// getPartByMimeType(payload,type)
// if (payload.mimeType == type){
//   return payload.body
// }
// for part in parts
//   return getPartByMimeType(part,type)
