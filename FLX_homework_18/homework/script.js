const rootNode = document.getElementById('root');

function createElement(tag, className, text) {
  let element = document.createElement(tag);

  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }

  return element;
}

let xhr = null;

sendXHR = (type, url, data, callback) => {
  xhr = new XMLHttpRequest();
  xhr.open(type, url, true);
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      callback(this.response);
    }
  };
};

sendXHR('GET', 'https://jsonplaceholder.typicode.com/users', null, function (response) {
  const users = JSON.parse(response);

  for (let i = 0; i < users.length; i++) {
    const frame = createElement('div', 'frame');
    const cardFrame = createElement('div', 'card-frame');
    const buttonsFrame = createElement('div', 'buttons-frame');

    const avatar = createElement('img', 'avatar');
    setAvatar(avatar);
    const address = createElement('div', 'address', `Address:`);
    const addressStreet = createElement('span', '', `Street: ${users[i].address.street};`);
    const addressSuite = createElement('span', '', `Suite: ${users[i].address.suite};`);
    const addressCity = createElement('span', '', `City: ${users[i].address.city};`);
    const username = createElement('span', 'username', `Username: ${users[i].username}`);
    const companyName = createElement('span', 'company', `Company: ${users[i].company.name}`);

    const editButton = createElement('a', 'edit-btn', `Save/Edit`);
    const deleteButton = createElement('a', 'delete-btn', `Delete`);

    username.addEventListener('click', () => {
      renderPosts(i);
    });

    editButton.addEventListener('click', () => {
      users[i].username = prompt('Enter username:', users[i].username);
      sendXHR('PUT', `https://jsonplaceholder.typicode.com/users/${i + 1}`, null, (response) => {
        const result = JSON.parse(response);
        users[i].name = result.name;
      });
    });

    deleteButton.addEventListener('click', () => {
      if (confirm('Delete user?')) {
        sendXHR('DELETE', `https://jsonplaceholder.typicode.com/users/${i}`, null, () => {
          frame.remove();
          console.log(`Sent request to delete user ${i}.`);
        });
      }
    });

    rootNode.appendChild(frame);
    frame.appendChild(cardFrame);
    frame.appendChild(buttonsFrame);
    cardFrame.appendChild(avatar);
    cardFrame.appendChild(address);
    address.appendChild(addressStreet);
    address.appendChild(addressSuite);
    address.appendChild(addressCity);
    cardFrame.appendChild(username);
    cardFrame.appendChild(companyName);
    buttonsFrame.appendChild(editButton);
    buttonsFrame.appendChild(deleteButton);

    let loader = document.getElementById('loader');
    loader.setAttribute('style', 'display: none;');
  }
});

setAvatar = (avatar) => {
  let data = null;
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      let avatarURL = JSON.parse(this.responseText)[0].url;
      avatarURL.endsWith('jpg') ?
        avatar.src = JSON.parse(this.responseText)[0].url : setAvatar(avatar);
    }
  });
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png', true); // size of img?
  xhr.send(data);
};

renderPosts = (id) => {
  sendXHR('GET', `https://jsonplaceholder.typicode.com/posts?userId=${id + 1}`, null, (response) => {
    const posts = JSON.parse(response);
    let loader = document.getElementById('loader');
    loader.setAttribute('style', 'display: block;');

    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }

    for (let i = 0; i < posts.length; i++) {
      const frame = createElement('div', 'post-frame');
      const id = createElement('span', 'post-id', `${posts[i].userId}-${posts[i].id}`);
      const title = createElement('p', 'post-title', `${posts[i].title}`);
      const body = createElement('p', 'post-body', `${posts[i].body}`);

      frame.appendChild(id);
      frame.appendChild(title);
      frame.appendChild(body);

      sendXHR('GET', `https://jsonplaceholder.typicode.com/comments?postId=${i}`, null, (response) => {
        const commentsJson = JSON.parse(response);

        for (let i = 0; i < posts.length; i++) {
          const comments = createElement('div', 'comments', `>>> ${commentsJson[i].body}`);

          frame.appendChild(comments);
        }
      });

      root.appendChild(frame);
    }

    loader.setAttribute('style', 'display: none;');
  })
};
