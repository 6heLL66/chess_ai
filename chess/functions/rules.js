function pawnMove(board, info, i, j, ni, nj) {
    if ((info[i][j].team === "w" && ni > i) || (info[i][j].team === "b" && ni < i)) return false
    if (board[ni][nj] !== "") {
        return info[ni][nj].team !== info[i][j].team && Math.abs(j - nj) === 1 && Math.abs(i - ni) === 1
    } else {
        if (info[i][j].steps > 0) return j === nj && Math.abs(i - ni) === 1
        else return j === nj && Math.abs(i - ni) < 3 && board[i + (info[i][j].team === "w" ? -1 : 1)][j] === ""
    }
    return true
}

function horsemanMove(board, info, i, j, ni, nj) {
    const steps = [[2, 1], [-2, 1], [2, -1], [-2, -1], [-1, -2], [1, 2], [-1, 2], [1, -2]]
    if (board[ni][nj] !== "" && info[ni][nj].team === info[i][j].team) return false
    for (let h = 0; h < steps.length; h++) {
        if (i + steps[h][0] === ni && j + steps[h][1] === nj) return true
    }
    return false
}

function rookMove(board, info, i, j, ni, nj) {
    if (info[ni][nj] && info[ni][nj].team === info[i][j].team) return false
    if ((i === ni || j === nj)) {
        return !findObstacles(board, i, j, ni, nj, "rook")
    }
    return false
}

function bishopMove(board, info, i, j, ni, nj) {
    if (info[ni][nj] && info[ni][nj].team === info[i][j].team) return false
    if (Math.abs(i - ni) === Math.abs(j - nj)
        && !findObstacles(board, i, j, ni, nj, "bishop")) return true
    return false
}


function findObstacles(board, i, j, ni, nj, type) {
    if (type === "rook") {
        let adder
        if (i === ni) {
            adder = Math.abs(j + 1 - nj) < Math.abs(j - 1 - nj) ? 1 : -1
            for (let h = j + adder; h !== nj; h += adder) {
                if (board[i][h] !== "") return true
            }
            return false
        } else {
            adder = Math.abs(i + 1 - ni) < Math.abs(i - 1 - ni) ? 1 : -1
            for (let h = i + adder; h !== ni; h += adder) {
                if (board[h][j] !== "") return true
            }
            return false
        }
    } else if (type === "bishop") {
        let adder = []
        adder[0] = Math.abs(i + 1 - ni) < Math.abs(i - 1 - ni) ? 1 : -1
        adder[1] = Math.abs(j + 1 - nj) < Math.abs(j - 1 - nj) ? 1 : -1

        while (Math.abs(i - ni) !== 1 && Math.abs(j - nj) !== 1) {
            i += adder[0]
            j += adder[1]

            if (board[i][j] !== "") return true
        }
        return false
    }
}

function kingMove(board, info, i, j, ni, nj) {
    if (info[ni][nj] && info[i][j].team === info[ni][nj].team) return false
    if ((Math.abs(i - ni) <= 1 && Math.abs(j - nj) <= 1)) return true
    if (info[i][j].steps === 0) {
        if (nj === 2 && board[ni][1] === "" && board[ni][3] === "" && board[ni][0] === `${info[i][j].team}R`) {
            return "l"
        } else if (nj === 6 && board[ni][5] === "" && board[ni][7] === `${info[i][j].team}R`) {
            return "r"
        }
    }
    return false
}

export {
    pawnMove,
    horsemanMove,
    rookMove,
    bishopMove,
    kingMove
}
