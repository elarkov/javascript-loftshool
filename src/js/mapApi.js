function initMapApi(){

  /*=== инициализация яндекс карты ===*/
  ymaps.ready(init);

  /*=== сохраняем информацию о метках ===*/
  const saveCounter = (function() {

    let count = sessionStorage.getItem('counter') || 0;

    return function (item) {
      sessionStorage.setItem(count, item);
      count++;
      sessionStorage.setItem('counter', count)
    }

  })();



  function init(ymaps){

    myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7
    });

    var myMap;
    let popupForm;
    let map = document.querySelector('#map');
    let places = [];

    // Создаем собственный макет с инфой о выбранном геообъекте.
    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
      '<div class=ballon_body>{{ properties.balloonContent|raw }}</div>' +
      '<a id=ballon_header>{{ properties.balloonContentHeader|raw }}</a>');

    /*=== создание кластеризатора ===*/
    let clusterer = new ymaps.Clusterer({
      clusterDisableClickZoom: true,
      clusterOpenBalloonOnClick: true,
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonItemContentLayout: customItemContentLayout,
      clusterBalloonPanelMaxMapArea: 0,
      clusterBalloonContentLayoutWidth: 200,
      clusterBalloonContentLayoutHeight: 130,
      clusterBalloonPagerSize: 3,
      groupByCoordinates: false
    });

    /*=== Достаем то, что сохранили в sessionStorage ===*/
    if (sessionStorage.getItem('0')) {
      for (let i = 0; i < sessionStorage.length - 2; i++) {
        let el = sessionStorage.getItem(i).split(',');

        let place = new ymaps.Placemark([
          el[0], el[1]
        ],{
          ballonContentHeader: el[3],
          ballonContent: el[2]
        }, {
          openBalloonOnClick: false
        });

        places.push(place);
        clusterer.add(places);
        myMap.geoObjects.add(clusterer);
      }
    }

    /*=== выводим форму заполнения отзыва ===*/
    function formTestimonial(res) {

      return `<div class="popup-header">
                <img class="popup-header__icon" src="../../src/img/location.svg" alt="location-icon">
                <span class="popup-header__title">${res}</span>
                <span class="close"><img class="close__btn" src="../../src/img/btn-close.png" alt=""></span>
              </div>
                <div class="popup-content__post"></div>
                <div class="popup-content">
                <div class="forma-header">Ваш отзыв</div>
                <div class="forma__row">
                  <input placeholder="Ваше имя" class="forma__input" type="text" name="user_name"/>
                </div>
                <div class="forma__row">
                  <input placeholder="Укажите место" class="forma__input" type="text" name="user_place"/>
                </div>
                <div class="forma__row">
                  <textarea class="forma__msg" placeholder="Поделитесь вашими впечатлениями" name="user_feedback"/></textarea>
                </div>
                <div class="forma__button">
                  <input class="button" type="submit" value="Добавить" />
                </div></div>`;
    }

    function feedback(res, ev, data) {

      if (map.children[1]) {
        map.removeChild(map.children[1]);
      }

      popupForm = document.createElement('div');
      popupForm.setAttribute('class', 'popup');
      popupForm.setAttribute('style', `left: ${ev.get('pagePixels')[0]}px; top: ${ev.get('pagePixels')[1]}px;`);
      popupForm.innerHTML = formTestimonial(res);

      /*=== Отображаем блок с данными на карте ===*/
      let posts = popupForm.children[1];

      posts.innerHTML = data;
      map.appendChild(popupForm);

      /*=== Вешаем событие клика на кнопку с крестиком ===*/
      let btnClose = document.querySelector('.close');
      btnClose.addEventListener('click', function () {
        map.removeChild(popupForm);
      });

      /*=== Вешаем событие клика на кнопку "Добавить" ===*/
      let btnAdd = document.querySelector('.button');

        btnAdd.addEventListener('click', function() {

        let posts = popupForm.children[1];
        let post = document.createElement('div');

        if (posts.childNodes[0].textContent === 'Не одного отзыва еще не было оставлено...') {
          posts.innerHTML = '';
        }

        popupForm.setAttribute('id', 'post');

        /*=== Код из песочницы яндекс карты ===*/
        post.innerHTML = `<span class="popup-content__span">${$('input[name="user_name"]').val()}</span> 
                          <span class="popup-content__date">${$('input[name="user_place"]').val()}</span>
                          <span class="popup-content__date">${new Date().toISOString().slice(0, 10)}</span>
                          <div class="popup-content__msg">${$('textarea[name="user_feedback"]').val()}</div>`;
        posts.appendChild(post);


        let place = new ymaps.Placemark(ev.get('coords'), {
          ballonContentHeader: res,
          ballonContent: post.innerHTML
        }, {
          openBalloonOnClick: false
        });

        saveCounter([place.geometry._coordinates,
                     place.properties._data.ballonContent,
                     place.properties._data.ballonContentHeader]);

        places.push(place);
        clusterer.add(places);
        myMap.geoObjects.add(clusterer);
      });
    }

    /*=== Вешаем событие клика по карте ===*/
    myMap.events.add('click', function(ev) {
      let coords = ev.get('coords');

      ymaps.geocode(coords).then(function(res) {
        feedback(res.geoObjects.get(0).properties._data.name, ev, 'Не одного отзыва еще не было оставлено. Будь те первыми...');
      })
    });

    /*=== Вешаем событие клика по геообъекту ===*/
    myMap.geoObjects.events.add('click', function(ev) {

      let coords = ev.get('coords');
      let data = ev.get('target').properties._data.ballonContent;
      let items = ev.get('target').properties.get('geoObjects');

      /*=== Проверка на то, что это не является кластаризатором ===*/
      if (!ev.get('target')._clusterListeners) {

        ymaps.geocode(coords).then(function(res) {
          feedback(res.geoObjects.get(0).properties._data.name, ev, data)
        });

      } else {

        if (myMap.balloon) {
          let result = '';

          for (let i = 0; i < items.length; i++) {
            result = result + items[i].properties._data.ballonContent;
          }

          document.getElementsByTagName('body')[0].addEventListener('click', function (event) {

            if (event.target.id === "ballon_header") {
              myMap.balloon.close();
              feedback(event.target.innerText, ev, result);
            }
          });
        }
      }
    });
  }
}


export {
  initMapApi
}