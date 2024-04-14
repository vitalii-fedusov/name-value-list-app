
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.list');

form.addEventListener('submit', add);

const pairList = [];

function add(event) {
  event.preventDefault();
  const inputValue = input.value.trim();

  if (!inputValue.includes('=')) {
    showErrorMessage();
  }

  const name = inputValue.split('=')[0].trim();
  const value = inputValue.split('=')[1].trim();

  const item = { name, value };

    if (name && value) {
    const li = document.createElement('li');
    li.textContent = `${name}=${value}`;
    list.appendChild(li);
    input.value = '';
    pairList.push(item);
  } else {
    showErrorMessage();
  }
}

function showErrorMessage() {
  alert('please enter valid text, for example: name=value');
}
