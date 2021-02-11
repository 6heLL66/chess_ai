import checkMove from "./checkMove.js"
import isCheck from "./isCheck.js"

function mouseEventsInit() {
    if (!this.started) return
    let mousePos = { x: 0, y: 0 }
    document.body.style.cursor = "grab"
    const { canvas, render, step, lastState, checkMate } = this

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
            if (checkMove(this.board, this.info, this.relocatable.i, this.relocatable.j, i, j)) {
                lastState.push({
                    copyB: this.board.map(i => i.map(j => j)),
                    copyI: this.info.map(i => i.map(j => {
                        return j ? {...j} : null
                    }))
                })
                if (step(this.relocatable.i, this.relocatable.j, i, j)) {
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
            }
            document.body.style.cursor = "grab"
        }

        this.relocatable = false
        document.body.style.cursor = "grab"
        render.bind(this)()
    }
}

export default mouseEventsInit