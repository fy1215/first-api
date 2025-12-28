const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

const getMovies = () => {
  const data = fs.readFileSync("movies.json", "utf-8");
  return JSON.parse(data);
};

const saveMovies = (movies) => {
  fs.writeFileSync("movies.json", JSON.stringify(movies, null, 5));
};

app.post("/movies", (req, res) => {
  const movies = getMovies();
  const newMovie = req.body;
  if (!newMovie.id || !newMovie.title || !newMovie.year) {
    return res.json({ message: "形式が正しくありません。" });
  }
  movies.push(newMovie);
  saveMovies(movies);
  res.json({ message: "映画を追加しました", movie: newMovie });
});

app.get("/movies", (req, res) => {
  const movies = getMovies();
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movies = getMovies();
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return res.json({ error: "映画が見つかりません" });
  }

  res.json({ message: `${movie.title}は${movie.year}に上映されました。` });
});

app.put("/movies/:id", (req, res) => {
  const movies = getMovies();
  const id = Number(req.params.id);
  const newData = req.body;

  if (!movies.find((movie) => id === movie.id)) {
    return res.json({ error: "idが正しくありません" });
  }
  if (!newData.id || !newData.title || !newData.year) {
    return res.json({ error: "形式が正しくありません" });
  }

  const updatedMovies = movies.map((movie) => {
    if (movie.id === id) return newData;
    return movie;
  });

  saveMovies(updatedMovies);
  res.json({ message: "変更しました" });
});

app.delete("/movies/:id", (req, res) => {
  const movies = getMovies();
  const id = Number(req.params.id);
  if (!movies.find((movie) => id === movie.id)) {
    return res.json({ error: "idが正しくありません" });
  }
  saveMovies(movies.filter((movie) => id !== movie.id));
  res.json({ message: "削除しました" });
});

app.listen(3000, () => {
  console.log("サーバー起動: http://localhost:3000/movies");
});
