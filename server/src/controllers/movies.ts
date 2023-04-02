import {Request, Response}from 'express';
import axios from 'axios'
import {Op} from 'sequelize'
import { CommentInstance } from '../models/comments';
import database from '../db/database.config';

export async function getMovies(req: Request, res: Response) {
    const url = 'https://swapi.dev/api/films';
    try {
      //fetch movies from the star wars api
      const response = await axios.get(url);
      const movies = response.data.results;
      console.log(movies)
        //extract the unique identifer from the url 
      let movieUrl = "";
      let urlId = '';
      let count = 0
        movies.forEach((movie: { url: any; }) => {
        movieUrl = movie.url
        urlId = movieUrl[movieUrl.length - 2]
        })
        
      //sort movies by release dates from earliest to newest in ascending order
      movies.sort(
        (
          a: { release_date: string | number | Date },
          b: { release_date: string | number | Date }
        ) => {
          const firstReleaseDate: any = new Date(a.release_date);
          const secReleaseDate: any = new Date(b.release_date);
          return firstReleaseDate - secReleaseDate;
        }
      );

      //query the database for comments
      const commentCounts = await CommentInstance.findAll({
        attributes: [
          "movieId",
          [database.fn("COUNT", database.col("id")), "count"],
        ],
        where: {
          movieId: {
            [Op.in]: movies.map(
              (movie: { url: string; }) => movie.url.split("/").slice(-2, -1)[0]
            ),
          },
        },
        group: ["movieId"],
      });


      //  Combine the movie data and comment count data into a single res object
      const data = movies.map(
        (movie: {
          [x: string]: any;
          title: string;
          release_date: string;
          episode_id: string;
        }) => {
          const movieCommentCount = commentCounts.find(
            (commentCount) =>
              commentCount.dataValues ==
              movies.forEach((movie: { url: any }) => {
                movieUrl = movie.url;
                return movieUrl[movieUrl.length - 2];
              }),
            count++
          );
          return {
            title: movie.title,
            release_date: movie.release_date,
            opening_crawl: movie.opening_crawl,
            comment_count: commentCounts,
            characters: movie.characters,
          };
        }
      );
      return res.status(200).json({
        message: "Movies retrieved sucessfully",
        data,
      });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            message: error
        });
    }
}