'use strict';

// Переменные
let formInput = document.querySelector('.form__input'),
    formBtn = document.querySelector('.form__btn'),
    todoList = document.querySelector('.todo-list'),
    selectFilter = document.querySelector('.select__filter');


// event listeners
formBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
selectFilter.addEventListener('click', addFilter);
// Функции
function addTodo(event) {
    event.preventDefault();
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    let newTodo = document.createElement('li');
    newTodo.innerHTML = formInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // добавить в localStorage
    saveLocalTodos(formInput.value);
    // кнопка галочка
    let completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fa fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);
    // кнопка удаления
    let trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    // добавить в todo-list
    todoList.appendChild(todoDiv);
    // очистить данные formInput
    formInput.value = "";
}


function deleteCheck(e) {
    // удалить toDo
    let item = e.target;
    if (item.classList[0] === 'trash-btn') {
        let todo = item.parentElement;
        // Анимация
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    // кнопка галочка
    if (item.classList[0] === 'complete-btn') {
        let todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function addFilter(e) {
    let todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case 'all': 
                todo.style.display = 'flex';
                break;
            case 'completed': 
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
        }
    });
}


function saveLocalTodos(todo) {
    // проверка на наличие записи
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

