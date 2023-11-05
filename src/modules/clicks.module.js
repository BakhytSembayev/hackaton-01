import {Module} from '../core/module'
import {ItcModal} from './modal';


export class ClicksModule extends Module {
  constructor(type, text) {
    super('сlicksModule', 'Аналитика выстрелов (кликов)')
  };
  trigger() {

    function timeTranslation(timeUser) {
      let m = Math.floor(timeUser % 3600 / 60);
      let s = Math.floor(timeUser % 3600 % 60);
  
      return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
    };

    const modal = new ItcModal({
      title: 'Коробка рандома. Аналитика выстрелов (кликов)',
      content: '<div style="display: flex; flex-wrap: nowrap; height: auto; max-width: 100%;"> <p style="padding-left: 20px;"> <span style="font-weight: bold;">Аналитика выстрелов (кликов)</span>! <br><br> Вам необходимо ввести желаемый интервал времени, за который будут посчитаны ваши выстрелы (клики). <br>По завершению времени будет выведен ваш результат.<span style="font-weight: bold;"> Удачи!</span><br><br><br></div><div style="display: flex; flex-direction: column; height: auto; max-width: 100%;"><p style="padding: 5px 10px;" for="input">Введите желаемый интервал в секундах. Максимальное время 120 секунд:</p><br><input style="border-radius: 5px; margin: auto; padding: 5px;" type="text" id="inputModal" name="input" /></div>',
      footerButtons: [
        { class: 'btn btn-ok', text: 'Принять', action: 'ok' },
        {class: 'btn btn-cancel', text: 'Закрыть', action: 'cancel'}
      ]
    });
    modal.show();

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="ok"]')) {
        modal.hide();

        let inputModal = document.querySelector('input');
        let timeUserEnter = inputModal?.value;
        let timeUser = timeUserEnter?.trim();

        if (timeUser > 120 || !timeUser?.match(/^\d+$/) || timeUser == 0) {
          modal.setBody('<div style="display: flex; flex-wrap: nowrap; height: auto; max-width: 100%;"> <p style="padding-left: 20px;"> Вы задали некорректный интервал времени. Повторите попытку!</p></div>');
          let removeBtnOk = document.querySelector('.btn-ok');
          removeBtnOk.style.display = 'none';
          modal.show();

        } else {
            const sectionHTML = document.querySelector('section');
            
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
      
          function onclickCounter (appDiv) {
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
            } else {
                modal.setTitle('Аналитика выстрелов (кликов). РЕЗУЛЬТАТ.');
                modal.setBody('<div style="display: flex; flex-wrap: nowrap; height: auto; max-width: 100%;">  <span style="font-weight: bold;">ОТЛИЧНО!</span><p id="p-modal" style="padding-left: 20px;">...</p></div>');
                let modalMessage = document.querySelector('#p-modal');
                modalMessage.textContent = `Ваш результат ${count} выстрела(ов) за ${timeUserEnter} секунд(ы)!`;
                let removeBtnOk = document.querySelector('.btn-ok');
                removeBtnOk.style.display = 'none'; 
                modal.show();
                windowClick.removeEventListener('click', onclickCounter);
              };
          };
      };
      if (e.target.closest('[data-action="cancel"]')) {
        modal.hide();
        document.querySelector('section').replaceChildren();   
        let filteredList = document.querySelectorAll('.clickPrint');
        filteredList.forEach(function(element) {
          element.parentNode.removeChild(element);
        });

      };
      if (e.target.closest('.itc-modal-btn-close')) {
        document.querySelector('section').replaceChildren();   

      };
    });
  };
};






