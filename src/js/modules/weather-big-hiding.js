
function bigWeather() {
    let btn = document.querySelector('.weather__items-links');
    let appBig = document.querySelector('.weather-app-big');

    btn.addEventListener('click', function () {
        appBig.classList.toggle('app-remove');
    });
};

export default bigWeather;