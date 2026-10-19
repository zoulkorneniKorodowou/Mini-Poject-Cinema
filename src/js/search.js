import { filmApiFetch, filmApiFetchById } from "./api.js";
const film_title = document.getElementById("search_movie_text");
const btn_search = document.getElementById("search_btn");
btn_search.addEventListener('click', async ()=>{
    const movie = film_title.value.trim();
    if(!movie){
        alert('titre non valide');
        return;
    };
    const recherche = await filmApiFetch(movie); 
    console.log(recherche);
    const moivies = document.getElementById('search_results');

    //vidage des anciennes recherches
    moivies.innerHTML="";

    //verification si film bien trouvé
    if(!recherche || recherche.length === 0){
        const empty = document.createElement("p");
        empty.textContent = "Aucun film triuvé!";
        moivies.appendChild(empty);
    }

    recherche.forEach(async (element) => {
      const article_movie = document.createElement("article");
      article_movie.setAttribute("class", "movie_card");
      const poster_movie = document.createElement("div");
      poster_movie.setAttribute("class", "poster");
    
      //image de couverture
      const img_poster_movie = document.createElement("img");
      img_poster_movie.setAttribute("src", element.poster !== "N/A" ? element.poster : "https://img.freepik.com/free-vector/404-error-background_23-2148071744.jpg?semt=ais_hybrid");
      img_poster_movie.setAttribute("class", "movie_poster");
    
      //recuperation de l'ID
      let movieID = element.id;
      console.log(movieID);
      let movies_byID = await filmApiFetchById(movieID);
      console.log(movies_byID);
      //badges
      const badges_movie = document.createElement("div");
      badges_movie.setAttribute("class", "badges");
    
      //contenants de badges des spans
      const badges_span1 = document.createElement("span");
      const badges_span2 = document.createElement("span");
      const badges_span3 = document.createElement("span");
      const badges_span4 = document.createElement("span");
      const badges_span5 = document.createElement("span");
      badges_span1.setAttribute("class", "badge");
      badges_span2.setAttribute("class", "badge");
      badges_span3.setAttribute("class", "badge");
      badges_span4.setAttribute("class", "badge");
      badges_span5.setAttribute("class", "badge");
      badges_span1.textContent = element.year;
      badges_span2.textContent = movies_byID.genre ;
      badges_span3.textContent = movies_byID.actors ;
      badges_span4.textContent = movies_byID.rate ;

    
      //ajout des spans  a badges
      badges_movie.appendChild(badges_span1);
      badges_movie.appendChild(badges_span2);
      badges_movie.appendChild(badges_span3);
      badges_movie.appendChild(badges_span4);
    
      //ajout de l'image et badges au div poster
      poster_movie.appendChild(img_poster_movie);
      poster_movie.appendChild(badges_movie);
    
      const infos_movie = document.createElement("div");
      infos_movie.setAttribute("class", "movie_infos");
      const title_movie = document.createElement("h3");
      title_movie.setAttribute("class", "movie_title");
      const infos_more = document.createElement("a");
      infos_more.setAttribute("class", "btn_details");
      infos_more.setAttribute('href',`./pages/movie.html?id=${element.id}` );
    
      title_movie.textContent = element.title;
      infos_more.textContent = "En savoir plus";
    
      infos_movie.appendChild(title_movie);
      infos_movie.appendChild(infos_more);
    
      // ajout de poster et infos_movies a article
      article_movie.appendChild(poster_movie);
      article_movie.appendChild(infos_movie);
    
      //insertion de la carte elle meme dans la section
      moivies.appendChild(article_movie);
    });
})
