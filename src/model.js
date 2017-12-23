// создаем представление для данных это может быть обьект или класс
export default class Model {
	// начальное состояние модели - массив
	constructor(state = []) {
		// помещаем первонач сост в свойство класса
		this.state = state;
	}
	// метод получения данных (одного тодо) из состояния по 'id'
	getItem(id) {
		return this.state.find(item => item.id == id);
	}
	// метод добавления данных состояния
	addItem(item) {
		this.state.push(item);
	}
	// метод для изменения данных состояния по 'id' обьекта и 
	// данным на которые он обновляется
	updateItem(id, data) {
		const item = this.getItem(id);  // находим обьект состояния
		//перебир свойства обьекта дата и у обьекта item появятся все свойст обьекта data
		Object.keys(data).forEach(prop => item[prop] = data[prop]);
	}
	//удаление метода из масива
	removeItem(id) {
		//находим индекс
		const index = this.state.findIndex(item => item.id == id);
		// если элемент найден то вырезаем его методом сплайс
		if (index > -1) {
			this.state.splice(index, 1);
		}
	}
}

