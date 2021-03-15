

function addGame() {
var name = document.getElementById("game-name").value;
var yearPublished = document.getElementById("year-published").value;
var publisher = document.getElementById("publisher").value;
var notes = document.getElementById("notes").value;

var newGame = ""; 

newGame += ' <div class="col"><div class="img__wrap"><div class="img_only"><img  src="https://drive.google.com/uc?id=1PBGvHJh9jOF7lSX-5ZtIiv0QJDKvS_IJ" alt="" width="200" height="300"></div> <h4>' + name + '</h4> <h6>' + yearPublished + '</h6> <p>' + notes +' </div> </div></div>';
		var child = document.createElement("div"); 
		child.setAttribute("class", "col");
		child.innerHTML= newGame; 
		document.getElementById("games-list").appendChild(child);

}

