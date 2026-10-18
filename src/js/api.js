import { Movie } from "./movieModel.js"
    const api_key = "c1d81bbb";
    const start_request = "https://www.omdbapi.com/";
    const start_requestId = "http://www.omdbapi.com/";
export async function filmApiFetch(title){
    try {
        const retour = await fetch(`${start_request}?apikey=${api_key}&s=${title}`);
        const data = await retour.json();
        if(data.Response === "True"){
            let myFilm = data.Search.map((film) => new Movie(film));
            console.log(myFilm);   
            return myFilm;
        }else{
            console.warn("Aucun film trouvé :", data.Error);
        };
    } catch (error) {
        console.log('Erreur', error)
    }
};
export async function filmApiFetchById(identity) {
    try {
        const retour = await fetch(`${start_requestId}?i=${identity}&apikey=${api_key}`);
        const data = await retour.json();
        if(data.Response === "True"){
            const myFilm = new Movie(data);
            console.log(myFilm);
            return myFilm;
        }else{
            console.warn("Aucun film trouvé :", data.Error);
            return null;
        };
    } catch (error) {
        console.log('Erreur', error);
        return null;
    }
};
