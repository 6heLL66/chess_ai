import {bishopMove, horsemanMove, pawnMove, rookMove, kingMove} from "./rules.js"

function checkMove(board, info, i, j, ni, nj) {
    switch(board[i][j]) {
        case "wP":
        case "bP":
            return pawnMove(board, info, i, j, ni, nj)
        case "bN":
        case "wN":
            return horsemanMove(board, info, i, j, ni, nj)
        case "bR":
        case "wR":
            return rookMove(board, info, i, j, ni, nj)
        case "bB":
        case "wB":
            return bishopMove(board, info, i, j, ni, nj)
        case "bQ":
        case "wQ":
            return bishopMove(board, info, i, j, ni, nj) || rookMove(board, info, i, j, ni, nj)
        case "bK":
        case "wK":
            return kingMove(board, info, i, j, ni, nj)
        default:
            return false
    }
}

export default checkMove