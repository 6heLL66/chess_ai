import isCheck from "./isCheck.js"

function controlEventsInit() {
    let { ai, getBestMove, step, render, lastState, checkMate } = this

    document.getElementById(ai).onclick = (e) => {
        const { i, j, ni, nj, type } = getBestMove()

        console.log(this.turn)

        lastState.push({
            copyB: this.board.map(i => i.map(j => j)),
            copyI: this.info.map(i => i.map(j => {
                return j ? {...j} : null
            }))
        })

        if (step(i, j, ni, nj, type)) {
            if (isCheck(this.board, this.info, this.turn)) {
                this.undo()
            } else {
                if (checkMate()) {
                    this.pause()
                    alert(`game finished ${this.turn}`)
                }
                this.turn = this.turn === "w" ? "b" : "w"
            }
        } else {
            lastState.splice(lastState.length - 1, 1)
        }

        render.bind(this)()
    }
}

export default controlEventsInit