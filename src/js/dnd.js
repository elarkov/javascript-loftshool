function initDnd() {

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
    }

    /* функция обработки drop элемента */
    function dragDrop(ev) {
        const data = ev.dataTransfer.getData('Text');
        const lastElem = document.getElementById(data).children[2];

        ev.target.classList.contains('js-yourfriends');
        lastElem.setAttribute('class', 'list__plus');
        lastElem.setAttribute('src', 'images/plus.png');

        ev.currentTarget.appendChild(document.getElementById(data));

        ev.stopPropagation();
        return false;
    }

    /* Drog and Drop справа на лево */
    function dragstart(ev) {
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('Text', ev.target.getAttribute('id'));
        ev.dataTransfer.setDragImage(ev.target, 135, 22);
        return true;
    }

    function dragenter(ev) {
        event.preventDefault();
        return true;
    }

    function dragover(ev) {
        event.preventDefault();
    }

    function dragdrop(ev) {
        const data = ev.dataTransfer.getData('Text');
        const lastElem = document.getElementById(data).children[2];

        ev.target.classList.contains('js-friendslist');
        lastElem.setAttribute('class', 'list__close');
        lastElem.setAttribute('src', 'images/close.png');

        ev.currentTarget.appendChild(document.getElementById(data));

        ev.stopPropagation();
        return false;
    }

}

export {
    initDnd
}

