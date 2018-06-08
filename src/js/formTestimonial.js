
function formTestimonial(res){

  /*=== выводим форму заполнения отзыва ===*/
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

export {
  formTestimonial
}