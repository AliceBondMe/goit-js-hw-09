const refs = {
    bodyEl: document.querySelector("body"),
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
}

let intervalId = null;

refs.btnStart.addEventListener("click", onStartClick);
refs.btnStop.addEventListener("click", onStopClick);

function onStartClick() {
    setBodyColor();
    intervalId = setInterval(setBodyColor, 1000);
    changeBtnStatus(refs.btnStart, refs.btnStop);
}

function onStopClick() {
    clearInterval(intervalId);
    changeBtnStatus(refs.btnStop, refs.btnStart);
}

function setBodyColor() {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
}

function changeBtnStatus(btnToDisable, btnToActive) {
    btnToDisable.setAttribute("disabled", "");
    btnToActive.removeAttribute("disabled");
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}