// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector("[data-start]")
const input = document.querySelector("#datetime-picker")
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
button.disabled = true
let userSelectedDate = 0


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
       userSelectedDate = selectedDates[0];
       button.disabled = false
    } else {
        iziToast.show({
    message: 'Please choose a date in the future',
    color: 'red',
    position: 'topRight',
    timeout: 5000,
});
        button.disabled = true
    }

  },
};


flatpickr("#datetime-picker", options)

button.addEventListener("click", hendlerClick)

function hendlerClick() {
  button.disabled = true;
  input.disabled = true;

  const interval = setInterval(() => {
    const diff = userSelectedDate - Date.now();

    if (diff <= 0) {
      clearInterval(interval);

      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";

      input.disabled = false;
      return;
    }

    const time = convertMs(diff);

    days.textContent = time.days.toString().padStart(2, "0");
    hours.textContent = time.hours.toString().padStart(2, "0");
    minutes.textContent = time.minutes.toString().padStart(2, "0");
    seconds.textContent = time.seconds.toString().padStart(2, "0");
  }, 1000);
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

