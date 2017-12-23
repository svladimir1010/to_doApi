function applyForVisa(documents) {
	console.log("Обработка заявления...");
	let promise = new Promise(function(resolve, reject) {
		setTimeout(function() {
			Math.random() > 0
				? resolve({})
				: reject("В визе отказано: нехват докум");
				// resolve();
				// reject();
				// resolve();

		}, 2000);
	});
	return promise;
}

function bookHotel(visa) {
	console.log(visa)
	console.log('Бронируем отель')
	return {}
}
function buyTickets(booking) {
	console.log('Покупаем билет')
	console.log('бронь', booking)
}

applyForVisa({})
.then(visa => {
	console.info("ВИза получена") 
	return visa
})
.then(bookHotel)
.then(buyTickets)
.catch(error => console.error(error));
