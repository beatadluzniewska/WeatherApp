let currentTime = new Date();
function displayDate(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let currentDay = days[date.getDay()];
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
    let currentMonth = months[date.getMonth()];
    let currentDate = date.getDate();
    let todaysDate = `${currentDay}, ${currentMonth} ${currentDate}`;
    let displayedDate = document.querySelector("#day-date");
    displayedDate.innerHTML = todaysDate;

    let currentHour = date.getHours();
    let currentMinutes = date.getMinutes();
    let realTime = `${currentHour}:${currentMinutes}`;
    let displayedHour = document.querySelector("#time-now");
    displayedHour.innerHTML = realTime;
}
displayDate(currentTime);

//Default
function firstLoad() {
    let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
    let city = "Paris";
    let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?&units=metric";

    function showTemperature(response) {
        console.log(response.data);
        console.log(response.data.main.temp);
        let temp = Math.round(response.data.main.temp);
        let tempDefault = document.querySelector("#temperature-now");
        tempDefault.innerHTML = ` ${temp}°C`;
        let cityDefault = document.querySelector("#current-city");
        cityDefault.innerHTML = `${city} `;
    }

    axios.get(`${apiUrl}&appid=${apiKey}&q=${city}`).then(showTemperature);
    console.log(apiUrl);
}
window.onload = firstLoad();

//search engine
function weather(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#input-city");
    cityInput.value = cityInput.value.trim();
    let cityNow = document.querySelector("#current-city");
    if (cityInput.value) {
        cityNow.innerHTML = `${cityInput.value} `;
        cityNow.innerHTML =
            cityInput.value.charAt(0).toUpperCase() +
            cityInput.value.slice(1).toLowerCase();
    } else {
        cityNow.innerHTML = "Paris";
    }
    let city = cityNow.innerHTML;
    let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
    let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    console.log(city);
    function showTemperature(response) {
        let temp = Math.round(response.data.main.temp);
        let tempNow = document.querySelector("#temperature-now");
        tempNow.innerHTML = ` ${temp}°C`;
    }

    axios.get(`${apiUrl}&appid=${apiKey}&q=${city}`).then(showTemperature);
    console.log(apiUrl);
    console.log(city);

    // let check = document.querySelector("#current-city");
    // console.log(check.innerHTML);
}

let form = document.querySelector("#city-engine");
form.addEventListener("submit", weather);

//current location
function weatherCurrentLocation(event) {
    event.preventDefault();
    function showTemperature(response) {
        console.log(response.data);
        var city = response.data.name;
        console.log(city);
        console.log(response.data.main.temp);
        let temp = Math.round(response.data.main.temp);
        let tempNow = document.querySelector("#temperature-now");
        tempNow.innerHTML = ` ${temp}°C`;
        let cityNow = document.querySelector("#current-city");
        cityNow.innerHTML = `${city} `;
    }

    function myPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        let apiKey = "e80dc1bacc0ef8618621e6997e2afedc";
        let apiUrl =
            "https://api.openweathermap.org/data/2.5/weather?&units=metric";

        axios
            .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
            .then(showTemperature);
    }

    function getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(myPosition);
    }
    getCurrentPosition();
}
let button = document.querySelector("#current-location");
button.addEventListener("click", weatherCurrentLocation);

// function fahrenheitCelsius(event) {
//     event.preventDefault();
//     let cel = document.querySelector(".temp-now");
//     cel.innerHTML = " 22°C";
// }
// let convert1 = document.querySelector("#celsius");
// convert1.addEventListener("click", fahrenheitCelsius);

// function celsiusFahrenheit(event) {
//     event.preventDefault();
//     let fahr = document.querySelector(".temp-now");
//     fahr.innerHTML = " 71,6°F";
// }

// let convert2 = document.querySelector("#fahrenheit");
// convert2.addEventListener("click", celsiusFahrenheit);
