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

export default popup;