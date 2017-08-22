var simon = {} || simon;

window.onload = function() {

  simon.colorList = ["idRed", "idBlue", "idGreen", "idYellow"];
  simon.checbox = false;
  simon.strict = false;
  simon.userClick = [];
  simon.level = 20;
  simon.compTurn = false;
  simon.currSequence = [];
  simon.strict = false;

  document.getElementById("startCircle").disabled = true;

  var startButton = document.getElementById("startCircle");
  startButton.addEventListener('click', function() {
      if (simon.checbox == true) {
        simon.userClick.length = 0;
        simon.compTurn = true;
        simon.checbox = false;
        document.getElementById("display").innerHTML = simon.level;
        if (simon.level > 0) {
          for (var i = 0; i < simon.level; i++) {
            var tempColor = simon.idSequence[i].slice(2, simon.idSequence[i].length);
            //Button blink
            var j = i * 1000 + 1000;
            buttonBlink(tempColor, j);
          }
          simon.currSequence = simon.idSequence.slice(0,i);
          setTimeout(()=>{simon.checbox = true; simon.compTurn = false},j);
        }
      }

  });


var strictButton = document.getElementById("strictCircle");
strictButton.addEventListener('click', function() {
  var t = document.getElementById("strictCircle").classList;
  if(simon.strict == false){
    t.add("strictLabelOn");
    simon.strict = true;
  }else{
    t.remove("strictLabelOn");
    simon.strict = false;
  }


});

var checboxstate = document.getElementById("myonoffswitch");
checboxstate.addEventListener('click', function() {
  if (checboxstate.checked == true) {
    simon.checbox = true;
    //on
    document.getElementById("display").innerHTML = "ON";
    //Register onclick evens for color buttons.
    for (var i = 0; i < simon.colorList.length; i++) {
      colorClick(simon.colorList[i], i + 1, 0);
    }

    // Random color sequence
    simon.sequnce = randomSequence();
    simon.idSequence = checkSequence();

  } else {
    //off
    simon.checbox = false;
    simon.level = 1;
    document.getElementById("display").innerHTML = "OFF";
    //Removes event listeners for color buttons.
    for (var i = 0; i < simon.colorList.length; i++) {
      colorClick(simon.colorList[i], i + 1, 1);
    }
  }
});
};


//Is comparing two arrays. When arrays contains the same values than return true.
var compareArrays = (arrComp,arrUser) =>{
  var result = (arrComp.length === arrUser.length) && arrComp.every(function(currentValue, index){
    return currentValue === arrUser[index];
  } );
  return result;
}


//Button blink and sound
var buttonBlink = (btn, j) => {
  setTimeout(() => {
    var currId = "id" + btn;
    document.getElementById(currId).click();
    var currClass = "shape" + btn;
    var currClassHover = "shape" + btn + "JS";
    var t = document.getElementById(currId).classList;
    t.remove(currClass);
    t.add(currClassHover);
    setTimeout(() => {
      t.remove(currClassHover);
      t.add(currClass);
    }, 400);
  }, j);
};

var checkSequence = () => {
  var res = [];
  for (var i = 0; i < simon.sequnce.length; i++) {
    res.push(simon.colorList[simon.sequnce[i]]);
  }
  return res;
};

//Is generating 21 random numbers which represents color buttons.
var randomSequence = () => {
  var randTable = [];
  for (var i = 0; i < 20; i++) {
    var rand = Math.floor(Math.random() * 4);
    randTable.push(rand);
  }
  return randTable;
};

//Register event listeners for color buttons.
// i - sound number.
// a - options if 0 - add event listener , if 1 - remove event listener.
var colorClick = (color, i, a) => {
  var color = document.getElementById(color);
  if (a == 0) {
    color.onclick = function() {
      var path = "https://s3.amazonaws.com/freecodecamp/simonSound" + i + ".mp3";
      var audio = new Audio(path);
      audio.play();
      if(simon.compTurn == false){
        simon.userClick.push(color.id);
        if(compareArrays(simon.currSequence,simon.userClick) === true ){
          simon.level++;
          if(simon.level == 21){

            // simon.level = 1;
            simon.sequnce = randomSequence();
            simon.idSequence = checkSequence();
            setTimeout(()=>{
              alert("Congratulations you won!!");
            },500);
            setTimeout(()=>{
              simon.level = 1;
              document.getElementById("startCircle").click();
            },1000);
          }else{
            document.getElementById("startCircle").click();
          }
        }
        if((simon.currSequence.length == simon.userClick.length) && compareArrays(simon.currSequence,simon.userClick) === false){
          if(simon.strict === false){
            document.getElementById("display").innerHTML = "!!";
            wrong();
            setTimeout(()=>{
              document.getElementById("startCircle").click();
            },1500);
          }else {
              document.getElementById("display").innerHTML = "!!";
                wrong();
                setTimeout(()=>{
                  simon.level = 1;
                  simon.sequnce = randomSequence();
                  simon.idSequence = checkSequence();
                  document.getElementById("startCircle").click();
            },1500);
          }
        }
      }

    };
  }
  if (a == 1) {
    color.onclick = false;
  }
};

//wrong sequence sound.
var wrong = ()=>{
  for(var i = 1; i<5; i++){
    var path = "https://s3.amazonaws.com/freecodecamp/simonSound" + i + ".mp3";
    var audio = new Audio(path);
    audio.play();
  }
}
