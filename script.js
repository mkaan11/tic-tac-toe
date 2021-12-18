const squares = document.querySelectorAll('.square');


class displayManager {

    static FetchBoard() {
            squares.forEach(square => {
                let currentNumber = square.getAttribute('data-squareNumber');
                square.textContent = gameManager.currentGameboard[currentNumber];
            });
    } 

    static #resetSections() {
        const turnSections = document.querySelectorAll(".playerSection");
        turnSections.forEach(turnSection => turnSection.innerHTML = "");


    }


    static turnInformer() {
        this.#resetSections();

        let currentPlayerSection = document.querySelector(`.${gameManager.currentPlayer}`);
        currentPlayerSection.innerHTML = "It's your turn!";
    }

    static winnerTeller() {
        this.#resetSections();

        let currentPlayerSection = document.querySelector(`.${gameManager.currentPlayer}`);
        currentPlayerSection.innerHTML += "<br> You Won!";

    }

    static gameOverDisplay() {
        const gameOverField = document.getElementById('GameOver');
        gameOverField.innerText = "Game Over!";

    }
    
    static sectionReset() {
        const gameOverField = document.getElementById('GameOver');
        gameOverField.innerText = "";

        this.#resetSections();

        displayManager.FetchBoard();

    }

    static enableButton() {
        document.querySelector('.button').style = "display: block";

    }
    
    static disableButton() {
        document.querySelector('.button').style = "display: none";


    }

}


class gameManager {

    static #gameboard = ["player1",
                        "","","",
                        "","","",
                        "","",""];


    static changeGameboard(number,symbol) {
        this.#gameboard[number] = symbol;
    }

    static get currentPlayer() {
        const currentPlayer = this.#gameboard[0];
        return currentPlayer;

    }

    static changeCurrentPlayer() {
        if (this.#gameboard[0] == "player1") {
            this.#gameboard[0] = "player2"
        } else if(this.#gameboard[0] == "player2") {
            this.#gameboard[0] = "player1"
        }

    }


    static get currentGameboard() {
        const board = this.#gameboard;
        return board;

    }

    static get currentSymbol() {
        if(this.currentPlayer == "player1") {
            return "X";
        } else if (this.currentPlayer == "player2") {
            return "O";
        }

    }
    static squareBoardChanger(e) {
        let currentNumber = e.target.getAttribute('data-squareNumber');
        gameManager.changeGameboard(currentNumber, gameManager.currentSymbol);
        displayManager.FetchBoard();
        let ifVictory = gameManager.checkForVictory();
        if (ifVictory == "true")  {
            gameManager.gameOverAction();
        } else {
            gameManager.changeCurrentPlayer(); 
            displayManager.turnInformer();

        }

    }

    static addSquareListeners() {
        squares.forEach(square => square.addEventListener('click', gameManager.squareBoardChanger));

    }

    static removeSquareListeners() {
        squares.forEach(square => square.removeEventListener('click', gameManager.squareBoardChanger));
    }

    static checkForVictory() {
        let symbol = gameManager.currentSymbol;
        if (symbol == this.#gameboard[1] && symbol == this.#gameboard[4] && symbol == this.#gameboard[7]) {
            return "true";
        } else if (symbol == this.#gameboard[2] && symbol == this.#gameboard[5] && symbol == this.#gameboard[8]) {
            return "true"; 
        } else if (symbol == this.#gameboard[3] && symbol == this.#gameboard[6] && symbol == this.#gameboard[9]) {
            return "true";
        } else if (symbol == this.#gameboard[1] && symbol == this.#gameboard[2] && symbol == this.#gameboard[3]) {
            return "true";
        } else if (symbol == this.#gameboard[4] && symbol == this.#gameboard[5] && symbol == this.#gameboard[6]) {
            return "true";
        } else if (symbol == this.#gameboard[7] && symbol == this.#gameboard[8] && symbol == this.#gameboard[9]) {
            return "true";
        } else if (symbol == this.#gameboard[1] && symbol == this.#gameboard[5] && symbol == this.#gameboard[9]) {
            return "true";
        } else if (symbol == this.#gameboard[3] && symbol == this.#gameboard[5] && symbol == this.#gameboard[7]) {
            return "true";
        } else {
            return "false";
        }

    }
    static gameOverAction() {
        displayManager.enableButton();
        displayManager.gameOverDisplay();
        gameManager.removeSquareListeners();

    }

    static resetAll() {
    gameManager.changeGameboard(1,"");
    gameManager.changeGameboard(2,"");
    gameManager.changeGameboard(3,"");
    gameManager.changeGameboard(4,"");
    gameManager.changeGameboard(5,"");
    gameManager.changeGameboard(6,"");
    gameManager.changeGameboard(7,"");
    gameManager.changeGameboard(8,"");
    gameManager.changeGameboard(9,"");
    
    displayManager.sectionReset();
    gameManager.removeSquareListeners();
    gameManager.addSquareListeners();
    displayManager.turnInformer();

    }
}

gameManager.addSquareListeners();

displayManager.disableButton();
document.querySelector('.button').addEventListener('click', () => {
    displayManager.disableButton();
    gameManager.resetAll();
})

