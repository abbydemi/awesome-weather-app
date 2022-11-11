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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <div class="forecast-day">Thur</div>
      <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="36" />
      <div class="forecast-temp">
        <span class="forecast-temp-high">18</span>
        <span class="forecast-temp-low">12</span>
      </div>
    </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1964d0e3fca31100a0a004e7ae8cad28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("New York");
//displayForecast();
