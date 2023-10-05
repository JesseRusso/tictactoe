const gameBoard = (() => {
    let board = [] ;

    const createBoard= () => {
        for (let i = 0; i < 9; i++){
            let cell = document.getElementById(`${i}`);
            cell.classList.add('valid');
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
    return {addToBoard, createBoard, displayBoard, clearBoard};
})();

const controller = (() => {
    const players = [];
    let currentPlayer = {};

    const getStartingPlayer = (players) =>{
        return players.marker === 'X';
    }
    const addPlayer = (name, marker) => {
        if (players.length < 2){
            players.push(playerFactory(name, marker))
        }
    }
    const makeMove = (cell) => {
            const player = currentPlayer;
            player.makeMove(cell);
            gameBoard.displayBoard();
            players.unshift(player);
            currentPlayer = players.pop();
    }
    const oppMakeMove = () => {
        
    }
    const newGame = () => {
        addPlayer('player', 'X');
        addPlayer('opp', 'O');
        currentPlayer = players.find(getStartingPlayer);
        const i = players.indexOf(currentPlayer);
        players.splice(i,1);
        gameBoard.clearBoard();
        gameBoard.createBoard();
    }
    return {addPlayer, makeMove, newGame};
})();
const playerFactory = (name, marker) => {
    const makeMove = (cell) => {
        console.log(cell);
        if (cell.classList.contains('valid')){
            gameBoard.addToBoard({name: name, marker: marker}, cell.id);
            cell.classList.remove('valid');
        }
    }
    return {name, marker, makeMove};
};

controller.newGame();