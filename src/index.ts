import * as express from "express";
import * as cors from "cors";

import { CNN } from "./modules/cnn";

import { Twitter } from "./modules/twitter";

const app = express();

app.use(cors(
  "*"
));

app.get("/cnn", async (req, res) => {
  try {
    const searchKeyWord = req.query.search as string;
    const cnn = new CNN();
    const result = await cnn.search(searchKeyWord.split(","), 25);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/twitter", async (req, res) => {
  try {
    const displayName = req.query.displayname as string;
    const twitter = new Twitter();
    const result = await twitter.getTweets(displayName);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen("8080");
