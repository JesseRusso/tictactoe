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
    }
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
    }
    return {addToBoard, createBoard, gameDisplay, displayBoard, board, clearBoard};
})();

const controller = (() => {
    const players = [];
    //let playerMarker = 'X';
    let currentPlayer = {};

    const getPlayerMarker = (players) =>{
        return players.marker === 'X';
    }
    const setStartingPlayer = () => {
        return players.find((getPlayerMarker));
    }
    const addPlayer = (name, marker) => {
        if (players.length < 2){
            players.push(playerFactory(name, marker))
        }
    }
    const makeMove = (cell) => {
            const player = currentPlayer;
            player.makeMove(cell.id);
            gameBoard.displayBoard();
            players.unshift(player);
            currentPlayer = players.pop();
    }
    const oppMakeMove = () => {
        
    }
    const newGame = () => {
        addPlayer('player', 'O');
        addPlayer('opp', 'X');
        currentPlayer = players.find(getPlayerMarker);
        const i = players.indexOf(currentPlayer);
        players.splice(i,1);
        console.log(currentPlayer);
        gameBoard.clearBoard();
        gameBoard.createBoard();
    }
    return {players, addPlayer, makeMove, newGame, currentPlayer};
})();
const playerFactory = (name, marker) => {
    const makeMove = (cell) => {
        gameBoard.addToBoard({name: name, marker: marker}, cell)
    }
    return {name, marker, makeMove};
};

controller.newGame();