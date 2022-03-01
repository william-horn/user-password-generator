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