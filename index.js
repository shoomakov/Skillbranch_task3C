import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

let __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};

let pokemons = require("./pokemons.json");
pokemons = _.sortBy(pokemons, "name");
let all = {
    "angular": _.orderBy(pokemons, [(one) => {
            return one.weight / one.height;
        }, "name"], ["asc", "asc"]),
    "fat": _.orderBy(pokemons, [(one) => {
            return one.weight / one.height;
        }, "name"], ["desc", "asc"]),
    "huge": _.orderBy(pokemons, ["height", "name"], ["desc", "asc"]),
    "micro": _.orderBy(pokemons, ["height", "name"], ["asc", "asc"]),
    "heavy": _.orderBy(pokemons, ["weight", "name"], ["desc", "asc"]),
    "light": _.orderBy(pokemons, ["weight", "name"], ["asc", "asc"])
};

app.use(bodyParser.json());
let makeOffset = (array, offset, limit) => {
    let answer = _.map(array, (one) => { return one.name; });
    return answer.slice(offset, offset + limit);
};
app.get("/:type?", (req, res) => __awaiter(this, void 0, void 0, function* () {
    let offset = req.query.offset ? +req.query.offset : 0;
    let limit = req.query.limit ? +req.query.limit : 20;
    let type = "";
    if (req.params && req.params.type) {
        type = req.params.type;
    }
    let array = req.params.type ? all[req.params.type] : pokemons;
    res.json(makeOffset(array, offset, limit));
}));

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
