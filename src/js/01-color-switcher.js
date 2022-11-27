const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.body,
};

const PROMPT_DELAY = 500;
let intervalId = null;

refs.btnStart.addEventListener('click', startChengeColorBody);
refs.btnStop.addEventListener('click', stopChengeColorBody);

function startChengeColorBody(e) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  intervalId = setInterval(setBodyColor, PROMPT_DELAY);
}

function stopChengeColorBody(e) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  clearInterval(intervalId);
  intervalId = 0;
}

function setBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
