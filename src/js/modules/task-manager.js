

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

export default taskManager;