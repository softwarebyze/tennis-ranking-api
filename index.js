const cheerio = require("cheerio");
const request = require("request");
const express = require("express");

const app = express();

app.get("/atp/:n?", async (req, res) => {
    const defaultN = 5;
  const n = req.params.n || defaultN;
  const url = "https://www.atptour.com/en/rankings/singles";
  request(url, function (error, response, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const players = [];
      $("#player-rank-detail-ajax tbody tr")
        .slice(0, n)
        .each((i, element) => {
          const name = $(element).find(".player-cell a").text().trim();
          players.push(name);
        });
      res.json(players);
    }
  });
});

app.listen("8080");
