import checkMove from "./checkMove.js"
import upgradePawn from "./upgradePawn.js"

function mouseEventsInit() {
    if (!this.started) return
    let mousePos = { x: 0, y: 0 }
    document.body.style.cursor = "grab"
    const { canvas, render, move, board, info } = this

    document.onmousedown = (e) => {
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop

        const j = Math.floor(x / (canvas.width / 8))
        const i = Math.floor(y / (canvas.width / 8))

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.width) {
            document.body.style.cursor = "grabbing"
            this.relocatable = { i, j, x: 0, y: 0 }
        }
    }

    document.onmousemove = (e) => {
        if (!this.relocatable) return mousePos = { x: e.clientX, y: e.clientY }

        const deltaX = e.clientX - mousePos.x
        const deltaY = e.clientY - mousePos.y

        this.relocatable.x += deltaX
        this.relocatable.y += deltaY

        mousePos = { x: e.clientX, y: e.clientY }
        render.bind(this)()
    }

    document.onmouseup = (e) => {
        const x = e.clientX - canvas.offsetLeft
        const y = e.clientY - canvas.offsetTop

        const j = Math.floor(x / (canvas.width / 8))
        const i = Math.floor(y / (canvas.width / 8))

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.width) {
            if (checkMove(board, info, this.relocatable.i, this.relocatable.j, i, j)) {
                if (checkMove(board, info, this.relocatable.i, this.relocatable.j, i, j) === "r") {
                    move(this.relocatable.i, 7, this.relocatable.i, 5)
                } else if (checkMove(board, info, this.relocatable.i, this.relocatable.j, i, j) === "l") {
                    move(this.relocatable.i, 0, this.relocatable.i, 3)
                }

                if (board[this.relocatable.i][this.relocatable.j].substr(1, 1) === "P"
                    && (i === 0 || i === 7)) {
                    upgradePawn.bind(this)(this.relocatable.i, this.relocatable.j, info[this.relocatable.i][this.relocatable.j].team, i, j)
                } else move(this.relocatable.i, this.relocatable.j, i, j)

            }
            document.body.style.cursor = "grab"
        }

        this.relocatable = false
        document.body.style.cursor = "grab"
        render.bind(this)()
    }
}

export default mouseEventsInit