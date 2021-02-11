import checkMove from "./checkMove.js"
import upgradePawn from "./upgradePawn.js"

function move(i, j, ni, nj) {
    let { board, info } = this

    board[ni][nj] = board[i][j]
    board[i][j] = ""

    info[ni][nj] = info[i][j]
    info[i][j] = null
}

function undo(changeTeam) {
    let { lastState } = this
    let last = lastState[lastState.length - 1]

    this.board = last.copyB.map(i => i.map(j => j))
    this.info = last.copyI.map(i => i.map(j => j))

    lastState.splice(lastState.length - 1, 1)
    if (changeTeam) this.turn = this.turn === "w" ? "b" : "w"
}

function step(i, j, ni, nj, type, anyway) {
    const { board, info, move, relocatable } = this

    if (i === undefined) console.log(i, j, ni, nj, type, anyway)

    if (info[i][j].team !== this.turn && !anyway) return false

    if (checkMove(board, info, i, j, ni, nj) === "r") {
        move(i, 7, i, 5)
    } else if (checkMove(board, info, i, j, ni, nj) === "l") {
        move(i, 0, i, 3)
    }

    if (board[i][j].substr(1, 1) === "P"
        && (ni === 0 || ni === 7)) {
        if (type !== undefined) {
            move(i, j, ni, nj)
            board[ni][nj] = `${info[ni][nj].team}${type}`
            info[ni][nj].steps++
            return true
        } else {
            upgradePawn.bind(this)(i, j, info[i][j].team, ni, nj)
            return false
        }
    } else {
        move(i, j, ni, nj)
        info[ni][nj].steps++
        return true
    }
}

export {
    move,
    undo,
    step
}