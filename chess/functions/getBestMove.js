import checkMove from "./checkMove.js"
import { values } from "../constants.js"

function getBestMove(team) {
    const { board, info } = this

    let allMoves = getAllMoves(team, board, info)

    let movesValues = allMoves.map(move => {
        return getValue(board, info, move, team) - getValue(board, info, move, team === "w" ? "b" : "w")
    })
    let maxi = 0
    movesValues.map((value, i) => {
        if (value >= movesValues[maxi]) {
            maxi = i
        }
    })

    console.log(movesValues)

    return allMoves[maxi]
}

function getAllMoves(team, board, info) {
    let result = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (info[i][j] && info[i][j].team === team) {
                for (let k = 0; k < 8; k++) {
                    for (let h = 0; h < 8; h++) {
                        if (checkMove(board, info, i, j, k, h)) result.push({ i, j, ni: k, nj: h })
                    }
                }
            }
        }
    }
    return result
}

function getValue(board, info, move, team) {
    let boardCopy = board.map(i => i.map(j => j))
    boardCopy[move.ni][move.nj] = boardCopy[move.i][move.j]
    boardCopy[move.i][move.j] = ""
    let value = 0

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (boardCopy[i][j] && boardCopy[i][j].substr(0,1) === team) {
                value += values[boardCopy[i][j].substr(1, 1)]
            }
        }
    }
    return value
}

export default getBestMove
