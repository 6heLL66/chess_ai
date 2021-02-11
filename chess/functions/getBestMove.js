import {positions, values} from "../constants.js"
import isCheck from "./isCheck.js"

function getBestMove() {
    const { getAllMoves, step, undo, lastState } = this

    let allMoves = getAllMoves(this.turn)

    let bestMove = 9999 * (this.turn === "b" ? 1 : -1)
    let result


    allMoves.map(move => {
        lastState.push({
            copyB: this.board.map(i => i.map(j => j)),
            copyI: this.info.map(i => i.map(j => {
                return j ? {...j} : null
            }))
        })
        step(move.i, move.j, move.ni, move.nj, move.type)

        let value = minmax.bind(this)(3, this.turn === "w" ? "b" : "w", this.turn, -9999, 9999)

        if (((this.turn === "w" && value >= bestMove) || (this.turn === "b" && value <= bestMove))
            && !isCheck(this.board, this.info, this.turn)) {
            bestMove = value
            result = move
        }

        undo()
    })

    return result
}

function getValue(board) {
    let value = 0

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j]) {
                let team = board[i][j].substr(0, 1)
                value += (values[board[i][j].substr(1, 1)] + positions[board[i][j]][i][j] ) * (team === "b" ? -1 : 1)
            }
        }
    }

    return value
}


function minmax(depth, turn, team, alpha, beta) {
    let { getAllMoves, step, undo, lastState } = this

    if (depth === 0) {
        return getValue(this.board)
    }

    let allMoves = getAllMoves(turn)

    let bestMove
    if ((team === turn && team === "w") || (team !== turn && team === "b")) {
        bestMove = -9999
    }
    else bestMove = 9999

    for (let i = 0; i < allMoves.length; i++) {
        lastState.push({
            copyB: this.board.map(i => i.map(j => j)),
            copyI: this.info.map(i => i.map(j => {
                return j ? {...j} : null
            }))
        })
        step(allMoves[i].i, allMoves[i].j, allMoves[i].ni, allMoves[i].nj, allMoves[i].type, true)

        if ((team === turn && team === "w") || (team !== turn && team === "b")) {
            bestMove = Math.max(bestMove, minmax.bind(this)(depth - 1, turn === "w" ? "b" : "w", team, alpha, beta))
        }
        else {
            bestMove = Math.min(bestMove, minmax.bind(this)(depth - 1, turn === "w" ? "b" : "w", team, alpha, beta))
        }

        undo()

        if ((team === turn && team === "w") || (team !== turn && team === "b")) {
            alpha = Math.max(alpha, bestMove)
        } else {
            beta = Math.min(beta, bestMove)
        }

        if (beta <= alpha) return bestMove
    }

    return bestMove
}

export default getBestMove
