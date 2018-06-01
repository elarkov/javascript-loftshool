export default function initAddDelBtn(){

    const friendsList = document.querySelector('.js-yourfriends'),
        friendsSelected = document.querySelector('.js-friendslist');

    /* сценарий клика на кнопку "плюс" и "крестик-удалить" */
    friendsList.addEventListener('click', function(e){
        if(e.target.getAttribute('class') === 'list__plus'){
            e.target.setAttribute('class', 'list__close');
            e.target.setAttribute('src', 'img/close.png');
            friendsSelected.appendChild(e.target.parentNode);
        }
    });

    friendsSelected.addEventListener('click', function(e){
        if(e.target.getAttribute('class') === 'list__close'){
            e.target.setAttribute('class', 'list__plus');
            e.target.setAttribute('src', 'img/plus.png');
            friendsList.appendChild(e.target.parentNode);
        }
    });

}