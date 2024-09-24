
function media() {

    let mediaQuery = window.matchMedia('(max-width: 820px)');
    let mediaQuery2 = window.matchMedia('(min-width: 821px)');
    let btnBlock = document.querySelector('.weather__items-links');
    let toDoHead = document.querySelector('.todo-head');
    let toDoContainer = document.querySelector('.container-todo');
    let time = document.querySelector('.container');
    let containerWeather = document.querySelector('.container-small');



    function mediaChange(e) {
        if (e.matches) {
            // btnBlock.setAttribute('disabled', '');

            toDoHead.addEventListener('click', function () {
                toDoContainer.classList.toggle('todo-active');

                time.classList.toggle('disp-none');
                containerWeather.classList.toggle('disp-none');
            })
        }
    }

    mediaQuery.addListener(mediaChange)
    mediaChange(mediaQuery)

    function mediaChange2(e) {
        if (e.matches) {
            // btnBlock.removeAttribute('disabled', '');

            toDoContainer.classList.remove('todo-active');

            time.classList.remove('disp-none');
            containerWeather.classList.remove('disp-none');
        }
    }
    mediaQuery2.addListener(mediaChange2)
    mediaChange2(mediaQuery2)

};

export default media;