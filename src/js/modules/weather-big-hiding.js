
function bigWeather() {

    let mediaQuery = window.matchMedia('(max-width: 820px)');
    let time = document.querySelector('.container');

    let btn = document.querySelector('.weather__items-links');
    let appBig = document.querySelector('.weather-app-big');

    btn.addEventListener('click', function () {
        appBig.classList.toggle('app-remove');
    });

    function mediaChange(e) {
        if (e.matches) {

            btn.addEventListener('click', function () {
                time.classList.toggle('disp-none');
            })
        }
    }

    mediaQuery.addListener(mediaChange)
    mediaChange(mediaQuery)
};

export default bigWeather;