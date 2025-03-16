console.log("script is excecuted beginning 1");
let now = new Date();
let dateAndTime = document.querySelector(".dateAndTime");
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
let hours = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");

dateAndTime.innerHTML = `${day}, ${hours}:${minutes}`;

let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector(".search-input");
let cityNameElement = document.querySelector(".city-name");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = searchInput.value.trim();
  if (cityName) {
    console.log("City entered:", cityName);
    cityNameElement.textContent = `${cityName}`;
    searchCity(cityName);
  }
  searchInput.value = "";
});

function displayWeather(response) {
  if (!response.data || !response.data.city) {
    alert("City not found! Please check the spelling.");
    return;
  }

  let temperatureElement = document.querySelector(".temperature");
  let cityElement = document.querySelector(".city-name");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector(".bold");
  let windElement = document.querySelector(".windSpeed");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.condition.description;
  let humidity = response.data.humidity;
  let wind = response.data.wind.speed;
  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
}

function searchCity(city) {
  let apiKey = "64a081deod364440c784d75dbec5tbfa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let city = searchInput.value.trim();
}

searchForm.addEventListener("submit", handleSearch);
