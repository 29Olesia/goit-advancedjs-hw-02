import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value, 10);
  const state = event.target.elements.state.value;

  createPromise(delay, state)
    .then(() => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'green',
        progressBarColor: 'lightgreen'
      });
    })
    .catch(() => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'red',
        progressBarColor: 'darkred'
      });
    })
    .finally(() => {
      event.target.elements.delay.value = '';
    });
});
