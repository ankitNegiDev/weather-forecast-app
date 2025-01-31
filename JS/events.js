// Contains all event listeners (e.g., search button clicks, dropdown selections, and geolocation handling).

import {
    fetchWeatherDataByCity,
    fetchWeatherDataByCoords,
    fetchUVIndex,
    fetchExtendedForecast,
} from "./api.js";

import {
    updateCurrentWeatherUI,
    displayExtendedForecast,
    displayErrorMessage,
    updateUnitToggleText,
    updateTodayHighlights,
} from "./ui.js";

import {
    saveRecentSearch,
    getRecentSearches,
    saveLocation,
    getLocation,
} from "./storage.js";


// Select HTML elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const currentLocationBtn = document.getElementById("current-location-btn");
const recentDropdown = document.getElementById("recent-dropdown");
const unitToggleButton = document.getElementById("unit-toggle-btn");

// Unit state
let isCelsius = true;

//? (1) Function to search weather by city name and coords
async function fetchAndDisplayWeather(city, latitude, longitude) {
    try {
        let data;
        if (city) {
            // fetching data using city name..
            data = await fetchWeatherDataByCity(city, isCelsius);
            // saving data to local storage
            saveRecentSearch(city);
        } else if (latitude && longitude) {
            // fetching data using coords
            data = await fetchWeatherDataByCoords(
                latitude,
                longitude,
                isCelsius
            );
            // saving data to local storage.
            saveLocation(latitude, longitude);
        } else {
            throw new Error("No City Or Coordinates Provided");
        }

        // updating the current weather section.
        updateCurrentWeatherUI(data, isCelsius);

        // updating today highlights sections
        updateTodayHighlights(data);

        const { coord } = data;

        //fetching uv index.
        const uvData = await fetchUVIndex(coord.lat, coord.lon);
        console.log(uvData);
        if (uvData?.value)
            document.getElementById("UVValue").textContent = uvData.value;

        // fetching extended forcast data..
        const forecastData = await fetchExtendedForecast(
            city ? city : data.name,
            isCelsius
        );
        // updating extended forecast section with weather data.
        displayExtendedForecast(forecastData, isCelsius);
    } catch (error) {
        // console.log(error);
        // if we think that the error object that is thrown by the fetchData and then return by the fetchWeatherDataByCity() to this function contain a property called cod and message but we are incorrect in this because the error object has a property which will get the actual message and then this message is a json format which has another property called message which has the actual text of error that we want to show.
        displayErrorMessage(error.message);
    }
}

//? (2) creating a function that will search weather by city name
async function searchWeather() {
    const city = searchInput.value.trim();
    if (!city) {
        displayErrorMessage("Please enter a city name.");
        return;
    }
    await fetchAndDisplayWeather(city, null, null);
    searchInput.value = "";
}

//? (3) Function to get current location weather
async function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                await fetchAndDisplayWeather(null, latitude, longitude);
            },
            (error) => {
                displayErrorMessage("Error getting location: " + error.message);
            }
        );
    } else {
        displayErrorMessage("Geolocation is not supported by this browser.");
    }
}

//? (4) creating a function that will add the recent cities in dropdown.
function populateRecentSearchDropdown() {
    recentDropdown.innerHTML =
        '<option value="" disabled selected hidden>Recent Searches</option>';
    const recentSearches = getRecentSearches();
    recentSearches.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        recentDropdown.appendChild(option);
    });
}

//? (5) creating a function that will handel displaying of weather data when recent cities are selected..
async function handleRecentSearch(e) {
    const selectedCity = e.target.value;
    if (selectedCity) {
        await fetchAndDisplayWeather(selectedCity, null, null);
    }
}

//? (6) creating a function that will change the units.
async function toggleUnit() {
    isCelsius = !isCelsius;
    updateUnitToggleText(isCelsius);
    const { latitude, longitude } = getLocation();
    // const city = document.querySelector(".city")?.textContent;
    // ?. optional chaning operator
    const city = document.getElementById("city")?.textContent;
    await fetchAndDisplayWeather(city, latitude, longitude);
}

// set the unit toggle button text before setting event listeners

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    updateUnitToggleText(isCelsius);
    unitToggleButton.addEventListener("click", toggleUnit);
    searchBtn.addEventListener("click", searchWeather);
    currentLocationBtn.addEventListener("click", getCurrentLocationWeather);
    recentDropdown.addEventListener("change", handleRecentSearch);
    searchInput.addEventListener("input", () => {
        // Clear the error message if the user starts typing
        displayErrorMessage("");
    });
});
populateRecentSearchDropdown();
