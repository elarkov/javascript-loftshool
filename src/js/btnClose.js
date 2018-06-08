import { popupForm } from "./mapApi";

function btnClose(){

  let btnClose = document.querySelector('.close');

  btnClose.addEventListener('click', function () {
    map.removeChild(popupForm);
  });

}

export {
  btnClose
}