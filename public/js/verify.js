
socket.on("nodevice", () => {
    $("#devicemsg")
        .addClass("red-text font-weight-bold")
        .removeClass("green-text")
        .text("veuillez brancher l'appareil")
    $("#iconcard")
        .removeClass("green-text")
        .addClass("red-text")
})

socket.on("device", () => {
    $("#devicemsg")
        .addClass("green-text font-weight-bold")
        .removeClass("red-text")
        .text("Veuillez placer la carte devant le recepteur")
    $("#iconcard")
        .removeClass("red-text")
        .addClass("green-text")
})

//les carte
socket.on("card", (data) => {
    $("#modal").modal("hide")
    $("#cardexist").modal("show")
    setTimeout(() => {
        $("#cardexist").modal("hide")
    }, 3000);
})

socket.on("cardexist", (data) => {
   window.location = `/verify/${data}`
})