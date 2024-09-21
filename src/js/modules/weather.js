
function weather() {

    const API_KEY = '81e07743ed08d5f5ad4197ca18dd8075';

    let form = document.querySelector('#weatherID');
    let city = document.querySelector('.form__input');

    form.onsubmit = submitWeather;

    async function submitWeather(e) {
        e.preventDefault();
        //-------------удаляет пробельные символы с начала и конца строки---------//
        if (city.value === ''.trim()) {
            return;
        }
        //------------------------------------------------------------------------//

        // let cityName = city.value.trim(); //----- сброс строки
        // input.value = ''


        const cityInfo = await getGeo(city.value.trim());

        if (cityInfo.lenght === 0) return;      //--- если ввел ерунду = return

        console.log(cityInfo);
        // console.log(cityInfo[0]['lat']);
        // console.log(cityInfo[0]['lon']);

        //------------Получаю координаты первого города после ввода--------------//
        let weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);
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
        let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;

        // let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name},RU&limit=5&appid=${API_KEY}`;

        let response = await fetch(geoUrl);
        let data = await response.json();
        return data;
    }

    async function getWeather(lat, lon) {
        let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;

        let response = await fetch(weatherUrl);
        let data = await response.json();
        return data;
    }

    function renderWeatherData(data) {
        let temp = document.querySelector('.weather__temp');
        let city = document.querySelector('.weather__city');
        let humidity = document.querySelector('#humidity');
        let wind = document.querySelector('#wind');
        let img = document.querySelector('.weather__img');


        temp.innerText = Math.round(data.temp) + '°c';
        city.innerText = data.name;
        humidity.innerText = data.humidity + '%';
        wind.innerText = data.wind + ' м/с';

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

        // console.log(data.info);


    }
    //------------- ввод Краснодар по умолчанию -------------//
    document.addEventListener('DOMContentLoaded', () => {
        let inp = document.querySelector('.form__input');

        if (inp) inp.value = 'Краснодар';

        document.querySelectorAll('.form__btn').forEach(b => b.click());

    });
    //-------------------------------------------------------//
}

export default weather;