/* контро-у определяем основные методы для 
 добавления, изменения, удаления задач*/

class Controller() {  //открываем доступ к модели и представлению
	constructor(model, view) {
		// помещаем их в свойства конструктора
		this.model = model;
		this.view = view;

		view.on('add', this.addTodo.bind(this));
		view.on('toggle', this.toggleTodo.bind(this));
		view.on('edit', this.editTodo.bind(this));
		view.on('remove', this.removeTodo.bind(this));
	}

/*view передает событ в контролер который передает  
обьект в модель которая возвращ в контролер который в 
итоге перед представлению*/

//addTodo принимает заголовок задачи
	addTodo(title) {  
	// Мы попросили модель добавить обьект
	
		const todo = this.model.addItem({
			id: Date.now(),
			title: title,
			completed: false
		});
		// далее просим представление добавить его в представление
		this.view.addItem(todo);
	}

	toggleTodo({ id, completed }) {
		const todo = this.model.updateItem(id, { completed });

		this.view.toggleItem(todo);
	}

	editTodo({ id, title }) {
		const todo = this.model.updateItem(id, { title });

		this.view.editItem(todo);
	}

	removeTodo() {
		this.model.removeItem(id);
		this.view.removeItem(id);
	}
}

export default Controller;