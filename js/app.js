// создадим функцию конструктор элементов
function createElement(tag, props, ...children) {
	const element = document.createElement(tag);
	// key - метод глобальн обьекта которы получаем только
	// собственные свойства у самого обьекта без унаследованных свойств
	Object.keys(props).forEach(key => (element[key] = props[key]));
	//console.log("Object.keys(props)", Object.keys(props));
	//console.log('tag', tag);
	//console.log('children', children);

	if (children.length > 0) {
		children.forEach(child => {
			console.log("child", child);

			//проверяем ребенка - если строка то
			if (typeof child === "string") {
				//создаем из нее текстовый узел
				child = document.createTextNode(child);
				console.log("child", child);
			}
			// метод принимает только обьект являющийся узлом
			element.appendChild(child);
		});
	}

	return element;
}

//создание элементов
function createTodoItem(title) {
	//созд чекбокс
	const checkbox = createElement("input", {
		type: "checkbox",
		className: "checkbox"
	});
	// созд лабел нам - нужен текст
	const label = createElement("label", { className: "title" }, title);
	//созд инпут
	const editInput = createElement("input", {
		type: "text",
		className: "textfield"
	});
	//созд кнопку изменения ввода
	const editButton = createElement(
		"button",
		{ className: "edit" },
		"Изменить"
		);
	//созд кнопку удаления вода
	const deleteButton = createElement(
		"button",
		{ className: "delete" },
		"Удалить"
		);
	//последнее созд элемент элай - это НАШ СПИСОК
	const listItem = createElement(
		"li",
		{ className: "todo-item" },
		checkbox,
		label,
		editInput,
		editButton,
		deleteButton
		);

	// привязка события на созданные элементы до их возврата
	bindEvents(listItem);
	//возвращаем листайтем
	return listItem;
}
//создаем функцию взаимодействия пользователя с созданными элементами
function bindEvents(todoItem) {
	const checkbox = todoItem.querySelector(".checkbox");
	const editButton = todoItem.querySelector("button.edit");
	const deleteButton = todoItem.querySelector("button.delete");
	// навешиваем события на эти элементы
	checkbox.addEventListener("change", toggleTodoItem);
	editButton.addEventListener("click", editTodoItem);
	deleteButton.addEventListener("click", deleteTodoItem);
}
//функ - обработчик потому аргумент ивент
function addTodoItem(event) {
	//первое остановим отправку данных на сервер
	event.preventDefault();
	//проверка есть ли ввод, если нет возвращаем строку
	if (addInput.value === "")
		return alert("Необходимо ввести название задачи.");
	//дальше создаем новый элемент для которого создаем еще одну
	//функцию createTodoItem в которую отправл данные инпута
	const todoItem = createTodoItem(addInput.value);
	//помещаем наши созданные элем в наш UL- todoList
	todoList.appendChild(todoItem);
	//и очищаем поле инпутаЮ
	addInput.value = "";
}
//
function toggleTodoItem() {
	//получаем родителя чекбокса родительскую ноду
	const listItem = this.parentNode;
	//console.log("listItem", listItem);
	//присв этому родителю класс сделано ( перечеркивание )
	listItem.classList.toggle("completed");
	//console.log("listItem.classList", listItem.classList);
}
// метод изменения введенных данных
function editTodoItem() {
	//получ родителя
	const listItem = this.parentNode;

	//доступ к названию задачи (к введенным данным)
	const title = listItem.querySelector(".title");
	// получ поле инпута изменения
	const editInput = listItem.querySelector(".textfield");
	// присваиваем родителю -- тру или фолс то есть показ инп и
	// изменить или убрать инп и сохранить изменен
	const isEditing = listItem.classList.contains("editing");
	//  событие ( сохранить )
	if (isEditing) {
		//присваиваем значен из поля редактирования и присваиваем его LABEL
		// то есть названию задачи
		title.innerText = editInput.value;
		console.log("title.innerText", title.innerText);
		console.log("editInput.value", editInput.value);
		// и опять меняем назв кнопки на изменить
		this.innerText = "Изменить";
	} else {
		// событие ( изменить ) вход в поле редактирования
		// значения тайтл присваив полю
		editInput.value = title.innerText;
		console.log("editInput.value", editInput.value);
		console.log("title.innerText", title.innerText);
		this.innerText = "Сохранить";
	}
	// у UL  меняем класс editing
	listItem.classList.toggle("editing");
}
// последняя функция удаления
function deleteTodoItem() {
	//получен листайтем
	const listItem = this.parentNode;
	console.log("listItem", listItem);
	// удаляем
	todoList.removeChild(listItem);
}

// function toggleTodoItem(this) {
// 	//console.log(target);
// 	console.log(this);
// }</html>

//создаем перемен и помещ туда интересующие элементы дом
const todoForm = document.getElementById("todo-form"),
addInput = document.getElementById("add-input"),
todoList = document.getElementById("todo-list"),
todoItems = document.querySelectorAll(".todo-item");
//привяжем обработч события на событие отпр формы
// todoForm.addEventListener("submit", addTodoItem);

//создаем функцию INIT - запуск
(function main() {
	todoForm.addEventListener("submit", addTodoItem);
	// уже существующему списку присваиваем
	// все созданные методы и события
	todoItems.forEach(item => bindEvents(item));
	console.log("todoItems", todoItems);
})();

//main();
