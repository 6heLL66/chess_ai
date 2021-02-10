import checkMove from "./checkMove.js"
import upgradePawn from "./upgradePawn.js"

function move(i, j, ni, nj) {
    let { board, info } = this

    board[ni][nj] = board[i][j]
    board[i][j] = ""

    info[ni][nj] = info[i][j]
    info[i][j] = null
}

function undo() {
    let { board, info, lastState } = this
    let last = lastState[lastState.length - 1]

    console.log(last.copyB)
    console.log(board.map(i => i.map(j => j)))

    board = last.copyB
    info = last.copyI

    console.log(board.map(i => i.map(j => j)))

    lastState.splice(lastState.length - 1, 1)
}

function step(i, j, ni, nj) {
    let { board, info, move, relocatable, turn } = this

    if (i === 6 && j === 0 && ni === 4)console.log("asd")

    if (checkMove(board, info, i, j, ni, nj) === "r") {
        move(i, 7, i, 5)
    } else if (checkMove(board, info, i, j, ni, nj) === "l") {
        move(relocatable.i, 0, relocatable.i, 3)
    }

    if (board[i][j].substr(1, 1) === "P"
        && (i === 0 || i === 7)) {
        upgradePawn.bind(this)(i, j, info[i][j].team, ni, nj)
    } else {
        move(i, j, ni, nj)
        info[ni][nj].steps++
        this.turn = turn === "w" ? "b" : "w"
    }
}

export {
    move,
    undo,
    step
}