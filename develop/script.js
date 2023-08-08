//this function uses fetch and find the data for temperature, condition and location
function getWeatherData(location) {
  const apiKey = "97cfd0909846f759120be372471c2a97";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherData = {
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

  const now = new Date(); // Get the current date and time
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  currentDateElem.textContent = now.toLocaleDateString(undefined, options);

  conditionIcon.src = `https://openweathermap.org/img/w/${weatherData.condition}.png`;
  temperature.textContent = `${temperatureFahrenheit.toFixed(2)}°F`;
  location.textContent = weatherData.location;
  humidity.textContent = `Humidity: ${weatherData.humidity}%`;
  speed.textContent = `Wind Speed: ${weatherData.speed} m/s`;

  conditionIcon.src = `https://openweathermap.org/img/w/${weatherData.condition}.png`;
}

//this function adds and event listener when the search button is clicked to display the current weather function
const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#city-input");

searchBtn.addEventListener("click", () => {
  event.preventDefault();
  const location = searchBar.value;
  getWeatherData(location)
    .then((weatherData) => {
      currentWeather(weatherData);
    })
    .catch((error) => {
      console.log(error);
    });
});

//function to fetch fot the 5-day forecast
function getForecastData(forecast) {
  const apiKey = "97cfd0909846f759120be372471c2a97";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
}
//function to display the forecast- probably will need to loop through data and append to section after
function displayForecast() {}
