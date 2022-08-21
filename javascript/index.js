//weatherCity
function weatherCity(response) {
  if (response.status === 200) {
    //cityss
    let h2 = document.querySelector("h2");
    h2.innerHTML = response.data.name.toUpperCase();
    // temp
    let degree = document.querySelector("#degree");
    degree.innerHTML = Math.round(response.data.main.temp);
    // pressure
    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = Math.round(response.data.main.pressure);
    // windSpeed
    let windSpeed = document.querySelector("#windSpeed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    // humidity
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = Math.round(response.data.main.humidity);
    // status
    let status = document.querySelector(".status");
    status.innerHTML =
      response.data.weather[0].description.charAt(0).toUpperCase() +
      response.data.weather[0].description.slice(1);
  } else {
    alert("Enter, please, the correct country or city");
  }
}

// city
function city(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#input-city");
  citySearch.value = citySearch.value.trim();
  if (!citySearch.value) {
    alert(`Enter, please, country or city`);
    return false;
  }
  let apiKey = "e503772def8edfa5152e184c6e0d5a99";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl, { validateStatus: false }).then(weatherCity);
}

//geolocation
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e503772def8edfa5152e184c6e0d5a99";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherCity);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// LOCALTIME
let fullDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date();

let currentFullDay = document.querySelector("#full-day");
currentFullDay.innerHTML = `${fullDays[currentDate.getDay()]}`;

let currentFullDate = document.querySelector("#full-date");
currentFullDate.innerHTML = `${("0" + currentDate.getDate()).slice(-2)} ${
  months[currentDate.getMonth()]
} ${currentDate.getFullYear()}`;

let currentFullTime = document.querySelector("#full-time");
currentFullTime.innerHTML = `${("0" + currentDate.getHours()).slice(-2)}:${(
  "0" + currentDate.getMinutes()
).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;

let buttonSearch = document.querySelector("#search");
buttonSearch.addEventListener("submit", city);

let buttonGeolocation = document.querySelector("#Geolocation");
buttonGeolocation.addEventListener("click", geolocation);
