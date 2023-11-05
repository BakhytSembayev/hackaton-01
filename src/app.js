import './styles.css';
import { ShapeModule } from './modules/shape.module';
import '../src/modules/modal.css'
import {ClicksModule} from './modules/clicks.module';
import { BackgroundModule } from './modules/background.module';
import { CanvasParticlesModule } from './modules/canvasParticles.module';
import {ItcModal} from './modules/modal';




const shapeModule = new ShapeModule();
const backgroundModule = new BackgroundModule('background', 'Change background color');
// В момент, когда вы хотите начать анимацию:
const canvasParticlesModule = new CanvasParticlesModule();
canvasParticlesModule.initCanvas(); // Инициализация канваса
canvasParticlesModule.startAnimating(); // Начало анимации

// код из ветки feature/new message
console.log('hallo dude');

let menuContainer = null; // Переменная, хранящая контейнер меню

// Обработчик события при открытии контекстного меню
document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); // Отменяем стандартное контекстное меню

  // Проверяем, открыто ли уже меню
  if (menuContainer) {
    document.body.removeChild(menuContainer); // Удаляем предыдущее меню
  }

  // Создаем контейнер для меню
  menuContainer = document.createElement('ul');
  menuContainer.className = 'menu';

  // Создаем пункты меню
  const items = [
    { label: 'Аналитика выстрелов (кликов)', action: countClicks },
    { label: 'Случайная фигура', action: randomShape },
    { label: 'Волны', action: randomParticles }, // Новый пункт меню
    { label: 'Случайный звук', action: randomSound },
    { label: 'Случайный цвет', action: randomColor },
    { label: 'Вызвать сообщение', action: showMessage }
  ];

  // Добавляем пункты меню в контейнер
  items.forEach(function(item) {
    const menuItem = document.createElement('li');
    menuItem.className = 'menu-item';
    menuItem.textContent = item.label;
    menuItem.addEventListener('click', item.action);
    menuContainer.appendChild(menuItem);
  });

  // Позиционируем контекстное меню на экране
  menuContainer.style.left = event.clientX + 'px';
  menuContainer.style.top = event.clientY + 'px';

  // Добавляем класс для отображения меню
  menuContainer.classList.add('open');

  // Добавляем контекстное меню на экран
  document.body.appendChild(menuContainer);
});

// Обработчик события при клике на другую область экрана или повторном нажатии правой кнопкой мыши
document.addEventListener('click', function(event) {
  if (event.button !== 2 || !menuContainer) return; // Проверяем, не является ли нажатие другой кнопкой или меню не открыто

  document.body.removeChild(menuContainer); // Удаляем меню
  menuContainer = null; // Сбрасываем переменную контейнера меню
});
  
  // Функции для выполнения действий при выборе пунктов меню
  function countClicks() {
    let click = new ClicksModule();
    click.trigger();
    console.log('Считать клики');
  }
  
  function randomShape() {
    shapeModule.trigger(document.body)
  }
  function randomParticles() {
    canvasParticlesModule.trigger(document.body); 
  }

  function randomSound() {
    // Действие при выборе пункта "Случайный звук"
    console.log('Случайный звук');
  }
  
  function randomColor() {    
    backgroundModule.trigger(document.body);
  }
  
  function showMessage() {
    // Действие при выборе пункта "Вызвать сообщение"
    console.log('Вызвать сообщение');
  }


const headerHTML = document.createElement('header');
document.body.append(headerHTML);

const heaerLogoHTML = document.createElement('div');
heaerLogoHTML.className = 'heaer_logo';
headerHTML.append(heaerLogoHTML);

const logoHTML = document.createElement('div');
logoHTML.className = 'logo';
heaerLogoHTML.append(logoHTML);

const titleHTML = document.createElement('h1');
titleHTML.textContent = 'Коробка рандома';
heaerLogoHTML.append(titleHTML);

const heaerHelpHTML = document.createElement('button');
heaerHelpHTML.textContent = '?';
heaerHelpHTML.className = 'heaer_help';
headerHTML.append(heaerHelpHTML);

const wrapperClockHeader = document.createElement('div');
wrapperClockHeader.className = 'wrapper_heaer_clock';
headerHTML.append(wrapperClockHeader);

const textClockHTML = document.createElement('span');
textClockHTML.textContent = `Текущее время`;
wrapperClockHeader.append(textClockHTML);

const clockHeader = document.createElement('div');
clockHeader.id = 'heaer_clock';
wrapperClockHeader.append(clockHeader);

const time = setInterval(() => {
  let date = new Date();
  document.getElementById('heaer_clock').innerHTML = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
  
}, 1000);

const sectionHTML = document.createElement('section');
document.body.append(sectionHTML);

const footerHTML = document.createElement('footer');
document.body.append(footerHTML);

const textFooterHTML = document.createElement('p');
textFooterHTML.textContent = `Приложение разработано в рамках Хакатона #1 в Result School`;
footerHTML.append(textFooterHTML);

const developerFooterHTML = document.createElement('p');
developerFooterHTML.textContent = '72 учебная группа TEAM_#3';
footerHTML.append(developerFooterHTML);

const modalMain = new ItcModal({
  title: 'Коробка рандома',
  content: '<div style="display: flex; flex-wrap: nowrap; height: auto; max-width: 100%;"> <img  src="../src/assets/cub.png" alt="" style="display: block; height: auto; width: 150px;"> <p> <span style="font-weight: bold;">Уважаемый, Гость</span>! <br><br> Добро пожаловать в интерактивное путешествие по нашей <br> <span style="font-weight: bold;">"Коробке рандома"</span>. <br><br> Для начала работы щелкни правой кнопкой мыши в любом месте окна и "Поехали!"</p> </div> ',
  footerButtons: [
    {class: 'btn btn-cancel', text: 'Закрыть', action: 'cancel'}
  ]
});
modalMain.show();

document.addEventListener('click', (e) => {
  if (e.target.closest('.heaer_help')) {
    modalMain.show();
  };
  if (e.target.closest('[data-action="cancel"]')) {
    modalMain.hide();
  };
});