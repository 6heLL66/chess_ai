function move(i, j, ni, nj) {
    let { board, started, info } = this
    if (!started) return

    board[ni][nj] = board[i][j]
    board[i][j] = ""

    info[ni][nj] = info[i][j]
    info[i][j] = null

    info[ni][nj].steps++
}

export default move