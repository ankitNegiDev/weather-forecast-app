// font owsem icon map...
// const iconMap = {
//     "01d": "fa-sun",
//     "01n": "fa-moon",
//     "02d": "fa-cloud-sun",
//     "03d": "fa-cloud-sun",
//     "02n": "fa-cloud-moon",
//     "03n": "fa-cloud-moon",
//     "04d": "fa-cloud",
//     "04n": "fa-cloud",
//     "09d": "fa-cloud-rain",
//     "10d": "fa-cloud-rain",
//     "09n": "fa-cloud-moon-rain",
//     "10n": "fa-cloud-moon-rain",
//     "11d": "fa-bolt",
//     "11n": "fa-bolt",
//     "13d": "fa-snowflake",
//     "13n": "fa-snowflake",
//     "50d": "fa-smog",
//     "50n": "fa-smog",
// };

// custom icon map...
const iconMap = {
    "01d": { icon: "☀️", color: "#FFD700" }, // for clear sky day
    "01n": { icon: "🌙", color: "#B0C4DE" }, // for clear sky night
    "02d": { icon: "⛅", color: "#F0E68C" }, // few clouds day
    "02n": { icon: "🌤️", color: "#708090" }, // few clouds night
    "03d": { icon: "🌥️", color: "#A9A9A9" }, // scattered clouds
    "03n": { icon: "☁️", color: "#778899" }, // scattered clouds night
    "04d": { icon: "☁️", color: "#808080" }, // broken clouds
    "04n": { icon: "☁️", color: "#696969" }, // broken clouds night
    "09d": { icon: "🌧️", color: "#4682B4" }, // shower rain
    "09n": { icon: "🌧️", color: "#4682B4" },
    "10d": { icon: "🌦️", color: "#1E90FF" }, // rainy day
    "10n": { icon: "🌦️", color: "#4169E1" }, // night rain
    "11d": { icon: "⛈️", color: "#FF4500" }, // thunderstorm
    "11n": { icon: "⛈️", color: "#8B0000" }, // thunderstorm night
    "13d": { icon: "❄️", color: "#00BFFF" }, // snow
    "13n": { icon: "❄️", color: "#1E90FF" },
    "50d": { icon: "🌫️", color: "#D3D3D3" }, // mist
    "50n": { icon: "🌫️", color: "#C0C0C0" }, // foggy and mist
};
export { iconMap };
