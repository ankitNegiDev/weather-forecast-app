//fetching data from weather api....
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4e6b0a3c59e47a99fdabba30c0..... url will be this for weather and for forecast just write forecast with lat and longitude..

// api.js 1
console.log("api.js working");
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
        // calling the fetch to get the data of given url...
        // fetch will return a promise.
        const response = await fetch(url);

        // checking that is respone is valid or not means does api gives any http error or not
        if (!response.ok) {
            // response if not correct then throwing error message...
            const message = await response.text();
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // throwing error back to caller.
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
