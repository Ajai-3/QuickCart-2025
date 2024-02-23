import express from 'express';
import cors from "cors";
import axios from 'axios';
import morgan from "morgan";
import proxy from "express-http-proxy";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit"
import swaggerUi from "swagger-ui-express";
import * as path from 'path';

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  
}));

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.set("trust proxy", 1);

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: "Too many requests from this IP, please try again after an hour" },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => req.ip,
});

app.use(limiter);

app.use("/", proxy("http://localhost:6001"));
app.use("/auth", proxy("http://localhost:6002"));
app.use("/product", proxy("http://localhost:6003"));
app.use("/cart", proxy("http://localhost:6004"));
app.use("/order", proxy("http://localhost:6005"));
app.use("/payment", proxy("http://localhost:6006"));
app.use("/review", proxy("http://localhost:6007"));
app.use("/admin", proxy("http://localhost:6008"));



app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
