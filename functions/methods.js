exports.remplacer = (chaine,oldCar,newCar)=>{
	while(chaine.search(oldCar)!=-1){
        chaine = chaine.replace(oldCar,newCar)
    }
    return chaine
}

exports.taille = (aSize)=>{
	aSize = Math.abs(parseInt(aSize, 10));
	var def = [[1, 'octets'], [1024, 'ko'], [1024*1024, 'Mo'], [1024*1024*1024, 'Go'], [1024*1024*1024*1024, 'To']];
	for(var i=0; i<def.length; i++){
		if(aSize<def[i][0]) return (aSize/def[i-1][0]).toFixed(2)+' '+def[i-1][1];
	}
}