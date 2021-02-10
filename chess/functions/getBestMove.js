import { values } from "../constants.js"

function getBestMove() {
    const { turn, getAllMoves, lastState, info, board, step, undo } = this

    let allMoves = getAllMoves(turn)
    getMovesValues.bind(this)(allMoves)

    //console.log(board, info)
    let bestMove = -9999
    let result

   /* allMoves.map(move => {
        lastState.push({ copyB: board.map(i => i.map(j => j)), copyI: info.map(i => i.map(j => j)) })
        step(move.i, move.j, move.ni, move.nj)
        console.log(board.map(i => i.map(j => j)))
        /!*let value = minmax.bind(this)(0, turn === "w" ? "b" : "w", turn)
        console.log("value", value)
        if (value >= bestMove) {
            bestMove = value
            result = move
        }*!/
        undo()
        console.log(board.map(i => i.map(j => j)))
    })*/

    return allMoves[0]
}

function getValue(board) {
    let value = 0

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j]) {
                let team = board[i][j].substr(0, 1)
                value += values[board[i][j].substr(1, 1)] * (team === "b" ? -1 : 1)
            }
        }
    }

    return value
}

function getMovesValues(moves) {
    let { board, info, step, lastState, undo } = this

    let result = []

    for (let i = 0; i < moves.length; i++) {
        lastState.push({ copyB: board.map(i => i.map(j => j)), copyI: info.map(i => i.map(j => j)) })
        step(moves[i].i, moves[i].j, moves[i].ni, moves[i].nj)
        result.push(getValue(board))
        undo()
    }


    return result
}


function minmax(depth, turn, team) {
    let { board, getAllMoves, step, undo, info, lastState } = this

    let allMoves = getAllMoves(turn)
    let movesValues = getMovesValues.bind(this)(allMoves)

    if (depth === 0) {
        return getValue(board)
    }

    let bestMove = movesValues[0]

    for (let i = 0; i < allMoves.length; i++) {
        lastState.push({ copyB: board.map(i => i.map(j => j)), copyI: info.map(i => i.map(j => j)) })
        step(allMoves[i].i, allMoves[i].j, allMoves[i].ni, allMoves[i].nj)

        if (team === turn) bestMove = Math.max(bestMove, minmax.bind(this)(depth - 1, turn === "w" ? "b" : "w", team))
        else bestMove = Math.min(bestMove, minmax.bind(this)(depth - 1, turn === "w" ? "b" : "w", team))

        undo()
    }

    return bestMove
}

export default getBestMove
