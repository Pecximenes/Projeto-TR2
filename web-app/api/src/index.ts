import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" }).status(200);
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
