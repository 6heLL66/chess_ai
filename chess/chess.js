import canvasInit from "./functions/canvasInit.js"
import {startInfo, startPosition} from "./constants.js"
import drawBoard from "./functions/drawBoard.js"
import mouseEventsInit from "./functions/mouseEventsInit.js"
import {move, undo, step} from "./functions/move.js"
import getBestMove from "./functions/getBestMove.js"
import controlEventsInit from "./functions/controlEventsInit.js"
import getAllMoves from "./functions/getAllMoves.js"
import checkMate from "./functions/checkMate.js"

class Chess {
    constructor(id, ai, size) {
        this.relocatable = false
        this.ai = ai
        this.started = false
        this.move = move.bind(this)
        this.undo = undo.bind(this)
        this.step = step.bind(this)
        this.checkMate = checkMate.bind(this)
        this.getAllMoves = getAllMoves.bind(this)
        canvasInit.bind(this)(id, size)
        this.getBestMove = getBestMove.bind(this)
    }

    start() {
        this.board = startPosition.map(e => [...e])
        this.info = startInfo.map(e => [...e])
        this.clientTeam = "w"
        this.aiTeam = "b"
        this.turn = "w"
        this.lastState = []
        this.started = true
        mouseEventsInit.bind(this)()
        controlEventsInit.bind(this)()
        this.render()
    }


    pause() {
        this.started = false
    }

    continue() {
        this.started = true
    }

    render() {
        drawBoard.bind(this)()
    }
}

export default Chess