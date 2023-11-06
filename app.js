document.addEventListener("DOMContentLoaded", () => {
    const weatherResult = document.getElementById("weatherResult");
    const cityInput = document.getElementById("cityInput");

    async function getWeather() {
        const cityName = cityInput.value;

        if (cityName) {
            try {
                const response = await fetch("http://localhost:3000/getWeather", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cities: [cityName],
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const weather = data.weather[cityName];
                    weatherResult.innerText = `Weather in ${cityName}: ${weather}`;
                } else {
                    weatherResult.innerText = "Error fetching weather data.";
                }
            } catch (error) {
                weatherResult.innerText = "An error occurred while fetching weather data.";
                console.error(error);
            }
        } else {
            weatherResult.innerText = "Please enter a city name.";
        }
    }

    // Bind the getWeather function to the button click event
    document.querySelector("button").addEventListener("click", getWeather);
});
