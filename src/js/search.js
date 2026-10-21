import { filmApiFetch, filmApiFetchById } from "./api.js";

const film_title = document.getElementById("search_movie_text");
const btn_search = document.getElementById("search_btn");
const btn_load_more = document.getElementById("btn_load_more_search");
if (btn_load_more) btn_load_more.style.display = "none";
const moivies = document.getElementById("search_results");

let page = 1;

// fonction pour creer et afficher une carte de film
function display_movie_card(element) {
  const article_movie = document.createElement("article");
  article_movie.setAttribute("class", "movie_card");
  const poster_movie = document.createElement("div");
  poster_movie.setAttribute("class", "poster");

  // image de couverture
  const img_poster_movie = document.createElement("img");
  img_poster_movie.setAttribute(
    "src",
    element.poster !== "N/A"
      ? element.poster
      : "https://img.freepik.com/free-vector/404-error-background_23-2148071744.jpg?semt=ais_hybrid"
  );
  img_poster_movie.setAttribute("class", "movie_poster");
  poster_movie.appendChild(img_poster_movie);

  const infos_movie = document.createElement("div");
  infos_movie.setAttribute("class", "movie_infos");
  const title_movie = document.createElement("h3");
  title_movie.setAttribute("class", "movie_title");
  const infos_more = document.createElement("a");
  infos_more.setAttribute("class", "btn_details");
  infos_more.setAttribute("href", `../pages/movie.html?id=${element.id}`);

  title_movie.textContent = element.title;
  infos_more.textContent = "En savoir plus";

  infos_movie.appendChild(title_movie);
  infos_movie.appendChild(infos_more);

  // ajout de poster et infos_movies a article
  article_movie.appendChild(poster_movie);
  article_movie.appendChild(infos_movie);

  // insertion de la carte elle meme dans la section
  moivies.appendChild(article_movie);
}

// fonction principale pour executer la recherche
async function search_movies() {
  const movie = film_title.value.trim();
  page = 1;

  if (!movie) {
    moivies.innerHTML = "";
    if (btn_load_more) btn_load_more.style.display = "none";
    return;
  }

  const recherche = await filmApiFetch(movie, page);
  console.log(recherche);

  // vidage des anciennes recherches
  moivies.innerHTML = "";

  // verification si film bien trouvé
  if (!recherche || recherche.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucun film trouvé !";
    moivies.appendChild(empty);
    return;
  }

  recherche.forEach((element) => {
    display_movie_card(element);
  });

  if (btn_load_more) {
    btn_load_more.style.display = "block";
    btn_load_more.textContent = "Charger plus";
    btn_load_more.disabled = false;
  }
};

// ecoute de la saisie en temps reel
film_title.addEventListener("input", search_movies);

// ecoute du clic sur le bouton de recherche
btn_search.addEventListener("click", () => {
  search_movies();
});

// ecoute du clic pour charger les pages suivantes
if (btn_load_more) {
  btn_load_more.addEventListener("click", async () => {
    const movie = film_title.value.trim();
    if (!movie) return;

    page++;
    const next_movies = await filmApiFetch(movie, page);

    if (!next_movies || next_movies.length === 0) {
      btn_load_more.textContent = "Aucun autre film disponible";
      btn_load_more.disabled = true;
      return;
    }

    next_movies.forEach((element) => {
      display_movie_card(element);
    });
  });
}