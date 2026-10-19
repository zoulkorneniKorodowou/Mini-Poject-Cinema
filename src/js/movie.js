import { filmApiFetchById } from "./api.js";

const url = new URLSearchParams(window.location.search);
const movie_id = url.get("id");

// Fonction utilitaire pour formater la date OMDb (ex: "18 Dec 2009" -> "18/12/2009")
function formatDateFr(dateString) {
  if (!dateString || dateString === "N/A") {
    return "Date inconnue";
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
    result_movie.textContent = "Aucun identifiant de film renseigné.";
    return;
  }

  const movie = await filmApiFetchById(movie_id);
  if (!movie) {
    result_movie.textContent = "Impossible de récupérer les détails de ce film.";
    return;
  }

  const article_movie = document.createElement("article");
  article_movie.setAttribute("class", "movie_card");

  // Affiche
  const poster_movie = document.createElement("div");
  poster_movie.setAttribute("class", "poster");

  const img_poster_movie = document.createElement("img");
  img_poster_movie.setAttribute("src", movie.poster);
  img_poster_movie.setAttribute("alt", movie.title);
  img_poster_movie.setAttribute("class", "movie_poster");

  poster_movie.appendChild(img_poster_movie);

  // Informations
  const infos_movie = document.createElement("div");
  infos_movie.setAttribute("class", "movie_infos");

  // Titre
  const title_movie = document.createElement("h3");
  title_movie.setAttribute("class", "movie_title");
  title_movie.textContent = `Titre : ${movie.title}`;

  // Date de sortie formatée
  const release_movie = document.createElement("p");
  release_movie.setAttribute("class", "movie_release");
  release_movie.textContent = `Sortie : ${formatDateFr(movie.released || movie.dvd)}`;

  // Genre
  const genre_movie = document.createElement("p");
  genre_movie.setAttribute("class", "movie_genre");
  genre_movie.textContent = `Genre : ${movie.genre}`;

  // Acteurs
  const actors_movie = document.createElement("p");
  actors_movie.setAttribute("class", "movie_actors");
  actors_movie.textContent = `Acteurs : ${movie.actors || "Non renseignés"}`;

  // Note
  const rate_movie = document.createElement("p");
  rate_movie.setAttribute("class", "movie_rate");
  rate_movie.textContent = `Note : ${movie.rate}`;

  // Résumé
  const plot_movie = document.createElement("p");
  plot_movie.setAttribute("class", "movie_plot");
  plot_movie.textContent = `Résumé : ${movie.resume}`;

  // Ajout des éléments au bloc infos
  infos_movie.appendChild(title_movie);
  infos_movie.appendChild(release_movie);
  infos_movie.appendChild(genre_movie);
  infos_movie.appendChild(actors_movie);
  infos_movie.appendChild(rate_movie);
  infos_movie.appendChild(plot_movie);

  // Assemblage
  article_movie.appendChild(poster_movie);
  article_movie.appendChild(infos_movie);

  result_movie.appendChild(article_movie);
}

getMovieById();