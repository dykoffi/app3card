setInterval(() => {
    if(((new Date()).getUTCHours() +"").length == 1){
        $("#heure").text("0"+(new Date()).getUTCHours())
    }else{
        $("#heure").text((new Date()).getUTCHours())
    }
    if(((new Date()).getUTCMinutes() +"").length == 1){
        $("#min").text("0"+(new Date()).getUTCMinutes())
    }else{
        $("#min").text((new Date()).getUTCMinutes())
    }
    if(((new Date()).getUTCSeconds() +"").length == 1){
        $("#sec").text("0"+(new Date()).getUTCSeconds())
    }else{
        $("#sec").text((new Date()).getUTCSeconds())
    }
    if(((new Date()).getUTCMilliseconds() +"").length == 2){
        $("#mil").text("0"+(new Date()).getUTCMilliseconds())
    }else{
        $("#mil").text((new Date()).getUTCMilliseconds())
    }
}, 100);

socket.on("voteFinnish",()=>{
    window.location.reload()
})

