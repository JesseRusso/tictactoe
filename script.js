const gameBoard = (() => {
    let board = [] ;
    const gameDisplay = document.querySelector('.game-board');

    const createBoard= () => {
        for (let i = 0; i < 9; i++){
            let cell = document.getElementById(`${i}`);
            cell.addEventListener('click', (e) => {
                controller.makeMove(cell);
            })
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
                if (e.player.marker !== undefined){
                    cell.innerText = e.player.marker;
                }
        })
    };
    return {addToBoard, createBoard, gameDisplay, displayBoard, board, clearBoard};
})();

const controller = (() => {
    const players = [];
    //let currentPlayer = {};
    let currentPlayer = players.find((element) => element.marker = 'X');

    const addPlayer = (name, marker) => {
        if (players.length < 2){
            players.push(playerFactory(name, marker))
        }
    }
    const makeMove = (cell) => {
        //if (player[1] === currentPlayer){
            const player = players.pop();
            gameBoard.addToBoard(player, cell.id);
            gameBoard.displayBoard();
            players.unshift(player);
       // }
    }
    const oppMakeMove = () => {
        
    }
    return {players, addPlayer, makeMove, currentPlayer};
})();
const playerFactory = (name, marker) => {
    return {name, marker};
};

gameBoard.createBoard();
controller.addPlayer('player', 'X');
controller.addPlayer('opp', 'O');