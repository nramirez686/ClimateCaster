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
