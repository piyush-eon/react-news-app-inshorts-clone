const express = require("express");
const inshorts = require("inshorts-api");

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.post("/", (req, res) => {
  const { category, lang, numOfResults } = req.body;

  var options = {
    lang,
    category,
    numOfResults,
  };

  inshorts.get(options, function (result) {
    res.send(result);
  });
});

app.listen(5000, console.log(`Server running in port ${5000}..`));
