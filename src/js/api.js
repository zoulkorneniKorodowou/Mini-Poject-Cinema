import { Movie } from "./movieModel.js"
async function apiFetch(){
    try {
        const retour = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=c1d81bbb")
        const data = await retour.json()
        console.log(data)
    } catch (error) {
        console.log('Erreur', error)
    }
}
apiFetch();
