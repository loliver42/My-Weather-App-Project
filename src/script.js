function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.city;

  descriptionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatDate(date);

  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-icon"/>`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}  ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ffa4fe680act3be1832a3445o0790076";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Trenton");

function displayForcast() {
  let days = ["Wed", "Thurs", "Fri", "Sat", "Sun"];
  let forcastHTML = "";

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `
      <div class="weather-forcast-day">
        <div class="weather-forcast-date">${day}</div>
        <div class="weather-forcast-icon">⛅</div>
        <div class="weather-forcast-temperatures">
          <div class="weather-forcast-temperature">
            <strong> 45°</strong>
          </div>
          <div class="weather-forcast-temperature">20°</div>
        </div>
      </div>`;
  });
  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = forcastHTML;
}

displayForcast();
