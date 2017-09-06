/* 	Author: A-Shawni Mitchell
	Date: Septempter 3, 2017
	Credit: Udemy.com
*/

/* Module Design Pattern could be used to make design of this app more Robust */

//Variables not Selecting Objects
var numSquares = 6;
var colors = []; //Array of Random Colors
var pickedColor;

//Variables Selecting Objects
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1BG = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init(){
	/* Initialize Mode Buttons */
	initializeModeButtons();

	/* Verify Color Match */
	verify();
	
	/* Reset */
	reset();
}

function initializeModeButtons() {
	// Mode Button Event Listeners
	for(var i=0; i<modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function(){
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
	
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function verify() {
	/* Verify Color is a Match */
	for(var i=0; i<squares.length; i++) {
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
	
			//compare to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1BG.style.backgroundColor = clickedColor;
				resetBtn.textContent = "Play Again?";
			}
			else { 
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}

/* Reset Method */
function reset() {
	//generate all new colors
	colors = generateRandomColors(numSquares);
	
	//pick a new random color for array
	pickedColor = pickColor();

	//change color display to match picked color
	colorDisplay.textContent = pickedColor;

	//change colors of squares
	for(var i=0; i<squares.length; i++) {
		if(colors[i]) {//if colors array has no null variable
			squares[i].style.display = "block"; //Show in case bottom colors are hidden
			squares[i].style.backgroundColor = colors[i];
		} else
			squares[i].style.display = "none";
	}

	//change background of winning color
	h1BG.style.backgroundColor = "steelblue";

	//Delete "Correct" Message
	messageDisplay.textContent = "";

	//Reset "Play Again" Button
	resetBtn.textContent = "New Colors";
}




/* Reset Button Method */
resetBtn.addEventListener("click", function(){
	reset();
});

/* Change Colors Method */
function changeColors(color) {
	//loop through all squares
	for(var i=0; i<squares.length; i++) //change each color to match given color
		squares[i].style.backgroundColor = color;
}

/* Pick Color Method Return: Random Color*/
function pickColor() {
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

/* Generate Random Colors and Add to Array */
function generateRandomColors(num) {
	//create array
	var a = []

	//add num random colors to array
	for(var i=0; i<num; i++)
		a[i] = randomColor();
	//return that array
	return a;
}

/* Random Color Created and returned as String */
function randomColor() {
	//random red from 0-255
	var red = Math.floor(Math.random()*256);

	//random green from 0-255
	var green = Math.floor(Math.random()*256);

	//random blue from 0-255
	var blue = Math.floor(Math.random()*256);

	return "rgb("+red+", "+green+", "+blue+")";	
}
