/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

	//генератор случайного цвета
	function generateColor() {
		return '#' + Math.floor(Math.random()*16777215).toString(16);
	}

	//размеры окна
	let size = Math.floor(Math.random() * 100 + 50);
	let posx = (Math.random() * (window.innerWidth - size)).toFixed();
	let posy = (Math.random() * (window.innerHeight - size)).toFixed();
	let div = document.createElement('div');
  
	div.setAttribute('class', 'draggable-div');
	div.style.height = size + 'px';
	div.style.width = size + 'px';
	div.style.backgroundColor = generateColor().toString();
	div.style.left = posx + 'px';
	div.style.top = posy + 'px';

	return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

	let dragStartX;
	let dragStartY;
	let objInitLeft;
	let objInitTop;
	let inDrag = false;

	target.addEventListener('mousedown', e => {
		inDrag = true;
		objInitLeft = target.offsetLeft;
		objInitTop = target.offsetTop;
		dragStartX = e.pageX;
		dragStartY = e.pageY;
	});

	target.addEventListener('mousemove', e => {
		if(!inDrag) {
			return;
		}
		target.style.left = (objInitLeft + e.pageX - dragStartX) + 'px';
		target.style.top = (objInitTop + e.pageY - dragStartY) + 'px';
	});

	target.addEventListener('mouseup', () => inDrag = false);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
