import isCheck from "./isCheck.js"

function drawBoard() {
    const { canvas, ctx, info, board, relocatable } = this
    const size = canvas.width / 8

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const fieldImage = document.getElementById((j + i + 2) % 2 === 0 ? "w" : "b")
            const figureImage = document.getElementById(board[i][j])
            ctx.drawImage(fieldImage, j * size, i * size, size, size)
            if (figureImage && ((relocatable && (i !== relocatable.i || j !== relocatable.j)) || !relocatable)) {
                ctx.drawImage(figureImage, j * size, i * size, size, size)
            }
            if (board[i][j].substr(1, 1) === "K"
                && isCheck(board, info, board[i][j].substr(0, 1))) {
                ctx.fillStyle = "rgba(212, 19, 19, 0.4)"
                ctx.fillRect(j * size, i * size, size, size)
            }
        }
    }
    if (relocatable) {
        const image = document.getElementById(board[relocatable.i][relocatable.j])
        ctx.drawImage(image, relocatable.j * size + relocatable.x, relocatable.i * size + relocatable.y, size, size)
    }
}

export default drawBoard