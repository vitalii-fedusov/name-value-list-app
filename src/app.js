
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
const sortByNameButton = document.querySelector('#sort-by-name');
const sortByValueButton = document.querySelector('#sort-by-value');
const deleteButton = document.querySelector('#delete');
const showXMLButton = document.querySelector('#show-XML');

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

  if (!isAlphaNumeric(name, value)) {
    return;
  }

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

function isAlphaNumeric(name, value) {
  const regex = /^[a-zA-Z0-9]+$/;
  const errorMessage = 'You can use only alpha-numeric characters in name and value';

  if (!regex.test(name) || !regex.test(value)) {
    alert(errorMessage);

    return false;
  }

  return true;
}

sortByNameButton.addEventListener('click', () => {
  pairList.sort((a, b) => a.name.localeCompare(b.name));

  initList();
});

sortByValueButton.addEventListener('click', () => {
  pairList.sort((a, b) => a.value.localeCompare(b.value));

  initList();
})

function initList() {
  list.innerHTML = '';

  pairList.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name}=${item.value}`;
    list.appendChild(li);
  });
}

list.addEventListener('click', (event) => {
  const selectedItem = event.target;
  
  if (selectedItem.classList.contains('selected')) {
    selectedItem.classList.remove('selected');
  } else {
    selectedItem.classList.add('selected');
  }
});

function generateXML(pairList) {
  let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xmlString += '<items>\n';

  pairList.forEach(item => {
    xmlString += `  <item>\n`;
    xmlString += `    <name>${item.name}</name>\n`;
    xmlString += `    <value>${item.value}</value>\n`;
    xmlString += `  </item>\n`;
  });

  xmlString += '</items>';

  return xmlString;
}

function displayXML(xmlContent) {
  const container = document.querySelector('.container');
  const xmlContainer = document.createElement('div');
  xmlContainer.id = 'xmlContainer';
  xmlContainer.textContent = xmlContent;
  container.appendChild(xmlContainer);
}

showXMLButton.addEventListener('click', () => {
  const xmlContainer = document.getElementById('xmlContainer');

  if (xmlContainer) {
    xmlContainer.remove();
    showXMLButton.textContent = 'Show XML';
  } else {
    const xmlString = generateXML(pairList);
    displayXML(xmlString);
    showXMLButton.textContent = 'Hide XML';
  }
});

deleteButton.addEventListener('click', () => {
  const selectedItems = document.querySelectorAll('.list .selected');

  selectedItems.forEach(selectedItem => {
      const index = pairList.findIndex(item => item.name === selectedItem.textContent.split('=')[0]);
      if (index !== -1) {
          pairList.splice(index, 1);
      }

      selectedItem.remove();
  });
});
