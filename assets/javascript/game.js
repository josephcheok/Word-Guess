var rand = 0;
var word = "";
var spaces = 0;
var numWrong = 0;
var numRight = 0;
var phraseLength = 0;
var numChar = 0;
var validletters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
var guessedletters = [];
var wrongletters = [];
var guessesleft = 7;
var phrases = [
  "The Magnificent Seven",
  "Unforgiven",
  "The Good, The Bad, The Ugly",
  "High Noon",
  "Tombstone",
  "A Fistful of Dollars",
  "The Wild Bunch",
  "True Grit",
  "Once Upon A Time In The West",
  "Stagecoach",
  "For A Few Dollars More",
  "Django",
  "The Revenant",
  "Dances With Wolves"
];

function sp() {
  document.getElementById("singlePage").style.display = "block";
}

function phrase() {
  rand = Math.floor(Math.random() * phrases.length);
  word = phrases[rand];
  numChar = word.length;
  console.log(word);
  console.log(numChar);
  hangman();
}

function hangman() {
  x = word.length;
  y = x - 1;
  while (x > 0) {
    numChar++;
    var letter = word.substring(y, x);
    if (letter === " ") {
      document.getElementById("letter" + x).innerHTML = "&nbsp;";
      document.getElementById("letter" + x).style.visibility = "hidden";
      document.getElementById("letter" + x).style.display = "block";
      document.getElementById("underline" + x).style.display = "block";
      spaces++;
    } else if (
      letter === "?" ||
      letter === "!" ||
      letter === "," ||
      letter === "." ||
      letter === "-" ||
      letter === "'"
    ) {
      document.getElementById("letter" + x).innerHTML = letter;
      document.getElementById("letter" + x).style.display = "block";
      document.getElementById("underline" + x).style.display = "block";
      spaces++;
    } else {
      document.getElementById("letter" + x).innerHTML = letter;
      document.getElementById("letter" + x).style.visibility = "hidden";
      document.getElementById("underline" + x).style.display = "block";
      document.getElementById("underline" + x).style.borderBottom =
        "3px solid black";
    }
    console.log("letter" + x + " = " + letter);
    x--;
    y--;
  }
  phraseLength = word.length - spaces;
  document.getElementById("gamePage").style.display = "block";
}

document.onkeyup = function(event) {
  var correct = 0; //correctness is reset to 0 everytime a key is pressed
  var userletter = event.key;
  var userletterCap = userletter.toUpperCase();
  var results = document.getElementById("results");
  if (validletters.indexOf(userletter) < 0) {
    // alert("This is not a valid letter. Please try again.");
  } else if (guessedletters.indexOf(userletter) > -1) {
    // alert("You've already pressed that letter!");
  } else {
    for (a = 1; a < 31; a++) {
      if (
        document.getElementById("letter" + a).innerHTML === userletter ||
        document.getElementById("letter" + a).innerHTML === userletterCap
      ) {
        document.getElementById("letter" + a).style.visibility = "visible";
        correct++;
        numRight++; //numRight is not reset to 0 when a key is pressed
      }
    }
    if (correct == 0) {
      numWrong++; //numWrong is not reset to 0 when a key is pressed
      wrongletters.push(event.key);
      guessesleft--;
    }
    if (numWrong == 6) {
      results.style.visibility = "visible";
      results.style.color = "red";
      results.innerHTML = "You can't miss another letter!";
      results.style.lineHeight = "40px";
      results.style.fontSize = "20px";
    }
    if (numWrong == 7) {
      results.innerHTML = "You lose!<br>Keep guessing until you get it right.";
      document.getElementById("again").style.display = "block";
      document.getElementById("introPage").style.display = "none";
      results.style.lineHeight = "20px";
    }
    if (numRight == phraseLength) {
      win();
    }
    guessedletters.push(event.key);
  }
  document.getElementById("guesses").textContent = wrongletters;
  document.getElementById("guessesleft").textContent = guessesleft;
  console.log("Number right: " + numRight);
  console.log("Number wrong:" + numWrong);
  console.log("Phrase length: " + phraseLength);
  console.log("Spaces: " + spaces);
};

function win() {
  var again = document.getElementById("again");
  var results = document.getElementById("results");
  var intro = document.getElementById("introPage");
  results.style.visibility = "visible";
  results.style.color = "#00b100";
  if (numWrong > 6) {
    results.innerHTML = "Got there in the end. Better luck next time...kiddo.";
    intro.style.display = "none";
    again.style.display = "block";
    results.style.lineHeight = "40px";
    results.style.fontSize = "20px";
  } else {
    results.innerHTML = "You win!";
    again.style.display = "block";
    again.style.marginTop = "40px";
    results.style.marginTop = "15px";
    results.style.fontSize = "75px";
    intro.style.display = "none";
  }
}

function reset() {
  var ul1 = document.getElementById("underline1").offsetWidth;
  var results = document.getElementById("results");
  var again = document.getElementById("again");
  var intro = document.getElementById("introPage");
  for (a = 1; a < 31; a++) {
    document.getElementById("letter" + a).innerHTML = "&nbsp;";
    document.getElementById("underline" + a).style.width = ul1 + "px";
    document.getElementById("underline" + a).style.marginRight = "3px";
    results.style.height = "40px";
    document.getElementById("underline" + a).style.display = "none";
    document.getElementById("underline" + a).style.borderBottom = "0px";
  }
  numWrong = 0;
  numRight = 0;
  phraseLength = 0;
  numChar = 0;
  wrongletters = [];
  guessedletters = [];
  guessesleft = 7;
  document.getElementById("guesses").textContent = wrongletters;
  document.getElementById("guessesleft").textContent = guessesleft;
  results.style.marginTop = "5px";
  results.style.lineHeight = "40px";
  results.innerHTML = " ";
  again.style.marginTop = "0px";
  again.style.display = "none";
  intro.style.display = "block";
  if (phrases.indexOf(word) > -1) {
    phrases.splice(rand, 1);
    phrase();
  }
}
