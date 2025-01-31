// ui.js 2
console.log("ui is working");
// Cache DOM elements (outside the function)
/**
 * the better approach might be like we create a object and inside dom we store all the dom element id in a array and then using the loop to get them by id and store them as a property of object and then using obj.elmentName like obj.weatherIcon etc... but i want to go with beginer friendly approach...
 * const obj={}
 * document.addEvnt("domContntLoded",()=>{const elementId= [all element id] elementId.forEach(id => obj.id=document.getEleById(id))}); like this...
 */

import { iconMap } from "./icons.js";
let currentWeatherContainer;
let weatherIcon;
let temperature;
let feelsLike;
let description;
let date;
let city;
let humidityValue;
let windValue;
let sunRiseValue;
let sunSetValue;
let cloudValue;
let uvValue;
let pressureValue;

let recentDropdown;
let forecastContainer;
let errorMessageDiv;
let unitToggleButton;
document.addEventListener("DOMContentLoaded", function callback() {
    // accessing the dom element once dom is loaded...
    currentWeatherContainer = document.getElementById("current-weather");
    weatherIcon = document.getElementById("weather-icon");
    temperature = document.getElementById("temprature");
    feelsLike = document.getElementById("feels-like");
    description = document.getElementById("description");
    date = document.getElementById("date");
    city = document.getElementById("city");

    humidityValue = document.getElementById("HValue");
    windValue = document.getElementById("WValue");
    sunRiseValue = document.getElementById("sun-rise-value");
    sunSetValue = document.getElementById("sun-set-value");
    cloudValue = document.getElementById("CValue");
    uvValue = document.getElementById("UVValue");
    pressureValue = document.getElementById("PValue");

    // accessing the recent dropdown
    recentDropdown = document.getElementById("recent-dropdown");
    // accessing the forecast container ....
    forecastContainer = document.getElementById("forecast-container");

    // accessing the error message div....
    errorMessageDiv = document.getElementById("error-message");

    // accessing the unit toggle btn for converting degree celsius and faheranite...
    unitToggleButton = document.getElementById("unit-toggle-btn");
    console.log(unitToggleButton);
});



// creating a function for temprature conversion..
/**
 * no need to use this function...The reason why we are still getting the conversion even after commenting out the convertToFahrenheit() function is that we are calling the fetchWeatherDataByCity and fetchWeatherDataByCoords function and we are passing the isCelsius variable to these function which internally call the API with units=metric or units=imperial.
 * The OpenWeatherMap API itself handles the unit conversion and this is what we are utilizing. When we pass units=metric we get the temperature in Celsius, and if we pass units=imperial we will get the temperature in Fahrenheit.
 */
/*
function convertToFahrenheit(temp) {
    console.log("temprature ====================>");
    console.log(temp);
    const tempInFahrenheit = (temp * 9/5) + 32;
    return tempInFahrenheit = temp;
}
*/


// creating a function that will get the weatherIcon... based on font-owsem icon map...
/*
function getWeatherIcon(iconCode) {
    return `<i class="fa-solid ${iconMap[iconCode] || "fa-question"}"></i>`;
}
*/

function getWeatherIcon(iconCode) {
    const iconData = iconMap[iconCode] || { icon: "❓", color: "#808080" };
    return `<span style="color: ${iconData.color};">${iconData.icon}</span>`;
}


//? (1) creating a function that will update the ui of the current weather section..
function updateCurrentWeatherUI(data, isCelsius) {
    // checking is data object is not null or undefined  and also checking that all the dom element that we fetch are present in dom..
    console.log("data object inside the update current weather");
    console.log(data);
    if (
        !data ||
        !weatherIcon ||
        !temperature ||
        !feelsLike ||
        !description ||
        !date ||
        !city
    ) {
        // if any one of correct then show error on console.
        console.error("Could not find current weather elements");
        return;
        // returning because we did not want to update the ui with invlaid data.
    }

    // setting the temp either in degree celsius or faranite based on isCelsius parameter.
    const tempValue = Math.round(data.main.temp);

    // same for feelslike
    const feelsLikeValue = Math.round(data.main.feels_like);

    // temprature unit string .
    const unit = isCelsius ? "°C" : "°F";

    // formating the date..
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // updating the weather details in dom
    weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
    temperature.textContent = `${tempValue} ${unit}`;
    feelsLike.textContent = `Feels like ${feelsLikeValue} ${unit}`;
    description.textContent = data.weather[0].description;
    date.textContent = formattedDate;
    city.textContent = data.name;
}

//? (2) creating a function that will update the today highlights sections..
function updateTodayHighlights(data) {
    if (
        !data ||
        !humidityValue ||
        !windValue ||
        !sunRiseValue ||
        !sunSetValue ||
        !cloudValue ||
        !uvValue ||
        !pressureValue
    ) {
        console.error("Could not find highlight elements");
        return;
    }
    // Converting sunrise and sunset timestamps in milliseconds
    const sunriseTimestamp = data.sys.sunrise * 1000;

    const sunsetTimestamp = data.sys.sunset * 1000; 


    // Formatting sunrise and sunset times
    const sunriseTime = new Date(sunriseTimestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    const sunsetTime = new Date(sunsetTimestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // Updating basic weather data
    humidityValue.textContent = `${data.main.humidity}%`;
    windValue.textContent = `${data.wind.speed} m/s`;
    cloudValue.textContent = `${data.clouds.all}%`;
    pressureValue.textContent = `${data.main.pressure} hPa`;
    sunRiseValue.textContent = sunriseTime;
    sunSetValue.textContent = sunsetTime;

    // 6. Updating UV index (or placeholder if not available)
    uvValue.innerHTML =
        data.uvi !== undefined
            ? `<i class="fa-solid fa-sun"></i>  ${data.uvi}`
            : "--";
}

//? (3) creating a function that will create single forecast card... like for day 1 2 3 4 5 etc...
function createForecastCard(forecast, isCelsius) {
    // extracting and formatting the date from the forecast data object.
    const forecastDate = new Date(forecast.dt * 1000);
    /**
     * This line first access the dt (datetime) property from the forecast object. The dt property is most likely in a Unix timestamp (seconds). It then multiplies the timestamp by 1000 to convert it to milliseconds and then creates a new JavaScript Date object with this value.
     */
    //  The toLocaleDateString() method is used to format this Date object into a readable day name eg like "monday" "satrday" etc and the en-US argument specifies that the date format should be for English (United States).
    const dayName = forecastDate.toLocaleDateString("en-US", {
        weekday: "long",
    });
    
    // setting temprature
    const temp = Math.round(forecast.main.temp);

    // setting unit
    const unit = isCelsius ? "°C" : "°F";

    // creating a div which will be our card
    const card = document.createElement("div");
    card.classList.add(
        "bg-gray-100",
        "p-4",
        "rounded-lg",
        "text-center",
        "bg-gradient-to-r",
        "from-purple-400",
        "to-indigo-400"
    );
    // setting our weather card for HTML Content
    card.innerHTML = `
            <p class="text-2xl font-bold text-gray-700">${dayName}</p>
            <div class="weather-icon text-6xl my-4">
                ${getWeatherIcon(forecast.weather[0].icon)}
            </div>
            <h1 class="text-4xl font-bold m-4">${temp} ${unit}</h1>
            <p class="text-xl font-medium text-gray-600 mt-2">
                Wind ${forecast.wind.speed} m/s
            </p>
            <p class="text-xl font-medium text-gray-600 mt-2">
            Humidity ${forecast.main.humidity}%
            </p>
        `;

    // now returning the card element because where we need this card we will call ..... like for day 1 ,2 ,3 ,4,5 etc....
    return card;
}

//? (4) creating a function that will create the forecast card for each day like day 1,2,3,4,5 append it in dom inside forecast-container.
function displayExtendedForecast(forecastData, isCelsius) {
    // checking is forecast container is avilable in dom or not .
    if (!forecastContainer) {
        console.error(
            "Sorry forecast container is not avilable in dom check how we pass id"
        );
        return;
    }

    // clearing the forecast container before adding any forecast card..
    forecastContainer.innerHTML = "";

    // checking if either forecastData is null | undefined or forecastData.list is null | undefined we will throw an error to the console and returns from the function to avoid error..
    if (!forecastData || !forecastData.list) {
        console.error("No forecast data found");
        return;
    }

    // filtering the list to get one forecast data at a specific time for a specific day.
    const filteredForecasts = forecastData.list.filter((forecast) =>
        // using 12:00:00 to get the forecast of 12pm
        forecast.dt_txt.includes("12:00:00")
    );

    // running loop to get all day forecast.. like 1,2,3,4,5 etc
    filteredForecasts.forEach((forecast) => {
        const card = createForecastCard(forecast, isCelsius);
        forecastContainer.appendChild(card);
    });
}

//? (5) creating a function that will update the recently searched city drop down...
function updateRecentCitiesDropdown(recentCities) {
    // checking is recentDropdown is avilable in dom or not...
    if (!recentDropdown) {
        console.error("Could not find recent cities dropdown");
        return;
    }

    // Before adding new city options to the dropdown we need to clear any existing options by setting the innerHTML of the recentDropdown to an empty string (""). This ensures that the dropdown doesn't have duplicate or outdated city entries.
    recentDropdown.innerHTML = "";

    // checking that recentCites array is not null and its length is not 0 because in this case we don't have to create any dropdown..
    if (!recentCities || recentCities.length == 0) {
        return;
    }

    // now creating a option for each recent city that user enter.
    recentCities.forEach(function callback(city) {
        const option = document.createElement("option");
        //! option.vlaue = city; // typo error...
        option.value = city;
        option.text = city;
        recentDropdown.appendChild(option);
    });
}

//? (6) creating a function that will show a error when some thing goes wrong in our app...
function displayErrorMessage(message) {
    if (!errorMessageDiv) {
        console.error("Sorry, we could not find the error div in the DOM.");
        return;
    }
    try {
        // the reason why we are doing json.parse() is because our message can be a plane text or json format..
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        errorMessageDiv.textContent =
            parsedMessage.message || parsedMessage.error || message;
    } catch (e) {
        errorMessageDiv.textContent = message;
    }
}

//function for getting the loader.. bascially we are adding a class and then apply desired effect using the custom css.
function showLoader() {
    document.body.classList.add("loading");
    let loadingMessage = document.querySelector(".loading-message");
    if (!loadingMessage) {
        loadingMessage = document.createElement("div");
        loadingMessage.classList.add("loading-message");
        loadingMessage.innerText = "Please wait, fetching weather data...";
        document.body.appendChild(loadingMessage);
    }
}

// function for hidding the loader..
function hideLoader() {
    document.body.classList.remove("loading");
    let loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// creating a function that will convert the text of conversion toggle button...
function updateUnitToggleText(isCelsius) {
    // checking unitToggleButton is in dom or not..
    console.log("hii am inside the updateToggleText===================");
    if (!unitToggleButton) {
        console.error("Could not find unit converter btn check id");
        return;
    }
    unitToggleButton.textContent = isCelsius
        ? "converter °C °F"
        : "converter °F °C";
}

export {
    updateCurrentWeatherUI,
    updateTodayHighlights,
    displayExtendedForecast,
    updateRecentCitiesDropdown,
    displayErrorMessage,
    showLoader,
    hideLoader,
    updateUnitToggleText,
};
