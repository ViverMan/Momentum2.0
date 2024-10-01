
function bigWeather() {

    let mediaQuery = window.matchMedia('(max-width: 820px)');
    let mediaQueryH = window.matchMedia('(max-height: 418px)');
    let time = document.querySelector('.container');

    let btn = document.querySelector('.weather__items-links');
    let appBig = document.querySelector('.weather-app-big');
    let todo = document.querySelector('.container-todo');
    let popup = document.querySelector('.pop-up__title-main');

    btn.addEventListener('click', function () {
        appBig.classList.toggle('app-remove');
    });

    function mediaChange(e) {
        if (e.matches) {

            btn.addEventListener('click', function () {
                time.classList.toggle('disp-none');
                todo.classList.toggle('disp-none');
                popup.classList.toggle('disp-none');
            })
        }

    }
    mediaQuery.addListener(mediaChange)
    mediaChange(mediaQuery)



};

export default bigWeather;