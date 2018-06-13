import { formTestimonial } from "./formTestimonial";
import { btnClose } from "./btnClose";
import { moveForm } from "./moveForm";

let popupForm;

function initMapApi() {

  /*=== инициализация яндекс карты ===*/
  ymaps.ready(init);

  /*=== сохраняем информацию о метках ===*/
  const saveCounter = (function(){
    let count = sessionStorage.getItem('counter') || 0;

    return function (item) {
      sessionStorage.setItem(count, item);
      count++;
      sessionStorage.setItem('counter', count);
    }

  })();


  function init(ymaps){

    myMap = new ymaps.Map("map", {
      center: [55.0084, 82.9357],
      zoom: 13
    });

    var myMap;
    let map = document.querySelector('#map');
    let places = [];

      // Создаем собственный макет с инфой о выбранном геообъекте.
    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      // Флаг "raw" означает, что данные вставляют "как есть" без экранирования html.
      '<div class="ballon"><a id=ballon_header>{{ properties.balloonContentHeader|raw }}</a>' +
      '<div class=ballon_body>{{ properties.balloonContent|raw }}</div></div>');

      /*=== создание кластеризатора ===*/
      var clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
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

    /*=== достаем то, что сохранили в sessionStorage ===*/
    if (sessionStorage.getItem('0')) {
      for (var i = 0; i < sessionStorage.length - 1; i++) {
        let el = sessionStorage.getItem(i).split(',');

        let place = new ymaps.Placemark([
          el[0], el[1]
        ],{
          balloonContentHeader: el[3],
          balloonContent: el[2]
        }, {
          openBalloonOnClick: false
        });


        places.push(place);
        clusterer.add(places);
        myMap.geoObjects.add(clusterer);
      }
    }

    function feedback(res, ev, data) {

      if (map.children[1]) {
        map.removeChild(map.children[1]);
      }

      popupForm = document.createElement('div');
      popupForm.setAttribute('class', 'popup');
      popupForm.setAttribute('style', `left: ${ev.get('pagePixels')[0]}px; top: ${ev.get('pagePixels')[1]}px;`);
      popupForm.innerHTML = formTestimonial(res);

      let posts = popupForm.children[1];

      posts.innerHTML = data;
      map.appendChild(popupForm);

      btnClose();

      let btnAdd = document.querySelector('.button');

      btnAdd.addEventListener('click', function (e) {
        e.preventDefault();

        let posts = popupForm.children[1];

        let post = document.createElement('div');

        if (posts.childNodes[0].textContent === 'Ни одного отзыва еще не было оставлено.') {
          posts.innerHTML = '';
        }

        popupForm.setAttribute('id', 'post');

        post.innerHTML = `<span class="popup-content__span">${$('input[name="user_name"]').val()}</span> 
                          <span class="popup-content__date">${$('input[name="user_place"]').val()}</span>
                          <span class="popup-content__date">${new Date().toISOString().slice(0, 10)}</span>
                          <div class="popup-content__msg">${$('textarea[name="user_feedback"]').val()}</div>`;
        posts.appendChild(post);
        document.querySelector('.popup-content').reset();

        let place = new ymaps.Placemark(ev.get('coords'), {
          balloonContentHeader: res,
          balloonContent: post.innerHTML
        }, {
          openBalloonOnClick: false
        });

        saveCounter([place.geometry._coordinates,
          place.properties._data.balloonContent,
          place.properties._data.balloonContentHeader]);

        places.push(place);
        clusterer.add(places);
        myMap.geoObjects.add(clusterer);
      });
      moveForm(popupForm);
    }

    /*=== вешаем событие клика по геообъекту ===*/
    myMap.geoObjects.events.add('click', function (ev) {

      let coords = ev.get('coords');
      let data = ev.get('target').properties._data.balloonContent;
      let items = ev.get('target').properties.get('geoObjects');

      /*=== Проверка на то, что это не является кластаризатором ===*/
      if (!ev.get('target')._clusterListeners) {

        ymaps.geocode(coords).then(function(res) {
          feedback(res.geoObjects.get(0).properties._data.name, ev, data)
        });

      } else {

        if(myMap.balloon) {
          let result = '';

          for (let i = 0; i < items.length; i++) {
            result = result + items[i].properties._data.balloonContent;
          }

          document.getElementsByTagName('body')[0].addEventListener('click', function(event) {

            if (event.target.id === "ballon_header") {
              myMap.balloon.close();
              feedback(event.target.innerText, ev, result);
            }
          });
        }
      }
    });

    /*=== вешаем событие клика по карте ===*/
    myMap.events.add('click', function (ev) {
      let coords = ev.get('coords');

      ymaps.geocode(coords).then(function (res) {
        feedback(res.geoObjects.get(0).properties._data.name, ev, 'Ни одного отзыва еще не было оставлено.');
      })
    });
  }
}


export {
  initMapApi,
  popupForm
}