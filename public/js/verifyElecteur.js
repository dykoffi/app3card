var ok = false
socket.emit("verifyVote", $("#carte").val())
socket.on("voteFinnish", () => {
    window.location = "/verify"
})
var audio = new Audio("/son.mp3")
socket.on("peutVoter", (data) => {
    socket.emit("voteStart", data)
    $("body").css({
        'background-color': "green"
    })
})

socket.on("dejaVoter", (data) => {
    audio.play()
    setTimeout(() => {
        window.location = "/verify"
    }, 5000);
    setInterval(() => {
        danger()
    }, 100);
})

function danger() {
    if (!ok) {
        $("body").css({
            'background-color': "red"
        })
        ok = true
    }
    else {
        $("body").css({
            'background-color': "white"
        })
        ok = false
    }

}