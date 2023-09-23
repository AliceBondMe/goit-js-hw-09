import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateTimePicker: document.querySelector("#datetime-picker"),
    btnStart: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}

refs.btnStart.setAttribute("disabled", "");
let finishTime = null;
let intervalId = null;

// flatpickr settings
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
          refs.btnStart.setAttribute("disabled", "");
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.btnStart.removeAttribute("disabled");
      }
    console.log(selectedDates[0]);
  },
};

// flatpickr ititializing
const fp = flatpickr(refs.dateTimePicker, options);



refs.btnStart.addEventListener("click", onStartClick);

function onStartClick() {
  refs.btnStart.setAttribute("disabled", "");
  const finishTime = fp.selectedDates[0];
  setTimer(finishTime);
}



function setTimer(finishTime) {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const msDiff = finishTime - currentTime;
    const timeDiff = convertMs(msDiff);

    renderTimer(timeDiff)

    if (msDiff<1000) {
      clearInterval(intervalId);
    }
    }, 1000)
}

function renderTimer(obj) {
    refs.days.textContent = addLeadingZero(obj.days);
    refs.hours.textContent = addLeadingZero(obj.hours);
    refs.minutes.textContent = addLeadingZero(obj.minutes);
    refs.seconds.textContent = addLeadingZero(obj.seconds);
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

function addLeadingZero(value) {
    return value.toString().padStart(2, "0");

}
