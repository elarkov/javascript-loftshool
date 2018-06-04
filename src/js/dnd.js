function initDnd() {

    const list = document.querySelectorAll('.list');

    /* реализация Drag and Drop слева на право */
    function dragStart(ev) { //функция обработки старта события
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('Text', ev.target.getAttribute('id'));
        ev.dataTransfer.setDragImage(ev.target, 135, 22);
        return true;
    }

    /* функция обработки перетаскивания конечного элемента */
    function dragEnter(ev) {
        event.preventDefault();
        return true;
    }

    /* функция обработки наведения мыши на элемент */
    function dragOver(ev) {
        event.preventDefault();
        ev.dataTransfer.setData("id", ev.target.id);
        ev.dataTransfer.setData("element", ev.target.innerHTML);
    }

    /* функция обработки drop элемента */
    function dragDrop(ev) {
        const data = ev.dataTransfer.getData('Text');
        const lastElem = document.getElementById(data).children[2];

        if(ev.currentTarget.classList.contains('js-friendslist')) {
            lastElem.setAttribute('class', 'list__close');
            lastElem.setAttribute('src', './src/img/close.png');
        } else if(ev.currentTarget.classList.contains('js-yourfriends')){
            lastElem.setAttribute('class', 'list__plus');
            lastElem.setAttribute('src', './src/img/plus.png');
        }

        ev.currentTarget.appendChild(document.getElementById(data));

        ev.stopPropagation();
        return false;
    }

    list.forEach(item => {
        item.addEventListener('dragstart', dragStart, false);
        item.addEventListener('dragenter', dragEnter, false);
        item.addEventListener('dragover', dragOver, false);
        item.addEventListener('drop', dragDrop, false);
    });

}


export {
    initDnd
}

