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

/* ------------ */
/* Constructors */
/* ------------ */

// create a new passwordOption object
function newPasswordOption(name, generator) {
  return {
    name: name,
    generate: generator,
  }
}

/* ------------------- */
/* Password Generation */
/* ------------------- */

// generate special characters at random from ASCII code
function getRandomSymbol() {
  return String.fromCharCode(randomInt(33, 47))
}

// generate random number characters from ASCII code
function getRandomNumber() {
  return String.fromCharCode(randomInt(48, 57))
}

// generate random lower-case letters from ASCII code
function getRandomLetterLower() {
  return String.fromCharCode(randomInt(97, 122))
}

// generate random upper-case letter by invoking 'getRandomLetterLower()' and converting to upper
function getRandomLetterUpper() {
  return getRandomLetterLower().toUpperCase()
}

/*
  generatePassword([int] minLength, [int] maxLength)
  returns: [string] password

  @param minLength
    represents the minimum password length
  @param maxLength
    represents the maximum password length

  Generate a random sequence of characters based on what the user wishes to include.
  If the user does not add any password options other than password length, the function
  will select a random set of characters to generate.
*/
function generatePassword(minLength, maxLength) {

  // get password length input from user
  var passwordLength = promptUserForInt("Enter a password length (between " + minLength + " and " + maxLength + " characters)")

  // user exited the prompt
  if (passwordLength === null) return

  // handle when the user's input is not valid (if it is not a number)
  if (!passwordLength.isValidType) {
    window.alert("Please enter a valid number")
    return generatePassword() // tail call

  // handle when the user's input is outside of password length range
  } else if (passwordLength.value < minLength || passwordLength.value > maxLength) {
    window.alert("Password length must be within 7 and 128 characters")
    return generatePassword() // tail call
  }

  // list of existing password options
  var passwordOptions = [
    newPasswordOption("uppercase letters", getRandomLetterUpper),
    newPasswordOption("lowercase letters", getRandomLetterLower),
    newPasswordOption("symbols", getRandomSymbol),
    newPasswordOption("numbers", getRandomNumber),
  ]

  // an empty array where the user's selected options will be stored
  var selectedPasswordOptions = []

  // iterate over all existing password options, prompting the user for each one
  for (var i = 0; i < passwordOptions.length; i++) {
    var option = passwordOptions[i]
    var userConfirmed = window.confirm("Would you like to include " + option.name + " in your password? (Okay = Yes, Cancel = No)")

    // push option to 'selectedPasswordOptions' array if the user confirms the option
    if (userConfirmed) selectedPasswordOptions.push(option)
  }

  // if the user selected no options, choose one at random
  if (selectedPasswordOptions.length === 0) {
    var randomOption = getRandomIndex(passwordOptions)
    window.alert("No specifications were given. Generating password with: " + randomOption.name)
    selectedPasswordOptions.push(randomOption)
  }

  // password generation
  var passwordBuffer = ""
  for (var i = 0; i < passwordLength.value; i++) {
    passwordBuffer += getRandomIndex(selectedPasswordOptions).generate()
  }

  // return password
  return passwordBuffer
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