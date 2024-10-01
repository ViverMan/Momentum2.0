import weekJsonFile from '../../html/data/weekRus.json';
import monthJsonFile from '../../html/data/monthRus.json';

function week() {

    let weekRus = weekJsonFile;
    let monthRus = monthJsonFile;

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

export default week;

