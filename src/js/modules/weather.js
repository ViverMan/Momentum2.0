
function weather() {

    const API_KEY = '81e07743ed08d5f5ad4197ca18dd8075';

    const form = document.querySelector('#weatherID');
    const input = document.querySelector('.form__input');

    form.onsubmit = submitWeather;

    async function submitWeather(e) {
        e.preventDefault();
        //-------------удаляет пробельные символы с начала и конца строки---------//
        if (input.value === ''.trim()) {
            return;
        }
        //------------------------------------------------------------------------//

        // let cityName = city.value.trim(); //----- сброс строки
        // input.value = ''


        const cityInfo = await getGeo(input.value.trim());

        if (cityInfo.lenght === 0) return;      //--- если ввел ерунду = return

        console.log(cityInfo);
        // console.log(cityInfo[0]['lat']);
        // console.log(cityInfo[0]['lon']);

        //------------Получаю координаты первого города после ввода--------------//
        const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);
        //-----------------------------------------------------------------------//
        // console.log(weatherInfo);

        // console.log(weatherInfo.name);
        // console.log(weatherInfo.main.humidity);
        // console.log(weatherInfo.main.temp);
        // console.log(weatherInfo.wind.speed);
        // console.log(weatherInfo.weather[0]['main']);

        const weatherData = {
            name: weatherInfo.name,
            temp: weatherInfo.main.temp,
            humidity: weatherInfo.main.humidity,
            wind: weatherInfo.wind.speed,
            info: weatherInfo.weather[0]['main']
        };
        // console.log(weatherData.info);

        renderWeatherData(weatherData);
    }

    async function getGeo(name) {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;

        // let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name},RU&limit=5&appid=${API_KEY}`;

        const response = await fetch(geoUrl);
        const data = await response.json();
        return data;
    }

    async function getWeather(lat, lon) {
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;

        const response = await fetch(weatherUrl);
        const data = await response.json();
        return data;
    }

    function renderWeatherData(data) {
        const temp = document.querySelector('.weather__temp');
        const city = document.querySelector('.weather__city');
        const humidity = document.querySelector('#humidity');
        const wind = document.querySelector('#wind');
        const img = document.querySelector('.weather__img');

        const temp2 = document.querySelector('.weather__temp-big');
        const city2 = document.querySelector('.weather__city-big');
        const humidity2 = document.querySelector('#humidity2');
        const wind2 = document.querySelector('#wind2');
        const img2 = document.querySelector('.weather__img-big');


        temp.innerText = Math.round(data.temp) + '°c';
        city.innerText = data.name;
        humidity.innerText = data.humidity + '%';
        wind.innerText = data.wind + ' м/с';

        temp2.innerText = Math.round(data.temp) + '°c';
        city2.innerText = data.name;
        humidity2.innerText = data.humidity + '%';
        wind2.innerText = data.wind + ' м/с';

        localStorage.setItem('name', data.name);
        console.log(localStorage);

        const fileNames = {
            'Clouds': 'clouds',
            'Rain': 'rain',
            'Clear': 'clear',
            'Snow': 'snow',
            'Thunderstorm': 'thunderstorm',
            'Mist': 'mist',
            'Drizzle': 'drizzle',
        }

        if (fileNames[data.info]) {
            img.src = `./img/weather-app/${fileNames[data.info]}.png`;
            img.srcset = `./img/weather-app/${fileNames[data.info]}@2x.png`;
        }

        if (fileNames[data.info]) {
            img2.src = `./img/weather-app-big/${fileNames[data.info]}.png`;
            // img2.srcset = `./img/weather-app/${fileNames[data.info]}@2x.png`;
        }

        // console.log(data.info);


    }
    //------------- ввод Краснодар по умолчанию -------------//
    document.addEventListener('DOMContentLoaded', () => {
        let inp = document.querySelector('.form__input');

        if (inp) inp.value = 'Краснодар';

        document.querySelectorAll('.form__btn').forEach(b => b.click());
    });
    //-------------------------------------------------------//

    const localQuery = localStorage.getItem('name');
    input.value = localQuery !== null ? localQuery : '';
}

export default weather;