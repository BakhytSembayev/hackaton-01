import './styles.css'



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