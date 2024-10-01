import imgJsonFile from '../../html/data/image.json';

function time() {

    let img = document.querySelector('#imageID');
    let imgNext = document.querySelector('#nextImageID');
    let image = imgJsonFile;

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
            img.srcset = `${image[0]}`
            imgNext.srcset = `${image[1]}`
        };

        if (hour >= 6) {
            img.srcset = `${image[1]}`
            imgNext.srcset = `${image[2]}`
        };

        if (hour >= 12) {
            img.srcset = `${image[2]}`
            imgNext.srcset = `${image[3]}`
        };

        if (hour >= 18) {
            img.srcset = `${image[3]}`
            imgNext.srcset = `${image[0]}`
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

    function nextSlide() {
        let btnOpen = document.querySelector('.next-slide-btn');
        let btnClose = document.querySelector('.next-slide-close');
        // let wrapper = document.querySelector('.next-slide__wrapper');
        let slide = document.querySelector('.next-slide');

        btnOpen.onclick = function () {
            // wrapper.classList.toggle('action-wrapper');
            slide.classList.toggle('action-slide');
            btnOpen.classList.add('next-slide-btn-action');
            function add() {
                btnClose.classList.add('close-vis');
            }
            setTimeout(add, 1000);
        }
        btnClose.onclick = function () {
            slide.classList.toggle('action-slide');
            btnClose.classList.remove('close-vis');
            function remove() {
                btnOpen.classList.remove('next-slide-btn-action');
            }
            setTimeout(remove, 1000);
        }
    }
    nextSlide();
}



export default time;


// var dateElement = document.getElementById('currentTime');

// setInterval(function () {

//   var currentTime = new Date();
//   dateElement.textContent = currentTime.toLocaleString();

// }, 1000);

