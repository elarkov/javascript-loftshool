export default function initSearch(){

    /* поиск по спискам друзей */
    const searchLeft = document.querySelector('.form-search__input_left'),
        searchRight = document.querySelector('.form-search__input_right');

    searchLeft.addEventListener('input', (e) => {
        const listFriendsLeft = document.querySelectorAll('.js-yourfriends .list__wrap .list__item');
        renderList(listFriendsLeft, searchLeft);
    });

    searchRight.addEventListener('input', () => {
        const listFriendsRight = document.querySelectorAll('.js-friendslist .list__wrap .list__item');
        renderList(listFriendsRight, searchRight);
    });

    /* проверка подстроки в найденом слове */
    function isMatching(full = ' ', chunk = ' ') {
        if (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    /* функция рендеринга */
    function renderList(arrData = ' ', element = ' ') {
        for (let key in arrData) {
            if(isMatching(arrData[key].textContent, element.value)) {
                for(let i = 0; i < arrData.length; i++){
                    arrData[key].parentNode ? arrData[key].parentNode.style.display = 'flex': '';
                }
            } else if (!(isMatching(arrData[key].textContent, element.value))) {
                for(let i = 0; i < arrData.length; i++){
                    arrData[key].parentNode ? arrData[key].parentNode.style.display = 'none': '';
                }
            }
        }
    }

}