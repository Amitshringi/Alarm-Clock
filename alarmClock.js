const currentTime = document.querySelector("h1"),
  content = document.querySelector(".content"),
  selectmenu = document.querySelectorAll("select"),
  setAlarmBtn = document.querySelector("button");

let alarmTime,
  isAlarmSet = false,
  ringtone = new Audio("./Alarm Clock.mp3"); //ringtone for Alarm

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}"> ${i}</option>`;
  selectmenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectmenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectmenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  //getting hours, min, secs
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  //if hours value is 0, set this value to 12
  h = h == 0 ? (h = 12) : h;
  //adding 0 before hr, min, sec if this value less than 10
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime == `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

//setting the Alarm
function setAlarm() {
  if (isAlarmSet) {
    alarmTime = ""; //if isAlarmSet is true
    ringtone.pause(); // clear the value of alarmTime
    content.classList.remove("disable"); // pause the ringtone
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false); // return isAlarm to false
  }

  //getting hour, minute, ampm select tag value
  let time = `${selectmenu[0].value}:${selectmenu[1].value} ${selectmenu[2].value}`;
  console.log(time);
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  isAlarmSet = true;
  alarmTime = time;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
}
//click for set the Alarm
setAlarmBtn.addEventListener("click", setAlarm);
