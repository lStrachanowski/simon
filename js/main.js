
document.addEventListener("DOMContentLoaded", function(event) {
  startClick();
  strictClick();
  checboxCheck();
  var idTable = ["shapeRed","shapeBlue","shapeGreen","shapeYellow"]
  for(var i=0; i<idTable.length;i++){
    colorClick(idTable[i]);
  }
});

var startClick = () => {
  var startButton = document.getElementById("startCircle");
  startButton.addEventListener('click', function(){
    console.log("start");
  });
}

var strictClick = () => {
  var strictButton = document.getElementById("strictCircle");
  strictButton.addEventListener('click', function(){
    console.log("strict");
  });
}

var checboxCheck = () =>{
  var checboxstate = document.getElementById("myonoffswitch");
  checboxstate.addEventListener('click',function(){
    if(checboxstate.checked == true){
      console.log("on");
    }else{
      console.log("off");
    }
  });
}

var colorClick = (color) =>{
  var colorField = document.getElementById(color);
  colorField.addEventListener('click', function(){
    console.log(this.id);
  });
}
