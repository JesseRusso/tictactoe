const gameBoard = (() => {
    let board = [] ;
    const gameDisplay = document.querySelector('.game-board');

    const createBoard= () => {
        for (let i = 0; i < 9; i++){
            let cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.id = `Cell${i}`;
            gameDisplay.appendChild(cell);
            //TEMP: adds filler cell values
            board.push({mark: 'x', position: i});
        };
    }
    const addToBoard = (player, location) => {
        board.push({player, location});
        return board;
    };
    const displayBoard = () => {
        board.forEach((e) => {
            const cell = document.getElementById(`Cell${board.indexOf(e)}`);
            cell.innerText = e.mark;
        })
    };

    return {addToBoard, createBoard, gameDisplay, displayBoard};
})();

const controller = (() => {
    const players = [];
    let gameDisplay = document.querySelector('game-container');

    return {players};
})();
const playerFactory = () => {

};