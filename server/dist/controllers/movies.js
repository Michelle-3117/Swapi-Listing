"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = require("sequelize");
const comments_1 = require("../models/comments");
const database_config_1 = __importDefault(require("../db/database.config"));
function getMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://swapi.dev/api/films';
        try {
            //fetch movies from the star wars api
            const response = yield axios_1.default.get(url);
            const movies = response.data.results;
            //extract the unique identifer from the url 
            let movieUrl = "";
            let urlId = '';
            let count = 0;
            movies.forEach((movie) => {
                movieUrl = movie.url;
                urlId = movieUrl[movieUrl.length - 2];
            });
            //sort movies by release dates from earliest to newest in ascending order
            movies.sort((a, b) => {
                const firstReleaseDate = new Date(a.release_date);
                const secReleaseDate = new Date(b.release_date);
                return firstReleaseDate - secReleaseDate;
            });
            //query the database for comments
            const commentCounts = yield comments_1.CommentInstance.findAll({
                attributes: [
                    "movieId",
                    [database_config_1.default.fn("COUNT", database_config_1.default.col("id")), "count"],
                ],
                where: {
                    movieId: {
                        [sequelize_1.Op.in]: movies.map((movie) => movie.url.split("/").slice(-2, -1)[0]),
                    },
                },
                group: ["movieId"],
            });
            //  Combine the movie data and comment count data into a single res object
            const data = movies.map((movie) => {
                const movieCommentCount = commentCounts.find((commentCount) => commentCount.dataValues ==
                    movies.forEach((movie) => {
                        movieUrl = movie.url;
                        return movieUrl[movieUrl.length - 2];
                    }), count++);
                return {
                    title: movie.title,
                    release_date: movie.release_date,
                    opening_crawl: movie.opening_crawl,
                    comment_count: commentCounts,
                    characters: movie.characters,
                };
            });
            return res.status(200).json({
                message: "Movies retrieved sucessfully",
                data,
            });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error",
                message: error
            });
        }
    });
}
exports.getMovies = getMovies;
