const rootNode = document.getElementById('root');
const ZERO = 0;
let todoItems = [];
let counter = 1000;
let temp = '';

function createElement (tag, className, text) {
  let element = document.createElement(tag);

  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }

  return element;
}

function mainPage () {
  window.location.hash = '';
  rootNode.innerText = '';
  let title = createElement('h1', 'title', `Simple TODO application`);
  let addButton = createElement('button', 'add-btn', `Add new task`);
  let emptyBlock = createElement('h2', 'empty-block', `TODO is empty`);
  let list = createElement('ul');
  list.id = 'list';

  rootNode.appendChild(title);
  rootNode.appendChild(addButton);
  if (todoItems.length === ZERO) {
    rootNode.appendChild(emptyBlock);
  }
  rootNode.appendChild(list);

  function pageBuild(i) {
    let li = createElement('li');
    let checkImage = createElement('img', 'check-image');
    let text = createElement('div', 'task-text', `${todoItems[i].description}`);
    let deleteImage = createElement('img', 'delete-image');
    deleteImage.src = './assets/img/remove-s.jpg';

    if (todoItems[i].isDone) {
      checkImage.src = './assets/img/done-s.png';
      text.style.backgroundColor = '#797977';
    } else {
      checkImage.src = './assets/img/todo-s.png';
      text.style.backgroundColor = '#f9f9f9';
    }

    checkImage.addEventListener('click', () => {
      if (todoItems[i].isDone) {
        checkImage.src = './assets/img/todo-s.png';
        todoItems[i].isDone = false;
        todoItems.push(todoItems[i]);
        todoItems.splice(i, 1);
        mainPage();
      } else {
        checkImage.src = './assets/img/done-s.png';
        todoItems[i].isDone = true;
        todoItems.push(todoItems[i]);
        todoItems.splice(i, 1);
        mainPage();
      }
    });

    li.appendChild(checkImage);
    li.appendChild(text);
    li.appendChild(deleteImage);
    list.appendChild(li);

    let textToEdit = document.getElementsByClassName('task-text');
    for (let i = 0; i < textToEdit.length; i++) {
      textToEdit[i].onclick = () => {
        temp = `modify/${i + 1}`;
        window.location.hash = `modify/${i + 1}`;
      }
    }
    let taskToDelete = document.getElementsByClassName('delete-image');
    for (let i = 0; i < taskToDelete.length; i++) {
      taskToDelete[i].onclick = function () {
        let listItem = this.parentElement;
        let ul = document.getElementById('list');
        console.log(this.parentElement);
        ul.removeChild(listItem);
        todoItems.splice(i);
      }
    }
  }

  for (let i = 0; i < todoItems.length; i++) {
    if (!todoItems[i].isDone) {
      pageBuild(i);
    }
  }
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].isDone) {
      pageBuild(i);
    }
  }

  function addChangeHash() {
    window.location.hash = 'add';
  }

  addButton.addEventListener('click', addChangeHash);
  console.log(todoItems);
}

mainPage();

function addNewItems () {
  let title = createElement('h1', 'title', `Add task`);
  let input = createElement('input', 'input');
  input.id = 'input'; // ?
  input.type = 'text'; // ?
  let containerButton = createElement('div', 'container-button');
  let cancel = createElement('button', 'buttons', `Cancel`);
  cancel.addEventListener('click', cancelIt); // ?
  let add = createElement('button', 'buttons', `Save changes`);
  add.addEventListener('click', doIt);

  rootNode.appendChild(title);
  rootNode.appendChild(input);
  rootNode.appendChild(containerButton);
  containerButton.appendChild(cancel);
  containerButton.appendChild(add);
  document.querySelector('input').focus();

  function cancelIt() {
    window.location.hash = '';
  }

  function doIt() {
    let value = document.getElementById('input').value;
    if (value === ``) {
      return alert(`You didn't input any text!`);
    }
    todoItems.push({
      isDone: false,
      id: `${counter + 1}`,
      description: `${value}`
    });
    counter++;
    window.location.hash = '';

    return todoItems;
  }
}

function rename () {
  const LENGTH = 8;
  let n = window.location.hash.substr(LENGTH);
  n--;
  let title = createElement('h1', 'title', `Modify item`);
  let input = createElement('input');
  input.id = 'editor';
  input.value = todoItems[n].description;
  let containerButton = createElement('div', 'container-button');
  let cancelButton = createElement('button', 'buttons', `Cancel`);
  cancelButton.addEventListener('click', backToHome);
  let saveButton = createElement('button', 'buttons', `Save changes`);
  saveButton.addEventListener('click', saveIt);

  rootNode.appendChild(title);
  rootNode.appendChild(input);
  rootNode.appendChild(containerButton);
  containerButton.appendChild(cancelButton);
  containerButton.appendChild(saveButton);

  function backToHome() {
    window.location.hash = '';
  }

  function saveIt() {
    let value = document.getElementById('editor').value;
    if (value === '') {
      return alert(`You didn't input any text!`);
    }
    todoItems[n].description = value;
    window.location.hash = '';

    return todoItems;
  }
}

window.addEventListener('hashchange',() => {
  if (window.location.hash === '#add') {
    rootNode.innerText = '';
    addNewItems();
  } else if (window.location.hash === `#${temp}`) {
    rootNode.innerText = '';
    rename();
  } else {
    rootNode.innerText = '';
    mainPage();
  }
});