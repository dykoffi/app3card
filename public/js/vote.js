$(".candidats").fadeOut("slow")
socket.on("voteStart", (carteElecteur) => {
    $(".candidats").fadeIn("slow")
    $("#idElecteur").val(carteElecteur)
})

function voteFinnish(idCandidat) {
    $(".candidats").fadeOut("slow")
    socket.emit("voteFinnish", idCandidat, $("#idElecteur").val())
}