import isCheck from "./isCheck.js"

function checkMate() {
    const { getAllMoves, step, lastState, undo } = this
    let allMoves = [...getAllMoves(this.turn === "w" ? "b" : "w")]


    for (let i = 0; i < allMoves.length; i++) {
        let move = allMoves[i]
        lastState.push({
            copyB: this.board.map(i => i.map(j => j)),
            copyI: this.info.map(i => i.map(j => {
                return j ? {...j} : null
            }))
        })
        if (step(move.i, move.j, move.ni, move.nj, move.type, true)) {
            if (!isCheck(this.board, this.info, this.info[move.ni][move.nj].team)) {
                undo()
                return false
            }
            undo()
        } else {
            lastState.splice(lastState.length - 1, 1)
        }
    }
    return true
}

export default checkMate
