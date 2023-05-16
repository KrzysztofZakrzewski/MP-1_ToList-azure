// 'use strict';

// const { create } = require('browser-sync');

const discriptionBtn = document.querySelector('.discription-btn');
const discriptionPopup = document.querySelector('.discription');
const BurgerBtn = document.querySelector('.burger');

let newToDo;
let thing;
let taskToEdit;
const container = document.querySelector('.container');

let cell = document.querySelectorAll('.cell');
let popup = document.querySelector('.popup');
const popupInput = document.querySelector('.popup-input');
const popupAcceptBtn = document.querySelector('.accept');
const popupCloseBtn = document.querySelector('.cancel');
const popupInfo = document.querySelector('.popup-info');

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

function main() {
	preperDomEvents();
}

function preperDomEvents() {
	addBtn.addEventListener('click', addNewTask);
	cell.addEventListener('click', clickCheck);
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
		let thing = e.target.closest('.cell').querySelector('.thing');
		thing.classList.toggle('completed');
		console.log(e.target);
	} else if (e.target.matches('.edit')) {
		editToDoTask(e);
	}
}

function editToDoTask(e) {
	const cell = e.target.closest('.cell');
	const thing = cell.querySelector('.thing');
	taskToEdit = thing;
	popupInput.value = thing.textContent;
	popup.style.display = 'flex';
}

function updateToDoText() {
	if (popupInput.value !== '') {
		thing = document.querySelector('.thing');
		popupInput.textContent = thing.textContent;
		taskToEdit.textContent = popupInput.value;
		popup.style.display = 'none';
		popupInfo.textContent = '';
	} else {
		popupInfo.textContent = 'Add some task or matter...';
	}
}

function closePopupFunction(e) {
	if (e.target.matches('.cancel')) {
		popup.style.display = 'none';
		popupInfo.textContent = '';
	}
}

container.addEventListener('click', clickCheck);
BurgerBtn.addEventListener('click', showDiscription);
discriptionBtn.addEventListener('click', showDiscription);
popupCloseBtn.addEventListener('click', closePopupFunction);
popupAcceptBtn.addEventListener('click', updateToDoText);
document.addEventListener('DOMContentLoaded', main);
