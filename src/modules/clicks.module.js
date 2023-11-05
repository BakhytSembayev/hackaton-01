import { Module } from '../core/module'

export class ClicksModule extends Module {
  constructor(type, text) {
    super('random-click', 'Аналитика кликов')
  };
  trigger() {

    function timeTranslation(timeUser) {
      let m = Math.floor(timeUser % 3600 / 60);
      let s = Math.floor(timeUser % 3600 % 60);

      return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    };

    let timeUserEnter = prompt('Введите желаемое время в секундах. Максимальное время 120 сек');
    let timeUser = timeUserEnter.trim();

    id: if (timeUser > 120 || !timeUser.match(/^\d+$/) || timeUser == 0) {
      alert('Вы задали некорректный интервал времени. Повторите попытку!');
      break id;
    } else {
      const sectionHTML = document.createElement('section');
      document.body.append(sectionHTML);

      const timerClock = document.createElement('span');
      timerClock.id = 'timer';
      timerClock.textContent = timeTranslation(timeUser);
      sectionHTML.append(timerClock);

      const clickedCounter = document.createElement('div');
      clickedCounter.textContent = 'Количество кликов: ';
      clickedCounter.className = 'counter';
      sectionHTML.append(clickedCounter);

      const targetClick = document.createElement('div');
      targetClick.className = 'target_lick';
      sectionHTML.append(targetClick);

      const counterNumber = document.createElement('span');
      counterNumber.id = 'counterNumber';
      clickedCounter.append(counterNumber);

      let time = setInterval(timer, 1000);
      function timer() {
        timeUser--;
        if (timeUser < 0) {
          clearInterval(time);
          return;
        };
        document.getElementById('timer').textContent = timeTranslation(timeUser);

      };
    };

    const windowClick = document.querySelector('body');
    const counter = document.getElementById('counterNumber');
    let count = 0;

    windowClick.addEventListener('click', onclickCounter);

    function onclickCounter(appDiv) {
      if (timeUser > 0) {
        count++;
        counter.textContent = count;
        const clickPrint = document.createElement('div');
        clickPrint.className = 'clickPrint';
        document.body.append(clickPrint);

        if (appDiv.pageX + clickPrint.offsetWidth < document.body.offsetWidth) {
          clickPrint.style.top = appDiv.pageY - 20 + 'px';
          clickPrint.style.left = appDiv.pageX - 20 + 'px';
        } else {
          clickPrint.style.top = appDiv.pageY + 'px';
          clickPrint.style.left = appDiv.pageX - clickPrint.offsetWidth + 'px';
        };

      } else if (!timeUserEnter === 0 || timeUserEnter === 0 || timeUserEnter.match(/^\d+$/)) {
        alert(`Ваш результат ${count} выстрела(ов) за ${timeUserEnter} секунд(ы)!`);
        document.querySelector('section').replaceChildren();
        let filteredList = document.querySelectorAll('.clickPrint');
        filteredList.forEach(function (element) {
          element.parentNode.removeChild(element);
        });
        windowClick.removeEventListener('click', onclickCounter);
      };
    };
  };
};