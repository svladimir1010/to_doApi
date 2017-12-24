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

class EventEmitter {
	constructor() {
		this.events = {
/*обьект событие состоящее из свойств в виде масива с 
методами которые должны dspdfnmcz-сработать на это событие - callback*/
// при первом вызове обьект событие пустой
			/*'add': [callback,callback,callback,callback],
			'edit': [cb,cb,cb,cb]*/

		};
	}

	on(type, callback) {
		//если свойство что то вернет то присваиваем ему
		//же обратно иначе присв пустой массив
		this.events[type] = this.events[type] || [];
		//и добавляем callback
		this.events[type].push(callback); 
	}
//прин тип события и аргум
emit(type, arg) {
		//если есть что вызывать 
		if (this.event[type]) {
			//то по очереди вызовем все колбэки и отправим туда аргумент
			this.events[type].forEach(callback => callback(arg));
		}
	}

}

export { createElement, EventEmitter };