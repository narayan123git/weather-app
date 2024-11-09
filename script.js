const apiKey = "84b29ac7315b2cc1682469f5f6d2113f";
let unit = "metric";

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const unitToggle = document.getElementById('unit-toggle');
const locationButton = document.getElementById('location-btn'); // Add a button for geolocation

// Function to fetch weather data for a given city
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        let u = "°C"
        let ar ="km/h"
        if (unit === "imperial"){
            u = "°F";
            ar = "mph";
        }

        // Update the weather information on the page
        cityElement.textContent = data.name;
        tempElement.textContent = `${data.main.temp}${u}`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} ${ar}`;

        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } catch (error) {
        alert(error.message);
    }
}

// Function to fetch weather data based on the user's geolocation
async function getWeatherByLocation(latitude, longitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        console.log(data);
        let u = "℃";
        let ar ="km/h"
        if (unit === "imperial"){
            u = "°F";
            ar = "mph";
        }

        // Update the weather information on the page
        cityElement.textContent = data.name;
        tempElement.textContent = `${data.main.temp}${u}`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} ${ar}`;
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } catch (error) {
        alert(error.message);
    }
}

// Function to handle geolocation
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getWeatherByLocation(latitude, longitude); // Fetch weather using geolocation
        }, () => {
            alert("Geolocation is not supported or permission denied.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    if (city) {
        getWeather(city);
    }
});

// Optionally allow pressing Enter to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value;
        if (city) {
            getWeather(city);
        }
    }
});

// Event listener for unit toggle (Celsius/Fahrenheit)
unitToggle.addEventListener('change', () => {
    unit = unitToggle.value;
    const city = cityElement.textContent;
    if (city) {
        getWeather(city);  // Refresh weather data in the new unit
    }
});

// Event listener for the geolocation button (e.g., using a button to fetch current location weather)
locationButton.addEventListener('click', () => {
    getCurrentLocationWeather(); // Trigger the geolocation function
});

// Optional: Default weather for a city on page load
getWeather("New York"); // Change to any default city you prefer

