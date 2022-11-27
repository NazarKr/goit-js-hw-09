import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', startPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
}

function startPromise(e) {
  e.preventDefault();
  let step = Number(form.elements.step.value);
  let delay = Number(form.elements.delay.value);
  let amount = Number(form.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i + 1, i * delay + step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
