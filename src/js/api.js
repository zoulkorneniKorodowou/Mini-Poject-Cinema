function apiFetch(){
    fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c1d81bbb")
    .then((retour)=>{
        if(!retour.ok) throw new Error ("Erreur de réccupération des données");
        console.log(retour);
        return retour;
    })
    .catch((error) =>{
        console.log(error);
    });
}

apiFetch();