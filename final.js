let li = document.querySelector("li.time");
let now = new Date();
let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

//formatDate();

li.innerHTML = `${day} ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ` <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="card">

      <div class="forecast-day">${formatDate(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42" />
      <div class="forecast-temp">
        <span class="forecast-temp-high">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="forecast-temp-low">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>

      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "1964d0e3fca31100a0a004e7ae8cad28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.innerHTML = iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //document.querySelector("#city").innerHTML = response.data.name;
  //document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  //document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //document.querySelector("#wind").innerHTML = response.data.wind.speed;
  //document.querySelector("#description").innerHTML = response.data.weather[0].main;

  getForecast(response.data.coord);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "1964d0e3fca31100a0a004e7ae8cad28";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);
}

function search(city) {
  let apiKey = "1964d0e3fca31100a0a004e7ae8cad28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  //axios.get(apiUrl).then(displayTemperature);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input"); //city
  search(searchInput.value);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", displayCelciusTemp);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahTemp);
}

let celsiusTemp = null;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("New York");
//displayForecast();
