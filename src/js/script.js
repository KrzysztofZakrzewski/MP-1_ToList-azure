// 'use strict';

const discriptionBtn = document.querySelector('.discription-btn');
const discriptionPopup = document.querySelector('.discription');
const BurgerBtn = document.querySelector('.burger');
const menuLoadPopupBtn = document.querySelector('.load');

const saveData = document.querySelector('.save');
const loadPopup = document.querySelector('.load-popup');
const loadDataPopupBtn = document.querySelector('.load-data-popup-btn');
const closeDataPopupBtn = document.querySelector('.close-data-popup-btn');

let newToDo;
let thing;
let taskToEdit;
let noTaskParagraph;
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
const errorInfo = document.querySelector('.error-info');

// let noTaskParagrph  = document.querySelector('.no-task-paragrph');

function showDiscription() {
	// discriptionPopup.classList.toggle('burger-active')
	if (discriptionPopup.style.display === 'none') {
		discriptionPopup.style.display = 'flex';
	} else {
		discriptionPopup.style.display = 'none';
	}
}

function addFifo() {
	errorInfo.textContent = 'Remeber about FIFO';
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

		todoInput.value = '';
		errorInfo.textContent = 'Remeber about FIFO';
		// newTodo.append(toolsPanel);
		// newToDo.append(thing)
	} else {
		errorInfo.textContent = 'Enter the content of the task';
	}
	removeNoTaskParagraph();
}

function removeNoTaskParagraph() {
	const noTaskParagraph = document.querySelector('.no-task-paragrph');
	if (noTaskParagraph) {
		noTaskParagraph.remove();
	}
}

// function removeNoTaskParagr

function createThinkParagraph() {
	thing = document.createElement('p');
	thing.classList.add('thing');
	thing.textContent = todoInput.value;
	newToDo.append(thing);
}

function createToolsArea() {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');

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
	} else if (e.target.matches('.delete')) {
		deleteTask(e);
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

function deleteTask(e) {
	cell = e.target.closest('.cell');
	cell.remove();

	addNoTaskParagrph();
}

function addNoTaskParagrph() {
	let noTaskParagrph = document.querySelector('.no-task-paragrph');

	const allTask = toDoList.querySelectorAll('.cell');
	console.log(allTask);
	if (allTask.length === 0) {
		noTaskParagrph = document.createElement('p');
		noTaskParagrph.classList.add('no-task-paragrph');
		noTaskParagrph.textContent = 'no tasks';
		toDoList.appendChild(noTaskParagrph);
	}
}

function toggleMenuLoadPopup() {
	loadPopup.classList.toggle('load-active');
}

function saveDataFromParagrafs() {
	const paragrafs = document.querySelectorAll('.thing');
	const data = [];

	paragrafs.forEach((paragraf) => {
		const content = paragraf.textContent;
		const item = {
			content: content,
			completed: false,
		};
		data.push(item);
	});

	const jsonData = JSON.stringify(data);
	createJSONFile(jsonData, 'azure.json');
}

function createJSONFile(data, fileName) {
	const jsonContent = JSON.stringify(data);
	const blob = new Blob([jsonContent], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
}

function loadDataFromJSON() {
	deleteAllTasks();
	const fileInput = document.getElementById('jsonFileInput');
	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (event) {
			const jsonData = event.target.result;
			const data = JSON.parse(jsonData);
			buildToDoList(data);
		};
		reader.readAsText(file);
	}
}

function buildToDoList(data) {
	const toDoList = document.querySelector('toDoList');

	// Wyczyść istniejące zadania
	// toDoList.innerHTML = '';

	// Twórz nowe zadania na podstawie danych
	data.forEach((task) => {
		// Tworzenie elementów listy zadań
		const newTask = document.createElement('div');
		newTask.classList.add('task');

		const content = document.createElement('p');
		content.textContent = task.content;

		const completed = document.createElement('input');
		completed.type = 'checkbox';
		completed.checked = task.completed;

		// Dodawanie elementów do zadania
		newTask.appendChild(content);
		newTask.appendChild(completed);

		// Dodawanie zadania do listy
		toDoList.appendChild(newTask);
	});
}

function deleteAllTasks() {
	const allTastksToDelete = toDoList.querySelectorAll('.cell');
	if (allTastksToDelete.length !== 0) {
		allTastksToDelete.forEach((task) => task.remove());
	}
}

addFifo();

container.addEventListener('click', clickCheck);
BurgerBtn.addEventListener('click', showDiscription);
discriptionBtn.addEventListener('click', showDiscription);
popupCloseBtn.addEventListener('click', closePopupFunction);
popupAcceptBtn.addEventListener('click', updateToDoText);

menuLoadPopupBtn.addEventListener('click', toggleMenuLoadPopup);
saveData.addEventListener('click', saveDataFromParagrafs);
loadDataPopupBtn.addEventListener('click', loadDataFromJSON);
// loadDataPopupBtn.addEventListener('click', toggleMenuLoadPopup);
closeDataPopupBtn.addEventListener('click', toggleMenuLoadPopup);

document.addEventListener('DOMContentLoaded', main);
