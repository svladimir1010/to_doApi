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