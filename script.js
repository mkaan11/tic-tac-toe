class displayManager {

    static FetchBoard() {
            document.querySelectorAll('[data-squareNumber]').forEach(square => {
                let currentNumber = square.getAttribute('data-squareNumber');
                square.textContent = gameManager.currentGameboard[currentNumber];
            });



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

    static get currentGameboard() {
        const board = this.#gameboard;
        return board;

    }


}
