
class displayManager {

    static FetchBoard() {
            document.querySelectorAll('[data-squareNumber]').forEach(square => {
                let currentNumber = square.getAttribute('data-squareNumber');
                square.textContent = gameManager.currentGameboard[currentNumber];
            });
    } 

    static turnInformer() {
        //select all turn sections and delete them
        document.querySelectorAll(".playerContainer>div").forEach(turnSection => turnSection.innerHTML = "");

        const currentPlayerSection = document.querySelector(`.${player}>div`);
        currentPlayerSection.innerHTML += "<br> It's your turn!";
    }

}

class gameManager {

    static #gameboard = ["",
                        "","","",
                        "","","",
                        "","",""];


    static changeGameboard(number,symbol) {
        this.#gameboard[number] = symbol;
    }

    static setCurrentPlayer(playerName) {
        this.#gameboard[0] = playerName;

    }

    static get currentPlayer() {
        let currentPlayer = this.#gameboard[0];
        return currentPlayer;

    }

    static get currentGameboard() {
        const board = this.#gameboard;
        return board;

    }


}
