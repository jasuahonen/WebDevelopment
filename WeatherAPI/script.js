document.addEventListener('DOMContentLoaded', getWeather, updateTime);

setInterval(updateTime, 1000);
const apiKey = '383da520e096daa3458eaf5b9ca7f91f';
const apiKey2 = '383da520e096daa3458eaf5b9ca7f91f';
const city = 'Tampere';
const apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=61.4981&lon=23.7610&exclude=minutely,hourly&appid=${apiKey2}&units=metric`;

function updateTime() {
    const timeInfo = document.getElementById('timeInfo');
    const currentTime = new Date();
    const hours = padZero(currentTime.getHours());
    const minutes = padZero(currentTime.getMinutes());
    const seconds = padZero(currentTime.getSeconds());

    // Format the time as HH:MM:SS
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Update the content of the timeInfo element
    timeInfo.innerText = `Local Time: ${formattedTime}`;
}

function padZero(number) {
    // Add leading zero if the number is less than 10
    return number < 10 ? `0${number}` : number;
}

function getWeather() {
    fetch(apiUrlCurrent)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayCurrentWeather(data);
            return fetch(apiUrlForecast);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data to the console
            displayForecast(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;

    weatherInfo.innerHTML = `
        <h2>${temperature}°C</h2>
        <p>${description}</p>
        <img src="${iconUrl}" alt="${description} icon">
        <p>High: ${maxTemp}°C / Low: ${minTemp}°C</p>
    `;
}


function displayForecast(data) {
    const forecastInfo = document.getElementById('forecastInfo');

    const forecastDays = data.daily.slice(1, 6); // Display the next 5 days

    forecastInfo.innerHTML = '';

    forecastDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
        const maxTemp = day.temp.max;
        const minTemp = day.temp.min;
        const iconCode = day.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${dayOfWeek}</p>
            <img src="${iconUrl}" alt="${day.weather[0].description} icon">
            <p>${maxTemp}°C / ${minTemp}°C</p>
        `;

        forecastInfo.appendChild(forecastItem);
    });
}
