let doors =[];

//grabs the games and doors and begins running the sim, defaults to 100 games and doors
document.getElementById("simulateNoSwapBtn").addEventListener("click", function(event) {
    handleButtonClick(event, false);
});
document.getElementById("simulateSwapBtn").addEventListener("click", function(event) {
    handleButtonClick(event, true);
});

function handleButtonClick(event, shouldSwap) {
    let games = setGames();
    let numberOfDoors = setDoors();
    playMultipleGames(event, shouldSwap, games, numberOfDoors);
}

// randomizes the numbers behind the doors
function shuffleDoors(array = doors) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    doors = array;
}

function pickRandomDoor(doorOptions = doors.length) {
    return doors[Math.floor(Math.random()*doorOptions)];
}

function playMontyHall(swap = false) {
    // shuffleDoors(); removed for optimization, create checkbox to enable door shuffling for even more randomization?

    //if player picked number 2, and player did not swap, returns true (win), if player did not pick 2, return true(win) if they swapped
    if (pickRandomDoor() == 2) {
        return !swap;
    } else return swap;
}

function playMultipleGames(event, swap = false, gamesNumber = 100, numberOfDoors = 100) {
    initializeDoors(numberOfDoors);
    let multipleGamesResult = [];
    for (let i = 0; i < gamesNumber; i++) {
        if (playMontyHall(swap)) {
            multipleGamesResult.push(true);
        } else {
            multipleGamesResult.push(false);
        }
    }
    return determineResults(multipleGamesResult, gamesNumber, numberOfDoors);
}

function determineResults(array, gamesNumber, numberOfDoors){
    let wins = 0;
    let losses = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] == true) {
            wins++;
        } else {
            losses++;
        }
    }
    return displayResults([wins, losses], gamesNumber, numberOfDoors)
}

function displayResults(array, gamesNumber, numberOfDoors) {
    let peepee = document.getElementById("simulationResults");
    peepee.textContent="";

    let resultsString = document.createTextNode(`out of ${gamesNumber} simulated games with ${numberOfDoors} doors, the computer won ${array[0]} times and lost ${array[1]} times`);
    peepee.appendChild(resultsString);
    return array
}

function initializeDoors(numberOfDoors) {
    // optimiziation to recreate doors if they have changed, rather than recreating the same number of doors every game regardless
    if (doors.length != numberOfDoors) {
        doors = [];
        for (let i = 0; i < numberOfDoors; i++) {
            doors.push(i+1);
        }
    }
}

function setGames() {
    // defaults games to 100 in event of error
    let games = parseInt(document.getElementById("inputHowManyGames").value);
    if(isNaN(games)){
        games = 100;
    }
    return games
}
function setDoors() {
    // defaults doors to 100 in event of error
    let doors = parseInt(document.getElementById("inputHowManyDoors").value);
    if(isNaN(doors)){
        doors = 100;
    }
    return doors
}