class Movie {
    constructor(data){
        this.title = data.Title;
        this.resume = data.Plot;
        this.genre = data.Genre;
        this.actors = data.Actors;
        this.dvd = data.DVD;
        this.rate = data.Rated;
        this.poster = (data.Poster && data.Poster !== "N/A") ? data.Poster : "https://img.freepik.com/free-vector/404-error-background_23-2148071744.jpg?semt=ais_hybrid";
    };
    getInfoBrief(){
        return `${this.title} (${this.genre} (${this.rate}))`;
    }
};

export {Movie};