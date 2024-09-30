/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/slide-todo.js

function todo() {

    let toDoHead = document.querySelector('.todo-head');
    let cardDown = document.querySelector('.card');
    let cardDownBottom = document.querySelector('.card-bottom');
    let activeTodo = document.querySelector('.container-todo');


    toDoHead.addEventListener('click', function () {

        if (cardDown.style.display == 'block') {
            cardDown.style.display = 'none';
        }
        else {
            cardDown.style.display = 'block';
        }

        if (cardDownBottom.style.display == 'block') {
            cardDownBottom.style.display = 'none';
        }
        else {
            cardDownBottom.style.display = 'block';
        }
    })
}

/* harmony default export */ var slide_todo = (todo);


;// CONCATENATED MODULE: ./src/js/modules/weather.js

function weather() {

    const API_KEY = '81e07743ed08d5f5ad4197ca18dd8075';

    const form = document.querySelector('#weatherID');
    const input = document.querySelector('.form__input');

    let dataWeather = [];



    if (localStorage.getItem('dataWeather')) {
        dataWeather = JSON.parse(localStorage.getItem('dataWeather'));

        dataWeather.forEach(function (data) {
            renderWeatherData(data);
        })

    };

    // console.log(dataWeather.length);

    if (dataWeather.length < 1) {

        document.addEventListener('DOMContentLoaded', () => {
            // let inp = document.querySelector('.form__input');

            if (input) input.value = 'Краснодар';

            document.querySelectorAll('.form__btn').forEach(b => b.click());
        });
    }

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

        dataWeather.push(weatherData);
        saveToLocalStorage();

        renderWeatherData(weatherData);
    }

    async function getGeo(name) {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=2&appid=${API_KEY}`;

        // let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name},RU&limit=5&appid=${API_KEY}`;

        const response = await fetch(geoUrl);
        const data = await response.json();
        return data;
    }

    async function getWeather(lat, lon) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;

        // const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;

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
            // img.srcset = `./img/weather-app/${fileNames[data.info]}@2x.png`;
        }

        if (fileNames[data.info]) {
            img2.src = `./img/weather-app-big/${fileNames[data.info]}.png`;
            // img2.srcset = `./img/weather-app/${fileNames[data.info]}@2x.png`;
        }

        // console.log(data.info);


    }

    function saveToLocalStorage() {
        localStorage.setItem('dataWeather', JSON.stringify(dataWeather));
    };
}

/* harmony default export */ var modules_weather = (weather);
;// CONCATENATED MODULE: ./src/js/modules/weather-big-hiding.js

function bigWeather() {

    let mediaQuery = window.matchMedia('(max-width: 820px)');
    let mediaQueryH = window.matchMedia('(max-height: 418px)');
    let time = document.querySelector('.container');

    let btn = document.querySelector('.weather__items-links');
    let appBig = document.querySelector('.weather-app-big');
    let todo = document.querySelector('.container-todo');

    btn.addEventListener('click', function () {
        appBig.classList.toggle('app-remove');
    });

    function mediaChange(e) {
        if (e.matches) {

            btn.addEventListener('click', function () {
                time.classList.toggle('disp-none');
                todo.classList.toggle('disp-none');
            })
        }

    }
    mediaQuery.addListener(mediaChange)
    mediaChange(mediaQuery)



};

/* harmony default export */ var weather_big_hiding = (bigWeather);
;// CONCATENATED MODULE: ./src/html/data/weekRus.json
var weekRus_namespaceObject = JSON.parse('["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]');
;// CONCATENATED MODULE: ./src/html/data/monthRus.json
var monthRus_namespaceObject = JSON.parse('["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентября","Октябрь","Ноябрь","Декабрь"]');
;// CONCATENATED MODULE: ./src/js/modules/day-week.js



function week() {

    var weekRus = weekRus_namespaceObject;
    var monthRus = monthRus_namespaceObject;

    var date = new Date();
    var week = date.getDay();
    var month = date.getMonth();
    var day = date.getDate();

    document.getElementById('dayNow').innerHTML = day;
    document.getElementById('monthNow').innerHTML = monthRus[month] + ',';
    document.getElementById('weekNow').innerHTML = weekRus[week];


    // console.log(weekRus[week]);
    // console.log(monthRus[month]);
    // console.log(day);
};

/* harmony default export */ var day_week = (week);


;// CONCATENATED MODULE: ./src/js/modules/time.js

function time() {

    let img = document.querySelector('#imageID');

    function checkTime(i) {

        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function timeBegan() {

        let today = new Date();
        let hour = today.getHours();
        let minute = today.getMinutes();
        let second = today.getSeconds();

        if (hour >= 0) {
            img.classList.add('slide1');
            img.classList.remove('slide4');
        };

        if (hour >= 6) {
            img.classList.add('slide2');
            img.classList.remove('slide1');
        };

        if (hour >= 12) {
            img.classList.add('slide3');
            img.classList.remove('slide2');
        };

        if (hour >= 18) {
            img.classList.add('slide4');
            img.classList.remove('slide3');
        };

        hour = checkTime(hour);
        minute = checkTime(minute);
        second = checkTime(second);

        document.getElementById('timeNow').innerHTML = hour + ":" + minute + ":" + second;

        setTimeout(function () {
            timeBegan()
        }, 1000);
    }

    timeBegan();
}



/* harmony default export */ var modules_time = (time);


// var dateElement = document.getElementById('currentTime');

// setInterval(function () {

//   var currentTime = new Date();
//   dateElement.textContent = currentTime.toLocaleString();

// }, 1000);


;// CONCATENATED MODULE: ./src/js/modules/task-manager.js


function taskManager() {

    let form = document.querySelector('#form');
    let taskInput = document.querySelector('#taskInput');
    let tasksList = document.querySelector('#tasksList');
    let emptyList = document.querySelector('#emptyList');

    // --- правильное сохранение в LS 
    let tasks = [];


    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function (task) {
            renderTask(task);
        })
    };


    checkEmptyList();
    //--- добавил задачу
    form.addEventListener('submit', addTask);

    //--- удалил задачу
    tasksList.addEventListener('click', delTask);

    //--- выполнил задачу
    tasksList.addEventListener('click', doneTask);

    //--- функция добавления задачи
    function addTask(event) {
        event.preventDefault(); // отменяет перезагрузку страницы

        let taskText = taskInput.value;

        if (taskText == '') {
            alert('Введите текст задачи');
            return;
        };

        // -LS-- Описываю задачу в виде массива 
        let newTask = {
            id: Date.now(),
            text: taskText,
            done: false,
        };

        // -LS-- Добавляю задачу в массив с задачами 
        tasks.push(newTask);
        // -- добавляем задачу в хранилище LocalStorage
        saveToLocalStorage();

        // -- рендерим задачу на страницу
        renderTask(newTask);
        //---очистить поле ввода и вернуть фокус
        taskInput.value = '';
        taskInput.focus();

        checkEmptyList();

        // if (tasksList.children.length > 1) {
        //     emptyList.classList.add('displayNone');
        // };
    };

    // console.log(tasks.length);
    //--- функция удаления задачи
    function delTask(event) {
        // --- проверка, что клик был именно по кнопке delete иначе return
        if (event.target.dataset.action !== 'delete') {
            return;
        }

        // --- смотрю, что клик был именно по кнопке delete (if можно и не писать)
        if (event.target.dataset.action === 'delete') {

            // -- нахожу родителя li кнопки delete
            let parent = event.target.closest('li');

            // -- нахожу ID и индекс задачи в LS и удаляю из массива по индексу 
            let id = Number(parent.id);
            // -- нахожу индекс задачи в LS
            let index = tasks.findIndex(function (task) {
                return task.id === id;

                // if (task.id === id) {
                //     return true;
                // };
            });
            // -- удаляю по индексу
            tasks.splice(index, 1);
            // -- добавляем задачу в хранилище LocalStorage
            saveToLocalStorage();
            // -- удаляю родителя li кнопки delete
            parent.remove();
            // -- проверка, если один эл-т li = показываю 'список дел'
            // if (tasksList.children.length === 1) {
            //     emptyList.classList.remove('displayNone');
            // };
        };

        checkEmptyList();
    };
    //--- функция выполнения задачи 
    function doneTask(event) {
        // --- проверка, что клик был именно по кнопке done иначе return
        if (event.target.dataset.action !== 'done') {
            return;
        };
        // --- проверка, что клик был именно по кнопке done (и снова if можно не писать)
        if (event.target.dataset.action === 'done') {

            // --- нахожу span с текстом (задачей)
            let parent = event.target.closest('li');

            // -- нахожу ID задачи
            let id = Number(parent.id);

            // -- нахожу элемент задачи в массиве 
            let el = tasks.find(function (task) {

                return task.id === id;

                // if (task.id === id) {
                //     return true;
                // };
            });

            // -- меняю статус на обратный
            el.done = !el.done;
            // -- добавляем задачу в хранилище LocalStorage
            saveToLocalStorage();

            let taskTitle = parent.querySelector('span');
            // -- перечеркиваю текст span-а
            taskTitle.classList.toggle('task-title--done');
        };
    };

    function destroy() {

        let destroyComplited = document.querySelector('.clear-complited-btn');
        destroyComplited.addEventListener('click', function () {

            for (let i = 0; i <= tasks.length - 1; i++) {

                let destItem = document.querySelector('.task-title--done');

                if (destItem !== null) {
                    destItem.closest('.task-item').remove();
                }
            }
            ;
            tasks = tasks.filter(el => el.done !== true);
            saveToLocalStorage();
            checkEmptyList();
        })
    }
    destroy();

    //--- функция появления/удаления "Список дел пуст" (первого li) 
    function checkEmptyList() {
        if (tasks.length === 0) {
            let emptyListHTML = `
            <li id="emptyList" class="list-group-item empty-list">
                <p class="empty-list__title">Список дел пуст</p>
            </li>`;
            tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
        };

        if (tasks.length > 0) {
            let emptyListEl = document.querySelector('#emptyList');
            emptyListEl ? emptyListEl.remove() : null;
        };
    };
    //--- функция сохранения в LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // console.log(tasks.length);
    };
    //---функция рендера инфы из LocalStorage на страницу
    function renderTask(task) {
        // -- формирую css класс 
        let cssClass = task.done ? 'task-title task-title--done' : 'task-title';

        //---добавляю новый task
        let taskHTML = `                
                    <li id="${task.id}" class="list-group-item task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/todo/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/todo/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;

        tasksList.insertAdjacentHTML('beforeend', taskHTML);
    };
};

/* harmony default export */ var task_manager = (taskManager);
;// CONCATENATED MODULE: ./src/js/modules/media.js

function media() {

    let mediaQuery = window.matchMedia('(max-width: 820px)');
    let mediaQuery2 = window.matchMedia('(min-width: 821px)');
    // let btnBlock = document.querySelector('.weather__items-links');
    let toDoHead = document.querySelector('.todo-head');
    let toDoContainer = document.querySelector('.container-todo');
    let time = document.querySelector('.container');
    let containerWeather = document.querySelector('.container-small');
    let popUpHidden = document.querySelector('.pop-up__title-main');



    function mediaChange(e) {
        if (e.matches) {
            // btnBlock.setAttribute('disabled', '');

            toDoHead.addEventListener('click', function () {
                toDoContainer.classList.toggle('todo-active');

                time.classList.toggle('disp-none');
                containerWeather.classList.toggle('disp-none');

                popUpHidden.classList.toggle('disp-flex');
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

/* harmony default export */ var modules_media = (media);
;// CONCATENATED MODULE: ./src/js/modules/pop-up.js
function popup() {

    let localStorName = [];

    if (localStorage.getItem('localStorName')) {
        localStorName = JSON.parse(localStorage.getItem('localStorName'));

        // console.log(localStorName.length);

        renderPopUp();
    };

    function renderPopUp() {
        if (localStorName.length >= 1) {

            let popWrapper = document.querySelector('.pop-up__wrapper');
            popWrapper.style.display = 'none';

            //-- получаю имя из localStorName кот в localStor
            const keyIsExist = localStorName.find(el => Object.keys(el).includes('names')).names;

            let text = document.querySelector('.item-text');

            let today = new Date();
            let hour = today.getHours();

            if (hour >= 0) {
                text.innerText = `Сладких снов, ${keyIsExist}`;
            };

            if (hour >= 6) {
                text.innerText = `Доброе утро, ${keyIsExist}.`;
            };

            if (hour >= 12) {
                text.innerText = `Доброго дня, ${keyIsExist}.`;
            };

            if (hour >= 18) {
                text.innerText = `Доброго вечера, ${keyIsExist}.`;
            };
        }
        opas();
    }

    setTimeout(function () {
        let popUp = document.querySelector('.container__pop-up');

        popUp.classList.add('pop-up-vis')
    }, 2000);


    let popBtn = document.querySelector('.pop-btn');
    popBtn.addEventListener('click', function (e) {
        e.preventDefault();

        let popInput = document.querySelector('.pop-input');

        let addName = popInput.value;

        if (addName == '') {
            return;
        };

        let localName = {
            names: addName
        }

        localStorName.push(localName);

        saveToLocalStorage();
        renderPopUp();
        opas();
    })

    function opas() {
        let titleMain = document.querySelector('.pop-up__title-main');
        titleMain.classList.add('disp-flex');
    }

    function saveToLocalStorage() {
        localStorage.setItem('localStorName', JSON.stringify(localStorName));
    };
}

/* harmony default export */ var pop_up = (popup);
;// CONCATENATED MODULE: ./src/js/index.js
// Галерея и лайтбоксы от Fancybox
// import { Fancybox } from '@fancyapps/ui';
// import '@fancyapps/ui/dist/fancybox/fancybox.css';

// Fancybox.bind('[data-fancybox]', {
// 	// Your custom options
// });



slide_todo();


modules_weather();


weather_big_hiding();


day_week();


modules_time();


task_manager();


modules_media();


pop_up();
/******/ })()
;