const Movie = require("../models/Movie");

const post = (req, res, next)  => {
    const { title, imdb_score, category, country, year } = req.body;
   
    const movie = new Movie({
        title: title,
        imdb_score: imdb_score,
        category: category,
        country:country,
        year: year 
    });

    const promise = movie.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

};
// movies all 
const get = (req, res, next) => {
    const promise = Movie.find({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(data);
    })

}

// get movies id 
const getMovie =  (req, res, next) => {
    const promise = Movie.findById(req.params.movie_id);
    promise.then((data) => {
        if(!data){
          return  next({ message: 'The movie was not found.', code: 500 }) ;
        }
        res.json(data)
    }).catch((err) =>{
        res.json(err);
    });
};

module.exports = {
    post,
    get,
    getMovie
 }

