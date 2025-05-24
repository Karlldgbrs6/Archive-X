@@ -1,101 +0,0 @@
function saveToLocalStorage(category, items) {
  localStorage.setItem(`archivex-${category}`, JSON.stringify(items));
}

function loadFromLocalStorage(category) {
  const data = localStorage.getItem(`archivex-${category}`);
  return data ? JSON.parse(data) : [];
}

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 5000);
}

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.remove('active');
  });
  document.getElementById(tabId).classList.add('active');
  showLoader();
}

function updateCount(category) {
  const count = loadFromLocalStorage(category).length;
  document.getElementById(`count-${category}`).textContent = count;
}

function createElement(item, category, index) {
  const div = document.createElement('div');
  div.className = 'item';

  if (category === 'images') {
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.description || '';
    img.style.maxWidth = '100px';
    img.style.display = 'block';
    div.appendChild(img);
  } else {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.url;
    link.target = '_blank';
    div.appendChild(link);
  }

  if (item.description) {
    const desc = document.createElement('p');
    desc.textContent = item.description;
    div.appendChild(desc);
  }

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Supprimer';
  delBtn.className = 'delete-button';
  delBtn.onclick = () => deleteItem(category, index);
  div.appendChild(delBtn);

  return div;
}

function addItem(category) {
  const url = prompt(`Entrez l'URL ou le chemin du ${category}`);
  if (!url) return;
  const description = prompt("Entrez une description (optionnelle):");
  const items = loadFromLocalStorage(category);
  items.push({ url, description });
  saveToLocalStorage(category, items);
  renderItems(category);
}

function deleteItem(category, index) {
  const items = loadFromLocalStorage(category);
  items.splice(index, 1);
  saveToLocalStorage(category, items);
  renderItems(category);
}

function renderItems(category) {
  const container = document.getElementById(`list-${category}`);
  container.innerHTML = '';
  const items = loadFromLocalStorage(category);
  items.forEach((item, index) => {
    const el = createElement(item, category, index);
    container.appendChild(el);
  });
  updateCount(category);
}

['links', 'images', 'files', 'others'].forEach(cat => renderItems(cat));

function showLogin() {
  alert('Fonction Connexion à implémenter');
}

function showRegister() {
  alert('Fonction Inscription à implémenter');
}
