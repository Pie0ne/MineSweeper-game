class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    
    get playerBoard () {
        return this._playerBoard;
    }
    
    flipTile (rowIndex, columnIndex)  {
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            return 'This title has already been flipped!';
        }
        else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        }
        else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTitles--;
    }
    
    getNumberOfNeighborBombs (rowIndex, columnIndex) {
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
    
    let numberOfRows = this._bombBoard.length;
    let numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    
    neighborOffsets.forEach(offset => {
        let neighborRowIndex = rowIndex + offset[0];
        let neighborColumnIndex = columnIndex + offset[1];
        
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && 
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

};


















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
        
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;  
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

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
 
printBoard(playerBoard);  







