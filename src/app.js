import './styles.css';
import { ShapeModule } from './modules/shape.module';
import { ClicksModule } from './modules/clicks.module';
import { BackgroundModule } from './modules/background.module';
import { CanvasParticlesModule } from './modules/canvasParticles.module';
import { ItcModal } from './modules/modal.module';
import { SoundModule } from './modules/sound.module';
import { NotificationModule } from './modules/notification.module';
import { ContextMenu } from './menu';

const root = document.body;

const shapeModule = new ShapeModule();
const backgroundModule = new BackgroundModule('background', 'Change background color');
const soundModule = new SoundModule();
const messageModule = new NotificationModule();
const clickModule = new ClicksModule();
const canvasParticlesModule = new CanvasParticlesModule();

canvasParticlesModule.initCanvas();
canvasParticlesModule.startAnimating();

const menu = new ContextMenu();
root.addEventListener('contextmenu', (event) => {
  menu.open(event)
});
menu.add([
  { module: shapeModule, callback: shapeModule.trigger },
  { module: backgroundModule, callback: backgroundModule.trigger },
  { module: soundModule, callback: soundModule.trigger },
  { module: messageModule, callback: messageModule.trigger },
  { module: clickModule, callback: clickModule.trigger },
  { module: canvasParticlesModule, callback: canvasParticlesModule.trigger },
]);

const headerHTML = document.createElement('header');
headerHTML.innerHTML = `
  <div class="heaer_logo">
    <div class="logo"></div>
    <h1>Коробка рандома</h1>
  </div>
  <button class="heaer_help">?</button>
  <div class="wrapper_heaer_clock">
    <span>Текущее время</span>
    <div id="heaer_clock">21:38</div>
  </div>
`;

setInterval(() => {
  let date = new Date();
  document.getElementById('heaer_clock').innerHTML = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);

}, 1000);

const footerHTML = document.createElement('footer');
footerHTML.innerHTML = `
  <p>Приложение разработано в рамках Хакатона #1 в Result School</p>
  <p>72 учебная группа TEAM_#3</p>
`;
root.prepend(headerHTML, footerHTML);

const modalMain = new ItcModal({
  title: 'Коробка рандома',
  content: '<div style="display: flex; flex-wrap: nowrap; justify-content: space-between; height: auto; max-width: 100%;"> <div class="logo" style="height: 100px; width: 130px; margin: auto;"></div> <p style="padding-left: 20px"> <span style="font-weight: bold;">Уважаемый, Гость</span>! <br><br> Добро пожаловать в интерактивное путешествие по нашей <br> <span style="font-weight: bold;">"Коробке рандома"</span>. <br><br> Для начала работы щелкни правой кнопкой мыши в любом месте окна и "Поехали!"</p> </div> ',
  footerButtons: [
    { class: 'btn btn-cancel', text: 'Закрыть', action: 'cancel' }
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
