function initModalWindow(){

    let logoClick = document.querySelector('.js-logo'),
        modal = document.querySelector('.js-modal'),
        btnCloseModal = document.querySelector('.js-close');

    logoClick.addEventListener('click', function(){
        modal.style.display = 'block';
    });

    btnCloseModal.addEventListener('click', function(){
        modal.style.display = 'none';
    });

}


export {
    initModalWindow
}