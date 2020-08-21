//Variables Section
let squaresCount = 6;
let colors = generateRandomColors(squaresCount);
let squares = document.querySelectorAll(".square");
let pickedColor = chosenColor();
let requiredColor = document.querySelector("h1 span");
let gameIndicator = document.getElementById("indicator");
let resetButton = document.querySelector("#colorChanger");
let easyButton = document.querySelector("#Ez");
let hardButton = document.querySelector("#Hard");
requiredColor.textContent = pickedColor;
gameIndicator.textContent = null;


/*
    The Difficulty Buttons:
    When clicking on a difficulty button, the button should be highlighted to indicate that it's the
    selected difficulty and remove it from the unselected one
*/
easyButton.addEventListener("click", function() {
    easyButton.classList.add("selected");
    hardButton.classList.remove("selected");
    //0) Initialize Squares count to 3
    squaresCount = 3;
    //1) Generate new colors
    colors = generateRandomColors(squaresCount);
    //2) Get the new picked color and change the display of the new required color
    pickedColor = chosenColor();
    requiredColor.textContent = pickedColor;
    //3) Change the Squares' background to the new generated colors
    for (let i = 0; i < squares.length; i++) {
        if (colors[i])
            squares[i].style.backgroundColor = colors[i];

        else
            squares[i].style.display = "none";
    }
    resetButton.textContent = "New Colors!";
    gameIndicator.textContent = null;
    document.querySelector("h1").style.backgroundColor = "#4682b4";
});

hardButton.addEventListener("click", function() {
    hardButton.classList.add("selected");
    easyButton.classList.remove("selected");
    //0) Initialize Squares count to 3
    squaresCount = 6;
    //1) Generate new colors
    colors = generateRandomColors(squaresCount);
    //2) Get the new picked color and change the display of the new required color
    pickedColor = chosenColor();
    requiredColor.textContent = pickedColor;
    //3) Change the Squares' background to the new generated colors
    for (let i = 0; i < colors.length; i++) {
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
    }
    resetButton.textContent = "New Colors!";
    gameIndicator.textContent = null;
    document.querySelector("h1").style.backgroundColor = "#4682b4";
});


/*
    0) Whenever the Reset Button is pressed, the String is changed to "New Colors!" in case the game was ended,
    The Indicator text is blank again and the background color of the header is reverted to normal, 
    Pseudocode:
    1) Generate new colors
    2) Get the new picked color and change the display of the new required color
    3) Change the Squares' background to the new generated colors
*/
resetButton.addEventListener("click", startOver);

/*
    The Process:
    Change the Squares' background to the new generated colors
*/
for (let i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    /*
    Whenever the squares are clicked on, the color of the Square is compared if it was the randomly picked
    color.
    */
    squares[i].addEventListener("click", function() {
        let clickedColor = this.style.backgroundColor;
        //If the color was the same as the the picked color
        if (clickedColor === pickedColor) {
            //Change all the squares to the picked color
            unifySquareColors();
            //Change the header's background to the picked color
            document.querySelector("h1").style.backgroundColor = pickedColor;
            //Display the Word Correct to indicate the status
            gameIndicator.textContent = "Correct!";
            //Change the reset button's string to Play again
            resetButton.textContent = "Play Again!";
            //If the wrong color was picked
        } else {
            //Fade the clicked color away
            this.style.backgroundColor = "#232323";
            //Display the Word Try Again to indicate the status
            gameIndicator.textContent = "Try Again";
        }
    });
}

//Functions Section
function unifySquareColors() {
    //Loop through the whole squares and change them to the picked color
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    }
}

function chosenColor() {
    //Get a random index from the array to be the picked color
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomColor() {
    //Select a random color between 0 : 255 to get the Red Color
    let r = Math.floor(Math.random() * 256);
    //Select a random color between 0 : 255 to get the Green Color
    let g = Math.floor(Math.random() * 256);
    //Select a random color between 0 : 255 to get the Blue Color
    let b = Math.floor(Math.random() * 256);

    /*
        Return that massive string to form a color "rgb(r, g, b)"
        
        Note:
        Make sure there is spaces after every comma   
    */
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(arrayLength) {
    //Declare a temporary array
    let array = [];

    //Loop through the Whole array and push the random colors generated from the randomColor() function
    for (let i = 0; i < arrayLength; i++) {
        array.push(randomColor());
    }
    //return that newly initialized array
    return array;
}

/*
    0) Whenever the Reset Button is pressed, the String is changed to "New Colors!" in case the game was ended,
    The Indicator text is blank again and the background color of the header is reverted to normal,
    Pseudocode:
    1) Generate new colors
    2) Get the new picked color and change the display of the new required color
    3) Change the Squares' background to the new generated colors
*/

function startOver() {
    //0 [Refer to Pseudocode]
    resetButton.textContent = "New Colors!";
    gameIndicator.textContent = "";
    document.querySelector("h1").style.backgroundColor = "#4682b4";
    //1 [Refer to Pseudocode]
    colors = generateRandomColors(squaresCount);
    //2 [Refer to Pseudocode]
    pickedColor = chosenColor();
    requiredColor.textContent = pickedColor;
    //3 [Refer to Pseudocode]
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

    }
}