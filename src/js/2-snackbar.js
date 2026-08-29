// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')
form.addEventListener("submit", hendlerSubmit)

function hendlerSubmit (event) {
event.preventDefault()
const delay = Number(event.currentTarget.elements.delay.value.trim());
const state = event.currentTarget.elements.state.value;
const promise = new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (state==="fulfilled") {
        resolve(delay)
      }  else {
        reject(delay)
      }
    }, delay);
})
promise.then ((delay) => {iziToast.show({
    message:`✅ Fulfilled promise in ${delay}ms`,
    color: 'green',
    position: 'topRight',
    timeout: 5000,
});}).catch ((delay) => {iziToast.show({
    message:`❌ Rejected promise in ${delay}ms`,
    color: 'red',
    position: 'topRight',
    timeout: 5000,
});})
event.currentTarget.reset()
}