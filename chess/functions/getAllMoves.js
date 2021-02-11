import checkMove from "./checkMove.js"

function getAllMoves(team) {
    const { info, board } = this
    let result = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (info[i][j] && info[i][j].team === team) {
                for (let k = 0; k < 8; k++) {
                    for (let h = 0; h < 8; h++) {
                        if (checkMove(board, info, i, j, k, h)) {
                            if (board[i][j].substr(1, 1) === "P" && (k === 7 || k === 0)) {
                                result.push({ i, j, ni: k, nj: h, type: "Q" })
                                result.push({ i, j, ni: k, nj: h, type: "N" })
                            } else {
                                result.push({ i, j, ni: k, nj: h })
                            }
                        }
                    }
                }
            }
        }
    }
    return result
}

export default getAllMoves