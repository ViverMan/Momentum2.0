// import imageJsonFile from '../../html/data/image.json';

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



export default time;


// var dateElement = document.getElementById('currentTime');

// setInterval(function () {

//   var currentTime = new Date();
//   dateElement.textContent = currentTime.toLocaleString();

// }, 1000);

