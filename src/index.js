/*=== styles ===*/

import './scss/layout/fonts.scss'
import './scss/layout/base.scss'

/*=== Handlebars template ===*/
import render from './templates/friends.hbs';

/*=== scripts modules ===*/

import initModalWindow from './js/modalWindow';
import initAddDelBtn from './js/addDelBtn';
import initApiVk from './js/apiVk';

import initLocalStorage from './js/localStorage';
import initDnd from './js/dnd';
import initSearch from './js/search';




initModalWindow();
initAddDelBtn();
initApiVk();
initLocalStorage();
initDnd();
initSearch();

