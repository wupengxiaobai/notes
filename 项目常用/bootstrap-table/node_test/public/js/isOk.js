let timer = null;
let number = 5;
let timeEle = document.getElementsByClassName('time')[0];
let link = timeEle.dataset.link;
timer = setInterval(() => {
  if (number == 1) {
    clearInterval(timer)
    location.href = link
  }
  timeEle.innerHTML = --number + 's后为您跳转';
}, 1000)