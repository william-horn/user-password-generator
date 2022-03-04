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

// prompt the user for a specified value, and a given condition function
function promptUserForInputType(inputType, message, isValidCondition) {
  var userInput = window.prompt(message)
  var isValidType

  var inputObject = {
    // value:...
    // isValidType:...
    // isValidCondition:...
    canceled: userInput === null
  }

  // validate input for number type
  if (inputType === "number") {
    userInput = parseInt(userInput)
    isValidType = !isNaN(userInput)
  }

  // assign object fields
  inputObject.isValidType = isValidType
  inputObject.value = userInput
  inputObject.isValidCondition = isValidType && isValidCondition(userInput)

  return inputObject
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

  // initialize password length var
  let passwordLengthResult

  // get input from the user until it is validated or until they exit
  while (true) {
    passwordLengthResult = promptUserForInputType(
      "number", 
      "Enter a password length (between " + minLength + " and " + maxLength + " characters)", 
      function(inputNumber) {
        return inputNumber >= minLength && inputNumber <= maxLength
      }
    )

    if (passwordLengthResult.canceled) return // user exited prompt

    // if input type is invalid (not a number)
    if (!passwordLengthResult.isValidType) {
      window.alert("Please enter a valid number")

    // if input type is valid but does not meet the condition (password length range)
    } else if (!passwordLengthResult.isValidCondition) {
      window.alert("Password length must be between " + minLength + " and " + maxLength + " characters")

    // else no other invalidations occur, break the prompt loop
    } else {
      break
    }
  }

  // list of existing password options
  let passwordOptions = [
    newPasswordOption("uppercase letters", getRandomLetterUpper),
    newPasswordOption("lowercase letters", getRandomLetterLower),
    newPasswordOption("symbols", getRandomSymbol),
    newPasswordOption("numbers", getRandomNumber),
  ]

  // an empty array where the user's selected options will be stored
  let selectedPasswordOptions = []

  // iterate over all existing password options, prompting the user for each one
  for (let i = 0; i < passwordOptions.length; i++) {
    let option = passwordOptions[i]
    let userConfirmed = window.confirm("Would you like to include " + option.name + " in your password? (Okay = Yes, Cancel = No)")

    // push option to 'selectedPasswordOptions' array if the user confirms the option
    if (userConfirmed) selectedPasswordOptions.push(option)
  }

  // if the user selected no options, choose one at random
  if (selectedPasswordOptions.length === 0) {
    let randomOption = getRandomIndex(passwordOptions)
    window.alert("No specifications were given. Generating password with: " + randomOption.name)
    selectedPasswordOptions.push(randomOption)
  }

  // password generation
  let passwordBuffer = ""
  for (let i = 0; i < passwordLengthResult.value; i++) {
    passwordBuffer += getRandomIndex(selectedPasswordOptions).generate()
  }

  // return password
  return passwordBuffer
}

// Write password to the #password input
function writePassword() {
  let password = generatePassword(8, 128);
  let passwordText = document.querySelector("#password");

  if (password) passwordText.value = password;
}

// get generate button from the HTML
let generateBtn = document.querySelector("#generate");

// add "click" event to the generate button
generateBtn.addEventListener("click", writePassword);