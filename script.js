
// Insures only one radio button is selected at all times
var christmasButton = document.getElementById('christmas');
var shoppingButton = document.getElementById('shopping');
var brainstormButton = document.getElementById('brainstorm');
christmasButton.addEventListener("click", function(){shoppingButton.checked = false; brainstormButton.checked = false;});
shoppingButton.addEventListener("click", function(){christmasButton.checked = false; brainstormButton.checked = false;});
brainstormButton.addEventListener("click", function(){shoppingButton.checked = false; christmasButton.checked = false;});

// Makes sure a story isn't visible until it is generated
document.getElementById('christmasStory').style.display = "none";
document.getElementById('shoppingStory').style.display = "none";
document.getElementById('brainstormStory').style.display = "none";
document.getElementById('errorMessage').style.display = "none";

// Generates a story when submit is clicked
var submit = document.getElementById('submit');

submit.addEventListener("click", function generateStory() {
    //Resets the stories to not display so that only one story is visible
    document.getElementById('christmasStory').style.display = "none";
    document.getElementById('shoppingStory').style.display = "none";
    document.getElementById('brainstormStory').style.display = "none";
    document.getElementById('errorMessage').style.display = "none";

    if (christmasButton.checked) {
        document.getElementById('christmasStory').style.display = "initial";
        insertWords("christmasStory");
    } else if (shoppingButton.checked) {
        document.getElementById('shoppingStory').style.display = "initial";
        insertWords("shoppingStory");
    } else if (brainstormButton.checked) {
        document.getElementById('brainstormStory').style.display = "initial";
        insertWords("brainstormStory");
    } else {
        document.getElementById('errorMessage').style.display = "initial";
    };
});

//Inserts words into the correct locations in the story
function insertWords(storyID) {
    // Turns input words into an array
    var nouns = document.getElementById('nounsList').value.split(', ');
    var verbs = document.getElementById('verbsList').value.split(', ');
    var adjectives = document.getElementById('adjectivesList').value.split(', ');
    var adverbs = document.getElementById('adverbsList').value.split(', ');

    // Turns the locations where words are inserted into an array
    var insertNouns = document.getElementById(storyID).getElementsByClassName('noun');
    var insertVerbs = document.getElementById(storyID).getElementsByClassName('verb');
    var insertAdjectives = document.getElementById(storyID).getElementsByClassName('adjective');
    var insertAdverbs = document.getElementById(storyID).getElementsByClassName('adverb');

    // Selects add-on words if needed
    selectAddOnWords(nouns, autoNouns);
    selectAddOnWords(verbs, autoVerbs);
    selectAddOnWords(adjectives, autoAdjectives);
    selectAddOnWords(adverbs, autoAdverbs);

    // Inserts words into their correct locations
    for (var i = 0; i < nouns.length; i++) {
        insertNouns[i].innerHTML = nouns[i];
        insertVerbs[i].innerHTML = verbs[i];
        insertAdjectives[i].innerHTML = adjectives[i];
        insertAdverbs[i].innerHTML = adverbs[i];
    };
}

// Adds words if there weren't enough words entered by the user
function selectAddOnWords(wordtype, autoWords) {
    if (wordtype.length < 4) {
        var addWords = 4 - wordtype.length;
        for (addWords; addWords > 0; addWords --) {
            var add = autoWords[Math.floor(Math.random() * autoWords.length)];
            if (wordtype.includes(add)) {
                addWords ++;
            } else if (wordtype[0] === "") {
                wordtype.splice(0, 1, add);
                addWords ++;
            } else {
                wordtype.push(add);
            }
        }
    }
}