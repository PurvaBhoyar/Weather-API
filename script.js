const apiKey = "97f95fb5f83ba316960b2cd8807504c2";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/sun.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/heavy-rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/snowfall.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/haze.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
