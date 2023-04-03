import { Request, Response } from "express";
import axios from "axios";
import { ParsedQs } from "qs";
import _ from "lodash";

export async function getCharacters(req: Request, res: Response) {
  const { sort, name, gender } = req.query as unknown as { [key: string]: any };
  try {
    const response = await axios.get(`https://swapi.dev/api/people/`);
    let characters = response.data.results;

    //sort
    if (sort) {
      const [field, order] = sort.split(":");
      console.log("sort");
      console.log(order);
      characters = _.orderBy(characters, [field], [order]);
    }
    // Filter by name
    if (name) {
      characters = characters.filter((character: { name: string }) =>
        character.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    // Filter by gender
    if (gender) {
      characters = characters.filter(
        (character: { gender: string | ParsedQs | string[] | ParsedQs[] }) =>
          character.gender === gender
      );
    }
    // Calculate metadata
    const totalCharacters = characters.length;
    const totalHeightCm = characters.reduce(
      (total: number, character: { height: string }) =>
        total + parseInt(character.height),
      0
    );
    const totalHeightInches: any = (totalHeightCm * 0.3937).toFixed(2);
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
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      message: error,
    });
  }
}
