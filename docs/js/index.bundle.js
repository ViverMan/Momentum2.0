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

    let weekRus = weekRus_namespaceObject;
    let monthRus = monthRus_namespaceObject;

    let date = new Date();
    let week = date.getDay();
    let month = date.getMonth();
    let day = date.getDate();

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
    let aphorisms = document.querySelector('.pop-up__aphorisms');



    function mediaChange(e) {
        if (e.matches) {
            // btnBlock.setAttribute('disabled', '');

            toDoHead.addEventListener('click', function () {
                toDoContainer.classList.toggle('todo-active');

                time.classList.toggle('disp-none');
                containerWeather.classList.toggle('disp-none');

                popUpHidden.classList.toggle('disp-flex');

                aphorisms.classList.toggle('disp-none');
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

        let aphorismsDisp = document.querySelector('.aphorisms__wrapper');
        let aphorismsLine = document.querySelector('.aphorisms__line');
        aphorismsDisp.classList.add('disp-vis');
        aphorismsLine.classList.add('disp-vis');
    }
    //--- скрытие афоризма по клику
    let btnHiddenAfo = document.querySelector('.aphorisms-btn');
    btnHiddenAfo.innerText = 'скрыть афоризмы';

    btnHiddenAfo.onclick = function () {
        document.querySelector('.aphorisms__text').classList.toggle('disp-novis');

        if (btnHiddenAfo.innerText == 'скрыть афоризмы') {
            btnHiddenAfo.innerText = 'показать афоризмы';
        }
        else (btnHiddenAfo.innerText = 'скрыть афоризмы');
    };


    function saveToLocalStorage() {
        localStorage.setItem('localStorName', JSON.stringify(localStorName));
    };
}

/* harmony default export */ var pop_up = (popup);
;// CONCATENATED MODULE: ./src/html/data/aphorisms.json
var aphorisms_namespaceObject = JSON.parse('["Чем дольше делается работа, тем хуже она делается.","Труд — великое лекарство от всех болезней и печалей человечества.","Работать нужно не 12 часов, а головой! (Стив Джобс)","Работайте так, словно деньги не имеют для вас никакого значения. (Марк Твен)","Работа не волк. Зато начальник ― зверь.","Черт! Эта работа, работа, работа... Деньги некогда потратить!","На хлеб насущный зарабатывают руками, а на масло — головой.","Если ваши подчиненные довольны зарплатой — значит, они воруют! (Семен Альтов)","Вы делаете вид, что платите нам. Мы делаем вид, что работаем.","О начальстве либо хорошо, либо ищи другую работу.","Как упоительно валяться по утрам, когда другие чешут на работу.","Я всегда выберу ленивого человека делать трудную работу, потому что он найдет легкий путь ее выполнения. (Билл Гейтс)","Не обязательно гореть на работе. Достаточно иногда пускать дым в глаза.","Как быстро летит время: не успел проснуться, а уже опоздал на работу.","Вопрос не в том, кто мне позволит, а в том, кто меня остановит.","Лифт к успеху не работает. Вам придется пользоваться лестницей... по одной ступеньке за раз.","Не оставайтесь в постели, если только вы не можете зарабатывать деньги в постели.","Если вы не терпите неудачу время от времени, это признак того, что вы не делаете ничего.","Даже если вы на правильном пути, вас переедут, если вы будете просто сидеть на месте.","Думайте как протон. Всегда позитивно.","Нет коротких путей к любому месту, куда стоит идти.","Что бы вы ни делали, всегда выкладывайтесь на 100%. Если только вы не сдаете кровь.","Ничего не делать очень трудно... никогда не знаешь, когда закончишь.","Я люблю работу, она меня увлекает. Я могу сидеть и смотреть на неё часами.","Вам не платят за час. Вам платят за ту ценность, которую вы приносите в течение часа.","Большинство людей упускают возможность, потому что она одета в спецодежду и похожа на работу.","Работайте, чтобы стать, а не чтобы приобрести.","Выясните, что вам нравится делать больше всего, и попросите кого-нибудь заплатить вам за это.","Будьте как почтовая марка. Придерживайтесь какого-то дела, пока не добьетесь своего.","Я не самый умный человек в мире, но я могу выбирать умных коллег.","Клиенты - как зубы. Не обращайте на них внимания, и они уйдут.","Я люблю сроки. Мне нравится звук, который они издают, пролетая мимо.","Работа - самая лучшая вещь в мире, поэтому мы всегда должны откладывать часть ее на завтра.","Иногда я всю встречу думаю, как они пронесли большой стол для совещаний через дверь.","Иногда лучшая часть моей работы - это вращающийся стул.","Пятница делает понедельник достойным.","А в письмах Вы казались мне стройнее…","А ты готовить-то умеешь? - Я вкусно режу колбасу.","Агронома Любу уволили с работы, так сказать ушла Любовь, завяли помидоры...","Безумно рада за своего мужа – так удачно женился!","В лягушках вы, царевна, были краше!","В принципе, женщина может и промолчать, но дело в том, что у женщины нет такого принципа.","Верна троим. Но не предел и это.","Видела твою новую девушку. Так тебе и надо.","Вообще-то я девушка послушная. Послушаю, послушаю и сделаю по-своему.","Все красивые женщины похожи друг на друга. Каждая некрасивая страшна по-своему.","Вы мне хотели жизнь испортить? Спасибо, справилась сама.","Гарем - это серпентарий из любимых жен.","Глупые женятся, а умные выходят замуж.","Говорят, красота спасет мир! Красота сегодня не выспалась, не завтракала, и вообще, я не могу так все сразу…","Голые женщины кажутся не такими глупыми...","Девушка, вы такая фешенебельная, что мне не рентабельно.","Девушка, разрешите воспользоваться вашим копировальным аппаратом? ДНК надо скопировать…","Девушка, я вас местами где-то видел...","Девушки, сдвиньте ноги вместе. И вам не холодно, и водителю не жарко. (надпись в маршрутке)","Девчонки с первого курса - деньги, выброшенные на ветер.","Для женщин нет такой проблемы, которой им бы не создать.","Для порядка в доме нужна женщина, для беспорядка – две.","Для резиновой женщины самое эффективное средство похудения - это иглоукалывание.","До женщины его мечты я чуть-чуть не домолчала.","Дурочка, ну кто тебе сказал, что ты толстая? Давай бери два стула и садись к нам!","Если вы вернулись домой поздно, а жена вам улыбается, значит, вы попали в чужую квартиру.","Если Вы пригласили девушку на танец, и она согласилась... Не радуйтесь: вначале Вам всё-таки придётся потанцевать.","Никто не ценит того, чего слишком много.","Кто вопросов не задает, тот лжи не слышит.","Лучше быть оптимистом и ошибаться, чем оставаться вечно правым пессимистом.","Если соблюдаешь мелкие правила, можно нарушать большие. — Джордж Оруэлл, «1984»","Надо бы так устроить жизнь, чтобы каждое мгновение в ней было значительно. — «Отцы и дети»","Одна из причин, почему люди спят – чтобы избежать того, что их расстроило.","Зачем забивать себе голову тем, чего уже не вернешь, – надо думать о том, что еще можно изменить.","Вы же не сами по себе живете, а если и отгородились от мира, то мир-то от вас не отгораживался!","Живи как живется. Правило одно – не причиняй другим страдания и не участвуй во зле.","Дать слово значит испытать себя. — Квентин Тарантино","Много раз я сожалел о словах, которые произносили уста мои, но о молчании я не жалел никогда.","Ты храбрее, чем подозреваешь, сильнее, чем кажешься, и умнее, чем думаешь.","Лучшe уйти нa cвoих уcлoвиях, чeм жить пo чужим прaвилaм. ","Сколько бы мы ни ждали, Вселенная никогда не нагреет наш кофе.","Знаешь, в этом и заключается секрет счастья. Брать только то, что тебе нужно.","Большинство людей считает неразрешимыми те проблемы, решение которых мало их устраивает.","К сожалению, на этом свете каждый имеет свою точку зрения, мешающую ему видеть точку зрения другого.","Я заметил, что в тесной квартире даже и мыслям тесно.","Страх страдания хуже самого страдания.","Человек, заслуживающий Вашей благодарности больше всего, чем кто-либо, – это Вы сами.","Когда отправляешься на поиски счастья, становится не до мелочей.","Решения, принятые глухой ночью, обычно теряют силу при свете дня.","Опасно возвращаться в места своего детства: большей частью там поселяются разочарования.","Не пишите так, чтобы нравиться людям. Пишите так, чтобы вас запомнили.","Никто тебе не друг, никто тебе не враг, все учителя. Поблагодари.","Никто никогда ничего не делал и не делает ближнему по одной только доброте душевной.","Сейчас – самое подходящее время. Сейчас — единственное время.","Столько событий, столько событий, пойду на работу, отдохну.","Когда в доме много зверей, сердце у детей растет быстрее, чем они сами.","Все эгоисты обзывают эгоистами всех других.","Если хочешь заполучить жизнь, которой никогда не жил, придется делать то, чего никогда не делал.","Чтобы вернуть молодость, стоит только повторить все ее безумства.","Думайте о прошлом, только если воспоминанья приятны вам.","Дело не в том, что ты терпишь страдания. Дело в том, как ты их терпишь.","Страх порождает страх. Сила порождает силу. ","Чтобы дойти до цели, человеку нужно только одно – идти.","Ты должен сделать добро из зла, потому что его больше не из чего сделать.","Кто ни о чем не спрашивает, тому не солгут.","Спокойствие лучше, чем радость. Оно надежнее.","Не отступай перед трудностями. Смотри им прямо в лицо. Смотри, пока не одолеешь их.","Все непреодолимые стены состоят из простых и понятных кирпичиков.","Все приходит к тому, кто умеет ждать.","Можно тратить время на то, чтобы умирать, а можно – на то, чтобы жить. Надо идти вперед!","Чем больше трудностей мы преодолеваем, тем легче принимаем свое будущее.","Так часто случается, что именно с пустяка начинаются самые важные в мире вещи.","Стоит ли всерьез чему-нибудь огорчаться в этой жизни? Все пройдет, пройдет и это.","Хорошее время не с неба падает, а мы его делаем, оно заключается в сердце нашем.","Ты или охотник, или дичь, или действуешь, или устало плетешься сзади.","Мудрость в том, чтобы брать от людей хорошее и быть терпимым к дурному.","Жизнь не обязана давать нам то, чего мы ждем. Надо брать то, что она дает, и быть благодарным уже за то, что это так, а не хуже.","Если хочешь заполучить жизнь, которой никогда не жил, придется делать то, чего никогда не делал.","Важно не то, что вас победили. Важно, что вы сопротивлялись!","Единственное счастье в жизни – это постоянное стремление вперед.","Если хочешь победить весь мир, победи себя.","Никаких охов и вздохов, никаких сожалений! Только здравый смысл и решимость!","Подлинный успех вырастает на руинах ваших неудач.","Гораздо легче добиваться совершенства, если тебе не скучно.","Во что веришь по-настоящему, это и существует.","Большинство начинают вопить о несправедливости, только когда это касается их лично.","Жить без чтения опасно: человек вынужден окунуться в реальность, а это рискованно.","Интеллект не помогает человеку писать хорошие стихи, но может помешать ему написать плохие.","Классика – то, что каждый считает нужным прочесть и никто не читает.","Давайте поблагодарим дураков. Не будь их, остальным было бы трудно добиться успеха.","Любое упоминание в прессе, даже самое негативное, кроме некролога, это реклама.","Дипломатия – это искусство говорить правду так, чтобы не обижались.","Умный человек не делает сам все ошибки – он дает шанс и другим.","Вы не пьете, не курите, девушками не увлекаетесь... Зачем вам деньги? Вы же не умеете их тратить.","Порой что-то отложишь на завтра и с ужасом думаешь: а завтра – это же практически через несколько часов!","Будьте самоучками, не ждите, пока вас научит жизнь.","Даже после небольшой улыбки в организме обязательно дохнет один маленький микроб.","Никогда не мстите подлым людям. Просто станьте счастливыми. И они это не переживут...","Толстый человек звучит оскорбительно. Надо говорить – горизонтально ориентированный.","Я такой умный, что иногда не понимаю ни единого слова из того, что говорю.","Я предпочитаю женщин с прошлым. С ними, чёрт побери, хоть разговаривать интересно.","У меня всего лишь два недостатка. Плохая память и ещё что-то.","В детстве время тянется, а потом — бац! И тебе уже пятьдесят.","У вас повреждение мозга. Вы обречены хорошо себя чувствовать до конца жизни. («Доктор Хаус»)","У тебя есть минутка? Да хоть две… я же на работе."]');
;// CONCATENATED MODULE: ./src/html/data/aphorisms-pt.json
var aphorisms_pt_namespaceObject = JSON.parse('["Пятница делает понедельник достойным.","Музыка всегда лучше звучит в пятницу.","Сегодня пятница... все планы быть продуктивным членом общества официально выброшены в окно.","Ничто так не портит пятницу, как осознание того, что сегодня только четверг.","Люди ждут пятницы всю неделю, лета - весь год, счастья - всю жизнь.","Почему понедельник так далек от пятницы, а пятница так чертовски близка к понедельнику?","Мы будем проводить все больше совещаний, пока не выясним, почему не выполняется никакая работа.","Пятница, она уже не работница, но еще и не отпускница, — одним словом, ожидательница.","Хорошо, что пятница! Плохо, что еще только утро…","Пятница традиционно начиналась легким ужином в четверг и заканчивалась плотным завтраком в понедельник","Нельзя заставить человека делать работу в пятницу.","Уходя с работы в пятницу, стараюсь не бежать…","В пятницу вечером понимаешь, что в принципе — жить можно.","Четверг хорош потому, что после пятницы идёт суббота. Помни об этом в среду!","Пусть всё в жизни проходит мимо, кроме пятницы, денег и интима.","Пятница!!! Закричал мозг и унес жопу в неизвестном направлении…","В пятницу чаще всего хочется выпить. В понедельник чаще всего хочется пятницу.","Пятница 13-го — лучше понедельника любого числа.","Здравствуй Пятница, здравствуй, любимая, наконец-то ты пришла!","Особенно горько осознавать себя безработным в пятницу вечером.","Все мы — пятницофилы и понедельникофобы.","Люблю понедельник — всего три дня до пятницы.","Самый страшный день — пятница тринадцатое перед рабочей субботой.","Ну здравствуй, пятница. Я дополз к тебе."]');
;// CONCATENATED MODULE: ./src/js/modules/aphorisms.js




function aphorisms() {

    let aphorismsText = document.querySelector('.aphorisms__text');

    let aphorismsFile = aphorisms_namespaceObject;
    let aphorismsPtFile = aphorisms_pt_namespaceObject;
    let weekFile = weekRus_namespaceObject;

    function showText() {

        let todayPhrase = new Date();
        let hour = todayPhrase.getHours();
        let week = todayPhrase.getDay();
        let second = todayPhrase.getSeconds();

        let rand = aphorismsFile.splice(Math.floor(Math.random() * aphorismsFile.length), 1);

        if (week == 5) {
            rand = aphorismsPtFile.splice(Math.floor(Math.random() * aphorismsPtFile.length), 1);
        }

        aphorismsText.innerText = rand;

        setTimeout(function () {
            showText()
        }, 1000000);
    }
    showText();
}




/* harmony default export */ var modules_aphorisms = (aphorisms);
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


modules_aphorisms();
/******/ })()
;