import { createElement } from "./help.js"; //импорт функ createElement
// можем создать и с помощью обьекта
// const view = {}

//обьект представления отвечает за внешний вид
// манипуляции с HTML и ничего не знает о модели
//  только о том как работать с DOM элементами
export default class View {
	constructor() {
		// получаем данные для класса
		this.form = document.getElementById("todo-form"); //получаем форму
		this.input = document.getElementById("add-input"); //получаем инпут
		this.list = document.getElementById("todo-list"); //получаем список

		this.form.addEventListener("submit", this.handleAdd.bind(this));
	}
	// метод который будет создавать элемент
	createElement(todo) {
		//создаем элемент checkbox
		const checkbox = createElement("input", {
			type: "checkbox",
			className: "checkbox",
			checked: todo.completed ? "checked" : ""
		});
		const label = createElement(
			"label",
			{ className: "title" },
			todo.title
		);
		const editInput = createElement("input", {
			type: "text",
			className: "textfield"
		});
		const editButton = createElement(
			"button",
			{ className: "edit" },
			"Изменить"
		);
		const removeButton = createElement(
			"button",
			{ className: "remove" },
			"Удалить"
		);
		// создаем сам элемент li
		const item = createElement(
			"li",
			{
				className: `todo-item${todo.completed ? " completed" : ""}`,
				"data-id": todo.id
			},
			checkbox,
			label,
			editInput,
			editButton,
			removeButton
		);
		return this.addEventListeners(item);
	}
	//теперь навешиваем обработчик на внутренние элементы элемента li
	//метод получает элемент li и возвращает его же
	addEventListeners(item) {
		const checkbox = listItem.querySelector(".checkbox"); // событие на check
		const editButton = listItem.querySelector("button.edit"); //на кнопку изменить
		const removeButton = listItem.querySelector("button.remove"); //на кнопку удалить

		//вешаем обработчик событие
		checkbox.addEventListener("change", this.handleToggle.bind(this));
		editButton.addEventListener("click", this.handleEdit.bind(this));
		removeButton.addEventListener("click", this.handleRemove.bind(this));

		return item;
	}

	handleAdd(event) {
		event.preventDefault();
		//в случае пустого поля
		if (!this.input.value)
			return alert("Необходимо ввести название задачи");

		const value = this.input.value;

		// add item to model
	}

	handleToggle({ target }) {
		const listItem = target.parentNode;
		const id = listItem.getAttribute("data-id");
		const completed = target.completed;

		//update model
	}

	// метод просходящий при нажати на кнопку изменить в задаче
	handleEdit({ target }) {
		const listItem = target.parentNode;
		const id = listItem.getAttribute("data-id");
		const label = listItem.querySelector(".title");
		const input = listItem.querySelector(".textfield");
		const editButton = listItem.querySelector("button.edit");
		const title = input.value; //то что введено
		const isEditing = listItem.classList.contains("editing");

		if (isEditing) {
			// update model
		} else {
			input.value = label.textContent;
			editButton.textContent = "Сохранить";
			listItem.classList.add("editing");
		}
	}
	//  метод удаления элемента из модели
	handleRemove({ target }) {
		const listItem = target.parentNode;

		//remove item from model
	}

	//метод для добавл нового элемен в список
	addItem(todo) {
		//список принима нов тодо обьект задачу
		const listItem = this.createElement(todo); //созд нов li и отправл ему обьект задачу

		this.input.value = ""; //очищаем инпут
		this.list.appendChild(listItem); // добавляем li в список ul
	}

	//дополнительный метод для поиска li по его id
	findListItem(id) {
		//ПРОСИМ  ul найти усебя элемент с атрибутом data-id
		return this.list.querySelector(`[data-id = "${id}"]`);
	}
	// в методе TOGGL мы переключаем задачу с выполненой на невыполн - отмеч checkbox
	toggleItem(todo) {
		//получаем li котор уже есть в dom с помощью
		// findlistItem , и передаем туда todo.id
		const listItem = this.findListItem(todo.id);
		const checkbox = listItem.querySelector(".checkbox");
		//меняем свойство checkbox на то котороя в задаче
		checkbox.checked = todo.completed;

		// todo.completed ? listItem.classList.add('completed') : listItem.classList.remove('completed');
		if (todo.completed) {
			listItem.classList.add("completed");
		} else {
			listItem.classList.remove("completed");
		}
	}

	// метод для изменения заголовка задачи, он приним обьект задачи
	// этот метод сработает после того как задача обновится в хранилище
	// и методу будут перед задача с обновленным значением
	editItem(todo) {
		const listItem = this.findListItem(todo.id);
		const label = listItem.querySelector(".title"); // получаем лэйбел
		const input = listItem.querySelector(".textfield"); // пол инпут
		const editButton = listItem.querySelector(button.edit); // пол кнопку

		//теперь зная что обьект задачи изменен необходимо обновить лэйбл
		//вместо свойства innerText лучше использ textContent(стандартизировано)
		label.textContent = todo.title;
		editButton.textContent = "Изменить"; //меняем текст кнопки
		listItem.classList.remove("editing"); // удаляем класс у listItem
	}

	//метод для удаления элемента из списка
	removeItem(id) {
		const listItem = this.findListItem(todo.id);

		this.list.removeChild(listItem);
	}
}

//получили четыре основных метода
// 1. addItem - для добавления элемента в список
// 2. для изменения(переключение чекбокса и присваивание класса complited)
// 3. для изменения заголовка задачи
// 4. на конец для удаления элемента из списка
//
// В этом методе сам обьект ТОДО никак не меняется только получаются
// из него данные, здесь происх работа с ДОМ
