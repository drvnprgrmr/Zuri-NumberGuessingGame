const fs = require("fs");
const readline = require("readline-sync");
const prompt = readline.question;

let level = 1;
let jsonData

function randInt(min, max) {
    let int = Math.floor(Math.random() * (max - min + 1)) + min;
    return int;
}

function loadUser() {
    // Get the player name from the json file and convert to an object.
    let contents = fs.readFileSync("player.json", "utf8");
    jsonData = JSON.parse(contents);
    let username = jsonData.name;

    if (username === "") {
        username = prompt("Please enter your username: ");
        console.log(`
        ================${'='.repeat(username.length)}==
          Welcome, ${username}
        ================${'='.repeat(username.length)}==
        `)
        jsonData.name = username;
        let jsonString = JSON.stringify(jsonData);

        // Save the username to 'player.json'
        fs.writeFileSync("./player.json", jsonString);
    } else {
        console.log(`
        ================${'='.repeat(username.length)}==
          Welcome back, ${username}
        ================${'='.repeat(username.length)}==
        `);
    }
}

function runGame() {
    let score = 0

    // Run the game until the user loses.
    while (true) {
        let randomNumber = randInt(1, level + 1);

        let guess = prompt(
            `Guesss a random number between 1 and ${level + 1} -> `
        );

        if (parseInt(guess) === randomNumber) {
            level += 1;
            score += 1
            continue;
        } else {
            // Check to see if the high score is beaten.
            let highScore = jsonData.highScore
            highScore = score > highScore ? score : highScore  // Assign the highest value.
            jsonData.highScore = highScore

            let jsonString = JSON.stringify(jsonData)
            fs.writeFileSync("./player.json", jsonString)

            // Ask if the user wants to play again.
            let playAgain = prompt(
                "\nYou lost!!! \nDo you want to play again [Y/n]? "
            );
            if (playAgain.toLowerCase() === "y") {
                level = 1;
            } else {

                console.log("\nThanks for playing!!!");
                console.log("Score: ", level - 1)
                console.log("High Score: ", highScore)
                break;
            }
        }
    }
}

loadUser();
runGame()
