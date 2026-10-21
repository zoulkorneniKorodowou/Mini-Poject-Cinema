import { filmApiFetchById } from "./api.js";

const url = new URLSearchParams(window.location.search);
const movie_id = url.get("id");

// fonction utilitaire pour formater la date OMDb en jj/mm/aaaa
function formatDateFr(dateString) {
  if (!dateString || dateString === "N/A") {
    return "Non disponible en DVD";
  }
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) {
    return dateString;
  }
  return dateObj.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

async function getMovieById() {
  const result_movie = document.getElementById("movie_result");

  if (!result_movie) {
    console.error("Conteneur #movie_result introuvable.");
    return;
  }

  if (!movie_id) {
    result_movie.textContent = "Aucun identifiant de film trouvé.";
    return;
  }

  const movie = await filmApiFetchById(movie_id, "full");
  if (!movie) {
    result_movie.textContent = "Impossible de récupérer les détails de ce film.";
    return;
  }

  const article_movie = document.createElement("article");
  article_movie.setAttribute("class", "movie_card");

  // affiche
  const poster_movie = document.createElement("div");
  poster_movie.setAttribute("class", "poster");

  const img_poster_movie = document.createElement("img");
  img_poster_movie.setAttribute("src", movie.poster);
  img_poster_movie.setAttribute("alt", movie.title);
  img_poster_movie.setAttribute("class", "movie_poster");

  poster_movie.appendChild(img_poster_movie);

  // informations
  const infos_movie = document.createElement("div");
  infos_movie.setAttribute("class", "movie_infos");

  // titre
  const title_movie = document.createElement("h3");
  title_movie.setAttribute("class", "movie_title");
  title_movie.textContent = `Titre : ${movie.title}`;

  // resume
  const plot_movie = document.createElement("p");
  plot_movie.setAttribute("class", "movie_plot");
  plot_movie.textContent = `Résumé : ${movie.resume}`;

  // genre
  const genre_movie = document.createElement("p");
  genre_movie.setAttribute("class", "movie_genre");
  genre_movie.textContent = `Genre : ${movie.genre}`;

  // acteurs
  const actors_movie = document.createElement("p");
  actors_movie.setAttribute("class", "movie_actors");
  actors_movie.textContent = `Acteurs : ${movie.actors || "Non renseignés"}`;

  // note
  const rate_movie = document.createElement("p");
  rate_movie.setAttribute("class", "movie_rate");
  rate_movie.textContent = `Note : ${movie.rate}`;

  // date de sortie en dvd formatee
  const dvd_movie = document.createElement("p");
  dvd_movie.setAttribute("class", "movie_dvd");
  dvd_movie.textContent = `Sortie DVD : ${formatDateFr(movie.dvd)}`;

  // ajout des elements au bloc infos
  infos_movie.appendChild(title_movie);
  infos_movie.appendChild(plot_movie);
  infos_movie.appendChild(genre_movie);
  infos_movie.appendChild(actors_movie);
  infos_movie.appendChild(rate_movie);
  infos_movie.appendChild(dvd_movie);

  // assemblage
  article_movie.appendChild(poster_movie);
  article_movie.appendChild(infos_movie);

  result_movie.appendChild(article_movie);
}

getMovieById();