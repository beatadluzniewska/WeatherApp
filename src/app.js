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
    console.log(currentHour);
    let currentMinutes = date.getMinutes();
    let realTime = `${currentHour}:${currentMinutes}`;
    let displayedHour = document.querySelector("#time-now");
    displayedHour.innerHTML = realTime;
}
displayDate(currentTime);

function weather(event) {
    event.preventDefault();
    let weatherInput = document.querySelector("#input-city");
    weatherInput.value = weatherInput.value.replace(/\s/g, ""); //week4
    let city = document.querySelector("#current-city");
    console.log(weatherInput.value.charAt(0).toUpperCase());
    console.log(weatherInput.value.slice(1).toLowerCase());
    if (weatherInput.value) {
        city.innerHTML = `${weatherInput.value}`;
        city.innerHTML =
            weatherInput.value.charAt(0).toUpperCase() +
            weatherInput.value.slice(1).toLowerCase();
    } else {
        city.innerHTML = null;
    }
}

let form = document.querySelector("#city-engine");
form.addEventListener("submit", weather);

function fahrenheitCelsius(event) {
    event.preventDefault();
    let cel = document.querySelector(".temp-now");
    cel.innerHTML = " 22°C";
}
let convert1 = document.querySelector("#celsius");
convert1.addEventListener("click", fahrenheitCelsius);

function celsiusFahrenheit(event) {
    event.preventDefault();
    let fahr = document.querySelector(".temp-now");
    fahr.innerHTML = " 71,6°F";
}

let convert2 = document.querySelector("#fahrenheit");
convert2.addEventListener("click", celsiusFahrenheit);
