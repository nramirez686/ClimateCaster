//Function uses fetch and find the data for the current weather
function getWeatherData(location) {
  const apiKey = "97cfd0909846f759120be372471c2a97";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherData = {
        date: new Date(),
        temperature: data.main.temp,
        condition: data.weather[0].icon,
        location: data.name,
        humidity: data.main.humidity,
        speed: data.wind.speed,
      };
      return weatherData;
    });
}

//this function displays the weather data into the webpage
function currentWeather(weatherData) {
  //function to covert c to f
  const temperatureCelsius = weatherData.temperature;
  const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;

  const currentDateElem = document.querySelector("#current-date");
  const temperature = document.querySelector("#temperature");
  const conditionIcon = document.querySelector("#condition-icon");
  const location = document.querySelector("#location");
  const humidity = document.querySelector("#humidity");
  const speed = document.querySelector("#speed");

  currentDateElem.textContent = weatherData.date.toLocaleDateString();
  conditionIcon.src = `https://openweathermap.org/img/w/${weatherData.condition}.png`;
  temperature.textContent = `${temperatureFahrenheit.toFixed(2)}°F`;
  location.textContent = weatherData.location;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  speed.textContent = `Wind Speed: ${weatherData.speed} m/s`;
}

//this function adds and event listener when the search button is clicked to display the current weather function
const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#city-input");

function displaySearchHistory(searchHistory) {
  const searchHistoryList = document.getElementById("search-history-list");
  searchHistoryList.innerHTML = "";

  searchHistory.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    searchHistoryList.appendChild(listItem);
  });
}

function saveSearchToLocalStorage(location) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Check if the location is already in the search history
  if (!searchHistory.includes(location)) {
    // Add the location to the search history
    searchHistory.push(location);

    // Save the updated search history to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const location = searchBar.value;

  // Fetch current weather data
  getWeatherData(location).then((weatherData) => {
    document.querySelector("#search-history h2").style.display = "block";
    document.querySelector(".right h3").style.display = "block";
    document.querySelector(".right h4").style.display = "block";

    currentWeather(weatherData);
    getFiveDayForecast(location).then((forecastData) => {
      displayFiveDayForecast(forecastData);
    });
  });
});

// Function to fetch the 5-day forecast data
function getFiveDayForecast(location) {
  const apiKey = "97cfd0909846f759120be372471c2a97";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //object to store data
      const dailyForecastData = {};

      // Loop through the list and fetches specific data
      data.list.forEach((item) => {
        const date = new Date(item.dt_txt).toLocaleDateString();
        const maxTemp = item.main.temp_max;
        const condition = item.weather[0].icon;
        const humidity = item.main.humidity;
        const windSpeed = item.wind.speed;

        // If the date is not yet in the dailyForecastData, add it with the data
        if (!dailyForecastData[date]) {
          dailyForecastData[date] = {
            date: date,
            maxTemperature: maxTemp,
            condition: condition,
            humidity: humidity,
            windSpeed: windSpeed,
            location: data.city.name,
          };
        } else {
          // If the date is already in the dailyForecastData, update data if needed
          if (maxTemp > dailyForecastData[date].maxTemperature) {
            dailyForecastData[date].maxTemperature = maxTemp;
          }
        }
      });

      // Convert the dailyForecastData object to an array of forecast items
      const forecastData = Object.values(dailyForecastData);

      console.log(data);
      return forecastData;
    });
}

// ... Rest of your code remains the same

// Function to display the 5-day forecast on the webpage
function displayFiveDayForecast(forecastData) {
  const forecastInfo = document.querySelector("#forecast-info");
  forecastInfo.innerHTML = ""; // Clear any existing forecast data

  forecastData.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    const dateElem = document.createElement("p");
    dateElem.textContent = date;

    const conditionIcon = document.createElement("img");
    conditionIcon.src = `https://openweathermap.org/img/w/${item.condition}.png`;

    const temperatureElem = document.createElement("p");
    const temperatureFahrenheit = (item.maxTemperature * 9) / 5 + 32;
    temperatureElem.textContent = `${temperatureFahrenheit.toFixed(2)}°F`;

    const locationElem = document.createElement("p");
    locationElem.textContent = `${item.location}`;

    const humidityElem = document.createElement("p");
    humidityElem.textContent = `Humidity: ${item.humidity}%`;

    const windSpeedElem = document.createElement("p");
    windSpeedElem.textContent = `Wind Speed: ${item.windSpeed} m/s`;

    forecastItem.appendChild(dateElem);
    forecastItem.appendChild(conditionIcon);
    forecastItem.appendChild(temperatureElem);
    forecastItem.appendChild(locationElem);
    forecastItem.appendChild(humidityElem);
    forecastItem.appendChild(windSpeedElem);

    forecastInfo.appendChild(forecastItem);
  });
}

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const submitButton = document.getElementById("submit");
const searches = document.getElementById("searches");

let citiesStorage = localStorage.getItem("searches")
  ? JSON.parse(localStorage.getItem("searches"))
  : [];

function listBuilder(searchesArray) {
  searches.innerHTML = "";
  searchesArray.forEach((city) => {
    const listItem = document.createElement("li");
    listItem.textContent = city;
    searches.appendChild(listItem);
  });
}

listBuilder(citiesStorage);
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  citiesStorage.push(cityInput.value);
  localStorage.setItem("searches", JSON.stringify(citiesStorage));
  listBuilder(citiesStorage);
  cityInput.value = "";
});
