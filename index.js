console.log("script is excecuted beginning 1");

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
function updateTimeFromAPI(response) {
  let date = new Date(response.data.time * 1000);
  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  dateAndTime.innerHTML = `${day}, ${hours}:${minutes}`;
}

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
  let iconElement = document.querySelector(".icon");

  iconElement.setAttribute("src", response.data.condition.icon_url);
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let city = response.data.city;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  updateTimeFromAPI(response);
}

function searchCity(city = "Istanbul") {
  let apiKey = "64a081deod364440c784d75dbec5tbfa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-input");
  let city = searchInput.value.trim();
}
window.onload = function () {
  searchCity("Istanbul");
};
