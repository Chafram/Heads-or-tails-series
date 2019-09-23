//function that calculates the probability that a substring of coin flips (1)
//happens BEFORE an another substring of coin flips(2)
function headsTailsSubStrings(subString1, subString2)
{
    var length1 = subString1.length;
    var length2 = subString2.length;
    var minLength = Math.min(length1, length2);
    var numberOfTests = 1000;
    var numbersOfString1 = 0;
    var numbersOfString2 = 0;

    //function that generates the initial coin flips (smallest length of the two substrings)
    function firstFlips() {
        var firstFlipsString = "";
        for (var i = 0; i < minLength; i++) {
            firstFlipsString += getFlipValue();
        }
        //console.log(firstFlipsString)
        return (firstFlipsString);
    }

    //function that decides if the next flip is heads or tails
    function getFlipValue() {
        var flipValue = "not flipped yet";
        var flip = Math.floor(Math.random() * 2);
        if (flip == 0)
            flipValue = "H";
        else
            flipValue = "T";
        return flipValue;
    }

    //function that compares both substrings to the last coin flips of the test
    function checkSubStrings(flipString) {
        var lastSubString1 = getLastSubString(flipString, length1);
        var lastSubString2 = getLastSubString(flipString, length2);

        //if substrings 1 and 2 occur at the same time, the point goes to substring 2
        if (lastSubString2 == subString2)
            return 2;
        else if (lastSubString1 == subString1)
            return 1;
        else
            return 0
    }

    //function that returns the last coin flips depending on the length of the substring it compares to
    function getLastSubString(flipString, length) {
        var lastSubString = "";

        for (var i = 0; i < length; i++) {
            var value = flipString[flipString.length - length + i];
            lastSubString += value;
        }
        return lastSubString;
    }

    //function that adds a new coin flip to the test after the initial flips
    function addFlip(flipString) {
        newValue = getFlipValue();
        flipString += newValue;
        //console.log(flipString);
        return flipString;
    }

    //actual test function
    for (var n = 1; n <= numberOfTests; n++) {
        //console.log(n);
        var flipString = firstFlips();
        var result = checkSubStrings(flipString);
        while (result == 0) {
            newFlipString = addFlip(flipString);
            result = checkSubStrings(newFlipString);
            flipString = newFlipString;
        }
        if (result == 1)
            numbersOfString1++;
        if (result == 2)
            numbersOfString2++;
        //console.log("Première sous-suite: " + numbersOfString1);
        //console.log("Deuxième sous-suite: " + numbersOfString2);
    }

    firstStringPercentage = numbersOfString1 / numberOfTests * 100;
    secondStringPercentage = numbersOfString2 / numberOfTests * 100;

    console.log(subString1 + ": " + firstStringPercentage.toFixed(1) + "%");
    console.log(subString2 + ": " + secondStringPercentage.toFixed(1) + "%");
}
headsTailsSubStrings("HTT", "TTH");      