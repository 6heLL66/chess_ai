function canvasInit(id, size) {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")

    canvas.width = size
    canvas.height = size

    document.getElementById(id).append(canvas)

    this.canvas = canvas
    this.ctx = ctx
}

export default canvasInit