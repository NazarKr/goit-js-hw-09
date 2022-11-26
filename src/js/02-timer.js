import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// let timerID = null;
// let userDate = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  secondsUi: document.querySelector('[data-seconds]'),
  minutesUi: document.querySelector('[data-minutes]'),
  hoursUi: document.querySelector('[data-hours]'),
  daysUi: document.querySelector('[data-days]'),
};

window.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? (Notify.info('Please choose a date in the future'),
        (refs.button.disabled = true))
      : (refs.button.disabled = false);
    userDate = selectedDates[0];
  },
};

const fkatpicr = flatpickr('#datetime-picker', options);

function startTimer(e) {
  if (e.target.nodeName !== 'BUTTON') return;
  timerID = setInterval(countDownTimer, 1000);
}

function countDownTimer() {
  userDate = Date.parse(refs.input.value);
  const countDown = userDate - Date.now();
  let { days, hours, minutes, seconds } = getTimeComponents(countDown);

  if (userDate <= Date.now()) {
    Notify.info('Please, choose date in future');
    clearInterval(timerID);
    refs.input.disabled = false;
  }

  if (countDown <= 0) {
    clearInterval(timerID);
    seconds = getTimeComponents(0).seconds;
    minutes = getTimeComponents(0).minutes;
    hours = getTimeComponents(0).hours;
    days = getTimeComponents(0).days;
    refs.input.disabled = false;
  }
  updateCountDownUI({ seconds, minutes, hours, days });
}

function getTimeComponents(time) {
  return convertMs(time);
}

function updateCountDownUI({ seconds, minutes, hours, days }) {
  refs.secondsUi.textContent = seconds;
  refs.minutesUi.textContent = minutes;
  refs.hoursUi.textContent = hours;
  refs.daysUi.textContent = days;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
