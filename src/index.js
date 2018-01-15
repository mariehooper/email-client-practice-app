// helper funcs for creating elements
function createElement(tag, className) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  return element;
}

function createElementWithText(tag, text, className) {
  const element = createElement(tag, className);
  const elementText = document.createTextNode(text);
  element.appendChild(elementText);
  return element;
}

// example of generating HTML with js
function generateEmailList() {
  const emailList = createElement('ul', 'email-list');

  [...Array(6).keys()].forEach((num) => {
    const listItem = createElement('li');
    const email = createElement('button', 'email-item');

    const senderDetails = createElement('div', 'sender-details');
    const sender = createElementWithText('p', 'Email sender');
    const timestamp = createElementWithText('span', 'timestamp');
    senderDetails.appendChild(sender);
    senderDetails.appendChild(timestamp);
    email.appendChild(senderDetails);

    const emailSubject = createElementWithText(
      'p',
      `Email${num} subject`,
      'email-subject',
    );
    email.appendChild(emailSubject);

    const emailSnippet = createElementWithText('p', 'Email snippet');
    email.appendChild(emailSnippet);
    emailList.appendChild(listItem);
    listItem.appendChild(email);
  });
  document.querySelector('.email-list-container').appendChild(emailList);
}

generateEmailList();
