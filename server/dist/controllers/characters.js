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
exports.getCharacters = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
function getCharacters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sort, name, gender } = req.query;
        try {
            const response = yield axios_1.default.get(`https://swapi.dev/api/people/`);
            let characters = response.data.results;
            //sort
            if (sort) {
                const [field, order] = sort.split(":");
                console.log("sort");
                console.log(order);
                characters = lodash_1.default.orderBy(characters, [field], [order]);
            }
            // Filter by name
            if (name) {
                characters = characters.filter((character) => character.name.toLowerCase().includes(name.toLowerCase()));
            }
            // Filter by gender
            if (gender) {
                characters = characters.filter((character) => character.gender === gender);
            }
            // Calculate metadata
            const totalCharacters = characters.length;
            const totalHeightCm = characters.reduce((total, character) => total + parseInt(character.height), 0);
            const totalHeightInches = (totalHeightCm * 0.3937).toFixed(2);
            const totalHeightFeet = Math.floor(totalHeightInches / 12);
            const remainingInches = (totalHeightInches % 12).toFixed(2);
            // Format metadata and character data into response object
            const metadata = {
                totalCharacters: totalCharacters,
                totalHeightCm: totalHeightCm,
                totalHeightInches: `${totalHeightFeet}'${remainingInches}"`,
            };
            const data = {
                metadata,
                characters,
            };
            return res.status(200).json({
                message: "characters created sucessfully",
                data,
            });
        }
        catch (error) {
            return res.status(500).json({
                error: "Internal server error",
                message: error,
            });
        }
    });
}
exports.getCharacters = getCharacters;
