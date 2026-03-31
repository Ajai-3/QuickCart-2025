import express from "express";
import cors from "cors";

const host = process.env.HOST ?? "localhost";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

const port = process.env.PORT || 6001;

const server = app.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

server.on("error", (err) => {
  console.error("Auth service error:", err);
});
