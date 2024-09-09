document.addEventListener("DOMContentLoaded", () => {
    const result = document.querySelector('.result')
    const solveBtn = document.querySelector(".solve-btn")
    const resetBtn = document.querySelector('.reset-btn')

    function generateSudokuBoard(){
        const boardBoady = document.querySelector("#sudoku-board tbody")
        boardBoady.innerHTML = "" // clear everything in start
        resetBtn.style.display = "none"
        solveBtn.style.display = "block"
        result.innerHTML = "";
        
        for(let i = 0; i < 9; i++){
            const row = document.createElement('tr')
            for(let j = 0; j < 9; j++){
                const cell = document.createElement('td')
                const input = document.createElement('input')
                input.type = 'text'
                input.maxLength = 1
                input.dataset.row = i
                input.dataset.col = j
                input.style.color = "#000"
                cell.appendChild(input)
                row.appendChild(cell)
            }
            boardBoady.appendChild(row)
        }
    }
    

    function solveSudoku(){
        const board = Array.from({length : 9}, () => (Array(9).fill(0)))
        const inputs = document.querySelectorAll('#sudoku-board input')

        // Getting the user inputed value in respected row and column and setting it into the board row and column
        inputs.forEach(input => {
            const row = parseInt(input.getAttribute('data-row'))
            const col = parseInt(input.getAttribute('data-col'))
            const value = parseInt(input.value) || 0

            board[row][col] = value 
            // marks the user input
            if(value !== 0){
                input.setAttribute('data-user-input', 'true')
            }
        });


        // Once the sudoku is solved displaying the output
        if(helper(board, 0, 0)){
            inputs.forEach(input => {
                const row = parseInt(input.getAttribute('data-row'))
                const col = parseInt(input.getAttribute('data-col'))
                input.value = board[row][col] || ""
                
                // generated numbers
                if(input.getAttribute('data-user-input') !== true){
                    input.style.color = "#5cb85c"
                }
            })
            result.innerHTML = "The Sudoku is solved!!!"
            solveBtn.style.display = "none"
            resetBtn.style.display = "block"
        }else{
            result.innerHTML = "Oops! I guess the solution doesnot exist for this board :("
        }
    }


    function helper(board, row, col){
        
        // Defining the next row and col for recursion
        let nrow = 0; 
        let ncol = 0; 

        // if we are not in the last column in a row we move +1 to the next column
        if(col !== board.length - 1){
            nrow = row;
            ncol = col + 1;
        }
        // if we are in the last column we move to the next row and first column
        else{
            nrow = row + 1
            ncol = 0;
        }

        // when the row is greater than the board length we have checked all the rows (base case)
        if(row === board.length){
            return true
        }

        // check if there is a number in the cell or not
        if(board[row][col] !== 0){
            return helper(board, nrow, ncol)
        }
        // if the cell is empty loop through and enter the number from 1 to 9
        else{
            for(let i = 1; i <= 9; i++){
                // check if the number is valid to keep in the cell
                if(isSafe(board, row, col, i)){
                    board[row][col] = i

                    // check the next row or col 
                    if(helper(board, nrow, ncol)){
                        return true
                    }

                    // if the helper function returns false make that cell to 0 
                    board[row][col] = 0; 
                }
            }
            return false
        }
    }


    function isSafe(board, row, col, numToCheck){

        // checks in row
        for(let r = 0; r < 9; r++){
            if(board[r][col] === numToCheck){
                return false
            }
        }

        // checks in column
        for(let c = 0; c < 9; c++){
            if(board[row][c] === numToCheck){
                return false
            }
        }

        //checks in the 3x3 subgrid

        let subRow = Math.floor(row / 3) * 3
        let subCol = Math.floor(col / 3) * 3

        for(let i = subRow; i < subRow+3; i++){
            for(let j = subCol; j < subCol+3; j++){
                if(board[i][j] === numToCheck){
                    return false
                }
            }
        }



        // if everything passes return true
        return true
    }

    generateSudokuBoard()
    
    solveBtn.addEventListener("click", solveSudoku)
    resetBtn.addEventListener("click", generateSudokuBoard)
})




