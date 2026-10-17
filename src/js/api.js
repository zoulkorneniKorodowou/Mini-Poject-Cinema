import { Movie } from "./movieModel.js"
    const api_key = "c1d81bbb";
    const start_request = "https://www.omdbapi.com/";
export async function filmApiFetch(title){
    try {
        const retour = await fetch(`${start_request}?apikey=${api_key}&s=${title}`);
        const data = await retour.json();
        console.log(data);
        if(data.Response === "True"){
            return data.Search.map((film) => new Movie(film));
        }else{
            console.warn("Aucun film trouvé :", data.Error);
        };
    } catch (error) {
        console.log('Erreur', error)
    }
};
