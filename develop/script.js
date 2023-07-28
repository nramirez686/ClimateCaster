function getWeatherData(location) {
  const apiKey = "97cfd0909846f759120be372471c2a97";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherData = {
        temperature: data.main.temp,
        condition: data.weather[0].main,
        location: data.name,
      };
      return weatherData;
    });
}

function currentWeather(weatherData) {
  //function to covert c to f
  const temperatureCelsius = weatherData.temperature;
  const temperatureFahrenheir = (temperatureCelsius * 9) / 5 + 32;

  const temperature = document.querySelector("#temperature");
  const condition = document.querySelector("#condition");
  const location = document.querySelector("#location");

  temperature.textContent = `${temperatureFahrenheir.toFixed(2)}°F`;
  condition.textContent = weatherData.condition;
  location.textContent = weatherData.location;
}

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
