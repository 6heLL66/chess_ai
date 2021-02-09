import createModal from "./createModal.js"

function upgradePawn(i, j, team, ni, nj) {
    let modal = createModal.bind(this)("modal", team, i, j, ni, nj, "Swap Pawn", "upgrade")

    modal.style.display = "block"
    modal.setAttribute("class", "modal show")
}

export default upgradePawn