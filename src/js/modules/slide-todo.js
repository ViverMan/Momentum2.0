
function todo() {

    let toDoHead = document.querySelector('.todo-head');
    let cardDown = document.querySelector('.card');
    let cardDownBottom = document.querySelector('.card-bottom');


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

export default todo;

