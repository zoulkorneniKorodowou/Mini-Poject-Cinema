import { Movie } from "./movieModel.js"
    const api_key = "c1d81bbb";
    const start_request = "https://www.omdbapi.com/";
    const start_requestId = "http://www.omdbapi.com/";
export async function filmApiFetch(title, page = 1) {
  try {
    const retour = await fetch(`${start_request}?apikey=${api_key}&s=${title}&page=${page}`);
    const data = await retour.json();

    if (data.Response === "True") {
      const my_film = data.Search.map((film) => new Movie(film));
      return my_film;
    } else {
      console.log("Aucun film trouvé :", data.Error);
      return [];
    }
  } catch (error) {
    console.log("Erreur", error);
    return [];
  }
}

export async function filmApiFetchById(id, plot_type = "short") {
  try {
    const retour = await fetch(`${start_request}?apikey=${api_key}&i=${id}&plot=${plot_type}`);
    const data = await retour.json();
    if (data.Response === "True") {
      return new Movie(data);
    }
    return null;
  } catch (error) {
    console.log("Erreur :", error);
    return null;
  }
};

export async function filmApiFetchByYear(year, page){
    try {
        const word = "The man";
        const url = `${start_request}?apikey=${api_key}&s=${word}&y=${year}&page=${page}`;
        const result = await fetch(url);
        const data = await result.json();
        if(data.Response === "True"){
            return data.Search.map((film) => new Movie(film));
        };
        return [];
    } catch (error) {
        console.log("Erreur de recuperation de l'annee ",error);
        return [];
    }
};
