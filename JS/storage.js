// Handles saving and retrieving data from localStorage or sessionStorage (e.g., recent searches).

// storage.js 3

console.log("storage.js is working");
//? (1) creating a function that will save only the recent searched city... not more then 5.
function saveRecentSearch(city) {
    // checking is city is valid string or not ..
    if (!city) {
        console.error("sorry city is not correct string");
        return;
    }

    //  using try catch to handel errors.
    try {
        // reterving the recent searches from the local storage...
        let recentSearches = JSON.parse(
            localStorage.getItem("recentSearches") || "[]"
        );

        // Removing  duplicate  city if exists
        if (recentSearches.includes(city)) {
            recentSearches = recentSearches.filter((item) => item !== city);
        }

        // Adding new city at the beginning of the array which we want...
        recentSearches.unshift(city);

        // Limiting  the list to 5 items only. means dropdown will show only recent 5 searches.
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        // Saving  to local storage
        localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    } catch (error) {
        console.error(
            "Error while saving recent search to local storage.",
            error
        );
    }
}

//? (2) creating a function that will get the recent searches from the local storage..
function getRecentSearches() {
    try {
        return JSON.parse(localStorage.getItem("recentSearches") || "[]");
    } catch (error) {
        console.error(
            "Error while getting recent search from local storage",
            error
        );
        return [];
        // return empty array if there is any error.
    }
}

//? (3) creating a function that will store user location into browwers local storageee.
function saveLocation(latitude, longitude) {
    // error Handling using try catch
    try {
        //Saving latitude and longitude to local storage
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
    } catch (error) {
        // Handling error during the local storage operations.
        console.error("Error while saving location to local storage", error);
    }
}

//? (4) creating a function that will reterive the user location from the browser local storage...
function getLocation() {
    try {
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");
        return {
            latitude: latitude ? parseFloat(latitude) : null,
            longitude: longitude ? parseFloat(longitude) : null,
        };
    } catch (error) {
        console.error("Error while getting location from local storage", error);
        return { latitude: null, longitude: null };
        // return null value for latitude and longitude
    }
}

export { saveRecentSearch, getRecentSearches, saveLocation, getLocation };
