// 'use strict';

// const { create } = require('browser-sync');

const discriptionBtn = document.querySelector('.discription-btn');
const discriptionPopup = document.querySelector('.discription');
const BurgerBtn = document.querySelector('.burger');
let newToDo;
let thing;
const cell = document.querySelector('.cell');

const addBtn = document.querySelector('.btn-add');
let todoInput = document.querySelector('.todo-input');
const toDoList = document.querySelector('.todo-list');

function showDiscription() {
	// discriptionPopup.classList.toggle('burger-active')
	if (discriptionPopup.style.display === 'none') {
		discriptionPopup.style.display = 'flex';
	} else {
		discriptionPopup.style.display = 'none';
	}
}

function addNewTask() {
	if (todoInput.value !== '') {
		newToDo = document.createElement('div');
		newToDo.classList.add('cell');

		toDoList.append(newToDo);
		createThinkParagraph();
		createToolsArea();
		// newTodo.append(toolsPanel);
		// newToDo.append(thing)
		console.log(newToDo);
	}
}

function createThinkParagraph() {
	thing = document.createElement('p');
	thing.classList.add('thing');
	thing.textContent = todoInput.value;
	newToDo.append(thing);
}

function createToolsArea() {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	// toolsPanel.style.display = 'block'

	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete', 'tools-btn');
	completeBtn.textContent = '✅';
	completeBtn.style.margin = '0 5px 0 0px';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit', 'tools-btn');
	editBtn.textContent = 'EDIT';
	editBtn.style.margin = '0 5px 0 0px';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete', 'tools-btn');
	deleteBtn.textContent = '❌';
	// deleteBtn.style.margin = '0 5px 0 5px';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
	newToDo.append(toolsPanel);
}

// check which button in the ToDolist tools was clicked

function clickCheck(e) {
	if (e.target.matches('.complete')) {
		const thing = e.target.closest('.cell').querySelector('.thing');
		thing.classList.toggle('completed');
		console.log(e.target);
	}
}

BurgerBtn.addEventListener('click', showDiscription);
discriptionBtn.addEventListener('click', showDiscription);

addBtn.addEventListener('click', addNewTask);

cell.addEventListener('click', clickCheck);
