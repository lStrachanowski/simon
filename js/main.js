var simon = {} || simon;

window.onload = function() {

  simon.clickCount = 0;
  simon.colorList = ["idRed", "idBlue", "idGreen", "idYellow"];
  simon.checbox = false;
  simon.strict = false;

  document.getElementById("startCircle").disabled = true;

  var startButton = document.getElementById("startCircle");


  startButton.addEventListener('click', function() {
      if (simon.checbox == true) {
        simon.checbox = false;
        var level = 5;
        if (level > 0) {
          for (var i = 0; i < 5; i++) {
            var tempColor = simon.idSequence[i].slice(2, simon.idSequence[i].length);
            //Button blink
            var j = i * 1000 + 1000;
            buttonBlink(tempColor, j);
          }
          setTimeout(()=>{simon.checbox = true},j);
        }
      }

  });



var strictButton = document.getElementById("strictCircle");
strictButton.addEventListener('click', function() {

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
    document.getElementById("display").innerHTML = "OFF";
    //Removes event listeners for color buttons.
    for (var i = 0; i < simon.colorList.length; i++) {
      colorClick(simon.colorList[i], i + 1, 1);
    }
  }
  console.log(simon);
});
}

//Button blink and sound
var buttonBlink = (btn, j) => {
  setTimeout(() => {
    console.log(btn);
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
}

var checkSequence = () => {
  var res = [];
  for (var i = 0; i < simon.sequnce.length; i++) {
    res.push(simon.colorList[simon.sequnce[i]]);
  }
  console.log(res);
  return res;
}

//Is generating 21 random numbers which represents color buttons.
var randomSequence = () => {
  var randTable = [];
  for (var i = 0; i < 21; i++) {
    var rand = Math.floor(Math.random() * 4);
    randTable.push(rand);
  }
  return randTable;
}

//Register event listeners for color buttons.
// i - sound number.
// a - options if 0 - add event listener , if 1 - remove event listener.
var colorClick = (color, i, a) => {
  var color = document.getElementById(color);
  if (a == 0) {
    color.onclick = function() {
      var path = "../sounds/simonSound" + i + ".mp3";
      var audio = new Audio(path);
      audio.play();
      simon.clickCount++;
    };
  }
  if (a == 1) {
    color.onclick = false;
  }
}
