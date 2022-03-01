/*
  ? @document-start
  ======================
  | PASSWORD GENERATOR |
  ==================================================================================================================================

  ? @author:                 William J. Horn
  ? @document-name:          script.js
  ? @document-created:       03/01/2022
  ? @document-modified:      03/01/2022
  ? @document-version:       v1.0.0

  ==================================================================================================================================

  ? @document-info
  ==================
  | ABOUT DOCUMENT |
  ==================================================================================================================================

  This program will generate a random password string based on what to include in the password given by the user.

  ==================================================================================================================================
*/

/* ----------------- */
/* Utility Functions */
/* ----------------- */

// return a random integer ranging from min to max
function randomInt(min, max) {
  // if 'max' is not defined, assume we want range from 0 to min
  if (!max) {
    max = min
    min = 0
  }

  // interpolate random value
  var rand = Math.random()
  return Math.floor(min*(1 - rand) + rand*max)
}

// return a random entry from a list
function getRandomIndex(list) {
  return list[randomInt(list.length)]
}

// prompt the user for an integer value, return input object
function promptUserForInt(message) {
  var userInput = window.prompt(message)
  var number = parseInt(userInput)

  return userInput === null ? null : {
    isValidType: !isNaN(number),
    value: number
  }
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword(8, 128);
  var passwordText = document.querySelector("#password");

  if (password) passwordText.value = password;
}

// get generate button from the HTML
var generateBtn = document.querySelector("#generate");

// add "click" event to the generate button
generateBtn.addEventListener("click", writePassword);