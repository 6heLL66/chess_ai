import isCheck from "./isCheck.js"

function drawBoard() {
    const { canvas, ctx, info, board, relocatable } = this
    const borderSize = 25
    const size = (canvas.width - borderSize * 2) / 8

    const plankImage = document.getElementById("pl")

    ctx.drawImage(plankImage, 0, borderSize, borderSize, canvas.width - borderSize)
    ctx.drawImage(plankImage, 0, canvas.width - borderSize, canvas.width - borderSize, borderSize)

    ctx.font = "26px Arial"

    let width

    for (let i = 1; i <= 8; i++) {
        ctx.fillText(i.toString(), 6, (9 - i) * size - 12 )
        ctx.fillText(String.fromCharCode(i + 64), i * size - borderSize - 6, canvas.width - 2.5 )
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const fieldImage = document.getElementById((j + i + 2) % 2 === 0 ? "w" : "b")
            const figureImage = document.getElementById(board[i][j])
            ctx.drawImage(fieldImage, j * size + borderSize, i * size + borderSize, size, size)
            if (figureImage && ((relocatable && (i !== relocatable.i || j !== relocatable.j)) || !relocatable)) {
                ctx.drawImage(figureImage, j * size + borderSize, i * size + borderSize, size, size)
            }
            if (board[i][j].substr(1, 1) === "K"
                && isCheck(board, info, board[i][j].substr(0, 1))) {
                ctx.fillStyle = "rgba(212, 19, 19, 0.4)"
                ctx.fillRect(j * size + borderSize, i * size + borderSize, size, size)
            }
        }
    }
    if (relocatable) {
        const image = document.getElementById(board[relocatable.i][relocatable.j])
        ctx.drawImage(image, relocatable.j * size + relocatable.x + borderSize, relocatable.i * size + relocatable.y + borderSize, size, size)
    }
}

export default drawBoard