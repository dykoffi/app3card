$('input[type="file"]').dropify()

var an = 31536000000
function remplacer(chaine, oldCar, newCar) {
    while (chaine.search(oldCar) != -1) {
        chaine = chaine.replace(oldCar, newCar)
    }
    return chaine
}

function sendData() {
    let agev = new Date($("#datenaissance").val())
    let anact = new Date()

    if (anact - agev >= an * 18) {
        var id = (new Date()).getTime()
        var nom = $("#nom").val()
        var prenoms = $("#prenoms").val()
        var sexe = $("#sexe").val()
        var lieunaissance = $("#lieunaissance").val()
        var datenaissance = $("#datenaissance").val()
        var domicile = $("#domicile").val()
        var contact = $("#contact").val()

        var profession = $("#profession").val()
        var photo = remplacer(remplacer(remplacer($("#photo").val(), " ", "_"), "-", "_"), "–", "_").substr(12)
        var carte = $("#carte").val()
        var tab = [id, nom, prenoms, sexe, datenaissance, lieunaissance, domicile, profession, contact, photo, carte,"non"]
        socket.emit("addcard", tab)
    }else{
        $("#ageerror").modal("show")
    }
}

$("#sendData").click(() => {
    sendData()
})
socket.on("addok", () => {
    $("#form").submit()
})

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
    $("#carte").val(data)
    $("#cardexist").modal("hide")
    $("#modal").modal("show")
})

socket.on("cardexist", () => {
    $("#modal").modal("hide")
    $("#cardexist").modal("show")
    setTimeout(() => {
        $("#cardexist").modal("hide")
    }, 3000);
})