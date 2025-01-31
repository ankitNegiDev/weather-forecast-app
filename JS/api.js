//fetching data from weather api....
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4e6b0a3c59e47a99fdabba30c0..... url will be this for weather and for forecast just write forecast with lat and longitude..

// api.js 1
console.log("api.js working");
import { showLoader, hideLoader } from "./ui.js";
const apiKey = ""; //! need to figure out how we can hide api key.
const apiUrl = "https://api.openweathermap.org/data/2.5/";

// creating a function to build url for fetchWeatherDataByCity().

function buildCityUrl({ apiUrl, city, apiKey, unit }) {
    // const cityUrl = `${obj.apiUrl}weather?q=${obj.city}&appid=${obj.apiKey}&units=${obj.unit}`;

    //todo => instead of this we will use object destructuring..
    const cityUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=${unit}`;
    return cityUrl;
}

// creating a function to build url for fetchWeatherDataByCoords().

function buildCoordinatesUrl({ apiUrl, apiKey, latitude, longitude, unit }) {
    const coordsUrl = `${apiUrl}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
    return coordsUrl;
}

// creating a function that will build url for the fetchUVIndex()..

function buildUVUrl({ apiUrl, apiKey, latitude, longitude }) {
    const uvIndexUrl = `${apiUrl}uvi?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    return uvIndexUrl;
}

// creating a function that will build url for the fetchExtendedForcast()..

function buildExtendedForecastUrl({ apiUrl, apiKey, city, unit }) {
    const extendedForecastUrl = `${apiUrl}forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    return extendedForecastUrl;
}

// creating a async function that will fetch data based on the url we provide...
async function fetchData(url) {
    try {
        showLoader();
        const response = await fetch(url);
        setTimeout(function () {
            hideLoader();
        }, 3000);
        if (!response.ok) {
            let errorMessage = await response.text();
            // try block for if response.text() return a string which contain json data not plane text.
            try {
                const errorData = await response.json();
                // creating a fallback for errorMessage.
                errorMessage =
                    errorData.message || errorData.error || errorMessage;
            } catch (e) {}
            // throwing a new error with actual error in errorMessage.
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        // throwing error back to caller.
        console.log("error in fetch data");
        throw error;
    }
}

//? (1) creating a function that will fetch data acc to city...

async function fetchWeatherDataByCity(city, isCelsius) {
    const unit = isCelsius ? "metric" : "imperial";
    // const obj = { apiUrl: apiUrl, apiKey: apiKey, city: city, unit: unit };
    // const url = buildCityUrl(obj);

    //todo => instead of this we can directly pass the object.
    const url = buildCityUrl({
        apiUrl: apiUrl,
        apiKey: apiKey,
        city: city,
        unit: unit,
    });

    // calling the fetchData() to fetch the data based on city...
    return await fetchData(url);
}

//? (2) creating a function that will fetch data acc to coordinates..

async function fetchWeatherDataByCoords(latitude, longitude, isCelsius) {
    const unit = isCelsius ? "metric" : "imperial";
    const url = buildCoordinatesUrl({
        apiUrl: apiUrl,
        apiKey: apiKey,
        latitude: latitude,
        longitude: longitude,
        unit: unit,
    });
    return await fetchData(url);
}

//? (3) creating a function that will fetch uv index based on coordinates..

async function fetchUVIndex(latitude, longitude) {
    const url = buildUVUrl({
        apiUrl: apiUrl,
        apiKey: apiKey,
        latitude: latitude,
        longitude: longitude,
    });
    return await fetchData(url);
}

//? (4) creating a function that will fetch extended forcast using city..

async function fetchExtendedForecast(city, isCelsius) {
    const unit = isCelsius ? "metric" : "imperial";
    const url = buildExtendedForecastUrl({
        apiUrl: apiUrl,
        apiKey: apiKey,
        city: city,
        unit: unit,
    });
    return await fetchData(url);
}

// exporting the function
export {
    fetchWeatherDataByCity,
    fetchWeatherDataByCoords,
    fetchUVIndex,
    fetchExtendedForecast,
};
