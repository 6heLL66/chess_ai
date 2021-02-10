function controlEventsInit() {
    let { ai, getBestMove, step, render, turn } = this

    document.getElementById(ai).onclick = (e) => {
        const { i, j, ni, nj } = getBestMove()

        //step(i, j, ni, nj)
        //this.turn = turn === "b" ? "w" : "b"
        //render.bind(this)()
    }
}

export default controlEventsInit