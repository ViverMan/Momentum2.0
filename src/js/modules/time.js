import imageJsonFile from '../../html/data/image.json';

function time() {


    let imageList = imageJsonFile;
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
            img.style.backgroundImage = imageList[0];
        };

        if (hour >= 6) {
            img.style.backgroundImage = imageList[1];
        };

        if (hour >= 12) {
            img.style.backgroundImage = imageList[2];
        };

        if (hour >= 18) {
            img.style.backgroundImage = imageList[3];
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

