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
      const icon = weather.weather[0].icon;
      const weatherInfo = {
        City: city,
        Country: country,
        Temp: temp,
        Humidity: humidity,
        Wind: wind,
        Icon: icon,
      };
      return weatherInfo;
    });
}

const divWeather = document.getElementById("weather");

function displayWeather(weatherInfo) {
  for (let key in weatherInfo) {
    if (key == "Icon") {
      const img = document.createElement("img");
      img.src = `http://openweathermap.org/img/wn/${weatherInfo[key]}@2x.png`
      divWeather.appendChild(img);
    } else {
      const p = document.createElement("p");
      p.innerHTML = `${key}: ${weatherInfo[key]}`;
      divWeather.appendChild(p);
    }
  }
}

document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  divWeather.textContent = "";
  const city = e.target.city.value;
  getWeatherInfo(city).then(function(weatherInfo) {
    displayWeather(weatherInfo);
  });
});

