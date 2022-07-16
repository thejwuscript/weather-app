const API_KEY = "1545715271927d3a9886fa5952c989ba";

function getCityCoordinates(city) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const promise = fetch(url, { mode: "cors" });
  return promise
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      const lat = response[0].lat
      const lon = response[0].lon
      return [lat, lon]
    });
}

function getWeatherInfo(city) {
  return getCityCoordinates(city)
    .then(function(array) {
      const lat = array[0]
      const lon = array[1]
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      return fetch(url, { mode: "cors" });
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      const weather = response;
      const city = weather.name;
      const country = weather.sys.country;
      const temp = weather.main.temp;
      const humidity = weather.main.humidity;
      const wind = weather.wind.speed;
      //const icon = weather.weather[0].icon;
      const weatherInfo = {
        city: city,
        country: country,
        temp: temp,
        humidity: humidity,
        wind: wind
      };
      return weatherInfo;
    });
}

getWeatherInfo('Seattle').then(function(weatherInfo) {
  console.log(weatherInfo);
});