// This app was developed by Abubakr Elmallah.
// Credit for "assets/ButtonClick1.mp3" and "assets/ButtonClick2.mp3" go to ZAPSPLAT and its creators (https://www.zapsplat.com/sound-effect-category/button-clicks/).

// Global:
function SearchList(Type, List, Value){
  if(Type == "Linear") {
    for(var i = 0; i < List.length; i++) {
      if(Value == List[i]) {
        return i;
      }
    }
    return -1;
  } else if(Type == "Binary") {
    var StartIndex = 0,
      StopIndex = List.length - 1,
      Middle = Math.floor((StartIndex + StopIndex)/2);
    
    while(List[Middle] !== Value && StartIndex < StopIndex) {
      if(Value < List[Middle]){
        StopIndex = Middle - 1;
      } else if(Value > List[Middle]){
        StartIndex = Middle + 1;
      }
      Middle = Math.floor((StartIndex + StopIndex)/2);
    }
    return List[Middle] == Value ? Middle : -1;
  }
}

function Reset(Type, Screen) {
  Type == "Wordle" ? {} : playSound("assets/category_app/modern_ui_sound.mp3");
  setScreen(Screen);
  if(Type == "Hangman") {
    setProperty("TextInputButton1", "background-color", "black");
    for(var i1 = 1; i1 < 11; i1++) {
      setText("Underscore" + i1, "");
      setProperty("Underscore" + i1, "text-color", "white");
    }
    hideElement("TextInputButton1");
    showElement("TextInput1");
    showElement("EnterButton1");
    WrongLettersList = [];
    RightLettersList = [];
    RightWordsList = [];
    Order = 1;
    setImageURL("Hangman", "assets/Hangman-1.png");
    setText("LetterBox", "Wrong Letters:\n\n");
  } else if(Type == "Wordle") {
    setProperty("TextInputButton2", "background-color", "black");
    RightWordsList = [];
    Row = 1;
    hideElement("TextInputButton2");
    showElement("TextInput2");
    setText("TextInput2", "");
    showElement("EnterButton2");
    for(var i2 = 1; i2 < 7; i2++) {
      for(var i3 = 1; i3 < 6; i3++) {
        setProperty(i2 + "Button" + i3, "border-color", rgb(50, 50, 50));
        setProperty(i2 + "Button" + i3, "background-color", "black");
        setText(i2 + "Button" + i3, "");
      }
    }
  } else if(Type == "Checkers") {
    for(var i4 = 1; i4 < 9; i4++) {
      setProperty("WhiteDead" + i4, "image", "");
      setProperty("BlackDead" + i4, "image", "");
      for(var i5 = 1; i5 < 9; i5++) {
        setProperty(i4 + "Area" + i5, "image", "");
        setProperty(i4 + "Area" + i5, "border-color", rgb(255, 198, 16, 0.5));
      }
    }
    Selected = false;
    Index = false;
    WhiteList = ["6Area2", "6Area4", "6Area6", "6Area8", "7Area1", "7Area3", "7Area5", "7Area7", "8Area2", "8Area4", "8Area6", "8Area8"];
    BlackList = ["1Area1", "1Area3", "1Area5", "1Area7", "2Area2", "2Area4", "2Area6", "2Area8", "3Area1", "3Area3", "3Area5", "3Area7"];
    BlackDead = 0;
    WhiteDead = 0;
    WhiteTurn = 1;
    BlackTurn = 0;
    Checker = {
      Color : "",
      Other : ""
    };
    for(var i6 = 0; i6 < WhiteList.length; i6++) {
      setProperty(WhiteList[i6], "image", "icon://fa-circle");
      setProperty(WhiteList[i6], "icon-color", rgb(255, 255, 255));
      setProperty(BlackList[i6], "image", "icon://fa-circle");
      setProperty(BlackList[i6], "icon-color", rgb(0, 0, 0));
    }
    hideElement("UnclickableCheckers");
    hideElement("TextInputButton3");
  }
}

onEvent("HomeButton1", "click", function() {Reset("Hangman", "HomeScreen")});
onEvent("HomeButton2", "click", function() {Reset("Hangman", "HomeScreen")});
onEvent("HomeButton3", "click", function() {Reset("Wordle", "HomeScreen")});
onEvent("HomeButton4", "click", function() {Reset("Checkers", "HomeScreen")});
onEvent("ResetButton1", "click", function() {Reset("Hangman", "HangChooseScreen")});
onEvent("ResetButton2", "click", function() {
  Reset("Wordle", "WordleScreen");
  RandomWord("Wordle", "WordleScreen");
});
onEvent("ResetButton3", "click", function() {Reset("Checkers", "CheckersScreen")});

// HomeScreen:
onEvent("HangButton", "click", function() {
  playSound("assets/category_app/modern_ui_sound.mp3");
  setScreen("HangChooseScreen");
});

onEvent("WordleButton", "click", function() {RandomWord("Wordle", "WordleScreen")});

onEvent("CheckersButton", "click", function() {
  playSound("assets/category_app/modern_ui_sound.mp3");
  setScreen("CheckersScreen");
});

// Hangman and Wordle:
var Word;
var PreviousWord;
var Row = 1;
var AlphabetList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function RandomWord(Type, Category) {
  playSound("assets/category_app/modern_ui_sound.mp3");
  if(Type == "Hangman") {
    var RandomList = [];
    var NumberRandom = randomNumber(1, 9);
    
    setScreen("HangScreen");
    
    if(Category == "Random") {
      NumberRandom == 1 ? RandomList = CatsList : {};
      NumberRandom == 2 ? RandomList = CountriesList : {};
      NumberRandom == 3 ? RandomList = LanguagesList : {};
      NumberRandom == 4 ? RandomList = StatesList : {};
      NumberRandom == 5 ? RandomList = CitiesList : {};
      NumberRandom == 6 ? RandomList = NationalParksList : {};
      NumberRandom == 7 ? RandomList = VideoGamesList : {};
      NumberRandom == 8 ? RandomList = PlanetsList : {};
      NumberRandom == 9 ? RandomList = ElementsList : {};
    } else if(Category == "Cats") {
      RandomList = CatsList;
    } else if(Category == "Countries") {
      RandomList = CountriesList;
    } else if(Category == "Languages") {
      RandomList = LanguagesList;
    } else if(Category == "States") {
      RandomList = StatesList;
    } else if(Category == "Cities") {
      RandomList = CitiesList;
    } else if(Category == "National Parks") {
      RandomList = NationalParksList;
    } else if(Category == "Video Games") {
      RandomList = VideoGamesList;
    } else if(Category == "Planets") {
      RandomList = PlanetsList;
    } else if(Category == "Elements") {
      RandomList = ElementsList;
    }
    PreviousWord = Word;
    Word = RandomList[randomNumber(0, RandomList.length - 1)].toUpperCase();
    while(Word.length > 10 || NotValid(Word) || PreviousWord == Word) {
      Word = RandomList[randomNumber(0, RandomList.length - 1)].toUpperCase();
    }
    for(var i1 = 1; i1 < Word.length + 1; i1++) {
      setText("Underscore" + i1, "_");
    }
  } else if(Type == "Wordle") {
    setScreen("WordleScreen");
    
    PreviousWord = Word;
    Word = AnswersList[randomNumber(0, AnswersList.length - 1)];
    Word == null || Word == undefined ? {} : Word = Word.toUpperCase();
    while(Word == null || Word == undefined || PreviousWord == Word) {
      Word = AnswersList[randomNumber(0, AnswersList.length - 1)];
      Word == null || Word == undefined ? {} : Word = Word.toUpperCase();
    }
  }
  console.log(Word);
}

function LetterInput(Type, Typing) {
  var TextInput;
  
  function Timeout(TextNumber, UnclickableNumber) {
    setTimeout(function() {
      showElement("TextInput" + TextNumber);
      showElement("EnterButton" + TextNumber);
      hideElement("TextInputButton" + TextNumber);
      UnclickableNumber == undefined ? hideElement("Unclickable") : hideElement("Unclickable" + UnclickableNumber);
    }, 750);
  }
  
  if(Type == "Hangman") {
    playSound("assets/ButtonClick1.mp3");
    TextInput = getText("TextInput1").substring(0, 1).toUpperCase();
    var Check = false;
    var CheckWord = "";
    var DuplicateLetter = false;
    var Once = false;
    
    if(!Typing && TextInput.length == 1) {
      if(SearchList("Binary", RightLettersList, TextInput) !== -1 || SearchList("Binary", WrongLettersList, TextInput) !== -1) {
        DuplicateLetter = true;
        setText("TextInput1", "");
        hideElement("TextInput1");
        hideElement("EnterButton1");
        setText("TextInputButton1", "You already chose that letter.");
        showElement("Unclickable2");
        showElement("TextInputButton1");
        Timeout("1", "2");
      }
      
      if(DuplicateLetter == false) {
        for(var i11 = 0; i11 < Word.length; i11++) {
          if(TextInput == Word[i11]) {
            setText("Underscore" + (i11 + 1), TextInput);
            if(Once == false) {
              appendItem(RightLettersList, TextInput);
              RightLettersList.sort();
              Check = true;
            }
            Once = true;
          }
        }
      }
      
      for(var i2 = 1; i2 < Word.length + 1; i2++) {
        CheckWord = CheckWord + getText("Underscore" + i2);
      }
      
      if(CheckWord == Word) {
        for(var i3 = 1; i3 < 11; i3++) {
          setProperty("Underscore" + i3, "text-color", "green");
        }
        hideElement("TextInput1");
        hideElement("EnterButton1");
        playSound("assets/category_achievements/lighthearted_bonus_objective_3.mp3");
        setText("TextInputButton1", "You figured out the word! Click here to play again");
        showElement("TextInputButton1");
        hideElement("Unclickable2");
      }
      if(!Check && !NotValid(TextInput)) {
        if(!DuplicateLetter) {
          appendItem(WrongLettersList, TextInput);
          WrongLettersList.sort();
          setText("LetterBox", "Wrong Letters:\n" + WrongLettersList.join(", "));
          if(Order == 1) {
            Order++;
            setImageURL("Hangman", "Hangman-" + Order + ".png");
          } else {
            Order++;
            setImageURL("Hangman", "Hangman-" + Order + ".png");
            if(Order == 7) {
              for(var i5 = 1; i5 < Word.length + 1; i5++) {
                setText("Underscore" + i5, Word[i5 - 1]);
                setProperty("Underscore" + i5, "text-color", rgb(178, 45, 45));
              }
              setText("TextInputButton1", "Game Over. Click here to play again");
              showElement("TextInputButton1");
              hideElement("Unclickable2");
              hideElement("TextInput1");
              hideElement("EnterButton1");
            }
          }
        } else {
          setText("TextInput1", "");
          hideElement("TextInput1");
          hideElement("EnterButton1");
          setText("TextInputButton1", "You already chose that letter.");
          showElement("Unclickable2");
          showElement("TextInputButton1");
          Timeout("1", "2");
        }
      }
      setText("TextInput1", "");
    } else if(Typing) {
      if(getText("TextInput1").length > 1 || NotValid(TextInput)) {
        hideElement("TextInput1");
        hideElement("EnterButton1");
        getText("TextInput1").length > 1 ? setText("TextInputButton1", "Only one letter at a time.") : setText("TextInputButton1", "Only letters.");
        getText("TextInput1").length > 1 ? setText("TextInput1", getText("TextInput1").substring(0, 1)) : setText("TextInput1", "");
        showElement("Unclickable2");
        showElement("TextInputButton1");
        Timeout("1", "2");
      }
    }
  } else if(Type == "Wordle") {
    if(!Typing) {
      playSound("assets/category_app/modern_ui_sound.mp3");
      TextInput = getText("TextInput2").substring(0, 5).toUpperCase();
      
      if(getText("TextInput2").length == 5) {
        var RealWord = false;
        var DuplicateWord = false;
        
        if(TextInput == Word) {
          RealWord = true;
          for(var i6 = 0; i6 < 5; i6++) {
            setProperty(Row + "Button" + (i6 + 1), "background-color", "green");
            setProperty(Row + "Button" + (i6 + 1), "border-color", "green");
          }
          showElement("TextInputButton2");
          hideElement("Unclickable");
          playSound("assets/category_achievements/lighthearted_bonus_objective_3.mp3");
          setText("TextInputButton2", "You figured out the word! Click here to play again");
          hideElement("TextInput2");
          hideElement("EnterButton2");
        } else {
          if(SearchList("Binary", WordsList, TextInput.toLowerCase()) == -1 && SearchList("Linear", AnswersList, TextInput.toLowerCase()) == -1) {
            hideElement("TextInput2");
            hideElement("EnterButton2");
            setText("TextInputButton2", "Not a Real Word.");
            showElement("Unclickable");
            showElement("TextInputButton2");
            setText("TextInput2", getText("TextInput2").substring(0, 5));
            Timeout("2");
          } else {
            var Counter = 0;
            
            if(SearchList("Binary", RightWordsList, TextInput) !== -1) {
              DuplicateWord = true;
              for(var i16 = 1; i16 < 6; i16++) {
                setText(Row + "Button" + i16, "");
              }
              setText("TextInput2", "");
              hideElement("TextInput2");
              hideElement("EnterButton2");
              setText("TextInputButton2", "You already chose that word.");
              showElement("Unclickable2");
              showElement("TextInputButton2");
              Timeout("2");
            }
            
            for(var i14 = 0; i14 < RightWordsList.length; i14++) {
              if(TextInput == RightWordsList[i14]) {
                Counter++;
              }
            }
            Counter == 0 ? appendItem(RightWordsList, TextInput) : {};
            RightWordsList.sort();
            
            if(!DuplicateWord) {
              for(var i8 = 0; i8 < 5; i8++) {
                var TextInputDuplicates = false;
                var WordDuplicates = false;
                TextInput.indexOf(TextInput[i8]) == TextInput.lastIndexOf(TextInput[i8]) ? {} : TextInputDuplicates = true;
                Word.indexOf(TextInput[i8]) == Word.lastIndexOf(TextInput[i8]) ? {} : WordDuplicates = true;
                if(TextInput[i8] == Word[i8]) {
                  setProperty(Row + "Button" + (i8 + 1), "background-color", "green");
                  setProperty(Row + "Button" + (i8 + 1), "border-color", "green");
                } else if(Word.includes(TextInput[i8]) && !TextInputDuplicates) {
                  setProperty(Row + "Button" + (i8 + 1), "background-color", "#9B870C");
                  setProperty(Row + "Button" + (i8 + 1), "border-color", "#9B870C");
                } else if(Word.includes(TextInput[i8]) && TextInputDuplicates && !WordDuplicates && TextInput[i8] == Word[i8]) {
                  setProperty(Row + "Button" + (TextInput.indexOf(TextInput[i8]) + 1), "background-color", "#9B870C");
                  setProperty(Row + "Button" + (TextInput.indexOf(TextInput[i8]) + 1), "border-color", "#9B870C");
                  setProperty(Row + "Button" + (TextInput.lastIndexOf(TextInput[i8]) + 1), "background-color", "grey");
                  setProperty(Row + "Button" + (TextInput.lastIndexOf(TextInput[i8]) + 1), "border-color", "grey");
                } else if(Word.includes(TextInput[i8]) && TextInputDuplicates && WordDuplicates && TextInput[i8] == Word[i8]) {
                  setProperty(Row + "Button" + (TextInput.indexOf(TextInput[i8]) + 1), "background-color", "#9B870C");
                  setProperty(Row + "Button" + (TextInput.indexOf(TextInput[i8]) + 1), "border-color", "#9B870C");
                  setProperty(Row + "Button" + (TextInput.lastIndexOf(TextInput[i8]) + 1), "background-color", "#9B870C");
                  setProperty(Row + "Button" + (TextInput.lastIndexOf(TextInput[i8]) + 1), "border-color", "#9B870C");
                } else {
                  setProperty(Row + "Button" + (i8 + 1), "background-color", "grey");
                  setProperty(Row + "Button" + (i8 + 1), "border-color", "grey");
                }
              }
              Row++;
              setText("TextInput2", "");
            }
          }
        }
        if(Row == 7) {
          showElement("TextInputButton2");
          hideElement("Unclickable");
          setText("TextInputButton2", "The word was " + Word.toLowerCase() + ". " + "Click here to play again");
          hideElement("TextInput2");
          hideElement("EnterButton2");
        }
      } else {
        hideElement("TextInput2");
        hideElement("EnterButton2");
        setText("TextInputButton2", "Five letter words only.");
        showElement("Unclickable");
        showElement("TextInputButton2");
        setText("TextInput2", getText("TextInput2").substring(0, 5));
        Timeout("2");
      }
    } else {
      TextInput = getText("TextInput2").substring(0, 5).toUpperCase();

      for(var i13 = 1; i13 < 6; i13++) {
        setText(Row + "Button" + i13, TextInput.substring(i13 - 1, i13));
      }
      
      if(getText("TextInput2").length > 5 || NotValid(TextInput)) {
        hideElement("TextInput2");
        hideElement("EnterButton2");
        if(getText("TextInput2").length > 5) {
          setText("TextInputButton2", "Five letter words only.");
          setText("TextInput2", getText("TextInput2").substring(0, 5));
        } else {
          setText("TextInputButton2", "Only letters.");
          setText("TextInput2", getText("TextInput2").substring(0, getText("TextInput2").length - 1));
          setText(Row + "Button" + TextInput.length, "");
        }
        showElement("Unclickable");
        showElement("TextInputButton2");
        Timeout("2");
      }
    }
  }
}

// Hangman:
var Order = 1;
var WrongLettersList = [];
var RightLettersList = [];

var CatsList = getColumn("Cats", "Name");
var CountriesList = getColumn("Countries and Territories", "Country Name");
var LanguagesList = getColumn("Most Spoken Languages Worldwide", "Language");
var StatesList = getColumn("US States", "State Name");
var CitiesList = getColumn("Target Store Locations", "City");
var NationalParksList = getColumn("US National Parks", "Name");
var VideoGamesList = getColumn("Video Game Reviews from IGN", "title");
var PlanetsList = getColumn("Planets of our Solar System", "Planet");
var ElementsList = getColumn("Periodic Table Elements", "Name");

onEvent("RandomButton", "click", function() {RandomWord("Hangman", "Random")});
onEvent("LanguagesButton", "click", function() {RandomWord("Hangman", "Languages")});
onEvent("CatsButton", "click", function() {RandomWord("Hangman", "Cats")});
onEvent("CountriesButton", "click", function() {RandomWord("Hangman", "Countries")});
onEvent("StatesButton", "click", function() {RandomWord("Hangman", "States")});
onEvent("CitiesButton", "click", function() {RandomWord("Hangman", "Cities")});
onEvent("NationalParksButton", "click", function() {RandomWord("Hangman", "National Parks")});
onEvent("VideoGamesButton", "click", function() {RandomWord("Hangman", "Video Games")});
onEvent("PlanetsButton", "click", function() {RandomWord("Hangman", "Planets")});
onEvent("ElementsButton", "click", function() {RandomWord("Hangman", "Elements");});
onEvent("TextInput1", "input", function() {LetterInput("Hangman", true)});
onEvent("EnterButton1", "click", function() {LetterInput("Hangman", false)});
onEvent("TextInputButton1", "click", function() {Reset("Hangman", "HangChooseScreen")});

// Wordle:
var WordsList = getColumn("Wordle", "validWordleGuess");
var AnswersList = getColumn("Wordle", "validWordleAnswer");
var RightWordsList = [];

function NotValid(Word) {
  var LetterCounter = 0;
  for(var i3 = 0; i3 < Word.length;) {
    LetterCounter = 0;
    SearchList("Binary", AlphabetList, Word[i3]) !== -1 ? LetterCounter++ : {};
    if(LetterCounter == 1) {
      i3++;
    } else {
      return true;
    }
  }
  return false;
}

onEvent("TextInput2", "input", function() {LetterInput("Wordle", true)});
onEvent("EnterButton2", "click", function() {LetterInput("Wordle", false)});
onEvent("TextInputButton2", "click", function() {
  Reset("Wordle", "WordleScreen");
  RandomWord("Wordle", "WordleScreen");
});

// Checkers
var Selected = false;
var SelectedList = [];
var Index = false;
var Checker = { Color : "", Other : "" };

var WhiteList = ["6Area2","6Area4","6Area6","6Area8",
                 "7Area1","7Area3","7Area5","7Area7",
                 "8Area2","8Area4","8Area6","8Area8"];
var WhiteDead = 0;
var WhiteTurn = 1;

var BlackList = ["1Area1","1Area3","1Area5","1Area7",
                 "2Area2","2Area4","2Area6","2Area8",
                 "3Area1","3Area3","3Area5","3Area7"];
var BlackDead = 0;
var BlackTurn = 0;

function isKing(squareId) {
  var img = getProperty(squareId, "image");
  return (img === "icon://fa-rebel" || img === "icon://fa-empire");
}

function isPieceBlocked(row, col, color) {
  var squareId = row + "Area" + col;
  var enemyColor = (color === "White") ? "Black" : "White";
  var king = isKing(squareId);

  var dirs = [];
  if (king || color === "White") {
    dirs.push({r: row - 1, c: col - 1, jumpR: row - 2, jumpC: col - 2});
    dirs.push({r: row - 1, c: col + 1, jumpR: row - 2, jumpC: col + 2});
  }
  if (king || color === "Black") {
    dirs.push({r: row + 1, c: col - 1, jumpR: row + 2, jumpC: col - 2});
    dirs.push({r: row + 1, c: col + 1, jumpR: row + 2, jumpC: col + 2});
  }

  for (var i = 0; i < dirs.length; i++) {
    var d = dirs[i];
    // Simple move
    if (d.r >= 1 && d.r <= 8 && d.c >= 1 && d.c <= 8) {
      var moveSquare = d.r + "Area" + d.c;
      if (SearchList("Linear", WhiteList, moveSquare) === -1 &&
          SearchList("Linear", BlackList, moveSquare) === -1) {
        return false;
      }
    }
    // Jump
    if (d.jumpR >= 1 && d.jumpR <= 8 && d.jumpC >= 1 && d.jumpC <= 8) {
      var jumpSquare = d.jumpR + "Area" + d.jumpC;
      var midSquare = d.r + "Area" + d.c;
      if (enemyColor === "White" && SearchList("Linear", WhiteList, midSquare) !== -1) {
        if (SearchList("Linear", WhiteList, jumpSquare) === -1 &&
            SearchList("Linear", BlackList, jumpSquare) === -1) {
          return false;
        }
      } else if (enemyColor === "Black" && SearchList("Linear", BlackList, midSquare) !== -1) {
        if (SearchList("Linear", WhiteList, jumpSquare) === -1 &&
            SearchList("Linear", BlackList, jumpSquare) === -1) {
          return false;
        }
      }
    }
  }
  return true;
}

function Select(Row, Column) {
  var Present = false;
  var AllyPresent1=false, AllyPresent2=false, AllyPresent3=false, AllyPresent4=false;
  var EnemyPresent1=false, EnemyPresent2=false, EnemyPresent3=false, EnemyPresent4=false;
  var CheckerBehind1=false, CheckerBehind2=false, CheckerBehind3=false, CheckerBehind4=false;
  var Place1, Place2, Place3, Place4;
  var AttackPlace1, AttackPlace2, AttackPlace3, AttackPlace4;
  var DeadIndex = false;
  var King = false;

  function CheckChecker() {
    King = isKing(Selected);

    if (Checker.Color === "White") {
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5])-1))!==-1){EnemyPresent1=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5])+1))!==-1){EnemyPresent2=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5])-1))!==-1){EnemyPresent3=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5])+1))!==-1){EnemyPresent4=true;}

      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5])-1))!==-1){AllyPresent1=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5])+1))!==-1){AllyPresent2=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5])-1))!==-1){AllyPresent3=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5])+1))!==-1){AllyPresent4=true;}

      if((SearchList("Linear", WhiteList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1) ||
         (SearchList("Linear", BlackList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1)){
        CheckerBehind1=true;
      }
      if((SearchList("Linear", WhiteList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1) ||
         (SearchList("Linear", BlackList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1)){
        CheckerBehind2=true;
      }
      if((SearchList("Linear", WhiteList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1) ||
         (SearchList("Linear", BlackList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1)){
        CheckerBehind3=true;
      }
      if((SearchList("Linear", WhiteList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1) ||
         (SearchList("Linear", BlackList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1)){
        CheckerBehind4=true;
      }
      if(parseInt(Selected[0]) - 2 <= 0 || parseInt(Selected[5]) - 2 <= 0){ CheckerBehind1=undefined; }
      if(parseInt(Selected[0]) - 2 <= 0 || parseInt(Selected[5]) + 2 >= 9){ CheckerBehind2=undefined; }
      if(parseInt(Selected[0]) + 2 >= 9 || parseInt(Selected[5]) - 2 <= 0){ CheckerBehind3=undefined; }
      if(parseInt(Selected[0]) + 2 >= 9 || parseInt(Selected[5]) + 2 >= 9){ CheckerBehind4=undefined; }
    }
    else {
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1))!==-1){EnemyPresent1=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1))!==-1){EnemyPresent2=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1))!==-1){EnemyPresent3=true;}
      if(SearchList("Linear", WhiteList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1))!==-1){EnemyPresent4=true;}

      if(SearchList("Linear", BlackList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1))!==-1){AllyPresent1=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])+1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1))!==-1){AllyPresent2=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1))!==-1){AllyPresent3=true;}
      if(SearchList("Linear", BlackList, (parseInt(Selected[0])-1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1))!==-1){AllyPresent4=true;}

      if((SearchList("Linear", BlackList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1) ||
         (SearchList("Linear", WhiteList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1)){
        CheckerBehind1=true;
      }
      if((SearchList("Linear", BlackList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1) ||
         (SearchList("Linear", WhiteList, (parseInt(Selected[0]) + 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1)){
        CheckerBehind2=true;
      }
      if((SearchList("Linear", BlackList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1) ||
         (SearchList("Linear", WhiteList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) - 2))!==-1)){
        CheckerBehind3=true;
      }
      if((SearchList("Linear", BlackList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1) ||
         (SearchList("Linear", WhiteList, (parseInt(Selected[0]) - 2)+Selected.substring(1,5)+(parseInt(Selected[5]) + 2))!==-1)){
        CheckerBehind4=true;
      }
      if(parseInt(Selected[0]) + 2 >= 9 || parseInt(Selected[5]) - 2 <= 0){ CheckerBehind1=undefined; }
      if(parseInt(Selected[0]) + 2 >= 9 || parseInt(Selected[5]) + 2 >= 9){ CheckerBehind2=undefined; }
      if(parseInt(Selected[0]) - 2 <= 0 || parseInt(Selected[5]) - 2 <= 0){ CheckerBehind3=undefined; }
      if(parseInt(Selected[0]) - 2 <= 0 || parseInt(Selected[5]) + 2 >= 9){ CheckerBehind4=undefined; }
    }
  }

  function DefinePlaces() {
    if ((Checker.Color === "Black" && Selected[0]==="8") || 
        (Checker.Color === "White" && Selected[0]==="1") || 
        isKing(Selected)) {
      Place1 = (parseInt(Selected[0]) -1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1);
      Place2 = (parseInt(Selected[0]) -1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1);
      Place3 = (parseInt(Selected[0]) +1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1);
      Place4 = (parseInt(Selected[0]) +1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1);

      AttackPlace1=(parseInt(Selected[0]) -2)+Selected.substring(1,5)+(parseInt(Selected[5]) -2);
      AttackPlace2=(parseInt(Selected[0]) -2)+Selected.substring(1,5)+(parseInt(Selected[5]) +2);
      AttackPlace3=(parseInt(Selected[0]) +2)+Selected.substring(1,5)+(parseInt(Selected[5]) -2);
      AttackPlace4=(parseInt(Selected[0]) +2)+Selected.substring(1,5)+(parseInt(Selected[5]) +2);
    } else {
      if(Checker.Color==="White") {
        Place1=(parseInt(Selected[0]) -1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1);
        Place2=(parseInt(Selected[0]) -1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1);

        AttackPlace1=(parseInt(Selected[0]) -2)+Selected.substring(1,5)+(parseInt(Selected[5]) -2);
        AttackPlace2=(parseInt(Selected[0]) -2)+Selected.substring(1,5)+(parseInt(Selected[5]) +2);
      } else {
        Place1=(parseInt(Selected[0]) +1)+Selected.substring(1,5)+(parseInt(Selected[5]) -1);
        Place2=(parseInt(Selected[0]) +1)+Selected.substring(1,5)+(parseInt(Selected[5]) +1);

        AttackPlace1=(parseInt(Selected[0]) +2)+Selected.substring(1,5)+(parseInt(Selected[5]) -2);
        AttackPlace2=(parseInt(Selected[0]) +2)+Selected.substring(1,5)+(parseInt(Selected[5]) +2);
      }
    }
  }

  function DefineRedSelect() {
    if (EnemyPresent1 && CheckerBehind1===false) { RedSelect(AttackPlace1); }
    if (EnemyPresent2 && CheckerBehind2===false) { RedSelect(AttackPlace2); }
    if (King && EnemyPresent3 && CheckerBehind3===false) { RedSelect(AttackPlace3); }
    if (King && EnemyPresent4 && CheckerBehind4===false) { RedSelect(AttackPlace4); }

    if(!King) {
      if(!EnemyPresent1 && !AllyPresent1) { RedSelect(Place1); }
      if(!EnemyPresent2 && !AllyPresent2) { RedSelect(Place2); }
    } else {
      if(!EnemyPresent1 && !AllyPresent1) { RedSelect(Place1); }
      if(!EnemyPresent2 && !AllyPresent2) { RedSelect(Place2); }
      if(!EnemyPresent3 && !AllyPresent3) { RedSelect(Place3); }
      if(!EnemyPresent4 && !AllyPresent4) { RedSelect(Place4); }
    }
  }

  function RedSelect(place, remove) {
    if(remove){
      for(var i=SelectedList.length-1; i>=0; i--) {
        setProperty(SelectedList[i],"border-width",0);
      }
      SelectedList = [];
    } else {
      if(!place) return;
      if(place[0]==="0"||place[0]==="9"||place[5]==="0"||place[5]==="9") return;
      appendItem(SelectedList,place);
      setProperty(place,"border-width",1);
      setProperty(place,"border-color","#B22D2D");
    }
  }

  // Turn Handling
  if(WhiteTurn===1) {
    showElement("WhiteTurn");
    hideElement("BlackTurn");
    // If clicked a White piece
    if(SearchList("Linear", WhiteList, Row+"Area"+Column)!==-1) {
      Checker.Color="White";
      Checker.Other="Black";
      Present="White";
      if(Selected){ setProperty(Selected,"border-width",0);}
      Selected=Row+"Area"+Column;
      Index=SearchList("Linear", WhiteList, Selected);
      setProperty(Selected,"border-width",1);
      setProperty(Selected,"border-color",rgb(255,198,16));
      WhiteTurn=2;
    }
  } 
  else if(BlackTurn===1) {
    hideElement("WhiteTurn");
    showElement("BlackTurn");
    // If clicked a Black piece
    if(SearchList("Linear", BlackList, Row+"Area"+Column)!==-1) {
      Checker.Color="Black";
      Checker.Other="White";
      Present="Black";
      if(Selected){ setProperty(Selected,"border-width",0);}
      Selected=Row+"Area"+Column;
      Index=SearchList("Linear", BlackList, Selected);
      setProperty(Selected,"border-width",1);
      setProperty(Selected,"border-color",rgb(255,198,16));
      BlackTurn=2;
    }
  }

  // If we have a piece selected, do adjacency check
  if(Selected!==false) {
    CheckChecker();
  }

  // If in the move/capture phase
  if(this[Checker.Color+"Turn"]===2) {
    DefinePlaces();

    // Unselect if clicked same square again
    if(Selected===(Row+"Area"+Column) && !Present) {
      if(Checker.Color==="White"){ playSound("assets/ButtonClick1.mp3");}
      else{ playSound("assets/ButtonClick2.mp3"); }
      setProperty(Selected,"border-width",0);
      this[Checker.Color+"Turn"]=1;
      Selected=false;
      Index=false;
      RedSelect(false,true);
    }
    // Click another piece of same color (to switch selection)
    else if(SearchList("Linear", this[Checker.Color+"List"], Row+"Area"+Column)!==-1 &&
            Selected!==(Row+"Area"+Column)) {
      RedSelect(false,true);
      if(Checker.Color==="White"){playSound("assets/ButtonClick1.mp3");}
      else{playSound("assets/ButtonClick2.mp3");}
      setProperty(Selected,"border-width",0);
      Selected=Row+"Area"+Column;
      setProperty(Selected,"border-width",1);
      setProperty(Selected,"border-color",rgb(255,198,16));
      CheckChecker();
      DefinePlaces();
      DefineRedSelect();
    }
    // Selecting your color piece first time
    else if(Present===Checker.Color) {
      if(Checker.Color==="White"){playSound("assets/ButtonClick1.mp3");}
      else{playSound("assets/ButtonClick2.mp3");}
      if(Selected){ setProperty(Selected,"border-width",0);}
      Selected=Row+"Area"+Column;
      setProperty(Selected,"border-width",1);
      setProperty(Selected,"border-color",rgb(255,198,16));
      DefineRedSelect();
    }
    // Attack
    else if(
      (!CheckerBehind1 && EnemyPresent1 && AttackPlace1===Row+"Area"+Column)||
      (!CheckerBehind2 && EnemyPresent2 && AttackPlace2===Row+"Area"+Column)||
      (King && !CheckerBehind3 && EnemyPresent3 && AttackPlace3===Row+"Area"+Column)||
      (King && !CheckerBehind4 && EnemyPresent4 && AttackPlace4===Row+"Area"+Column)
    ){
      RedSelect(false,true);
      if(Checker.Color==="White"){playSound("assets/ButtonClick1.mp3");}
      else{playSound("assets/ButtonClick2.mp3");}

      if(!CheckerBehind1 && EnemyPresent1 && AttackPlace1===Row+"Area"+Column){
        DeadIndex=SearchList("Linear", this[Checker.Other+"List"], Place1);
      }
      if(!CheckerBehind2 && EnemyPresent2 && AttackPlace2===Row+"Area"+Column){
        DeadIndex=SearchList("Linear", this[Checker.Other+"List"], Place2);
      }
      if(King && !CheckerBehind3 && EnemyPresent3 && AttackPlace3===Row+"Area"+Column){
        DeadIndex=SearchList("Linear", this[Checker.Other+"List"], Place3);
      }
      if(King && !CheckerBehind4 && EnemyPresent4 && AttackPlace4===Row+"Area"+Column){
        DeadIndex=SearchList("Linear", this[Checker.Other+"List"], Place4);
      }

      // Remove old piece
      setProperty(Selected,"image","");
      setProperty(Selected,"border-width",0);

      // Move to new square
      Selected=Row+"Area"+Column;
      if((Selected[0]===(Checker.Color==="Black"?"8":"1")) || King) {
        // Crown it
        if(Checker.Color==="Black"){setProperty(Selected,"image","icon://fa-rebel");}
        else{setProperty(Selected,"image","icon://fa-empire");}
      } else {
        setProperty(Selected,"image","icon://fa-circle");
      }
      setProperty(Selected,"icon-color",(Checker.Color==="White"?rgb(255,255,255):rgb(0,0,0)));

      // Move captured piece to Dead
      this[Checker.Other+"Dead"]++;
      setProperty(
        Checker.Other+"Dead"+this[Checker.Other+"Dead"],
        "image",
        getProperty(this[Checker.Other+"List"][DeadIndex],"image")
      );
      setProperty(
        Checker.Other+"Dead"+this[Checker.Other+"Dead"],
        "icon-color",
        getProperty(this[Checker.Other+"List"][DeadIndex],"icon-color")
      );
      setProperty(this[Checker.Other+"List"][DeadIndex],"image","");

      removeItem(this[Checker.Other+"List"],DeadIndex);
      removeItem(this[Checker.Color+"List"],Index);
      insertItem(this[Checker.Color+"List"],Index,Selected);

      // End turn right away
      Selected=false;
      Index=false;
      this[Checker.Color+"Turn"]=0;
      this[Checker.Other+"Turn"]=1;
      checkForEndGame();
    }
    // Simple Move
    else if(
      ((!EnemyPresent1 && !AllyPresent1 && Place1===Row+"Area"+Column) ||
       (!EnemyPresent2 && !AllyPresent2 && Place2===Row+"Area"+Column) ||
       (King && !EnemyPresent3 && !AllyPresent3 && Place3===Row+"Area"+Column) ||
       (King && !EnemyPresent4 && !AllyPresent4 && Place4===Row+"Area"+Column))
    ){
      RedSelect(false,true);
      if(Checker.Color==="White"){playSound("assets/ButtonClick1.mp3");}
      else{playSound("assets/ButtonClick2.mp3");}
      setProperty(Selected,"image","");
      setProperty(Selected,"border-width",0);

      Selected=Row+"Area"+Column;
      if((Selected[0]===(Checker.Color==="Black"?"8":"1")) || King){
        if(Checker.Color==="Black"){setProperty(Selected,"image","icon://fa-rebel");}
        else{setProperty(Selected,"image","icon://fa-empire");}
      } else {
        setProperty(Selected,"image","icon://fa-circle");
      }
      setProperty(Selected,"icon-color",(Checker.Color==="Black"?rgb(0,0,0):rgb(255,255,255)));

      removeItem(this[Checker.Color+"List"],Index);
      insertItem(this[Checker.Color+"List"],Index,Selected);

      Index=false;
      Selected=false;
      this[Checker.Color+"Turn"]=0;
      this[Checker.Other+"Turn"]=1;
      checkForEndGame();
    }
  }

  // Update turn label
  if(BlackTurn===1){
    hideElement("WhiteTurn");
    showElement("BlackTurn");
  } else if(WhiteTurn===1){
    hideElement("BlackTurn");
    showElement("WhiteTurn");
  }
}

function checkForEndGame(){
  if(BlackDead===12 || WhiteDead===12){
    endGame((BlackDead===12)?"White":"Black");
    return;
  }
  var whiteBlocked=0;
  for(var i=0; i<WhiteList.length; i++){
    var wRow=parseInt(WhiteList[i][0]);
    var wCol=parseInt(WhiteList[i][5]);
    if(isPieceBlocked(wRow,wCol,"White")){ whiteBlocked++; }
  }
  if(whiteBlocked===WhiteList.length){
    endGame("Black");
    return;
  }

  var blackBlocked=0;
  for(var j=0;j<BlackList.length;j++){
    var bRow=parseInt(BlackList[j][0]);
    var bCol=parseInt(BlackList[j][5]);
    if(isPieceBlocked(bRow,bCol,"Black")){ blackBlocked++; }
  }
  if(blackBlocked===BlackList.length){
    endGame("White");
    return;
  }
}

function endGame(winnerColor){
  playSound("assets/category_achievements/lighthearted_bonus_objective_3.mp3");
  WhiteTurn=0; 
  BlackTurn=0; 
  Selected=false;
  for(var i3=1;i3<=12;i3++){
    hideElement("WhiteDead"+i3);
    hideElement("BlackDead"+i3);
  }
  showElement("TextInputButton3");
  if(winnerColor==="Black"){
    setText("TextInputButton3","The Black Rebels won.\nClick here to play again!");
  } else {
    setText("TextInputButton3","The White Imperials won.\nClick here to play again!");
  }
  showElement("UnclickableCheckers");
}

onEvent("TextInputButton3","click",function(){
  Reset("Checkers","CheckersScreen");
});

onEvent("1Area1","click",function(){Select(1,1);});
onEvent("1Area2","click",function(){Select(1,2);});
onEvent("1Area3","click",function(){Select(1,3);});
onEvent("1Area4","click",function(){Select(1,4);});
onEvent("1Area5","click",function(){Select(1,5);});
onEvent("1Area6","click",function(){Select(1,6);});
onEvent("1Area7","click",function(){Select(1,7);});
onEvent("1Area8","click",function(){Select(1,8);});

onEvent("2Area1","click",function(){Select(2,1);});
onEvent("2Area2","click",function(){Select(2,2);});
onEvent("2Area3","click",function(){Select(2,3);});
onEvent("2Area4","click",function(){Select(2,4);});
onEvent("2Area5","click",function(){Select(2,5);});
onEvent("2Area6","click",function(){Select(2,6);});
onEvent("2Area7","click",function(){Select(2,7);});
onEvent("2Area8","click",function(){Select(2,8);});

onEvent("3Area1","click",function(){Select(3,1);});
onEvent("3Area2","click",function(){Select(3,2);});
onEvent("3Area3","click",function(){Select(3,3);});
onEvent("3Area4","click",function(){Select(3,4);});
onEvent("3Area5","click",function(){Select(3,5);});
onEvent("3Area6","click",function(){Select(3,6);});
onEvent("3Area7","click",function(){Select(3,7);});
onEvent("3Area8","click",function(){Select(3,8);});

onEvent("4Area1","click",function(){Select(4,1);});
onEvent("4Area2","click",function(){Select(4,2);});
onEvent("4Area3","click",function(){Select(4,3);});
onEvent("4Area4","click",function(){Select(4,4);});
onEvent("4Area5","click",function(){Select(4,5);});
onEvent("4Area6","click",function(){Select(4,6);});
onEvent("4Area7","click",function(){Select(4,7);});
onEvent("4Area8","click",function(){Select(4,8);});

onEvent("5Area1","click",function(){Select(5,1);});
onEvent("5Area2","click",function(){Select(5,2);});
onEvent("5Area3","click",function(){Select(5,3);});
onEvent("5Area4","click",function(){Select(5,4);});
onEvent("5Area5","click",function(){Select(5,5);});
onEvent("5Area6","click",function(){Select(5,6);});
onEvent("5Area7","click",function(){Select(5,7);});
onEvent("5Area8","click",function(){Select(5,8);});

onEvent("6Area1","click",function(){Select(6,1);});
onEvent("6Area2","click",function(){Select(6,2);});
onEvent("6Area3","click",function(){Select(6,3);});
onEvent("6Area4","click",function(){Select(6,4);});
onEvent("6Area5","click",function(){Select(6,5);});
onEvent("6Area6","click",function(){Select(6,6);});
onEvent("6Area7","click",function(){Select(6,7);});
onEvent("6Area8","click",function(){Select(6,8);});

onEvent("7Area1","click",function(){Select(7,1);});
onEvent("7Area2","click",function(){Select(7,2);});
onEvent("7Area3","click",function(){Select(7,3);});
onEvent("7Area4","click",function(){Select(7,4);});
onEvent("7Area5","click",function(){Select(7,5);});
onEvent("7Area6","click",function(){Select(7,6);});
onEvent("7Area7","click",function(){Select(7,7);});
onEvent("7Area8","click",function(){Select(7,8);});

onEvent("8Area1","click",function(){Select(8,1);});
onEvent("8Area2","click",function(){Select(8,2);});
onEvent("8Area3","click",function(){Select(8,3);});
onEvent("8Area4","click",function(){Select(8,4);});
onEvent("8Area5","click",function(){Select(8,5);});
onEvent("8Area6","click",function(){Select(8,6);});
onEvent("8Area7","click",function(){Select(8,7);});
onEvent("8Area8","click",function(){Select(8,8);});