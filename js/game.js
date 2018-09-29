var memoryItems = [ 'fa-android', 'fa-android', 'fa-amazon', 'fa-amazon', 'fa-html5', 'fa-html5', 'fa-css3', 'fa-css3',
                     'fa-java', 'fa-java', 'fa-js-square', 'fa-js-square', 'fa-github', 'fa-github', 'fa-google', 'fa-google', 
                     'fa-angular', 'fa-angular', 'fa-react', 'fa-react'];

var selectedItemValue = null;
var selectedItemID = null;
var flippedTiles = 0;
var flipped = 0;

Array.prototype.randomizeTiles = function () {
    let i = 0;
    while (i != this.length) {
        let randomNumber = Math.floor(Math.random() * this.length);
        let temp = this[randomNumber];
        this[randomNumber] = this[i];
        this[i] = temp;
        i++;
    }
};


const flipTile = e => {
    var div = e.target;
     if (!(div.innerHTML == "" || div.innerHTML == null) && flipped < 2 && div.id !== selectedItemID) {
        var child = div.firstElementChild;
        child.classList.add(memoryItems[Math.floor(div.id)]);
        if (flipped == 0) {
            flipped++;
            selectedItemID = div.id;
            selectedItemValue = memoryItems[Math.floor(div.id)];
        } else if (flipped == 1) {
            flipped++;
            if (selectedItemValue == memoryItems[Math.floor(div.id)]) {
                flippedTiles += 2;
                flipped = 0;
                if (flippedTiles == memoryItems.length) {
                    alert("Congratulations...");
                    generateBoard();
                }
            } else {

                setTimeout( () => {
                    flipped = 0;
                    console.log(selectedItemID)
                    console.log(div);
                    let previousDiv = document.getElementById(selectedItemID);
                    let previousDivChild = previousDiv.firstElementChild;
                    previousDivChild.classList.remove(memoryItems[Math.floor(previousDiv.id)]);
                    child.classList.remove(memoryItems[Math.floor(div.id)]);
                }, 800);
            }
        }
    }
};

const generateBoard = () => {
    console.log("Generating board...");
    flipped = 0;
    memoryItems.randomizeTiles();
    let board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < memoryItems.length; i++) {
        let element = document.createElement("div");
        element.setAttribute("id", i);
        element.innerHTML = "<i class=\"fab fa-3x \"></i>";
        board.appendChild(element);
    }
    let btns = board.getElementsByTagName("div");
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = flipTile;
    }
}

generateBoard();