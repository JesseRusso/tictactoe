const gameBoard = (() => {
    let board = [] ;
    const gameDisplay = document.querySelector('.game-board');

    const createBoard= () => {
        for (let i = 0; i < 9; i++){
            //let cell = document.createElement('div');
            //cell.classList.add('game-cell');
            //cell.id = `Cell${i}`;
            //gameDisplay.appendChild(cell);
            //TEMP: adds filler cell values
            //board.push({player: {name: 'jesse', marker: 'x'}, position: i});
        };
    }
    const addToBoard = (player, location) => {
        board[location] = ({player});
    };
    const clearBoard = () => {
        board.length = 0;
        for (let i = 0; i < 9; i++){
            const cell = document.getElementById(`${i}`)
            cell.innerText = '';
        }
    }
    const displayBoard = () => {
        board.forEach((e) => {
            const cell = document.getElementById(`${board.indexOf(e)}`);
                if (e.player.marker != undefined){
                    cell.innerText = e.player.marker;
                }
        })
    };
    return {addToBoard, createBoard, gameDisplay, displayBoard, board, clearBoard};
})();

const controller = (() => {
    const players = [];
    const currentPlayer = null;
    let gameDisplay = document.querySelector('game-container');

    const addPlayer = (name, marker) => {
        if (players.length < 2){
            players.push(playerFactory(name, marker))
        }
    }
    const makeMove = (player, cell) => {
        gameBoard.addToBoard(player, cell)
        gameBoard.displayBoard();
    }
    return {players, addPlayer, makeMove};
})();
const playerFactory = (name, marker) => {
    return {name, marker};
};