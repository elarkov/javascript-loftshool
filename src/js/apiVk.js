
export default function initApiVk(){

    /* подключаем API vk.com */
    function initVK(){

        return new Promise((resolve, reject) => {

            VK.init({
                apiId: 6488008
            });

            VK.Auth.login(data => { //регистрируем логин
                if(data.session) {
                    resolve();
                } else {
                    reject(new Error('Авторизация не удалась!'));
                }
            }, 2);

        });

    }

    //делаем запрос к vk.com
    function callAPI(method, params) {

        params.v = '5.76'; //версия ответа

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });

        });

    }

    /* подгружаем шаблонизатор Handlebars */
    const friendsList = document.querySelector('.js-yourfriends'),
        friendsSelected = document.querySelector('.js-friendslist');

    new Promise(resolve => window.onload = resolve)
        .then(() => initVK())
        .then(() => callAPI('friends.get', {fields: 'photo_100'}))
        .then(friends => {

            friendsList.innerHTML = render(friends); //згружаем список друзей из вк

            return new Promise((resolve) => {

                /* Выводим сохраненные данные из localStorage */
                if(localStorage.data){
                    const arraySelectItem = JSON.parse(localStorage.data);
                    resolve(arraySelectItem);
                }

            });
        })
        .then( (arraySelectItem) => {

            for (let prop in arraySelectItem) {

                const result = document.getElementById(arraySelectItem[prop]);
                result.lastElementChild.setAttribute('class', 'list__close');
                result.lastElementChild.setAttribute('src', 'img/close.png');

                friendsSelected.appendChild(result);
            }

        })
        .catch(e => alert('Ошибка: ' + e.message));

}