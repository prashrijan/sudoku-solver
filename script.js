document.addEventListener("DOMContentLoaded", () => {
    function generateSudokuBoard(){
        const boardBoady = document.querySelector("#sudoku-board tbody")
        boardBoady.innerHTML = "" // clear everything in start

        for(let i = 0; i < 9; i++){
            const row = document.createElement('tr')
            for(let j = 0; j < 9; j++){
                const cell = document.createElement('td')
                const input = document.createElement('input')
                input.type = 'text'
                input.maxLength = 1
                input.dataset.row = i
                input.dataset.col = j
                cell.appendChild(input)
                row.appendChild(cell)
            }
            boardBoady.appendChild(row)
        }
    }

    

     generateSudokuBoard()
    
})

