
# Weather Forecast Application

## Overview

A simple weather forecast application built using HTML, CSS, and JavaScript. This app allows users to check the current weather and extended forecast for their location or any city of their choice. The app integrates with the OpenWeatherMap API and provides a responsive, user-friendly interface optimized for iPhone SE, iPad Mini, and desktop devices.

## Features

- **Location-based Weather**: Allows users to view weather details based on their current location.
- **City Search**: Users can search for weather by city name.
- **Extended Forecast**: Displays weather forecasts for the next five days.
- **Responsive Design**: The app is designed to be fully responsive, supporting various devices (desktop, tablet, mobile).
- **Local/Session Storage**: Recently searched cities are saved in user local storage for easy access.
- **Error Handling**: Appropriate error messages are displayed for invalid or unavailable data or for any error that our app can get.

## Tech Stack

- **HTML**: Used for the app structure.
- **CSS**: Styled using Tailwind CSS for a responsive, modern UI, with custom CSS added for the loader animation
- **JavaScript**: Handles the app's logic, API calls, and dynamic content updates.

## File Structure

**`index.html`:** The main HTML entry point of the application.

**`/css`:** Contains the project's style sheet (using Tailwind CSS).

- **`style.css`:** Contains the css for the app.

**`/js`:** Contains all JavaScript files.

- **`app.js`:** The core logic for the client-side, it imports from other modules.

- **`api.js`:** Contains the functions to interact with the backend to retrieve weather data.
- **`events.js`:** Event handling for the search button and other UI interactions.
- **`ui.js`:**  Manages all UI updates (e.g., showing a loader, displaying weather information).
- **`storage.js`:** Manages saving data to local storage.

**`.gitignore`:** This file specifies intentionally untracked files that Git should ignore (e.g., `github_link.md`).

**`README.md`:**  Provides a general overview of the project and instructions to get it running.

## Installation

1. Clone this repository:

    ```bash
    git clone <repository-url>
    ```

2. Open the `index.html` file in your browser to start using the app.

## Usage

1. **Search for a city**: Enter the name of the city in the search bar to get the weather forecast.
2. **View weather details**: The app will display the current weather, temperature, humidity, wind speed, and other relevant information.
3. **Extended forecast**: View the weather for the next 5 days.
4. **Responsive design**: The layout automatically adjusts based on user device's screen size.

## API

This app uses the **OpenWeatherMap API** to fetch weather data.

- **API Key**: user can use the provided API key for the OpenWeatherMap API. or if user prefer to use their own API key then simply replace the key in the api.js JavaScript file.

## Files

- **index.html**: Main HTML structure of the app.
- **styles.css**: Contains custom CSS for additional styling, while Tailwind CSS is applied directly in the HTML.
- **app.js**: Imports events.js and manages the overall logic of the application, including UI updates.
- **api.js**: Handles API requests to OpenWeatherMap.
- **events.js**: Manages event listeners for user interactions.
- **storage.js**: Manages local/session storage for recently searched cities.
- **ui.js**: Updates the UI based on fetched data.

## Contribution

Feel free to fork this repository and make improvements. Contributions are welcome!

## License

This project is open source and available under the [MIT License](LICENSE).