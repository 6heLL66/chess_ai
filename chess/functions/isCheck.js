import checkMove from "./checkMove.js"

function isCheck(board, info, team) {
    let kingPos = findPos(board, `${team}K`)
    if (!kingPos) return
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (info[i][j] && info[i][j].team !== team) {
                if (checkMove(board, info, i, j, kingPos.i, kingPos.j)) return true
            }
        }
    }
    return false
}

function findPos(board, figure) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === figure) return { i, j }
        }
    }
    return false
}

export default isCheck