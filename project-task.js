/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.


Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];

function addAnimal(name, fee) {
    
    if (!name || fee <= 0) {
        throw new Error("Invalid animal name and adoption fee!");
    }
    animals.push(name);
    fees.push(fee);
}

function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
}

// Main program
console.log("Welcome to the Pet Shelter System");
while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }
    
    if (action === "add") {
        try { //Added the try block when the user type "add".
        let animal = readlineSync.question("Enter the animal's name: ");
        let fee = Number(readlineSync.question("Enter the adoption fee: "));
        addAnimal(animal, fee);
        console.log(`${animal} added with a fee of $${fee}.`);}
        catch(err){ // It catches the error which is thrown under function addAnimal(name, fee) 
            console.error("Custom Error:", err.message);
        }

    } else if (action === "fee") {
        try { //Added the try block when the user type "fee".
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
        console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
        }
        catch (err){ // It catches the error which is thrown under function getAdoptionFee(animalName) 
            console.log("Custom Error:", err.message);
        }

    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }

}


/*
Problems to Solve

My Observation:
In the application, when I type the add option and enter an animal with a fee less than or equal to 0, 
or leave the animal name blank (or both), the program halts abruptly. 

Similarly, under the fee option, if I enter the name of an animal that is not present in the records, 
the application also stops unexpectedly.

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?
  It throws the error and try/catch block capture the error, and print the message "Custom Error:Invalid animal name and adoption fee!"
  What happens if the user tries to find the fee for an animal that hasn’t been added?
  It throws the error and try/catch block capture the error, and print the message "Custom Error:Animal not found in records!"
Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?
  Yes, It prompts the user to enter the option like add,fee, & exit. so that the user can continue to run the application.

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
