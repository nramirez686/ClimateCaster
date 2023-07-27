// Get references to HTML elements
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const forecastInfo = document.getElementById("forecast-info");
const searchHistory = document.getElementById("search-history");

const apiKey = "97cfd0909846f759120be372471c2a97";

let searchHistoryData = [];

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      return null;
    });
}
