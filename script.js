// Function to fetch weather data from Open-Meteo API
function fetchWeatherData(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

// Function to get weather data based on user's geolocation
function getWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(latitude, longitude);
        }, error => {
            console.error('Error getting geolocation:', error);
            alert('Error getting geolocation. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to display weather data on the webpage
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    const currentWeather = data.current;
    const hourlyForecast = data.hourly;

    if (!currentWeather || !hourlyForecast) {
        weatherInfoDiv.innerHTML = '<p>Weather data not available.</p>';
        return;
    }

    const currentTemperature = currentWeather.temperature_2m;
    const currentWindSpeed = currentWeather.wind_speed_10m;

    const temperatureHTML = `
        <p>Current Temperature: ${currentTemperature}°C</p>
        <p>Current Wind Speed: ${currentWindSpeed} m/s</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
}

// Fetch weather data on page load
window.onload = function() {
    getWeather();
};
