import { filmApiFetch, filmApiFetchById } from "./api.js";

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
  img_poster_movie.setAttribute("class", "movie_poster");

  //badges
  const badges_movie = document.createElement("div");
  badges_movie.setAttribute("class", "badges");

  //contenants de badges des spans
  const badges_span1 = document.createElement("span");
  const badges_span2 = document.createElement("span");
  badges_span1.setAttribute("class", "badge");
  badges_span2.setAttribute("class", "badge");
  badges_span1.textContent = film.year;
  badges_span2.textContent = film.genre ;

  //ajout des spans  a badges
  badges_movie.appendChild(badges_span1);
  badges_movie.appendChild(badges_span2);

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
