import canvasInit from "./functions/canvasInit.js"
import {startInfo, startPosition} from "./constants.js"
import drawBoard from "./functions/drawBoard.js"
import mouseEventsInit from "./functions/mouseEventsInit.js"
import move from "./functions/move.js"
import getBestMove from "./functions/getBestMove.js"
import controlEventsInit from "./functions/controlEventsInit.js"

class Chess {
    constructor(id, ai, size) {
        this.relocatable = false
        this.ai = ai
        this.started = false
        this.turn = "w"
        this.move = move.bind(this)
        canvasInit.bind(this)(id, size)
        this.getBestMove = getBestMove.bind(this)
    }

    start() {
        this.board = startPosition.map(e => [...e])
        this.info = startInfo.map(e => [...e])
        this.clientTeam = "w"
        this.aiTeam = "b"
        this.turn = "w"
        this.started = true
        mouseEventsInit.bind(this)()
        controlEventsInit.bind(this)()
        this.render()
    }

    stop() {
        this.started = false
    }

    render() {
        drawBoard.bind(this)()
    }
}

export default Chess