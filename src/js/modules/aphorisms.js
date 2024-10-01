import aphorismsJsonFile from '../../html/data/aphorisms.json';
import aphorismsPtJsonFile from '../../html/data/aphorisms-pt.json';
import weekJsonFile from '../../html/data/weekRus.json';

function aphorisms() {

    let aphorismsText = document.querySelector('.aphorisms__text');

    let aphorismsFile = aphorismsJsonFile;
    let aphorismsPtFile = aphorismsPtJsonFile;
    let weekFile = weekJsonFile;

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




export default aphorisms;