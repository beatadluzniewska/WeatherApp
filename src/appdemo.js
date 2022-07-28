let weather = {
    paris: {
        temp: 19.7,
        humidity: 80,
    },
    tokyo: {
        temp: 17.3,
        humidity: 50,
    },
    lisbon: {
        temp: 30.2,
        humidity: 20,
    },
    "san francisco": {
        temp: 20.9,
        humidity: 100,
    },
    oslo: {
        temp: -5,
        humidity: 20,
    },
};

function showForecast() {
    let city = prompt("Enter a city");
    city = city.toLowerCase();
    city = city.trim();
    if (city === "paris") {
        alert(
            `It is currently ${weather["paris"].temp} in Paris with a humidity of ${weather["paris"].humidity}`
        );
    } else if (city === "tokyo") {
        alert(
            `It is currently ${weather["tokyo"].temp} in Tokyo with a humidity of ${weather["tokyo"].humidity}`
        );
    } else if (city === "lisbon") {
        alert(
            `It is currently ${weather["lisbon"].temp} in Lisbon with a humidity of ${weather["lisbon"].humidity}`
        );
    } else if (city === "san francisco") {
        alert(
            `It is currently ${weather["san francisco"].temp} in San Francisco with a humidity of ${weather["san francisco"].humidity}`
        );
    } else if (city === "oslo") {
        alert(
            `It is currently ${weather["oslo"].temp} in Oslo with a humidity of ${weather["oslo"].humidity}`
        );
    } else {
        alert(
            `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney`
        );
    }
}
showForecast();
