var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spaceKeyPressed = false;
var pName = "";
var number = 0;

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}
	if (spaceKeyPressed) {
		spaceKeyPressed = false;
		arrowCreate();
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
	if (event.keyCode == 32) {
		spaceKeyPressed = true;
	}
}

function myClickEvent() {         
	// finding class start on html
	var gameplay = document.getElementsByClassName('start')[0];
	gameplay.onclick = function () {
		myLoadFunction();
		// to hide the start button on click
		gameplay.style.display = "none";
		// to call function randomCreate
		continiousBombCreate = setInterval(randomCreate, 430);
		// to call function randomFall
		continiousBombFall = setInterval(randomFall, 8);
        // to call function arrowfire
		continiousArrowFire = setInterval(arrowFire, 5);
	};
}

 // for creating bomb in random position
function randomCreate() {   
    // creating element b          
	var b = document.createElement('div');
	// finding class sky on html
	var sky = document.getElementsByClassName('sky')[0];
	 // innerwidth returns the interior width
	var innerWidth = window.innerWidth;  
	// to add the attribute 
	b.setAttribute("class", 'bomb');
	// top position to create the random bomb
	b.style.top = "15px";
	// to create bomb randomly
	b.style.left = innerWidth * Math.random() + "px";
     
	sky.appendChild(b);
}

// to make the random fall of bomb
function randomFall() {
	// finding players id in html
	var character = document.getElementById('player');
	// finding bomb class in html
	var b = document.getElementsByClassName('bomb');
	// to return a DOMRect
	var cPos = character.getBoundingClientRect();
	var cps = [];
	var bps = [];
	cps[0] = parseInt(cPos.x);       
	cps[1] = parseInt(cPos.y);
	for (var x = 0; b.length > x; x++) {
		var oneBomb = b[x];
		var bPos = oneBomb.getBoundingClientRect();
		oneBomb.style.top = parseInt(oneBomb.style.top) + 1 + "px";
		bps[0] = parseInt(bPos.x);
		bps[1] = parseInt(bPos.y);
		if (bps[0] > cps[0]) {
			oneBomb.style.left = parseInt(oneBomb.style.left) - 1 + "px";
		}
		// console.log(cps[1]);
		if (cps[1] == bps[1]) {
			oneBomb.className = '';
			oneBomb.className = 'explosion';
			if (oneBomb.className == 'explosion') {
				console.log("???");
				setTimeout(function () {
					var sky = document.getElementsByClassName('sky')[0];
					var b = document.getElementsByClassName('explosion');
					for (var i = 0; i < b.length; i++) {
						sky.removeChild(b[i]);
						number = number + 1;
					}
				}, 500);
			}
			if (bps[0] >= cps[0] - 55 && bps[0] <= cps[0] + 55) {
				var characterHealths = document.getElementsByTagName('ul')[0];
				var characterHealth = document.getElementsByTagName('li');
				characterHealths.removeChild(characterHealth[0]);

				character.className = "character hit left";
				if (characterHealth.length == 0) {
					character.className = "character dead head body";
					gameEnd();
				}
			}
		}
	}
}
function myLoadFunction() {
	// finding class start
	var gameplay = document.getElementsByClassName('start')[0];
	timeout = setInterval(move, 10);
	// character moves 
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	// to play again after the character dies
	if (gameplay.innerHTML != "Play Again") {
		// to enter your name before you play 
		pName = prompt("Enter PLayer Name: ", "");
	}
}

// after the character dies
function gameEnd() {
	console.log("Game End");
	// to remove a event, keyup and keydown of character
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	// to stop the time of bomb creation
	clearInterval(continiousBombCreate);
	// to stop the time of bomb fall
	clearInterval(continiousBombFall);
	clearInterval(timeout);
	var gameplay = document.getElementsByClassName('start')[0];
	// block is used so nothing can be displayed
	gameplay.style.display = 'block';
	gameplay.innerHTML = "Game Over!";
	setTimeout(function () {
		gameplay.innerHTML = "Play Again";
		gameplay.addEventListener('click', reload);
        // to show the Score of player
		alert(pName + " total Score is :" + number);
	}, 1500);
}

function reload() {
	location.reload();
}

// for creating arrow to destroy bomb
function arrowCreate() {
	// creating arr element
	var arr = document.createElement('div');
	// returns the class name of element
	arr.className = 'arrow up';
	// finding class sky on html
	var sky = document.getElementsByClassName('sky')[0];
	// finding id player on html
	var character = document.getElementById('player');
	// returns the class name
	character.className = "character stand up fire";
	// finding class bomb on html
	var b = document.getElementsByClassName('bomb');
	// returns a DOMRect
	var cPos = character.getBoundingClientRect();
	var cps = [];
	var bps = [];
	cps[0] = parseInt(cPos.x);
	cps[1] = parseInt(cPos.y);
	arr.style.top = cps[1] + 'px';
	arr.style.left = cps[0] + 'px';
	sky.appendChild(arr);

}

// to fire the arrow to save yourself and to damage it
function arrowFire() {
	// finding class arrow
	var firedArr = document.getElementsByClassName('arrow');
	// finding class sky
	var sky = document.getElementsByClassName('sky')[0];
	// finding id player
	var character = document.getElementById('player');
	// finding class bomb
	var b = document.getElementsByClassName('bomb');
	for (var x = 0; firedArr.length > x; x++) {
		fArr = firedArr[x];
		fArr.style.top = parseInt(fArr.style.top) - 1 + "px";

		arrTop = parseInt(fArr.style.top);
		arrLeft = parseInt(fArr.style.left);
		if (arrTop == 25) {
			// finding class sky
			var sky = document.getElementsByClassName('sky')[0];
			sky.removeChild(fArr);
		}
		for (var y = 0; b.length > y; y++) {
			var bomb = b[y];
			bomTop = parseInt(bomb.style.top);
			bomLeft = parseInt(bomb.style.left);
			if (arrTop == bomTop) {
				if (bomLeft >= arrLeft - 38 &&
					bomLeft <= arrLeft + 38) {
					// fArr.style.display = 'none';
					var sky = document.getElementsByClassName('sky')[0];
					sky.removeChild(fArr);
					bomb.className = 'explosion';
				}
				if (bomb.className == 'explosion') {
					setTimeout(function () {
						var sky = document.getElementsByClassName('sky')[0];
						var b = document.getElementsByClassName('explosion');
						for (var i = 0; i < b.length; i++) {
							sky.removeChild(b[i]);
						}
					}, 500);
				}
			}

		}
	}
}
document.addEventListener('DOMContentLoaded', myClickEvent);
 // ends here