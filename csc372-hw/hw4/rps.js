"use strict";

let wins = 0;
let losses = 0;
let draws = 0;


let played = 0;

const moves = document.getElementsByClassName("move");
const retry = document.getElementById("retry");

retry.addEventListener('click', replay);

for (let i = 0; i < moves.length; i++) {
    const element = moves[i];
    element.addEventListener('click', playGame);
}

function replay(event) {
    event.currentTarget.classList.add('hidden');
    document.getElementById("comp").src = "images/question-mark.PNG";
    document.getElementById("outcome").innerHTML = "Select a move";

    played = 0;
}

function playGame(event) {

    if (played === 0) {


        const move_type = event.currentTarget.id;
        console.log(move_type);

        played = 1;

        setTimeout(() => {
            const comp_move = Math.floor(Math.random() * (3 - 1 + 1) + 1);
            console.log(comp_move);
            let game_result;

            if (comp_move === 1) {
                if (move_type === "rock") {
                    console.log("draw");
                    game_result = 0;
                }
                else if (move_type === "paper") {
                    console.log("you win");
                    game_result = 1;
                }
                else {
                    console.log("you lose");
                    game_result = -1;
                }
                document.getElementById("comp").src = "images/rock.PNG";
            } else if (comp_move === 2) {
                if (move_type === "rock") {
                    console.log("you lose");
                    game_result = -1;
                }
                else if (move_type === "paper") {
                    console.log("you draw");
                    game_result = 0;
                }
                else {
                    console.log("you win");
                    game_result = 1;
                }
                document.getElementById("comp").src = "images/paper.PNG";
            } else {
                if (move_type === "rock") {
                    console.log("you win");
                    game_result = 1;
                }
                else if (move_type === "paper") {
                    console.log("you lose");
                    game_result = -1;
                }
                else {
                    console.log("you draw");
                    game_result = 0;
                }
                document.getElementById("comp").src = "images/scissors.PNG";
            }


            if (game_result === 0) {
                document.getElementById("outcome").innerHTML = "You Draw";
                document.getElementById("draws").innerHTML = "Draws: " + ++draws;

            }
            else if (game_result === 1) {
                document.getElementById("outcome").innerHTML = "You Win!!";
                document.getElementById("wins").innerHTML = "Wins: " + ++wins;

            }
            else {
                document.getElementById("outcome").innerHTML = "You Lose";
                document.getElementById("losses").innerHTML = "Losses: " + ++losses;

            }



            document.querySelector(".hidden").classList.remove("hidden");
        }, 3000);



    }

}




