var cells = new Array();
var dimension = 15;
var timer;
var currentGen = 0;
//multidimensional array populate

//done
function createArr(size){
	for (i = 0; i < size; i++){
		cells[i] = new Array();
		for (j = 0; j < size; j++){
			cells[i][j] = true;
		}
	}
}

createArr(dimension);
randomize();
//console.log("Counter:" + counter);
//for (i = 0; i < cells.length; i++){
//	for (j = 0; j < cells[i].length; j++){
//		console.log("Cell" + " " + (i) + " " + (j) +" :" + cells[i][j]);
//	}
//}
//cellStatus();
generateTable();

//need to adjust
function check(col, row){
	var cR = col; //actually the columns
	var cC = row; //actually the rows
	var counter = 0;
	//top row
	if (cR != 0 && cC != 0 && cells[cR - 1][cC - 1] == true){
		counter++;
	}
	if (cR != 0 && cells[cR - 1][cC] == true){
		counter++;
	}
	if (cR != 0 && cC < dimension - 1 && cells[cR - 1][cC + 1] == true){
		counter++;
	//middle
	}
	if (cC != 0 && cells[cR][cC - 1] == true){
		counter++;
	}
	if (cC < dimension - 1 && cells[cR][cC + 1] == true){
		counter++;
	//bottom row
	}
	if (cR < dimension - 1 && cC != 0 && cells[cR + 1][cC - 1] == true){
		counter++;
	}
	if (cR < dimension - 1  && cells[cR + 1][cC] == true){
		counter++;
	}
	if (cR < dimension - 1 && cC < dimension - 1&& cells[cR + 1][cC + 1] == true){
		counter++;
	}
	if (counter < 2 || counter > 3){
		cells[cR][cC] = false;
	} else if (counter == 3 && cells[cR][cC] == false){
		cells[cR][cC] = true;
	}
}

//done
function randomize(){
	var randomValue = 0;
	for (i = 0; i < cells.length; i++){
		for (j = 0; j < cells[i].length; j++){
			randomValue = Math.floor((Math.random() * 2) + 1);
			console.log("Cell" + " " + i + " " + j +" :" + randomValue);
			if(randomValue == 1){
				cells[i][j] = true;
			} else {
				cells[i][j] = false;
			}
		}
	}
}
//done
function randomizeOnClick(){
	randomize();
	status();
	currentGen = 0;
	document.getElementById("gen").innerHTML = "Current Generation: " + currentGen;
}
//done
function generateTable(){
	var string = '<table>';
	var html
	for (i = 0; i < cells.length; i++){
		string = string + '<tr>'
		for (j = 0; j < cells[i].length; j++){
		string = string + '<td id=\'' + i + '_' + j + '\' onclick=\'chgStatus(this.id)\'></td>';
		}	
		string = string + '</tr>'
	}
	string = string + '</table>';
	html = $(string);
	$("body").append(html)
	status();
}
//done
function chgStatus(input){
	var inpt = '#' + input;
	var other = String(input).split("_");
	var col = Number(other[0]);
	var row = Number(other[1]);
	setAliveDead(col, row);
	console.log(input);
	console.log(cells[col][row]);
	if (cells[col][row] == false){
		$(inpt).css("background-color", "white");
	} else {
		$(inpt).css("background-color", "blue");
	}
}
//done
function status(){
	var inpt = '';
	for (i = 0; i < cells.length; i++){
		for (j = 0; j < cells[i].length; j++){
			inpt = '#' + i + '_' + j;
			if (cells[i][j] == true){
				$(inpt).css("background-color", "blue");
			} else {
				$(inpt).css("background-color", "white");		
			}

		}

	}
}
//done
function setAliveDead(col, row){
	if (cells[col][row] == true){
		cells[col][row] = false;
	} else {
		cells[col][row] = true;
	}
}

//done
function oneGen(){
	for (b = 0; b < dimension; b++){
		for (c = 0; c < dimension; c++){
			check(b, c);
			status();
		}
	}
	currentGen++;
	document.getElementById("gen").innerHTML = "Current Generation: " + currentGen;
	cellStatus();
}

function twentyThree(){
	for (a = 0; a < 23; a++){
		oneGen();
	}
}

function cellStatus(){
	for (i = 0; i < cells.length; i++){
		for (j = 0; j < cells.length; j++){
			console.log("Cell" + " " + (i) + " " + (j) +" :" + cells[i][j]);
		}
	}
}

//done
function gameStart(){
	timer = setInterval(oneGen, 500);
}


//done
function gamePause(){
	clearInterval(timer);
}

function clearGrid(){
	for (i = 0; i < cells.length; i++){
		for (j = 0; j < cells.length; j++){
			cells[i][j] = false;
		}
	}
	currentGen = 0;
	document.getElementById("gen").innerHTML = "Current Generation: " + currentGen;
	status();
}

//function gameReset(){
//}
