const gameBoard = (() => {
    let board = [];

    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            let cell = document.getElementById(`${i}`);
            cell.classList.add('valid');
            cell.addEventListener('click', (e) => {
                controller.makeMove(cell);
            })
        };
    }
    const getPlayerBoard = (player) => {
        let spots = [];
        board.forEach((e) => {
            if (e.player.name === player.name) {
                spots.push(board.indexOf(e));
            }
        })
        return spots;
    }
    const addToBoard = (player, location) => {
        board[location] = ({ player });
    }
    const clearBoard = () => {
        board.length = 0;
        for (let i = 0; i < 9; i++) {
            const cell = document.getElementById(`${i}`)
            cell.innerText = '';
        }
    }
    const displayBoard = () => {
        board.forEach((e) => {
            const cell = document.getElementById(`${board.indexOf(e)}`);
            if (e.player.marker !== undefined) {
                cell.innerText = e.player.marker;
            }
        })
    }
    const checkBoard = () => {
        const count = board.filter((index) => typeof(index) === 'object').length;
        return count;
    }
    return { addToBoard, createBoard, displayBoard, clearBoard, getPlayerBoard, checkBoard, board };
})();

const controller = (() => {
    const players = [];
    let currentPlayer = {};

    const winningConditions = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 4, 6], [2, 5, 8],
        [3, 4, 5,], [6, 7, 8],
    ];
    const addPlayer = (name, marker) => {
        if (players.length < 2) {
            players.push(playerFactory(name, marker))
        }
    }
    const markerSelect = () => {

    }
    const getStartingPlayer = (players) => {
        return players.marker === 'X';
    }
    const newGame = (playerMarker) => {
        addPlayer('player', 'X');
        addPlayer('opp', 'O');
        currentPlayer = players.find(getStartingPlayer);
        const i = players.indexOf(currentPlayer);
        players.splice(i, 1);
        gameBoard.clearBoard();
        gameBoard.createBoard();
    }
    const makeMove = (cell) => {
        if (cell.classList.contains('valid')) {
            const player = currentPlayer;
            player.makeMove(cell);
            gameBoard.displayBoard();
            if(gameBoard.checkBoard() === 9 && !checkWinner.currentPlayer){
                modalController.openModal('TIE');
                return;
            }
            if (checkWinner(currentPlayer)) {
                modalController.openModal(`${currentPlayer.name} wins!`);
                return;
            }
            players.unshift(player);
            currentPlayer = players.pop();
            cell.classList.remove('valid');
        }
    }
    const checkWinner = (player) => {
        let result = false;
        const boardToCheck = gameBoard.getPlayerBoard(player);
        winningConditions.forEach(element => {
            if (element.every(set => boardToCheck.includes(set))) {
                result = true;
                return result;
            }
        })
        return result;
    }
    return { addPlayer, makeMove, newGame };
})();

const playerFactory = (name, marker) => {
    const makeMove = (cell) => {
        gameBoard.addToBoard({ name: name, marker: marker }, cell.id);
    }
    return { name, marker, makeMove };
};

controller.newGame('X');

const modalController = (() => {
    const dia = document.querySelector('.end-game-modal');
    const backdrop = document.getElementById('backdrop');
    const button = document.getElementById('confirmButton');
    const modalHeader = document.querySelector('.modal-header');
    const winnerText = document.querySelector('.winner-message');

    button.addEventListener("click", () => {
        modalController.submitModal();
    });

    const openModal = (winMessage) => {
        winnerText.textContent = `${winMessage}`;
        dia.classList.remove('inactive');
        dia.classList.add('active');
        backdrop.classList.add('active');
        backdrop.classList.remove('inactive');
        button.focus();
    }
    const submitModal = () => {
        controller.newGame();
        closeModal();
    }
    const closeModal = () => {
        dia.classList.remove('active');
        dia.classList.add('inactive');
        backdrop.classList.remove('active');
        backdrop.classList.add('inactive');
        winnerText.innerText = '';
    }
    return { openModal, closeModal, submitModal }
})();
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modalController.closeModal();
});
document.getElementById('X').addEventListener('click', (e) => {
    controller.newGame(e.target.innerText);
})
