
// Select the Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id, trash;

var alarmTime;
var curTime;
var check = new Date();
var hourNum;
var minNum;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
	LIST = JSON.parse(data);
	id = LIST.length;// set the id to the last one in the list
	loadList(LIST); // load the list to the user interface
}else{
	// if data isn't empty
	LIST = [];
	id = 0;
}

// load items to the user's interface
function loadList(array){
	array.forEach(function(item){
addToDo(item.name, item.id, item.done, item.trash);
	});
}

// clear the local storage
clear.addEventListener("click", function(){
	localStorage.clear();
	location.reload();
})

// Mostrar todays date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("pt-BR", options);

function relogio(){
				var data=new Date();
				var hor=data.getHours();
				var min=data.getMinutes();
				var seg=data.getSeconds();
	/*Estas funções retornam os valores menores que 10 com um dígito só,
	 no caso de relógios, estes valores são mostrados com dois dígitos, com o zero na frente,
	  01, 02, …, 09, então, precisamos “ajustar” estes valores, 
	  vamos usar IF para testar se o valor é menor que dez, se for, 
	  vamos adicionar o “0” na frente do valor.   */
				if(hor < 10){
					hor="0"+hor;
				}
				if(min < 10){
					min="0"+min;
				}
				if(seg < 10){
					seg="0"+seg;
				}			
				var horas=hor + ":" + min + ":" + seg;
				document.getElementById("ck").value=horas;

				if(hor > 9 && hor < 19){
					document.getElementById("image").style.backgroundImage =  "url('img/bgday.jpg')";
					document.getElementById("image").style.backgroundSize = "cover";
				}else if(hor >= 19 && hor < 23){
                  document.getElementById("image").style.backgroundImage =  "url('img/bgnight.jpg')";
                  document.getElementById("image").style.backgroundSize = "cover";
				}else{
					document.getElementById("image").style.backgroundImage =  "url('img/bgmorning.png')";
					document.getElementById("image").style.backgroundSize = "cover";
				}

			}
/* “setInterval” will call the function “clock()” de um em um segundo.*/
			var timer=setInterval(relogio,1000);


function GetTime() {
var dt = new Date();
document.clock.local.value = IfZero(dt.getHours()) + ":" + IfZero(dt.getMinutes());
setTimeout("GetTime()", 1000);
curTime = (IfZero(dt.getHours()) + ":" + IfZero(dt.getMinutes()));
}
function IfZero(num) {
return ((num <= 9) ? ("0" + num) : num);
}
function alarmSet() {
hourNum = document.clock.hourOpt[document.clock.hourOpt.selectedIndex].value;
minNum = document.clock.minOpt[document.clock.minOpt.selectedIndex].value;
alarmTime = hourNum + ":" + minNum;
}
function alarmOn() {
if (alarmTime == curTime) {
document.all.sound.src = document.getElementById("myAudio").play();
}
else {
setTimeout("alarmOn()", 1000)
   }
}
function alarmOff() {
document.all.sound.src = "";
alarmTime="";
}
function snooze() {
document.all.sound.src = "";
var snoozeL = parseInt(document.clock.snoozeOpt[document.clock.snoozeOpt.selectedIndex].value);
var snooze = new Date();
alarmTime = IfZero(snooze.getHours()) + ":" + IfZero(snooze.getMinutes() + snoozeL);
alarmOn();
}


//add to do function
function addToDo(toDo, id, done, trash){
  
   if(trash) {return;}
   const DONE = done ? CHECK : UNCHECK;
   const LINE = done ? LINE_THROUGH : "";
   const item = `
	<li class="item">
	    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
		<p class="text ${LINE}">${toDo}</p>
		<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
	`;
	const position = "beforeend";
	list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function(even){
	if(event.keyCode == 13){
		const toDo = input.value;
    //if the input isn't empty
    if(toDo){
    	addToDo(toDo, id, false, false);
    	LIST.push({
    		name : toDo,
    		id : id,
    		done : false,
    		trash : false
    	});
    // add item to localstorage (this code must added where the LIST array i updated)	
    localStorage.setItem("TODO", JSON.stringify(LIST));
    	id++;
    }	
    input.value = "";	
	}
});

// complete to do
function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? true : false;
}

// remove to do
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;

}
// target the items created dynamically
list.addEventListener("click", function(event){
	const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
    	completeToDo(element);
    }else if(elementJob == "delete"){
    	 removeToDo(element);
    }
    // add item to localstorage (this code must added where the LIST array i updated)	
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


