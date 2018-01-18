const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let row = [];
        
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            row.push(null);
        }
        board.push(row);
    }
    let numberOfBombsPlaced = 0;
    
    while(numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        
        if (board.randomRowIndex !== 'B' && board.randomColumnIndex !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;  
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    let neighborOffsets = [
        [-1, 1], 
        [-1, 0], 
        [-1, 1], 
        [0, -1], 
        [0, 1], 
        [1, -1], 
        [1, 0], 
        [1,1]
    ];
    
    let numberOfRows = bombBoard.length;
    let numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    
    neighborOffsets.forEach(offset => {
        let neighborRowIndex = rowIndex + offset[0];
        let neighborColumnIndex = columnIndex + offset[1];
        
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && 
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if (bombBoard[neighborRowIndex[neighborColumnIndex] === 'B']) {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] !== '') {
        return 'This title has already been flipped!';
    }
    else if (bombBoard[rowIndex][columnIndex] === 'B') {
        return playerBoard[rowIndex][columnIndex];
    }
    else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, 
        rowIndex, columnIndex);
    }
};











const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n')); 
};    

const playerBoard = generatePlayerBoard(3,4); 
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);








