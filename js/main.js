
window.onload = function(){

  var startButton = document.getElementById("startCircle");
  startButton.addEventListener('click', function(){
    console.log("start");
  });

  var strictButton = document.getElementById("strictCircle");
  strictButton.addEventListener('click', function(){
    console.log("strict");
  });

  var checboxstate = document.getElementById("myonoffswitch");
  checboxstate.addEventListener('click',function(){
    if(checboxstate.checked == true){
      console.log("on");
    }else{
      console.log("off");
    }
  });

 var colorList = ["shapeRed","shapeBlue","shapeGreen","shapeYellow"];
  for(var i=0 ; i < colorList.length; i++){
    colorClick(colorList[i]);
  }

}



//Register event listeners for color buttons. 
var colorClick = (color) =>{
  var colorField = document.getElementById(color);
  colorField.addEventListener('click', function(){
    console.log(this.id);
  });
}
