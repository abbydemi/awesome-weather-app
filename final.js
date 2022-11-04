let li = document.querySelector("li.time");
let now = new Date();
let date = now.getDate();

//function formatDate() {

let hours = now.getHours();
let minutes = now.getMinutes();
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

function displayTemperature(response) {
  //console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  //let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  //cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.innerHTML = iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#city").innerHTML = response.data.name;
  //document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  //document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //document.querySelector("#wind").innerHTML = response.data.wind.speed;
  //document.querySelector("#description").innerHTML = response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "1964d0e3fca31100a0a004e7ae8cad28";
  let searchInput = document.querySelector("#search-input").value; //city
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric`;
  //axios.get(apiUrl).then(displayTemperature);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);

  //let searchInput = document.querySelector("#search-input");
  //let h1 = document.querySelector("#city");

  // h1.innerHTML = `${searchInput.value}`;
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function tempCel() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `26`;
}
let celsius = document.querySelector("#celsius-unit");
celsius.addEventListener("click", tempCel);

function tempFah() {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `76`;
}
let fahrenheit = document.querySelector("#fahrenheit-unit");
fahrenheit.addEventListener("click", tempFah);

//let fahrenheit = document.querySelector("fahrenheit-unit");
