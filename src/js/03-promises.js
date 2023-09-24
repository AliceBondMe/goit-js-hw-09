import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  if (delay < 0 || step < 0 || amount <= 0) {
    Notiflix.Notify.warning("Please enter valid numbers!");
  } else {
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, delay)
        .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
        .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
      delay += step;
    }    
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({position, delay})
      } else {
        reject ({position, delay})
      }
    }, delay);    
  })
}
