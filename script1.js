const apikey = "166d146260f4b5cd344a6090940da5df";
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    weatherReport(data);
                })
                .catch((err) => {
                    console.error('Error fetching weather data:', err);
                });
        });
    }
});

function searchByCity() {
    var place = document.getElementById('input').value;
    var urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`;

    fetch(urlsearch)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            weatherReport(data);
        })
        .catch((err) => {
            console.error('Error fetching weather data:', err);
        });
    document.getElementById('input').value = '';
}

function weatherReport(data) {
    var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    fetch(urlcast)
        .then((res) => res.json())
        .then((forecast) => {
            console.log(forecast.city);
            hourForecast(forecast);
            dayForecast(forecast);

            console.log(data);
            document.getElementById('city').innerText = data.name + ', ' + data.sys.country;

            console.log(Math.floor(data.main.temp - 273));
            document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';

            document.getElementById('clouds').innerText = data.weather[0].description;

            let icon1 = data.weather[0].icon;
            let iconurl = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
            document.getElementById('img').src = iconurl;

            showCropSuggestions(data);
            showFunFacts(data);
        })
        .catch((err) => {
            console.error('Error fetching forecast data:', err);
        });
}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = '';
    for (let i = 0; i < 5; i++) {
        var date = new Date(forecast.list[i].dt * 1000);
        console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''));

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time');
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc');
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc);
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = '';
    for (let i = 8; i < forecast.list.length; i += 8) {
        console.log(forecast.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date');
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp);

        let description = document.createElement('p');
        description.setAttribute('class', 'desc');
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div);
    }
}

function showCropSuggestions(data) {
    const cropSuggestions = {
        "Clear": ["Wheat", "Corn", "Soybeans"],
        "Clouds": ["Barley", "Oats", "Rice"],
        "Rain": ["Paddy", "Sugarcane", "Maize"],
        "Snow": ["Broccoli", "Spinach", "Cabbage"]
    };

    const weatherCondition = data.weather[0].main;
    const crops = cropSuggestions[weatherCondition] || ["No specific suggestions"];

    let cropInfo = document.getElementById('crop-info');
    cropInfo.innerHTML = '<ul>' + crops.map(crop => `<li>${crop}</li>`).join('') + '</ul>';
}

function showFunFacts(data) {
    const funFacts = {
        "Clear": ["Sunlight takes about 8 minutes and 20 seconds to reach Earth.", "Clear skies often lead to better visibility for stargazing."],
        "Clouds": ["Clouds can weigh over a million pounds.", "There are different types of clouds: cumulus, stratus, cirrus, etc."],
        "Rain": ["The wettest place on Earth is Mawsynram, India.", "Rain drops can fall at speeds of about 22 miles per hour."],
        "Snow": ["Snowflakes can have up to 200 crystals.", "The largest snowflake on record was 15 inches wide."]
    };

    const weatherCondition = data.weather[0].main;
    const facts = funFacts[weatherCondition] || ["No specific fun facts"];

    let funFactsInfo = document.getElementById('fun-facts-info');
    funFactsInfo.innerHTML = '<ul>' + facts.map(fact => `<li>${fact}</li>`).join('') + '</ul>';
}
