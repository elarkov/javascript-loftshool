function moveForm(elem) {

  elem.onmousedown = function(e) { //отследить нажатие на элемент
    let coords = getCoords(elem);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
    moveAt(e);

    //передвинуть по координатам крсора
    function moveAt(e) {
      elem.style.left = e.pageX - shiftX + 'px';
      elem.style.top = e.pageY - shiftY + 'px';
    }

    //пермещаем по экрану
    document.onmousemove = function(e) {
      moveAt(e);
    };

    //окончание переноса
    elem.onmouseup = function() {
      document.onmousemove = null;
      elem.onmouseup = null;
    };

    //отменяем событие браузера dnd по умолчанию
    elem.ondragstart = function() {
      return false;
    };

    function getCoords(elem) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

  }

}


export {
  moveForm
}