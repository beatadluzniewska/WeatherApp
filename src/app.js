function formatHour(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dateToday = date.getDate();

    return `${day}, ${month} ${dateToday}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = "";
    forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col-2 upcoming-days">
          <div>${formatDay(forecastDay.dt)}</div>
          <img width="70px" alt=""
              src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
              }@2x.png" />
          <div class="temperature"><span class="temp-upcoming-day">${Math.round(
              forecastDay.temp.day
          )}°C</span> | <span
              class="temp-upcoming-night"><i class="bi bi-moon"></i>${Math.round(
                  forecastDay.temp.night
              )}°C</span></div></div>`;
        }
    });

    forecastElement.innerHTML = forecastHTML;
}

//search engine + onclick

getForecast = (coordinates) => {
    console.log(coordinates);
    let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
};

function showCityWeather(response) {
    console.log(response.data);
    let cityNow = document.querySelector("#current-city");
    cityNow.innerHTML = response.data.name;
    let countryNow = document.querySelector("#country");
    countryNow.innerHTML = `, ${response.data.sys.country}`;

    celsiusTemperature = response.data.main.temp;
    let temp = Math.round(celsiusTemperature);
    let tempNow = document.querySelector("#temperature-now");
    tempNow.innerHTML = ` ${temp}`;
    tempNow.classList.add("temp-now");
    document.querySelector("#max").innerHTML = Math.round(
        response.data.main.temp_max
    );
    document.querySelector("#min").innerHTML = Math.round(
        response.data.main.temp_min
    );

    document.querySelector("#wind").innerHTML = response.data.wind.speed;

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;

    document.querySelector("#description").innerHTML =
        response.data.weather[0].description;

    document.querySelector("#time-now").innerHTML = formatHour(
        response.data.dt * 1000
    );

    document.querySelector("#day-date").innerHTML = formatDate(
        response.data.dt * 1000
    );

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    iconElement.classList.add("weather-today-icon");
    iconElement.setAttribute("alt", `${response.data.weather[0].description}`);

    let sunArr = [response.data.sys.sunrise, response.data.sys.sunset];

    sunArr.forEach(function (sunMovement, index) {
        let date = new Date(sunMovement * 1000);
        let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (index < 1) {
            document.querySelector("#sunrise").innerHTML =
                hours + ":" + minutes;
        }
        if (index > 0) {
            document.querySelector("#sunset").innerHTML = hours + ":" + minutes;
        }
    });

    getForecast(response.data.coord);
}

function searchCity(city) {
    let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}&q=${city}`).then(showCityWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#input-city").value;
    searchCity(inputCity);
}

//current location
function myPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
    let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?&units=metric";

    axios
        .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
        .then(showCityWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myPosition);
}

//

function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-now");
    celsiusLink.classList.remove("active");
    celsiusLink.classList.add("inactive");
    fahrenheitLink.classList.add("active");
    fahrenheitLink.classList.remove("inactive");
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
    temperatureElement.innerHTML = ` ${fahrenheitTemperature}`;
}

function displayCelsius(event) {
    event.preventDefault;
    let temperatureElement = document.querySelector("#temperature-now");
    fahrenheitLink.classList.remove("active");
    fahrenheitLink.classList.add("inactive");
    celsiusLink.classList.add("active");
    celsiusLink.classList.remove("inactive");
    temperatureElement.innerHTML = ` ${Math.round(celsiusTemperature)}`;
}
let celsiusTemperature = null;

let form = document.querySelector("#city-engine");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

searchCity("New York");
