import puzzles from './puzzles'

const BOARD_SIZE = 9


class SudokuCell {

    constructor({ value }) {

        this.editable = value === '.'
        this.value = this.editable ? '' : value
        this.selected = false
        this.pencil = ''

    }

    updateValue(value) {
        if(!this.editable) return

        if(this.value.includes(value)) {
            // remove the value
            this.value = this.value.split('').filter(v => v !== value).join('')

        } else {
            this.value = [...this.value.split(''), value].sort().join('')
        }
        
    }

    updatePencil(value) {
        if(!this.editable) return

        if(this.pencil.includes(value)) {
            // remove the value
            this.pencil = this.pencil.split('').filter(v => v !== value).join('')
        } else {
            this.pencil = [...this.pencil.split(''), value].sort().join('')
        }
    }

    clearValue() {
        if(!this.editable) return
        this.value = ''
    }

    clearPencil() {
        if(!this.editable) return
        this.pencil = ''
    }

    pencilAsBlock() {
        let rows = Array(3).fill('')
        let map = ['123','456','789']
        map.forEach( (m, i) => {
            [...m].forEach( v => {
                rows[i] += this.pencil.includes(v) ? v : ' '
            })
        })
        return rows
    }

}

class SudokuPuzzle {


    constructor(string, id) {
        // split the puzzle into 
        this.cells = string.match(/./g).map( createCell )
        this.board = Array(BOARD_SIZE).fill([]).map( () => Array(BOARD_SIZE))

        // loop through each cell setting it's row/col
        this.cells.forEach( (c, i) => {
            c.row = i % BOARD_SIZE
            c.col = Math.floor(i / BOARD_SIZE)
            this.board[c.row][c.col] = c
        })

        this.id = id

    }

    clearSelected() {
        this.cells.forEach( c => c.selected = false)
    }

    getSelected() {
        return this.cells.filter( c => c.selected)
    }

}

function createCell(value) {
    return new SudokuCell({ value })
}


function fromPuzzleString(puzzle, id) {

    return new SudokuPuzzle(puzzle, id)
    /* 
    // split the puzzle into 
    let rows = puzzle.match(/.{9}/g)
    let grid = rows.map( row => {
    let cells = row.match(/./g).map( createCell )
        return cells
    })

    grid.id = id
    return grid
    */

}

function randomPuzzle() {

    // pick a random one
    let index = Math.floor(
        Math.random() * puzzles.length
    )

    let board = fromPuzzleString(puzzles[index], index + 1)
    return board


}

function fromPuzzleNumber(pn) {
    let index = (Math.floor(pn - 1) ) % puzzles.length

    let board = fromPuzzleString(puzzles[index], index + 1)
    return board
}

function isValidPuzzleString(board) {
    return typeof board === 'string' &&
        board.match(/[.0-9]{81}/)
}


export {
    fromPuzzleString,
    randomPuzzle,
    fromPuzzleNumber,
    isValidPuzzleString
}