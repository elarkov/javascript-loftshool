function initLocalStorage(){

    /* сохраняем списки друзей в localStorage */
    const btnSave = document.querySelector('.button');
    const storage = localStorage;
    const objSelectedFriends = {};

    btnSave.addEventListener('click', function(){
        const liArr = document.querySelectorAll('.js-friendslist li');

        for(let i = 0; i < liArr.length; i++){
            objSelectedFriends[i] = liArr[i].getAttribute('id');
        }

        storage.data = JSON.stringify(objSelectedFriends);
        alert('Сохранено');
    });
}


export {
    initLocalStorage
}