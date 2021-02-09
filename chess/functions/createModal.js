import move from "./move.js"

function createModal(id, team, i, j, ni, nj, header, type) {
    const modal = document.createElement("div")
    modal.setAttribute("class", "modal fade")
    modal.setAttribute("id", id)

    const modalDialog = document.createElement("div")
    modalDialog.setAttribute("class", "modal-dialog")

    const modalContent = document.createElement("div")
    modalContent.setAttribute("class", "modal-content")

    const modalHeader = document.createElement("div")
    modalHeader.setAttribute("class", "modal-header")

    const modalBody = document.createElement("div")
    modalBody.setAttribute("class", "modal-body")

    const modalTitle = document.createElement("h4")
    modalTitle.setAttribute("class", "modal-title")
    modalTitle.innerText = header

    const btnClose = document.createElement("button")
    btnClose.setAttribute("class", "btn-close")
    btnClose.onclick = (e) => {
        modal.setAttribute("class", "modal fade")
        modal.remove()
    }

    if (type === "upgrade") {
        modalBody.append(createChoice.bind(this)(`${team}Q`, i, j, ni, nj, modal))
        modalBody.append(createChoice.bind(this)(`${team}R`, i, j, ni, nj, modal))
        modalBody.append(createChoice.bind(this)(`${team}B`, i, j, ni, nj, modal))
        modalBody.append(createChoice.bind(this)(`${team}N`, i, j, ni, nj, modal))
    } else if (type === "victory") {

    }

    modalHeader.append(modalTitle)
    modalHeader.append(btnClose)
    modalContent.append(modalHeader)
    modalContent.append(modalBody)
    modalDialog.append(modalContent)
    modal.append(modalDialog)

    document.body.append(modal)

    return modal
}

function createChoice(figure, i, j, ni, nj, modal) {
    let { board, render } = this

    const div = document.createElement("div")
    div.setAttribute("class", "choice")

    const image = document.createElement("img")
    image.src = "./images/" + figure + ".png"
    image.style.display = "block"

    const text = document.createElement("p")

    switch (figure.substr(1, 1)) {
        case "Q":
            text.innerText = "Queen"
            break
        case "N":
            text.innerText = "Horseman"
            break
        case "B":
            text.innerText = "Bishop"
            break
        case "R":
            text.innerText = "Rook"
            break
        default:
            break
    }

    div.append(text)
    div.append(image)

    div.onclick = (e) => {
        modal.remove()
        move.bind(this)(i, j, ni, nj)
        board[ni][nj] = figure
        render.bind(this)()
    }

    return div
}

export default createModal