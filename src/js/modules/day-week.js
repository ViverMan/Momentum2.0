import weekJsonFile from '../../html/data/weekRus.json';
import monthJsonFile from '../../html/data/monthRus.json';

function week() {

    var weekRus = weekJsonFile;
    var monthRus = monthJsonFile;

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

export default week;

