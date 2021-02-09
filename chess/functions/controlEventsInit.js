function controlEventsInit() {
    const { ai, getBestMove, move, render } = this

    document.getElementById(ai).onclick = (e) => {
        const { i, j, ni, nj } = getBestMove(this.turn)

        move(i, j, ni, nj)
        this.turn = this.turn === "b" ? "w" : "b"
        render.bind(this)()
    }
}

export default controlEventsInit