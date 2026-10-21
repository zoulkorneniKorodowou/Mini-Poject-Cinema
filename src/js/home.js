import { filmApiFetch, filmApiFetchById, filmApiFetchByYear } from "./api.js";

const ids_tabs = ["tt31049299", "tt33764258", "tt35538033", "tt22084616","tt31450459"];
const trendings_movies = document.getElementById("trendings_movies");
ids_tabs.forEach(async (element) => {
  if (!element) return;
  const film = await filmApiFetchById(element);
  console.log(film);
  if (!film) return;
  const article_movie = document.createElement("article");
  article_movie.setAttribute("class", "movie_card");
  const poster_movie = document.createElement("div");
  poster_movie.setAttribute("class", "poster");

  //image de couverture
  const img_poster_movie = document.createElement("img");
  img_poster_movie.setAttribute("src", `${film.poster}`);
  img_poster_movie.setAttribute("alt",film.title);
  img_poster_movie.setAttribute("class", "movie_poster");

  //badges
  const badges_movie = document.createElement("div");
  badges_movie.setAttribute("class", "badges");

  //contenants de badges des spans
  const badges_year = document.createElement("span");
  const badges_genre = document.createElement("span");
  badges_year.setAttribute("class", "badge");
  badges_genre.setAttribute("class", "badge");
  badges_year.textContent = film.year;
  badges_genre.textContent = film.genre ;

  //ajout des spans  a badges
  badges_movie.appendChild(badges_year);
  badges_movie.appendChild(badges_genre);

  //ajout de l'image et badges au div poster
  poster_movie.appendChild(img_poster_movie);
  poster_movie.appendChild(badges_movie);

  const infos_movie = document.createElement("div");
  infos_movie.setAttribute("class", "movie_infos");
  const title_movie = document.createElement("h3");
  title_movie.setAttribute("class", "movie_title");
  const plot_movie = document.createElement("p");
  plot_movie.setAttribute("class", "movie_plot");
  const infos_more = document.createElement("a");
  infos_more.setAttribute("class", "btn_details");
  infos_more.setAttribute('href',`./pages/movie.html?id=${film.id}` );

  title_movie.textContent = film.title;
  plot_movie.textContent = film.resume;
  infos_more.textContent = "En savoir plus";

  infos_movie.appendChild(title_movie);
  infos_movie.appendChild(plot_movie);
  infos_movie.appendChild(infos_more);

  // ajout de poster et infos_movies a article
  article_movie.appendChild(poster_movie);
  article_movie.appendChild(infos_movie);

  //insertion de la carte elle meme dans la section
  trendings_movies.appendChild(article_movie);
});

let page = 1;
const btn_load = document.getElementById("btn_load_more");
const movies_other = document.getElementById("others_movies");

async function load() {
  const new_movies = await filmApiFetchByYear(2024, page);
  
  if(!new_movies || new_movies.length === 0){
    btn_load.textContent = "Aucun film disponible";
    btn_load.disabled = true;
    return;
  };
  console.log(new_movies);
  new_movies.forEach((element) => {
    const article = document.createElement("article");
    article.setAttribute("class", "movie_card");

    const poster_div = document.createElement("div");
    poster_div.setAttribute("class", "poster");

    const img = document.createElement("img");
    img.setAttribute("class", "movie_poster");
    img.setAttribute("src", element.poster);
    img.setAttribute("alt", element.title);

    const badges_div = document.createElement("div");
    badges_div.setAttribute("class", "badges");

    const badge_year = document.createElement("span");
    badge_year.setAttribute("class", "badge");
    badge_year.textContent = element.year;

    badges_div.appendChild(badge_year);
    poster_div.appendChild(img);
    poster_div.appendChild(badges_div);

    const infos_div = document.createElement("div");
    infos_div.setAttribute("class", "movie_infos");

    const title_h3 = document.createElement("h3");
    title_h3.setAttribute("class", "movie_title");
    title_h3.textContent = element.title;

    const btn_more = document.createElement("a");
    btn_more.setAttribute("class", "btn_details");
    btn_more.setAttribute("href", `./pages/movie.html?id=${element.id}`);
    btn_more.textContent = "En savoir plus";

    infos_div.appendChild(title_h3);
    infos_div.appendChild(btn_more);

    article.appendChild(poster_div);
    article.appendChild(infos_div);

    movies_other.appendChild(article);
  });
  page++;
}

btn_load.addEventListener('click', load);
load();