let boxes = document.querySelectorAll(".box");  // This gives an array of all elements having the box class
let resetbtn = document.querySelector("#reset-btn");
let winner = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {   // Player O
            box.innerText = "O";
            turnO = false;
        } else {  // Player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
            if (pos1Value === pos2Value && pos2Value === pos3Value) {
                winner.innerText = `Congratulations! The winner is ${pos1Value}`;
                disableBoxes();
                return;
            }
        }
    }

    // Check for a draw
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        winner.innerText = "It's a draw!";
        disableBoxes();
    }
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    winner.innerText = "";
}

resetbtn.addEventListener("click", resetGame);
