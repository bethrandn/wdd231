// Business Spotlights

const spotlightContainer = document.querySelector("#spotlight-container");

async function displaySpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business information.");
        }

        const members = await response.json();

        // Select Gold and Silver members only
        const eligibleMembers = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        // Randomly arrange the eligible members
        eligibleMembers.sort(() => Math.random() - 0.5);

        // Select two or three members
        const numberOfSpotlights = Math.floor(Math.random() * 2) + 2;
        const selectedMembers = eligibleMembers.slice(0, numberOfSpotlights);

        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            const membershipLevel = member.membership === 3 ? "Gold" : "Silver";

            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name} logo">
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <p>Membership: ${membershipLevel}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        spotlightContainer.textContent = "Business spotlights are currently unavailable.";
        console.error("Spotlight error:", error);
    }
}

displaySpotlights();
// Weather API Settings

const weatherAPIKey = "a1eda652204a918c9c8fad932e1ae65a";
const weatherCity = "Lagos";
const weatherCountry = "NG";

// Get Current Weather

const currentWeather = document.querySelector("#current-weather");

async function getCurrentWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity},${weatherCountry}&appid=${weatherAPIKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        currentWeather.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
                width="100"
                height="100">
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Conditions:</strong> ${description}</p>
        `;

    } catch (error) {
        currentWeather.textContent = "Weather information is currently unavailable.";
        console.error("Weather error:", error);
    }
}
getCurrentWeather();

// Get Three-Day Weather Forecast

const weatherForecast = document.querySelector("#weather-forecast");

async function getWeatherForecast() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${weatherCity},${weatherCountry}&appid=${weatherAPIKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather forecast.");
        }

        const data = await response.json();

        const timezone = data.city.timezone;
        const dailyForecasts = {};

        data.list.forEach(item => {
            const localDate = new Date((item.dt + timezone) * 1000);
            const dateKey = localDate.toISOString().split("T")[0];

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = [];
            }

            dailyForecasts[dateKey].push(item);
        });

        const forecastDates = Object.keys(dailyForecasts).sort();

        // Select the next three days, excluding today
        const today = new Date(Date.now() + timezone * 1000)
            .toISOString().split("T")[0];

        const nextThreeDays = forecastDates
            .filter(date => date > today)
            .slice(0, 3);

        weatherForecast.innerHTML = "<h3>Three-Day Forecast</h3>";

        nextThreeDays.forEach(date => {
            const forecasts = dailyForecasts[date];

            // Find the forecast closest to midday
            const middayForecast = forecasts.reduce((closest, item) => {
                const hour = new Date((item.dt + timezone) * 1000).getUTCHours();
                const closestHour = new Date((closest.dt + timezone) * 1000).getUTCHours();

                return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                    ? item
                    : closest;
            });

            const day = new Date(`${date}T12:00:00Z`)
                .toLocaleDateString("en-GB", {
                    weekday: "long",
                    timeZone: "UTC"
                });

            const temperature = Math.round(middayForecast.main.temp);
            const description = middayForecast.weather[0].description;
            const icon = middayForecast.weather[0].icon;

            weatherForecast.innerHTML += `
                <div class="forecast-day">
                    <h4>${day}</h4>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                         alt="${description}"
                         width="80"
                         height="80">
                    <p>${temperature}°C</p>
                    <p>${description}</p>
                </div>
            `;
        });

    } catch (error) {
        weatherForecast.textContent = "Weather forecast is currently unavailable.";
        console.error("Forecast error:", error);
    }
}

getWeatherForecast();
