import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
let userSelectedDate = null;
let timerIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', startTimer);

function startTimer() {
  if (userSelectedDate <= new Date()) {
    iziToast.error({ title: 'Error', message: 'Cannot start timer for a past date' });
    return;
  }

  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerIntervalId = setInterval(() => {
    const timeRemaining = userSelectedDate - new Date();
    if (timeRemaining <= 0) {
      clearInterval(timerIntervalId);
      updateTimerDisplay(0, 0, 0, 0);
      dateTimePicker.disabled = false;
      startButton.disabled = true;
      iziToast.success({ title: 'Success', message: 'Countdown finished!' });
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
