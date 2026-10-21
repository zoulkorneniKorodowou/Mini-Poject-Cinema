class Movie {
    constructor(data){
        this.id = data.imdbID;
        this.year = data.Year;
        this.title = (data.Title && data.Title !== "N/A") ? data.Title : "Pas de titre disponible pour ce film"
        this.resume = data.Plot;
        this.genre = (data.Genre && data.Genre !== "N/A") ? data.Genre : "Pas de genre disponible pour ce film"
        this.actors = data.Actors;
        this.dvd = data.DVD;
        this.rate = (data.imdbRating && data.imdbRating !== "N/A") ? data.imdbRating : "Pas de note pour ce film"
        this.poster = (data.Poster && data.Poster !== "N/A") ? data.Poster : "https://img.freepik.com/free-vector/404-error-background_23-2148071744.jpg?semt=ais_hybrid";
    };
    getInfoBrief(){
        return `${this.title} (${this.genre} (${this.rate}))`;
    }
};

export {Movie};