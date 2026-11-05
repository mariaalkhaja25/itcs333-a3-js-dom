// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.querySelector('form') || document.getElementById('todo-form');
  const input = document.querySelector('#todo-input') || document.querySelector('input[type="text"]');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  
  function addItem(e) {
    if (e) e.preventDefault();
    const text = input ? input.value.trim() : '';

    if (!text) {
      if (errorMsg) errorMsg.style.display = 'block';
      return;
    }

    if (errorMsg) errorMsg.style.display = 'none';

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    input.value = '';
    updateUI();
  }


  if (form) {
    form.addEventListener('submit', addItem);
  } else if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addItem(e);
    });
  }

 
  todoList.addEventListener('click', (e) => {
    const target = e.target;


    if (target.classList.contains('delete-btn')) {
      target.closest('li').remove();
      updateUI();
      return;
    }

  
    const li = target.closest('li');
    if (li && todoList.contains(li)) {
      li.classList.toggle('completed');
      updateUI();
    }
  });


  if (filterAll) {
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      updateUI();
    });
  }

  if (filterActive) {
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      updateUI();
    });
  }

  if (filterDone) {
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      updateUI();
    });
  }


  function updateUI() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;

    items.forEach((li) => {
      const isCompleted = li.classList.contains('completed');

      if (!isCompleted) {
        activeCount++;
      }

    
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      }
    });


    if (counter) {
      counter.textContent = `${activeCount} item(s) left`;
    }
  }


  updateUI();
});
