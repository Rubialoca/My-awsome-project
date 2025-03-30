console.log("script is executed beginning 1");

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

function displayWeather(response) {
  console.log("Full API Response:", response);
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
  fetchForecastData(response.data.city);
}

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

function displayForecast(forecastData) {
  let forecast = document.getElementById("forecast");
  let forecastHTML = "";

  if (!forecastData || !forecastData.length) {
    console.error("Forecast data is missing or incorrect:", forecastData);
    forecast.innerHTML = "<p>Forecast data is unavailable.</p>";
    return;
  }

  forecastData.forEach(function (day, index) {
    if (index < 5) {
      if (day.time && day.condition && day.temperature) {
        forecastHTML += `
          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature"> 
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div> 
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}º</div>
            </div>
          </div>`;
      }
    }
  });

  forecast.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function searchCity(city = "Istanbul") {
  let apiKey = "64a081deod364440c784d75dbec5tbfa";
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrlCurrent)
    .then((response) => {
      console.log("Current Weather Data:", response.data);
      displayWeather(response);
    })
    .catch((error) => console.error("Current Weather API Error:", error));
}

function fetchForecastData(city) {
  let apiKey = "64a081deod364440c784d75dbec5tbfa";
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrlForecast)
    .then((response) => {
      console.log("Forecast Data:", response.data);
      if (response.data && response.data.daily) {
        displayForecast(response.data.daily);
      } else {
        console.error("Forecast data is missing or incorrect.");
      }
    })
    .catch((error) => console.error("Forecast API Error:", error));
}

window.onload = function () {
  searchCity("Istanbul");
};
